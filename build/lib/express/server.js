'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _expressLogging = require('./express-logging');

var _middleware = require('./middleware');

var _static = require('./static');

var _crash = require('./crash');

function server(configureRoutes, port) {
  var hostname = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  var app, httpServer, close;
  return _regeneratorRuntime.async(function server$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = (0, _express2['default'])();
        httpServer = _http2['default'].createServer(app);
        close = httpServer.close.bind(httpServer);

        httpServer.close = function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
                  httpServer.on('close', resolve);
                  close(function (err) {
                    if (err) reject(err);
                  });
                }));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
          httpServer.on('error', function (err) {
            if (err.code === 'EADDRNOTAVAIL') {
              _logger2['default'].error('Could not start REST http interface listener. ' + 'Requested address is not available.');
            } else {
              _logger2['default'].error('Could not start REST http interface listener. The requested ' + 'port may already be in use. Please make sure there is no ' + 'other instance of this server running already.');
            }
            reject(err);
          });
          httpServer.on('connection', function (socket) {
            socket.setTimeout(600 * 1000); // 10 minute timeout
          });
          configureServer(app, configureRoutes);

          var serverArgs = [port];
          if (hostname) {
            // If the hostname is omitted, the server will accept
            // connections on any IP address
            serverArgs.push(hostname);
          }
          httpServer.listen.apply(httpServer, serverArgs.concat([function (err) {
            if (err) {
              reject(err);
            }
            resolve(httpServer);
          }]));
        }));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function configureServer(app, configureRoutes) {
  app.use(_expressLogging.endLogFormatter);

  // set up static assets
  app.use((0, _serveFavicon2['default'])(_path2['default'].resolve(_static.STATIC_DIR, 'favicon.ico')));
  app.use(_express2['default']['static'](_static.STATIC_DIR));

  // crash routes, for testing
  app.use('/wd/hub/produce_error', _crash.produceError);
  app.use('/wd/hub/crash', _crash.produceCrash);

  // add middlewares
  app.use(_middleware.allowCrossDomain);
  app.use(_middleware.fixPythonContentType);
  app.use(_bodyParser2['default'].urlencoded({ extended: true }));
  app.use((0, _methodOverride2['default'])());
  app.use(_middleware.catch4XXHandler);
  app.use(_middleware.catchAllHandler);

  // make sure appium never fails because of a file size upload limit
  app.use(_bodyParser2['default'].json({ limit: '1gb' }));

  // set up start logging (which depends on bodyParser doing its thing)
  app.use(_expressLogging.startLogFormatter);

  configureRoutes(app);

  // dynamic routes for testing, etc.
  app.all('/welcome', _static.welcome);
  app.all('/test/guinea-pig', _static.guineaPig);
  app.all('/test/guinea-pig-scrollable', _static.guineaPigScrollable);

  // catch this last, so anything that falls through is 404ed
  app.use(_middleware.catch404Handler);
}

exports.server = server;
exports.configureServer = configureServer;

// create the actual http server

