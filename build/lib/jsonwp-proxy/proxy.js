'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumLogger = require('appium-logger');

var _appiumSupport = require('appium-support');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _jsonwpStatusStatus = require('../jsonwp-status/status');

var log = (0, _appiumLogger.getLogger)('JSONWP Proxy');

var JWProxy = (function () {
  function JWProxy() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, JWProxy);

    _Object$assign(this, {
      scheme: 'http',
      server: 'localhost',
      port: 4444,
      base: '/wd/hub',
      sessionId: null
    }, opts);
    this.scheme = this.scheme.toLowerCase();
  }

  // abstract the call behind a member function
  // so that we can mock it in tests

  _createClass(JWProxy, [{
    key: 'request',
    value: function request() {
      var args$2$0 = arguments;
      return _regeneratorRuntime.async(function request$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].apply(undefined, args$2$0));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'endpointRequiresSessionId',
    value: function endpointRequiresSessionId(endpoint) {
      return !_lodash2['default'].includes(['/session', '/sessions', '/status'], endpoint);
    }
  }, {
    key: 'getUrlForProxy',
    value: function getUrlForProxy(url) {
      if (url === '') {
        url = '/';
      }
      var proxyBase = this.scheme + '://' + this.server + ':' + this.port + this.base;
      var endpointRe = '(/(session|status))';
      var remainingUrl = '';
      if (/^http/.test(url)) {
        var first = new RegExp('(https?://.+)' + endpointRe).exec(url);
        if (!first) {
          throw new Error('Got a complete url but could not extract JWP endpoint');
        }
        remainingUrl = url.replace(first[1], '');
      } else if (new RegExp('^/').test(url)) {
        remainingUrl = url;
      } else {
        throw new Error('Did not know what to do with url \'' + url + '\'');
      }

      var stripPrefixRe = new RegExp('^.+(/(session|status).*)$');
      if (stripPrefixRe.test(remainingUrl)) {
        remainingUrl = stripPrefixRe.exec(remainingUrl)[1];
      }

      if (!new RegExp(endpointRe).test(remainingUrl)) {
        remainingUrl = '/session/' + this.sessionId + remainingUrl;
      }

      var requiresSessionId = this.endpointRequiresSessionId(remainingUrl);

      if (requiresSessionId && this.sessionId === null) {
        throw new Error('Trying to proxy a session command without session id');
      }

      var sessionBaseRe = new RegExp('^/session/([^/]+)');
      if (sessionBaseRe.test(remainingUrl)) {
        // we have something like /session/:id/foobar, so we need to replace
        // the session id
        var match = sessionBaseRe.exec(remainingUrl);
        remainingUrl = remainingUrl.replace(match[1], this.sessionId);
      } else if (requiresSessionId) {
        throw new Error('Could not find :session section for url: ' + remainingUrl);
      }
      remainingUrl = remainingUrl.replace(/\/$/, ''); // can't have trailing slashes
      return proxyBase + remainingUrl;
    }
  }, {
    key: 'proxy',
    value: function proxy(url, method) {
      var body = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var newUrl, reqOpts, res, resBody;
      return _regeneratorRuntime.async(function proxy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            method = method.toUpperCase();
            newUrl = this.getUrlForProxy(url);
            reqOpts = {
              url: newUrl,
              method: method,
              headers: { 'Content-type': 'application/json;charset=UTF-8' },
              resolveWithFullResponse: true
            };

            if (body !== null) {
              if (typeof body !== 'object') {
                body = JSON.parse(body);
              }
              reqOpts.json = body;
            }

            // GET methods shouldn't have any body. Most servers are OK with this, but WebDriverAgent throws 400 errors
            if (method === 'GET') {
              reqOpts.json = null;
            }

            log.info('Proxying [' + method + ' ' + (url || "/") + '] to [' + method + ' ' + newUrl + '] ' + (body ? 'with body: ' + JSON.stringify(body) : 'with no body'));
            res = undefined, resBody = undefined;
            context$2$0.prev = 7;
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.request(reqOpts));

          case 10:
            res = context$2$0.sent;

            resBody = res.body;
            log.info('Got response with status ' + res.statusCode + ': ' + JSON.stringify(resBody));
            if (/\/session$/.test(url) && method === 'POST') {
              if (res.statusCode === 200) {
                this.sessionId = resBody.sessionId;
              } else if (res.statusCode === 303) {
                this.sessionId = /\/session\/([^\/]+)/.exec(resBody)[1];
              }
            }
            context$2$0.next = 19;
            break;

          case 16:
            context$2$0.prev = 16;
            context$2$0.t0 = context$2$0['catch'](7);
            throw new Error('Could not proxy command to remote server. ' + ('Original error: ' + context$2$0.t0.message));

          case 19:
            return context$2$0.abrupt('return', [res, resBody]);

          case 20:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[7, 16]]);
    }
  }, {
    key: 'command',
    value: function command(url, method) {
      var body = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var _ref, _ref2, response, resBody, statusCodesWithRes, message, e;

      return _regeneratorRuntime.async(function command$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.proxy(url, method, body));

          case 2:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            response = _ref2[0];
            resBody = _ref2[1];
            statusCodesWithRes = [100, 200, 500];

            resBody = _appiumSupport.util.safeJsonParse(resBody);

            if (!(_lodash2['default'].includes(statusCodesWithRes, response.statusCode) && (_lodash2['default'].isUndefined(resBody.status) || _lodash2['default'].isUndefined(resBody.value)))) {
              context$2$0.next = 10;
              break;
            }

            throw new Error('Did not get a valid response object. Object was: ' + JSON.stringify(resBody));

          case 10:
            if (!_lodash2['default'].includes(statusCodesWithRes, response.statusCode)) {
              context$2$0.next = 24;
              break;
            }

            if (!(response.statusCode === 200 && resBody.status === 0)) {
              context$2$0.next = 15;
              break;
            }

            return context$2$0.abrupt('return', resBody.value);

          case 15:
            if (!(response.statusCode === 200)) {
              context$2$0.next = 17;
              break;
            }

            return context$2$0.abrupt('return', resBody);

          case 17:
            message = (0, _jsonwpStatusStatus.getSummaryByCode)(resBody.status);

            if (resBody.value.message) {
              message += ' (Original error: ' + resBody.value.message + ')';
            }
            e = new Error(message);

            e.status = resBody.status;
            e.value = resBody.value;
            e.httpCode = response.statusCode;
            throw e;

          case 24:
            throw new Error('Didn\'t know what to do with response code \'' + response.statusCode + '\'');

          case 25:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getSessionIdFromUrl',
    value: function getSessionIdFromUrl(url) {
      var match = url.match(/\/session\/([^\/]+)/);
      return match ? match[1] : null;
    }
  }, {
    key: 'proxyReqRes',
    value: function proxyReqRes(req, res) {
      var _ref3, _ref32, response, body, reqSessionId;

      return _regeneratorRuntime.async(function proxyReqRes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.proxy(req.originalUrl, req.method, req.body));

          case 2:
            _ref3 = context$2$0.sent;
            _ref32 = _slicedToArray(_ref3, 2);
            response = _ref32[0];
            body = _ref32[1];

            res.headers = response.headers;
            res.set('Content-type', response.headers['content-type']);
            // if the proxied response contains a sessionId that the downstream
            // driver has generated, we don't want to return that to the client.
            // Instead, return the id from the request or from current session
            body = _appiumSupport.util.safeJsonParse(body);
            if (body && body.sessionId) {
              reqSessionId = this.getSessionIdFromUrl(req.originalUrl);

              if (reqSessionId) {
                log.info('Replacing sessionId ' + body.sessionId + ' with ' + reqSessionId);
                body.sessionId = reqSessionId;
              } else if (this.sessionId) {
                log.info('Replacing sessionId ' + body.sessionId + ' with ' + this.sessionId);
                body.sessionId = this.sessionId;
              }
            }
            res.status(response.statusCode).send(JSON.stringify(body));

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return JWProxy;
})();

exports['default'] = JWProxy;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9qc29ud3AtcHJveHkvcHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7NEJBQ0ksZUFBZTs7NkJBQ3BCLGdCQUFnQjs7OEJBQ2pCLGlCQUFpQjs7OztrQ0FDSix5QkFBeUI7O0FBRzFELElBQU0sR0FBRyxHQUFHLDZCQUFVLGNBQWMsQ0FBQyxDQUFDOztJQUVoQyxPQUFPO0FBQ0MsV0FEUixPQUFPLEdBQ2E7UUFBWCxJQUFJLHlEQUFHLEVBQUU7OzBCQURsQixPQUFPOztBQUVULG1CQUFjLElBQUksRUFBRTtBQUNsQixZQUFNLEVBQUUsTUFBTTtBQUNkLFlBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQUksRUFBRSxJQUFJO0FBQ1YsVUFBSSxFQUFFLFNBQVM7QUFDZixlQUFTLEVBQUUsSUFBSTtLQUNoQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0dBQ3pDOzs7OztlQVZHLE9BQU87O1dBY0c7Ozs7Ozs2Q0FDQyxzREFBZ0I7Ozs7Ozs7Ozs7S0FDOUI7OztXQUV5QixtQ0FBQyxRQUFRLEVBQUU7QUFDbkMsYUFBTyxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEU7OztXQUVjLHdCQUFDLEdBQUcsRUFBRTtBQUNuQixVQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7QUFDZCxXQUFHLEdBQUcsR0FBRyxDQUFDO09BQ1g7QUFDRCxVQUFNLFNBQVMsR0FBTSxJQUFJLENBQUMsTUFBTSxXQUFNLElBQUksQ0FBQyxNQUFNLFNBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxBQUFFLENBQUM7QUFDN0UsVUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUM7QUFDekMsVUFBSSxZQUFZLEdB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QUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUN6QixtQkFBRyxDQUFDLElBQUksMEJBQXdCLElBQUksQ0FBQyxTQUFTLGNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBRyxDQUFDO0FBQ3pFLG9CQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7ZUFDakM7YUFDRjtBQUNELGVBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDNUQ7OztTQWxLRyxPQUFPOzs7cUJBcUtFLE9BQU8iLCJmaWxlIjoibGliL2pzb253cC1wcm94eS9wcm94eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdhcHBpdW0tbG9nZ2VyJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgZ2V0U3VtbWFyeUJ5Q29kZSB9IGZyb20gJy4uL2pzb253cC1zdGF0dXMvc3RhdHVzJztcblxuXG5jb25zdCBsb2cgPSBnZXRMb2dnZXIoJ0pTT05XUCBQcm94eScpO1xuXG5jbGFzcyBKV1Byb3h5IHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgc2NoZW1lOiAnaHR0cCcsXG4gICAgICBzZXJ2ZXI6ICdsb2NhbGhvc3QnLFxuICAgICAgcG9ydDogNDQ0NCxcbiAgICAgIGJhc2U6ICcvd2QvaHViJyxcbiAgICAgIHNlc3Npb25JZDogbnVsbFxuICAgIH0sIG9wdHMpO1xuICAgIHRoaXMuc2NoZW1lID0gdGhpcy5zY2hlbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vIGFic3RyYWN0IHRoZSBjYWxsIGJlaGluZCBhIG1lbWJlciBmdW5jdGlvblxuICAvLyBzbyB0aGF0IHdlIGNhbiBtb2NrIGl0IGluIHRlc3RzXG4gIGFzeW5jIHJlcXVlc3QgKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdCguLi5hcmdzKTtcbiAgfVxuXG4gIGVuZHBvaW50UmVxdWlyZXNTZXNzaW9uSWQgKGVuZHBvaW50KSB7XG4gICAgcmV0dXJuICFfLmluY2x1ZGVzKFsnL3Nlc3Npb24nLCAnL3Nlc3Npb25zJywgJy9zdGF0dXMnXSwgZW5kcG9pbnQpO1xuICB9XG5cbiAgZ2V0VXJsRm9yUHJveHkgKHVybCkge1xuICAgIGlmICh1cmwgPT09ICcnKSB7XG4gICAgICB1cmwgPSAnLyc7XG4gICAgfVxuICAgIGNvbnN0IHByb3h5QmFzZSA9IGAke3RoaXMuc2NoZW1lfTovLyR7dGhpcy5zZXJ2ZXJ9OiR7dGhpcy5wb3J0fSR7dGhpcy5iYXNlfWA7XG4gICAgY29uc3QgZW5kcG9pbnRSZSA9ICcoLyhzZXNzaW9ufHN0YXR1cykpJztcbiAgICBsZXQgcmVtYWluaW5nVXJsID0gJyc7XG4gICAgaWYgKC9eaHR0cC8udGVzdCh1cmwpKSB7XG4gICAgICBjb25zdCBmaXJzdCA9IChuZXcgUmVnRXhwKGAoaHR0cHM/Oi8vLispJHtlbmRwb2ludFJlfWApKS5leGVjKHVybCk7XG4gICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignR290IGEgY29tcGxldGUgdXJsIGJ1dCBjb3VsZCBub3QgZXh0cmFjdCBKV1AgZW5kcG9pbnQnKTtcbiAgICAgIH1cbiAgICAgIHJlbWFpbmluZ1VybCA9IHVybC5yZXBsYWNlKGZpcnN0WzFdLCAnJyk7XG4gICAgfSBlbHNlIGlmICgobmV3IFJlZ0V4cCgnXi8nKSkudGVzdCh1cmwpKSB7XG4gICAgICByZW1haW5pbmdVcmwgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGlkIG5vdCBrbm93IHdoYXQgdG8gZG8gd2l0aCB1cmwgJyR7dXJsfSdgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJpcFByZWZpeFJlID0gbmV3IFJlZ0V4cCgnXi4rKC8oc2Vzc2lvbnxzdGF0dXMpLiopJCcpO1xuICAgIGlmIChzdHJpcFByZWZpeFJlLnRlc3QocmVtYWluaW5nVXJsKSkge1xuICAgICAgcmVtYWluaW5nVXJsID0gc3RyaXBQcmVmaXhSZS5leGVjKHJlbWFpbmluZ1VybClbMV07XG4gICAgfVxuXG4gICAgaWYgKCEobmV3IFJlZ0V4cChlbmRwb2ludFJlKSkudGVzdChyZW1haW5pbmdVcmwpKSB7XG4gICAgICByZW1haW5pbmdVcmwgPSBgL3Nlc3Npb24vJHt0aGlzLnNlc3Npb25JZH0ke3JlbWFpbmluZ1VybH1gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVpcmVzU2Vzc2lvbklkID0gdGhpcy5lbmRwb2ludFJlcXVpcmVzU2Vzc2lvbklkKHJlbWFpbmluZ1VybCk7XG5cbiAgICBpZiAocmVxdWlyZXNTZXNzaW9uSWQgJiYgdGhpcy5zZXNzaW9uSWQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHByb3h5IGEgc2Vzc2lvbiBjb21tYW5kIHdpdGhvdXQgc2Vzc2lvbiBpZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb25CYXNlUmUgPSBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vKFteL10rKScpO1xuICAgIGlmIChzZXNzaW9uQmFzZVJlLnRlc3QocmVtYWluaW5nVXJsKSkge1xuICAgICAgLy8gd2UgaGF2ZSBzb21ldGhpbmcgbGlrZSAvc2Vzc2lvbi86aWQvZm9vYmFyLCBzbyB3ZSBuZWVkIHRvIHJlcGxhY2VcbiAgICAgIC8vIHRoZSBzZXNzaW9uIGlkXG4gICAgICBjb25zdCBtYXRjaCA9IHNlc3Npb25CYXNlUmUuZXhlYyhyZW1haW5pbmdVcmwpO1xuICAgICAgcmVtYWluaW5nVXJsID0gcmVtYWluaW5nVXJsLnJlcGxhY2UobWF0Y2hbMV0sIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9IGVsc2UgaWYgKHJlcXVpcmVzU2Vzc2lvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIDpzZXNzaW9uIHNlY3Rpb24gZm9yIHVybDogJHtyZW1haW5pbmdVcmx9YCk7XG4gICAgfVxuICAgIHJlbWFpbmluZ1VybCA9IHJlbWFpbmluZ1VybC5yZXBsYWNlKC9cXC8kLywgJycpOyAvLyBjYW4ndCBoYXZlIHRyYWlsaW5nIHNsYXNoZXNcbiAgICByZXR1cm4gcHJveHlCYXNlICsgcmVtYWluaW5nVXJsO1xuICB9XG5cbiAgYXN5bmMgcHJveHkgKHVybCwgbWV0aG9kLCBib2R5ID0gbnVsbCkge1xuICAgIG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMuZ2V0VXJsRm9yUHJveHkodXJsKTtcbiAgICBjb25zdCByZXFPcHRzID0ge1xuICAgICAgdXJsOiBuZXdVcmwsXG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnfSxcbiAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlXG4gICAgfTtcbiAgICBpZiAoYm9keSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgIH1cbiAgICAgIHJlcU9wdHMuanNvbiA9IGJvZHk7XG4gICAgfVxuXG4gICAgLy8gR0VUIG1ldGhvZHMgc2hvdWxkbid0IGhhdmUgYW55IGJvZHkuIE1vc3Qgc2VydmVycyBhcmUgT0sgd2l0aCB0aGlzLCBidXQgV2ViRHJpdmVyQWdlbnQgdGhyb3dzIDQwMCBlcnJvcnNcbiAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgcmVxT3B0cy5qc29uID0gbnVsbDtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhgUHJveHlpbmcgWyR7bWV0aG9kfSAke3VybCB8fCBcIi9cIn1dIHRvIFske21ldGhvZH0gJHtuZXdVcmx9XSBgICtcbiAgICAgICAgICAgICAoYm9keSA/IGB3aXRoIGJvZHk6ICR7SlNPTi5zdHJpbmdpZnkoYm9keSl9YCA6ICd3aXRoIG5vIGJvZHknKSk7XG4gICAgbGV0IHJlcywgcmVzQm9keTtcbiAgICB0cnkge1xuICAgICAgcmVzID0gYXdhaXQgdGhpcy5yZXF1ZXN0KHJlcU9wdHMpO1xuICAgICAgcmVzQm9keSA9IHJlcy5ib2R5O1xuICAgICAgbG9nLmluZm8oYEdvdCByZXNwb25zZSB3aXRoIHN0YXR1cyAke3Jlcy5zdGF0dXNDb2RlfTogJHtKU09OLnN0cmluZ2lmeShyZXNCb2R5KX1gKTtcbiAgICAgIGlmICgvXFwvc2Vzc2lvbiQvLnRlc3QodXJsKSAmJiBtZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbklkID0gcmVzQm9keS5zZXNzaW9uSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMykge1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbklkID0gL1xcL3Nlc3Npb25cXC8oW15cXC9dKykvLmV4ZWMocmVzQm9keSlbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBwcm94eSBjb21tYW5kIHRvIHJlbW90ZSBzZXJ2ZXIuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHJldHVybiBbcmVzLCByZXNCb2R5XTtcbiAgfVxuXG4gIGFzeW5jIGNvbW1hbmQgKHVybCwgbWV0aG9kLCBib2R5ID0gbnVsbCkge1xuICAgIGxldCBbcmVzcG9uc2UsIHJlc0JvZHldID0gYXdhaXQgdGhpcy5wcm94eSh1cmwsIG1ldGhvZCwgYm9keSk7XG4gICAgbGV0IHN0YXR1c0NvZGVzV2l0aFJlcyA9IFsxMDAsIDIwMCwgNTAwXTtcbiAgICByZXNCb2R5ID0gdXRpbC5zYWZlSnNvblBhcnNlKHJlc0JvZHkpO1xuICAgIGlmIChfLmluY2x1ZGVzKHN0YXR1c0NvZGVzV2l0aFJlcywgcmVzcG9uc2Uuc3RhdHVzQ29kZSkgJiZcbiAgICAgICAgKF8uaXNVbmRlZmluZWQocmVzQm9keS5zdGF0dXMpIHx8IF8uaXNVbmRlZmluZWQocmVzQm9keS52YWx1ZSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERpZCBub3QgZ2V0IGEgdmFsaWQgcmVzcG9uc2Ugb2JqZWN0LiBPYmplY3Qgd2FzOiAke0pTT04uc3RyaW5naWZ5KHJlc0JvZHkpfWApO1xuICAgIH1cbiAgICBpZiAoXy5pbmNsdWRlcyhzdGF0dXNDb2Rlc1dpdGhSZXMsIHJlc3BvbnNlLnN0YXR1c0NvZGUpKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwICYmIHJlc0JvZHkuc3RhdHVzID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXNCb2R5LnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgcmV0dXJuIHJlc0JvZHk7XG4gICAgICB9XG4gICAgICBsZXQgbWVzc2FnZSA9IGdldFN1bW1hcnlCeUNvZGUocmVzQm9keS5zdGF0dXMpO1xuICAgICAgaWYgKHJlc0JvZHkudmFsdWUubWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlICs9IGAgKE9yaWdpbmFsIGVycm9yOiAke3Jlc0JvZHkudmFsdWUubWVzc2FnZX0pYDtcbiAgICAgIH1cbiAgICAgIGxldCBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgZS5zdGF0dXMgPSByZXNCb2R5LnN0YXR1cztcbiAgICAgIGUudmFsdWUgPSByZXNCb2R5LnZhbHVlO1xuICAgICAgZS5odHRwQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGU7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYERpZG4ndCBrbm93IHdoYXQgdG8gZG8gd2l0aCByZXNwb25zZSBjb2RlICcke3Jlc3BvbnNlLnN0YXR1c0NvZGV9J2ApO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbklkRnJvbVVybCAodXJsKSB7XG4gICAgY29uc3QgbWF0Y2ggPSB1cmwubWF0Y2goL1xcL3Nlc3Npb25cXC8oW15cXC9dKykvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IG51bGw7XG4gIH1cblxuICBhc3luYyBwcm94eVJlcVJlcyAocmVxLCByZXMpIHtcbiAgICBsZXQgW3Jlc3BvbnNlLCBib2R5XSA9IGF3YWl0IHRoaXMucHJveHkocmVxLm9yaWdpbmFsVXJsLCByZXEubWV0aG9kLCByZXEuYm9keSk7XG4gICAgcmVzLmhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzO1xuICAgIHJlcy5zZXQoJ0NvbnRlbnQtdHlwZScsIHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddKTtcbiAgICAvLyBpZiB0aGUgcHJveGllZCByZXNwb25zZSBjb250YWlucyBhIHNlc3Npb25JZCB0aGF0IHRoZSBkb3duc3RyZWFtXG4gICAgLy8gZHJpdmVyIGhhcyBnZW5lcmF0ZWQsIHdlIGRvbid0IHdhbnQgdG8gcmV0dXJuIHRoYXQgdG8gdGhlIGNsaWVudC5cbiAgICAvLyBJbnN0ZWFkLCByZXR1cm4gdGhlIGlkIGZyb20gdGhlIHJlcXVlc3Qgb3IgZnJvbSBjdXJyZW50IHNlc3Npb25cbiAgICBib2R5ID0gdXRpbC5zYWZlSnNvblBhcnNlKGJvZHkpO1xuICAgIGlmIChib2R5ICYmIGJvZHkuc2Vzc2lvbklkKSB7XG4gICAgICBjb25zdCByZXFTZXNzaW9uSWQgPSB0aGlzLmdldFNlc3Npb25JZEZyb21VcmwocmVxLm9yaWdpbmFsVXJsKTtcbiAgICAgIGlmIChyZXFTZXNzaW9uSWQpIHtcbiAgICAgICAgbG9nLmluZm8oYFJlcGxhY2luZyBzZXNzaW9uSWQgJHtib2R5LnNlc3Npb25JZH0gd2l0aCAke3JlcVNlc3Npb25JZH1gKTtcbiAgICAgICAgYm9keS5zZXNzaW9uSWQgPSByZXFTZXNzaW9uSWQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbklkKSB7XG4gICAgICAgIGxvZy5pbmZvKGBSZXBsYWNpbmcgc2Vzc2lvbklkICR7Ym9keS5zZXNzaW9uSWR9IHdpdGggJHt0aGlzLnNlc3Npb25JZH1gKTtcbiAgICAgICAgYm9keS5zZXNzaW9uSWQgPSB0aGlzLnNlc3Npb25JZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzLnN0YXR1cyhyZXNwb25zZS5zdGF0dXNDb2RlKS5zZW5kKEpTT04uc3RyaW5naWZ5KGJvZHkpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBKV1Byb3h5O1xuIl19