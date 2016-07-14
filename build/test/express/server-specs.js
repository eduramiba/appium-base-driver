require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _ = require('../..');

var _libExpressServer = require('../../lib/express/server');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('server configuration', function () {
  it('should actually use the middleware', function () {
    var app = { use: _sinon2['default'].spy(), all: _sinon2['default'].spy() };
    var configureRoutes = function configureRoutes() {};
    (0, _libExpressServer.configureServer)(app, configureRoutes);
    app.use.callCount.should.equal(14);
    app.all.callCount.should.equal(3);
  });

  it('should reject if error thrown in configureRoutes parameter', function callee$1$0() {
    var configureRoutes;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          configureRoutes = function configureRoutes() {
            throw new Error('I am Mr. MeeSeeks look at me!');
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _.server)(configureRoutes, 8181).should.be.rejectedWith('MeeSeeks'));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
describe('server', function () {
  var hwServer = undefined;
  var errorStub = undefined;
  before(function callee$1$0() {
    var configureRoutes;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          configureRoutes = function configureRoutes(app) {
            var _this2 = this;

            app.get('/', function (req, res) {
              res.header['content-type'] = 'text/html';
              res.status(200).send('Hello World!');
            });
            app.get('/wd/hub/python', function (req, res) {
              res.status(200).send(req.headers['content-type']);
            });
            app.get('/error', function () {
              throw new Error('hahaha');
            });
            app.get('/pause', function callee$3$0(req, res) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    res.header['content-type'] = 'text/html';
                    context$4$0.next = 3;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

                  case 3:
                    res.status(200).send('We have waited!');

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
          };

          errorStub = _sinon2['default'].stub(console, 'error');
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _.server)(configureRoutes, 8181));

        case 4:
          hwServer = context$2$0.sent;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(hwServer.close());

        case 2:
          errorStub.restore();

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should start up with our middleware', function callee$1$0() {
    var body;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])('http://localhost:8181/'));

        case 2:
          body = context$2$0.sent;

          body.should.eql('Hello World!');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should fix broken context type', function callee$1$0() {
    var body;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
            url: 'http://localhost:8181/wd/hub/python',
            headers: {
              'user-agent': 'Python',
              'content-type': 'application/x-www-form-urlencoded'
            }
          }));

        case 2:
          body = context$2$0.sent;

          body.should.eql('application/json');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should catch errors in the catchall', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])('http://localhost:8181/error').should.be.rejectedWith(/hahaha/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error if we try to start again on a port that is used', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _.server)(function () {}, 8181).should.be.rejectedWith(/EADDRINUSE/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error if we try to start on a bad hostname', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _.server)(function () {}, 8181, 'lolcathost').should.be.rejectedWith(/ENOTFOUND/));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _.server)(function () {}, 8181, '1.1.1.1').should.be.rejectedWith(/EADDRNOTAVAIL/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should wait for the server close connections before finishing closing', function callee$1$0() {
    var bodyPromise, before;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          bodyPromise = (0, _requestPromise2['default'])('http://localhost:8181/pause');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

        case 3:
          before = Date.now();
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(hwServer.close());

        case 6:
          // expect slightly less than the request waited, since we paused above
          (Date.now() - before).should.be.above(900);

          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(bodyPromise);

        case 9:
          context$2$0.sent.should.equal('We have waited!');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// relinquish control so that we don't close before the request is received
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZXhwcmVzcy9zZXJ2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztnQkFFdUIsT0FBTzs7Z0NBQ0UsMEJBQTBCOzs4QkFDdEMsaUJBQWlCOzs7O29CQUNwQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7Ozt3QkFDWCxVQUFVOzs7O0FBR3hCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQU07QUFDckMsSUFBRSxDQUFDLG9DQUFvQyxFQUFFLFlBQU07QUFDN0MsUUFBSSxHQUFHLEdBQUcsRUFBQyxHQUFHLEVBQUUsbUJBQU0sR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLG1CQUFNLEdBQUcsRUFBRSxFQUFDLENBQUM7QUFDL0MsUUFBSSxlQUFlLEdBQUcsU0FBbEIsZUFBZSxHQUFTLEVBQUUsQ0FBQztBQUMvQiwyQ0FBZ0IsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3RDLE9BQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkMsT0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNuQyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQzNELGVBQWU7Ozs7QUFBZix5QkFBZSxHQUFHLFNBQWxCLGVBQWUsR0FBUztBQUMxQixrQkFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1dBQ2xEOzs7MkNBQ0ssY0FBTyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0dBQ3ZFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUN2QixNQUFJLFFBQVEsWUFBQSxDQUFDO0FBQ2IsTUFBSSxTQUFTLFlBQUEsQ0FBQztBQUNkLFFBQU0sQ0FBQztRQUVJLGVBQWU7Ozs7QUFBZix5QkFBZSxZQUFmLGVBQWUsQ0FBRSxHQUFHLEVBQUU7OztBQUM3QixlQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDekIsaUJBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDO0FBQ3pDLGlCQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN0QyxDQUFDLENBQUM7QUFDSCxlQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUN0QyxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQ25ELENBQUMsQ0FBQztBQUNILGVBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQU07QUFDdEIsb0JBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0IsQ0FBQyxDQUFDO0FBQ0gsZUFBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsb0JBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7QUFDL0IsdUJBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsV0FBVyxDQUFDOztxREFDbkMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7O0FBQ25CLHVCQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7Ozs7O2FBQ3pDLENBQUMsQ0FBQztXQUNKOztBQWpCRCxtQkFBUyxHQUFHLG1CQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7OzJDQWtCeEIsY0FBTyxlQUFlLEVBQUUsSUFBSSxDQUFDOzs7QUFBOUMsa0JBQVE7Ozs7Ozs7R0FDVCxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLFFBQVEsQ0FBQyxLQUFLLEVBQUU7OztBQUN0QixtQkFBUyxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7O0dBQ3JCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDcEMsSUFBSTs7Ozs7MkNBQVMsaUNBQVEsd0JBQXdCLENBQUM7OztBQUE5QyxjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUMvQixJQUFJOzs7OzsyQ0FBUyxpQ0FBUTtBQUN2QixlQUFHLEVBQUUscUNBQXFDO0FBQzFDLG1CQUFPLEVBQUU7QUFDUCwwQkFBWSxFQUFFLFFBQVE7QUFDdEIsNEJBQWMsRUFBRSxtQ0FBbUM7YUFDcEQ7V0FDRixDQUFDOzs7QUFORSxjQUFJOztBQU9SLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Ozs7Ozs7R0FDckMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7OzsyQ0FDbEMsaUNBQVEsNkJBQTZCLENBQUMsQ0FDekMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0dBQ3BDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw4REFBOEQsRUFBRTs7Ozs7MkNBQzNELGNBQU8sWUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQ2xFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxtREFBbUQsRUFBRTs7Ozs7MkNBQ2hELGNBQU8sWUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQzs7OzsyQ0FDeEUsY0FBTyxZQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0dBQ2hGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx1RUFBdUUsRUFBRTtRQUN0RSxXQUFXLEVBS1gsTUFBTTs7OztBQUxOLHFCQUFXLEdBQUcsaUNBQVEsNkJBQTZCLENBQUM7OzJDQUdsRCxzQkFBRSxLQUFLLENBQUMsR0FBRyxDQUFDOzs7QUFFZCxnQkFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7OzJDQUNqQixRQUFRLENBQUMsS0FBSyxFQUFFOzs7O0FBRXRCLFdBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7MkNBRXBDLFdBQVc7OzsyQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQjs7Ozs7OztHQUNuRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9leHByZXNzL3NlcnZlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBzZXJ2ZXIgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBjb25maWd1cmVTZXJ2ZXIgfSBmcm9tICcuLi8uLi9saWIvZXhwcmVzcy9zZXJ2ZXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnc2VydmVyIGNvbmZpZ3VyYXRpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgYWN0dWFsbHkgdXNlIHRoZSBtaWRkbGV3YXJlJywgKCkgPT4ge1xuICAgIGxldCBhcHAgPSB7dXNlOiBzaW5vbi5zcHkoKSwgYWxsOiBzaW5vbi5zcHkoKX07XG4gICAgbGV0IGNvbmZpZ3VyZVJvdXRlcyA9ICgpID0+IHt9O1xuICAgIGNvbmZpZ3VyZVNlcnZlcihhcHAsIGNvbmZpZ3VyZVJvdXRlcyk7XG4gICAgYXBwLnVzZS5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDE0KTtcbiAgICBhcHAuYWxsLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmVqZWN0IGlmIGVycm9yIHRocm93biBpbiBjb25maWd1cmVSb3V0ZXMgcGFyYW1ldGVyJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjb25maWd1cmVSb3V0ZXMgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0kgYW0gTXIuIE1lZVNlZWtzIGxvb2sgYXQgbWUhJyk7XG4gICAgfTtcbiAgICBhd2FpdCBzZXJ2ZXIoY29uZmlndXJlUm91dGVzLCA4MTgxKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdNZWVTZWVrcycpO1xuICB9KTtcbn0pO1xuZGVzY3JpYmUoJ3NlcnZlcicsICgpID0+IHtcbiAgbGV0IGh3U2VydmVyO1xuICBsZXQgZXJyb3JTdHViO1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGVycm9yU3R1YiA9IHNpbm9uLnN0dWIoY29uc29sZSwgJ2Vycm9yJyk7XG4gICAgZnVuY3Rpb24gY29uZmlndXJlUm91dGVzIChhcHApIHtcbiAgICAgIGFwcC5nZXQoJy8nLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgcmVzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSAndGV4dC9odG1sJztcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoJ0hlbGxvIFdvcmxkIScpO1xuICAgICAgfSk7XG4gICAgICBhcHAuZ2V0KCcvd2QvaHViL3B5dGhvbicsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChyZXEuaGVhZGVyc1snY29udGVudC10eXBlJ10pO1xuICAgICAgfSk7XG4gICAgICBhcHAuZ2V0KCcvZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGFoYWhhJyk7XG4gICAgICB9KTtcbiAgICAgIGFwcC5nZXQoJy9wYXVzZScsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9ICd0ZXh0L2h0bWwnO1xuICAgICAgICBhd2FpdCBCLmRlbGF5KDEwMDApO1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgnV2UgaGF2ZSB3YWl0ZWQhJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaHdTZXJ2ZXIgPSBhd2FpdCBzZXJ2ZXIoY29uZmlndXJlUm91dGVzLCA4MTgxKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBod1NlcnZlci5jbG9zZSgpO1xuICAgIGVycm9yU3R1Yi5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc3RhcnQgdXAgd2l0aCBvdXIgbWlkZGxld2FyZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgYm9keSA9IGF3YWl0IHJlcXVlc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS8nKTtcbiAgICBib2R5LnNob3VsZC5lcWwoJ0hlbGxvIFdvcmxkIScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaXggYnJva2VuIGNvbnRleHQgdHlwZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgYm9keSA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9weXRob24nLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAndXNlci1hZ2VudCc6ICdQeXRob24nLFxuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgIH1cbiAgICB9KTtcbiAgICBib2R5LnNob3VsZC5lcWwoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgY2F0Y2ggZXJyb3JzIGluIHRoZSBjYXRjaGFsbCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCByZXF1ZXN0KCdodHRwOi8vbG9jYWxob3N0OjgxODEvZXJyb3InKVxuICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL2hhaGFoYS8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBpZiB3ZSB0cnkgdG8gc3RhcnQgYWdhaW4gb24gYSBwb3J0IHRoYXQgaXMgdXNlZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzZXJ2ZXIoKCkgPT4ge30sIDgxODEpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL0VBRERSSU5VU0UvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3IgaWYgd2UgdHJ5IHRvIHN0YXJ0IG9uIGEgYmFkIGhvc3RuYW1lJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHNlcnZlcigoKSA9PiB7fSwgODE4MSwgJ2xvbGNhdGhvc3QnKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9FTk9URk9VTkQvKTtcbiAgICBhd2FpdCBzZXJ2ZXIoKCkgPT4ge30sIDgxODEsICcxLjEuMS4xJykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvRUFERFJOT1RBVkFJTC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCB3YWl0IGZvciB0aGUgc2VydmVyIGNsb3NlIGNvbm5lY3Rpb25zIGJlZm9yZSBmaW5pc2hpbmcgY2xvc2luZycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgYm9keVByb21pc2UgPSByZXF1ZXN0KCdodHRwOi8vbG9jYWxob3N0OjgxODEvcGF1c2UnKTtcblxuICAgIC8vIHJlbGlucXVpc2ggY29udHJvbCBzbyB0aGF0IHdlIGRvbid0IGNsb3NlIGJlZm9yZSB0aGUgcmVxdWVzdCBpcyByZWNlaXZlZFxuICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcblxuICAgIGxldCBiZWZvcmUgPSBEYXRlLm5vdygpO1xuICAgIGF3YWl0IGh3U2VydmVyLmNsb3NlKCk7XG4gICAgLy8gZXhwZWN0IHNsaWdodGx5IGxlc3MgdGhhbiB0aGUgcmVxdWVzdCB3YWl0ZWQsIHNpbmNlIHdlIHBhdXNlZCBhYm92ZVxuICAgIChEYXRlLm5vdygpIC0gYmVmb3JlKS5zaG91bGQuYmUuYWJvdmUoOTAwKTtcblxuICAgIChhd2FpdCBib2R5UHJvbWlzZSkuc2hvdWxkLmVxdWFsKCdXZSBoYXZlIHdhaXRlZCEnKTtcbiAgfSk7XG59KTtcbiJdfQ==