// http.Server.close() only stops new connections, but we need to wait until
// all connections are closed and the `close` event is emitted
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL3NlcnZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7dUJBQ0gsU0FBUzs7OztvQkFDWixNQUFNOzs7OzRCQUNILGVBQWU7Ozs7MEJBQ1osYUFBYTs7Ozs4QkFDVCxpQkFBaUI7Ozs7c0JBQzVCLFVBQVU7Ozs7OEJBQ3lCLG1CQUFtQjs7MEJBRXJCLGNBQWM7O3NCQUNLLFVBQVU7O3FCQUNuQyxTQUFTOztBQUdwRCxTQUFlLE1BQU0sQ0FBRSxlQUFlLEVBQUUsSUFBSTtNQUFFLFFBQVEseURBQUcsSUFBSTtNQUV2RCxHQUFHLEVBQ0gsVUFBVSxFQUlWLEtBQUs7Ozs7OztBQUxMLFdBQUcsR0FBRywyQkFBUztBQUNmLGtCQUFVLEdBQUcsa0JBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQztBQUluQyxhQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOztBQUM3QyxrQkFBVSxDQUFDLEtBQUssR0FBRzs7Ozs7aURBQ0osYUFBWSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDNUMsNEJBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLHVCQUFLLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDYix3QkFBSSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO21CQUN0QixDQUFDLENBQUM7aUJBQ0osQ0FBQzs7Ozs7Ozs7OztTQUNILENBQUM7Ozt5Q0FFVyxhQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUM1QyxvQkFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDOUIsZ0JBQUksR0FBRyxDQUFDLElBQUksS0FBSyxlQUFlLEVBQUU7QUFDaEMsa0NBQUksS0FBSyxDQUFDLGdEQUFnRCxHQUNoRCxxQ0FBcUMsQ0FBQyxDQUFDO2FBQ2xELE1BQU07QUFDTCxrQ0FBSSxLQUFLLENBQUMsOERBQThELEdBQzlELDJEQUEyRCxHQUMzRCxnREFBZ0QsQ0FBQyxDQUFDO2FBQzdEO0FBQ0Qsa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUNiLENBQUMsQ0FBQztBQUNILG9CQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQU0sRUFBSztBQUN0QyxrQkFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7V0FDL0IsQ0FBQyxDQUFDO0FBQ0gseUJBQWUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXRDLGNBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsY0FBSSxRQUFRLEVBQUU7OztBQUdaLHNCQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1dBQzNCO0FBQ0Qsb0JBQVUsQ0FBQyxNQUFNLE1BQUEsQ0FBakIsVUFBVSxFQUFXLFVBQVUsU0FBRSxVQUFDLEdBQUcsRUFBSztBQUN4QyxnQkFBSSxHQUFHLEVBQUU7QUFDUCxvQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2I7QUFDRCxtQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1dBQ3JCLEdBQUMsQ0FBQztTQUNKLENBQUM7Ozs7Ozs7Ozs7Q0FDSDs7QUFFRCxTQUFTLGVBQWUsQ0FBRSxHQUFHLEVBQUUsZUFBZSxFQUFFO0FBQzlDLEtBQUcsQ0FBQyxHQUFHLGlDQUFpQixDQUFDOzs7QUFHekIsS0FBRyxDQUFDLEdBQUcsQ0FBQywrQkFBUSxrQkFBSyxPQUFPLHFCQUFhLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxLQUFHLENBQUMsR0FBRyxDQUFDLDhCQUFjLG9CQUFZLENBQUMsQ0FBQzs7O0FBR3BDLEtBQUcsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLHNCQUFlLENBQUM7QUFDL0MsS0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLHNCQUFlLENBQUM7OztBQUd2QyxLQUFHLENBQUMsR0FBRyw4QkFBa0IsQ0FBQztBQUMxQixLQUFHLENBQUMsR0FBRyxrQ0FBc0IsQ0FBQztBQUM5QixLQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFXLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsS0FBRyxDQUFDLEdBQUcsQ0FBQyxrQ0FBZ0IsQ0FBQyxDQUFDO0FBQzFCLEtBQUcsQ0FBQyxHQUFHLDZCQUFpQixDQUFDO0FBQ3pCLEtBQUcsQ0FBQyxHQUFHLDZCQUFpQixDQUFDOzs7QUFHekIsS0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBVyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHekMsS0FBRyxDQUFDLEdBQUcsbUNBQW1CLENBQUM7O0FBRTNCLGlCQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQUdyQixLQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsa0JBQVUsQ0FBQztBQUM3QixLQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixvQkFBWSxDQUFDO0FBQ3ZDLEtBQUcsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLDhCQUFzQixDQUFDOzs7QUFHNUQsS0FBRyxDQUFDLEdBQUcsNkJBQWlCLENBQUM7Q0FDMUI7O1FBRVEsTUFBTSxHQUFOLE1BQU07UUFBRSxlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJsaWIvZXhwcmVzcy9zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBzdGFydExvZ0Zvcm1hdHRlciwgZW5kTG9nRm9ybWF0dGVyIH0gZnJvbSAnLi9leHByZXNzLWxvZ2dpbmcnO1xuaW1wb3J0IHsgYWxsb3dDcm9zc0RvbWFpbiwgZml4UHl0aG9uQ29udGVudFR5cGUsIGNhdGNoQWxsSGFuZGxlcixcbiAgICAgICAgIGNhdGNoNDA0SGFuZGxlciwgY2F0Y2g0WFhIYW5kbGVyIH0gZnJvbSAnLi9taWRkbGV3YXJlJztcbmltcG9ydCB7IGd1aW5lYVBpZywgZ3VpbmVhUGlnU2Nyb2xsYWJsZSwgd2VsY29tZSwgU1RBVElDX0RJUiB9IGZyb20gJy4vc3RhdGljJztcbmltcG9ydCB7IHByb2R1Y2VFcnJvciwgcHJvZHVjZUNyYXNoIH0gZnJvbSAnLi9jcmFzaCc7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2VydmVyIChjb25maWd1cmVSb3V0ZXMsIHBvcnQsIGhvc3RuYW1lID0gbnVsbCkge1xuICAvLyBjcmVhdGUgdGhlIGFjdHVhbCBodHRwIHNlcnZlclxuICBsZXQgYXBwID0gZXhwcmVzcygpO1xuICBsZXQgaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbiAgLy8gaHR0cC5TZXJ2ZXIuY2xvc2UoKSBvbmx5IHN0b3BzIG5ldyBjb25uZWN0aW9ucywgYnV0IHdlIG5lZWQgdG8gd2FpdCB1bnRpbFxuICAvLyBhbGwgY29ubmVjdGlvbnMgYXJlIGNsb3NlZCBhbmQgdGhlIGBjbG9zZWAgZXZlbnQgaXMgZW1pdHRlZFxuICBsZXQgY2xvc2UgPSBodHRwU2VydmVyLmNsb3NlLmJpbmQoaHR0cFNlcnZlcik7XG4gIGh0dHBTZXJ2ZXIuY2xvc2UgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGh0dHBTZXJ2ZXIub24oJ2Nsb3NlJywgcmVzb2x2ZSk7XG4gICAgICBjbG9zZSgoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBodHRwU2VydmVyLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VBRERSTk9UQVZBSUwnKSB7XG4gICAgICAgIGxvZy5lcnJvcignQ291bGQgbm90IHN0YXJ0IFJFU1QgaHR0cCBpbnRlcmZhY2UgbGlzdGVuZXIuICcgK1xuICAgICAgICAgICAgICAgICAgJ1JlcXVlc3RlZCBhZGRyZXNzIGlzIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZXJyb3IoJ0NvdWxkIG5vdCBzdGFydCBSRVNUIGh0dHAgaW50ZXJmYWNlIGxpc3RlbmVyLiBUaGUgcmVxdWVzdGVkICcgK1xuICAgICAgICAgICAgICAgICAgJ3BvcnQgbWF5IGFscmVhZHkgYmUgaW4gdXNlLiBQbGVhc2UgbWFrZSBzdXJlIHRoZXJlIGlzIG5vICcgK1xuICAgICAgICAgICAgICAgICAgJ290aGVyIGluc3RhbmNlIG9mIHRoaXMgc2VydmVyIHJ1bm5pbmcgYWxyZWFkeS4nKTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIGh0dHBTZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0KSA9PiB7XG4gICAgICBzb2NrZXQuc2V0VGltZW91dCg2MDAgKiAxMDAwKTsgLy8gMTAgbWludXRlIHRpbWVvdXRcbiAgICB9KTtcbiAgICBjb25maWd1cmVTZXJ2ZXIoYXBwLCBjb25maWd1cmVSb3V0ZXMpO1xuXG4gICAgbGV0IHNlcnZlckFyZ3MgPSBbcG9ydF07XG4gICAgaWYgKGhvc3RuYW1lKSB7XG4gICAgICAvLyBJZiB0aGUgaG9zdG5hbWUgaXMgb21pdHRlZCwgdGhlIHNlcnZlciB3aWxsIGFjY2VwdFxuICAgICAgLy8gY29ubmVjdGlvbnMgb24gYW55IElQIGFkZHJlc3NcbiAgICAgIHNlcnZlckFyZ3MucHVzaChob3N0bmFtZSk7XG4gICAgfVxuICAgIGh0dHBTZXJ2ZXIubGlzdGVuKC4uLnNlcnZlckFyZ3MsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKGh0dHBTZXJ2ZXIpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlU2VydmVyIChhcHAsIGNvbmZpZ3VyZVJvdXRlcykge1xuICBhcHAudXNlKGVuZExvZ0Zvcm1hdHRlcik7XG5cbiAgLy8gc2V0IHVwIHN0YXRpYyBhc3NldHNcbiAgYXBwLnVzZShmYXZpY29uKHBhdGgucmVzb2x2ZShTVEFUSUNfRElSLCAnZmF2aWNvbi5pY28nKSkpO1xuICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKFNUQVRJQ19ESVIpKTtcblxuICAvLyBjcmFzaCByb3V0ZXMsIGZvciB0ZXN0aW5nXG4gIGFwcC51c2UoJy93ZC9odWIvcHJvZHVjZV9lcnJvcicsIHByb2R1Y2VFcnJvcik7XG4gIGFwcC51c2UoJy93ZC9odWIvY3Jhc2gnLCBwcm9kdWNlQ3Jhc2gpO1xuXG4gIC8vIGFkZCBtaWRkbGV3YXJlc1xuICBhcHAudXNlKGFsbG93Q3Jvc3NEb21haW4pO1xuICBhcHAudXNlKGZpeFB5dGhvbkNvbnRlbnRUeXBlKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe2V4dGVuZGVkOiB0cnVlfSkpO1xuICBhcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuICBhcHAudXNlKGNhdGNoNFhYSGFuZGxlcik7XG4gIGFwcC51c2UoY2F0Y2hBbGxIYW5kbGVyKTtcblxuICAvLyBtYWtlIHN1cmUgYXBwaXVtIG5ldmVyIGZhaWxzIGJlY2F1c2Ugb2YgYSBmaWxlIHNpemUgdXBsb2FkIGxpbWl0XG4gIGFwcC51c2UoYm9keVBhcnNlci5qc29uKHtsaW1pdDogJzFnYid9KSk7XG5cbiAgLy8gc2V0IHVwIHN0YXJ0IGxvZ2dpbmcgKHdoaWNoIGRlcGVuZHMgb24gYm9keVBhcnNlciBkb2luZyBpdHMgdGhpbmcpXG4gIGFwcC51c2Uoc3RhcnRMb2dGb3JtYXR0ZXIpO1xuXG4gIGNvbmZpZ3VyZVJvdXRlcyhhcHApO1xuXG4gIC8vIGR5bmFtaWMgcm91dGVzIGZvciB0ZXN0aW5nLCBldGMuXG4gIGFwcC5hbGwoJy93ZWxjb21lJywgd2VsY29tZSk7XG4gIGFwcC5hbGwoJy90ZXN0L2d1aW5lYS1waWcnLCBndWluZWFQaWcpO1xuICBhcHAuYWxsKCcvdGVzdC9ndWluZWEtcGlnLXNjcm9sbGFibGUnLCBndWluZWFQaWdTY3JvbGxhYmxlKTtcblxuICAvLyBjYXRjaCB0aGlzIGxhc3QsIHNvIGFueXRoaW5nIHRoYXQgZmFsbHMgdGhyb3VnaCBpcyA0MDRlZFxuICBhcHAudXNlKGNhdGNoNDA0SGFuZGxlcik7XG59XG5cbmV4cG9ydCB7IHNlcnZlciwgY29uZmlndXJlU2VydmVyIH07XG4iXX0=