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
        delay = parseInt(req.params.delay || req.query.delay || 0);
        params = {
          serverTime: parseInt(Date.now() / 1000, 10),
          userAgent: req.headers['user-agent'],
          comment: 'None'
        };

        if (req.method === 'POST') {
          params.comment = req.body.comments || params.comment;
        }
        _logger2['default'].debug('Sending guinea pig response with params: ' + JSON.stringify(params));

        if (!delay) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].debug('Waiting ' + delay + 'ms before responding');
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(delay));

      case 8:
        res.set('Content-Type', 'text/html');
        res.cookie('guineacookie1', 'i am a cookie value', { path: '/' });
        res.cookie('guineacookie2', 'cookié2', { path: '/' });
        res.cookie('guineacookie3', 'cant access this', {
          domain: '.blargimarg.com',
          path: '/'
        });
        context$1$0.t0 = res;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(getTemplate(page));

      case 15:
        context$1$0.t1 = params;
        context$1$0.t2 = (0, context$1$0.sent)(context$1$0.t1);
        context$1$0.t0.send.call(context$1$0.t0, context$1$0.t2);

      case 18:
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
//# sourceMappingURL=data:application/json;base64,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QUFDLE1BQU0sQ0FBQyxDQUFHLENBQUM7eUJBQzdFLEdBQUc7O3lDQUFhLFdBQVcsQ0FBQyxjQUFjLENBQUM7Ozt5QkFBRSxNQUFNOzt1QkFBL0MsSUFBSTs7Ozs7OztDQUNUOztBQUVELFNBQWUsV0FBVyxDQUFFLFlBQVk7TUFDbEMsT0FBTzs7Ozs7eUNBQVMsa0JBQUcsUUFBUSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7QUFBM0UsZUFBTzs0Q0FDSixvQkFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7O0NBQ3RDOztRQUVRLFNBQVMsR0FBVCxTQUFTO1FBQUUsbUJBQW1CLEdBQW5CLG1CQUFtQjtRQUFFLE9BQU8sR0FBUCxPQUFPO1FBQUUsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoibGliL2V4cHJlc3Mvc3RhdGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5sZXQgU1RBVElDX0RJUiA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICdzdGF0aWMnKTtcbmlmIChfLmlzTnVsbChwYXRoLnJlc29sdmUoX19kaXJuYW1lKS5tYXRjaCgvYnVpbGRbXFwvXFxcXF1saWJbXFwvXFxcXF1leHByZXNzJC8pKSkge1xuICAvLyBpbiBzb21lIGNvbnRleHRzIHdlIGFyZSBub3QgaW4gdGhlIGJ1aWxkIGRpcmVjdG9yeSxcbiAgLy8gc28gd2UgZG9uJ3Qgd2FudCB0byBnbyBiYWNrIHRoZSBleHRyYSBsZXZlbFxuICBTVEFUSUNfRElSID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ3N0YXRpYycpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBndWluZWFQaWdUZW1wbGF0ZSAocmVxLCByZXMsIHBhZ2UpIHtcbiAgbGV0IGRlbGF5ID0gcGFyc2VJbnQocmVxLnBhcmFtcy5kZWxheSB8fCByZXEucXVlcnkuZGVsYXkgfHwgMCk7XG4gIGxldCBwYXJhbXMgPSB7XG4gICAgc2VydmVyVGltZTogcGFyc2VJbnQoRGF0ZS5ub3coKSAvIDEwMDAsIDEwKSxcbiAgICB1c2VyQWdlbnQ6IHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gICAgY29tbWVudDogJ05vbmUnXG4gIH07XG4gIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICBwYXJhbXMuY29tbWVudCA9IHJlcS5ib2R5LmNvbW1lbnRzIHx8IHBhcmFtcy5jb21tZW50O1xuICB9XG4gIGxvZy5kZWJ1ZyhgU2VuZGluZyBndWluZWEgcGlnIHJlc3BvbnNlIHdpdGggcGFyYW1zOiAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YCk7XG4gIGlmIChkZWxheSkge1xuICAgIGxvZy5kZWJ1ZyhgV2FpdGluZyAke2RlbGF5fW1zIGJlZm9yZSByZXNwb25kaW5nYCk7XG4gICAgYXdhaXQgQi5kZWxheShkZWxheSk7XG4gIH1cbiAgcmVzLnNldCgnQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuICByZXMuY29va2llKCdndWluZWFjb29raWUxJywgJ2kgYW0gYSBjb29raWUgdmFsdWUnLCB7cGF0aDogJy8nfSk7XG4gIHJlcy5jb29raWUoJ2d1aW5lYWNvb2tpZTInLCAnY29va2nDqTInLCB7cGF0aDogJy8nfSk7XG4gIHJlcy5jb29raWUoJ2d1aW5lYWNvb2tpZTMnLCAnY2FudCBhY2Nlc3MgdGhpcycsIHtcbiAgICBkb21haW46ICcuYmxhcmdpbWFyZy5jb20nLFxuICAgIHBhdGg6ICcvJ1xuICB9KTtcbiAgcmVzLnNlbmQoKGF3YWl0IGdldFRlbXBsYXRlKHBhZ2UpKShwYXJhbXMpKTtcbn1cblxuLypcbiAqIER5bmFtaWMgcGFnZSBtYXBwZWQgdG8gL3Rlc3QvZ3VpbmVhLXBpZ1xuICovXG5hc3luYyBmdW5jdGlvbiBndWluZWFQaWcgKHJlcSwgcmVzKSB7XG4gIHJldHVybiBhd2FpdCBndWluZWFQaWdUZW1wbGF0ZShyZXEsIHJlcywgJ2d1aW5lYS1waWcuaHRtbCcpO1xufVxuXG4vKlxuICogRHluYW1pYyBwYWdlIG1hcHBlZCB0byAvdGVzdC9ndWluZWEtcGlnXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGd1aW5lYVBpZ1Njcm9sbGFibGUgKHJlcSwgcmVzKSB7XG4gIHJldHVybiBhd2FpdCBndWluZWFQaWdUZW1wbGF0ZShyZXEsIHJlcywgJ2d1aW5lYS1waWctc2Nyb2xsYWJsZS5odG1sJyk7XG59XG5cbi8qXG4gKiBEeW5hbWljIHBhZ2UgbWFwcGVkIHRvIC93ZWxjb21lXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHdlbGNvbWUgKHJlcSwgcmVzKSB7XG4gIGxldCBwYXJhbXMgPSB7bWVzc2FnZTogJ0xldFxcJ3MgYnJvd3NlISd9O1xuICBsb2cuZGVidWcoYFNlbmRpbmcgd2VsY29tZSByZXNwb25zZSB3aXRoIHBhcmFtczogJHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWApO1xuICByZXMuc2VuZCgoYXdhaXQgZ2V0VGVtcGxhdGUoJ3dlbGNvbWUuaHRtbCcpKShwYXJhbXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VGVtcGxhdGUgKHRlbXBsYXRlTmFtZSkge1xuICBsZXQgY29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZShTVEFUSUNfRElSLCAndGVzdCcsIHRlbXBsYXRlTmFtZSkpO1xuICByZXR1cm4gXy50ZW1wbGF0ZShjb250ZW50LnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnQgeyBndWluZWFQaWcsIGd1aW5lYVBpZ1Njcm9sbGFibGUsIHdlbGNvbWUsIFNUQVRJQ19ESVIgfTtcbiJdfQ==