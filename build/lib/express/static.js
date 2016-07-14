'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var STATIC_DIR = _path2['default'].resolve(__dirname, '..', '..', '..', 'static');
if (_lodash2['default'].isNull(_path2['default'].resolve(__dirname).match(/build[\/\\]lib[\/\\]express$/))) {
  // in some contexts we are not in the build directory,
  // so we don't want to go back the extra level
  exports.STATIC_DIR = STATIC_DIR = _path2['default'].resolve(__dirname, '..', '..', 'static');
}

function guineaPigTemplate(req, res, page) {
  var delay, params;
  return _regeneratorRuntime.async(function guineaPigTemplate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        delay = req.params.delay ? parseInt(req.params.delay, 10) : 0;
        params = {
          serverTime: parseInt(Date.now() / 1000, 10),
          userAgent: req.headers['user-agent'],
          comment: 'None'
        };

        if (req.method === 'POST') {
          params.comment = req.body.comments || params.comment;
        }
        _logger2['default'].debug('Sending guinea pig response with params: ' + JSON.stringify(params));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(delay));

      case 6:
        res.set('Content-Type', 'text/html');
        res.cookie('guineacookie1', 'i am a cookie value', { path: '/' });
        res.cookie('guineacookie2', 'cookié2', { path: '/' });
        res.cookie('guineacookie3', 'cant access this', {
          domain: '.blargimarg.com',
          path: '/'
        });
        context$1$0.t0 = res;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(getTemplate(page));

      case 13:
        context$1$0.t1 = params;
        context$1$0.t2 = (0, context$1$0.sent)(context$1$0.t1);
        context$1$0.t0.send.call(context$1$0.t0, context$1$0.t2);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /test/guinea-pig
 */
function guineaPig(req, res) {
  return _regeneratorRuntime.async(function guineaPig$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(guineaPigTemplate(req, res, 'guinea-pig.html'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /test/guinea-pig
 */
function guineaPigScrollable(req, res) {
  return _regeneratorRuntime.async(function guineaPigScrollable$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(guineaPigTemplate(req, res, 'guinea-pig-scrollable.html'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /welcome
 */
function welcome(req, res) {
  var params;
  return _regeneratorRuntime.async(function welcome$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { message: 'Let\'s browse!' };

        _logger2['default'].debug('Sending welcome response with params: ' + JSON.stringify(params));
        context$1$0.t0 = res;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(getTemplate('welcome.html'));

      case 5:
        context$1$0.t1 = params;
        context$1$0.t2 = (0, context$1$0.sent)(context$1$0.t1);
        context$1$0.t0.send.call(context$1$0.t0, context$1$0.t2);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getTemplate(templateName) {
  var content;
  return _regeneratorRuntime.async(function getTemplate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(STATIC_DIR, 'test', templateName)));

      case 2:
        content = context$1$0.sent;
        return context$1$0.abrupt('return', _lodash2['default'].template(content.toString()));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.guineaPig = guineaPig;
exports.guineaPigScrollable = guineaPigScrollable;
exports.welcome = welcome;
exports.STATIC_DIR = STATIC_DIR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL3N0YXRpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7O3NCQUNQLFVBQVU7Ozs7c0JBQ1osUUFBUTs7Ozs2QkFDSCxnQkFBZ0I7O3dCQUNyQixVQUFVOzs7O0FBR3hCLElBQUksVUFBVSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckUsSUFBSSxvQkFBRSxNQUFNLENBQUMsa0JBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEVBQUU7OztBQUczRSxVQXFEZ0QsVUFBVSxHQXJEMUQsVUFBVSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztDQUM1RDs7QUFFRCxTQUFlLGlCQUFpQixDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtNQUMxQyxLQUFLLEVBQ0wsTUFBTTs7OztBQUROLGFBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUM3RCxjQUFNLEdBQUc7QUFDWCxvQkFBVSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztBQUMzQyxtQkFBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQ3BDLGlCQUFPLEVBQUUsTUFBTTtTQUNoQjs7QUFDRCxZQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO0FBQ3pCLGdCQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDdEQ7QUFDRCw0QkFBSSxLQUFLLCtDQUE2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFHLENBQUM7O3lDQUMxRSxzQkFBRSxLQUFLLENBQUMsS0FBSyxDQUFDOzs7QUFDcEIsV0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDckMsV0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztBQUNoRSxXQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztBQUNwRCxXQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRTtBQUM5QyxnQkFBTSxFQUFFLGlCQUFpQjtBQUN6QixjQUFJLEVBQUUsR0FBRztTQUNWLENBQUMsQ0FBQzt5QkFDSCxHQUFHOzt5Q0FBYSxXQUFXLENBQUMsSUFBSSxDQUFDOzs7eUJBQUUsTUFBTTs7dUJBQXJDLElBQUk7Ozs7Ozs7Q0FDVDs7Ozs7QUFLRCxTQUFlLFNBQVMsQ0FBRSxHQUFHLEVBQUUsR0FBRzs7Ozs7eUNBQ25CLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Q0FDNUQ7Ozs7O0FBS0QsU0FBZSxtQkFBbUIsQ0FBRSxHQUFHLEVBQUUsR0FBRzs7Ozs7eUNBQzdCLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Q0FDdkU7Ozs7O0FBS0QsU0FBZSxPQUFPLENBQUUsR0FBRyxFQUFFLEdBQUc7TUFDMUIsTUFBTTs7OztBQUFOLGNBQU0sR0FBRyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQzs7QUFDeEMsNEJBQUksS0FBSyw0Q0FBMEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBRyxDQUFDO3lCQUM3RSxHQUFHOzt5Q0FBYSxXQUFXLENBQUMsY0FBYyxDQUFDOzs7eUJBQUUsTUFBTTs7dUJBQS9DLElBQUk7Ozs7Ozs7Q0FDVDs7QUFFRCxTQUFlLFdBQVcsQ0FBRSxZQUFZO01BQ2xDLE9BQU87Ozs7O3lDQUFTLGtCQUFHLFFBQVEsQ0FBQyxrQkFBSyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQzs7O0FBQTNFLGVBQU87NENBQ0osb0JBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7OztDQUN0Qzs7UUFFUSxTQUFTLEdBQVQsU0FBUztRQUFFLG1CQUFtQixHQUFuQixtQkFBbUI7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6ImxpYi9leHByZXNzL3N0YXRpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cblxubGV0IFNUQVRJQ19ESVIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnLi4nLCAnc3RhdGljJyk7XG5pZiAoXy5pc051bGwocGF0aC5yZXNvbHZlKF9fZGlybmFtZSkubWF0Y2goL2J1aWxkW1xcL1xcXFxdbGliW1xcL1xcXFxdZXhwcmVzcyQvKSkpIHtcbiAgLy8gaW4gc29tZSBjb250ZXh0cyB3ZSBhcmUgbm90IGluIHRoZSBidWlsZCBkaXJlY3RvcnksXG4gIC8vIHNvIHdlIGRvbid0IHdhbnQgdG8gZ28gYmFjayB0aGUgZXh0cmEgbGV2ZWxcbiAgU1RBVElDX0RJUiA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdzdGF0aWMnKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ3VpbmVhUGlnVGVtcGxhdGUgKHJlcSwgcmVzLCBwYWdlKSB7XG4gIGxldCBkZWxheSA9IHJlcS5wYXJhbXMuZGVsYXkgPyBwYXJzZUludChyZXEucGFyYW1zLmRlbGF5LCAxMCkgOiAwO1xuICBsZXQgcGFyYW1zID0ge1xuICAgIHNlcnZlclRpbWU6IHBhcnNlSW50KERhdGUubm93KCkgLyAxMDAwLCAxMCksXG4gICAgdXNlckFnZW50OiByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddLFxuICAgIGNvbW1lbnQ6ICdOb25lJ1xuICB9O1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgcGFyYW1zLmNvbW1lbnQgPSByZXEuYm9keS5jb21tZW50cyB8fCBwYXJhbXMuY29tbWVudDtcbiAgfVxuICBsb2cuZGVidWcoYFNlbmRpbmcgZ3VpbmVhIHBpZyByZXNwb25zZSB3aXRoIHBhcmFtczogJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWApO1xuICBhd2FpdCBCLmRlbGF5KGRlbGF5KTtcbiAgcmVzLnNldCgnQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuICByZXMuY29va2llKCdndWluZWFjb29raWUxJywgJ2kgYW0gYSBjb29raWUgdmFsdWUnLCB7cGF0aDogJy8nfSk7XG4gIHJlcy5jb29raWUoJ2d1aW5lYWNvb2tpZTInLCAnY29va2nDqTInLCB7cGF0aDogJy8nfSk7XG4gIHJlcy5jb29raWUoJ2d1aW5lYWNvb2tpZTMnLCAnY2FudCBhY2Nlc3MgdGhpcycsIHtcbiAgICBkb21haW46ICcuYmxhcmdpbWFyZy5jb20nLFxuICAgIHBhdGg6ICcvJ1xuICB9KTtcbiAgcmVzLnNlbmQoKGF3YWl0IGdldFRlbXBsYXRlKHBhZ2UpKShwYXJhbXMpKTtcbn1cblxuLypcbiAqIER5bmFtaWMgcGFnZSBtYXBwZWQgdG8gL3Rlc3QvZ3VpbmVhLXBpZ1xuICovXG5hc3luYyBmdW5jdGlvbiBndWluZWFQaWcgKHJlcSwgcmVzKSB7XG4gIHJldHVybiBhd2FpdCBndWluZWFQaWdUZW1wbGF0ZShyZXEsIHJlcywgJ2d1aW5lYS1waWcuaHRtbCcpO1xufVxuXG4vKlxuICogRHluYW1pYyBwYWdlIG1hcHBlZCB0byAvdGVzdC9ndWluZWEtcGlnXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGd1aW5lYVBpZ1Njcm9sbGFibGUgKHJlcSwgcmVzKSB7XG4gIHJldHVybiBhd2FpdCBndWluZWFQaWdUZW1wbGF0ZShyZXEsIHJlcywgJ2d1aW5lYS1waWctc2Nyb2xsYWJsZS5odG1sJyk7XG59XG5cbi8qXG4gKiBEeW5hbWljIHBhZ2UgbWFwcGVkIHRvIC93ZWxjb21lXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHdlbGNvbWUgKHJlcSwgcmVzKSB7XG4gIGxldCBwYXJhbXMgPSB7bWVzc2FnZTogJ0xldFxcJ3MgYnJvd3NlISd9O1xuICBsb2cuZGVidWcoYFNlbmRpbmcgd2VsY29tZSByZXNwb25zZSB3aXRoIHBhcmFtczogJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWApO1xuICByZXMuc2VuZCgoYXdhaXQgZ2V0VGVtcGxhdGUoJ3dlbGNvbWUuaHRtbCcpKShwYXJhbXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VGVtcGxhdGUgKHRlbXBsYXRlTmFtZSkge1xuICBsZXQgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZShTVEFUSUNfRElSLCAndGVzdCcsIHRlbXBsYXRlTmFtZSkpO1xuICByZXR1cm4gXy50ZW1wbGF0ZShjb250ZW50LnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnQgeyBndWluZWFQaWcsIGd1aW5lYVBpZ1Njcm9sbGFibGUsIHdlbGNvbWUsIFNUQVRJQ19ESVIgfTtcbiJdfQ==