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

var _mjsonwpErrors = require('../mjsonwp/errors');

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
              headers: {
                'Content-type': 'application/json',
                'user-agent': 'appium',
                accept: '*/*'
              },
              resolveWithFullResponse: true,
              timeout: 240000,
              forever: true
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
            throw new _mjsonwpErrors.errors.ProxyRequestError('Could not proxy command to remote server. ' + ('Original error: ' + context$2$0.t0.message), context$2$0.t0.error);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9qc29ud3AtcHJveHkvcHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7NEJBQ0ksZUFBZTs7NkJBQ3BCLGdCQUFnQjs7OEJBQ2pCLGlCQUFpQjs7OztrQ0FDSix5QkFBeUI7OzZCQUNuQyxtQkFBbUI7O0FBRzFDLElBQU0sR0FBRyxHQUFHLDZCQUFVLGNBQWMsQ0FBQyxDQUFDOztJQUVoQyxPQUFPO0FBQ0MsV0FEUixPQUFPLEdBQ2E7UUFBWCxJQUFJLHlEQUFHLEVBQUU7OzBCQURsQixPQUFPOztBQUVULG1CQUFjLElBQUksRUFBRTtBQUNsQixZQUFNLEVBQUUsTUFBTTtBQUNkLFlBQU0sRUFBRSxXQUFXO0FBQ25CLFVBQUksRUFBRSxJQUFJO0FBQ1YsVUFBSSxFQUFFLFNBQVM7QUFDZixlQUFTLEVBQUUsSUFBSTtLQUNoQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1QsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0dBQ3pDOzs7OztlQVZHLE9BQU87O1dBY0c7Ozs7Ozs2Q0FDQyxzREFBZ0I7Ozs7Ozs7Ozs7S0FDOUI7OztXQUV5QixtQ0FBQyxRQUFRLEVBQUU7QUFDbkMsYUFBTyxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEU7OztXQUVjLHdCQUFDLEdBQUcsRUFBRTtBQUNuQixVQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7QUFDZCxXQUFHLEdBQUcsR0FBRyxDQUFDO09BQ1g7QUFDRCxVQUFNLFNBQVMsR0FBTSxJQUFJLENBQUMsTUFBTSxXQUFNLElBQUksQ0FBQyxNQUFNLFNBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxBQUFFLENBQUM7QUFDN0UsVUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUM7QUFD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QUFZLEVBQUU7QUFDaEIsbUJBQUcsQ0FBQyxJQUFJLDBCQUF3QixJQUFJLENBQUMsU0FBUyxjQUFTLFlBQVksQ0FBRyxDQUFDO0FBQ3ZFLG9CQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztlQUMvQixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUN6QixtQkFBRyxDQUFDLElBQUksMEJBQXdCLElBQUksQ0FBQyxTQUFTLGNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBRyxDQUFDO0FBQ3pFLG9CQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7ZUFDakM7YUFDRjtBQUNELGVBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDNUQ7OztTQXhLRyxPQUFPOzs7cUJBMktFLE9BQU8iLCJmaWxlIjoibGliL2pzb253cC1wcm94eS9wcm94eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdhcHBpdW0tbG9nZ2VyJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgZ2V0U3VtbWFyeUJ5Q29kZSB9IGZyb20gJy4uL2pzb253cC1zdGF0dXMvc3RhdHVzJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJy4uL21qc29ud3AvZXJyb3JzJztcblxuXG5jb25zdCBsb2cgPSBnZXRMb2dnZXIoJ0pTT05XUCBQcm94eScpO1xuXG5jbGFzcyBKV1Byb3h5IHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgc2NoZW1lOiAnaHR0cCcsXG4gICAgICBzZXJ2ZXI6ICdsb2NhbGhvc3QnLFxuICAgICAgcG9ydDogNDQ0NCxcbiAgICAgIGJhc2U6ICcvd2QvaHViJyxcbiAgICAgIHNlc3Npb25JZDogbnVsbFxuICAgIH0sIG9wdHMpO1xuICAgIHRoaXMuc2NoZW1lID0gdGhpcy5zY2hlbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vIGFic3RyYWN0IHRoZSBjYWxsIGJlaGluZCBhIG1lbWJlciBmdW5jdGlvblxuICAvLyBzbyB0aGF0IHdlIGNhbiBtb2NrIGl0IGluIHRlc3RzXG4gIGFzeW5jIHJlcXVlc3QgKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdCguLi5hcmdzKTtcbiAgfVxuXG4gIGVuZHBvaW50UmVxdWlyZXNTZXNzaW9uSWQgKGVuZHBvaW50KSB7XG4gICAgcmV0dXJuICFfLmluY2x1ZGVzKFsnL3Nlc3Npb24nLCAnL3Nlc3Npb25zJywgJy9zdGF0dXMnXSwgZW5kcG9pbnQpO1xuICB9XG5cbiAgZ2V0VXJsRm9yUHJveHkgKHVybCkge1xuICAgIGlmICh1cmwgPT09ICcnKSB7XG4gICAgICB1cmwgPSAnLyc7XG4gICAgfVxuICAgIGNvbnN0IHByb3h5QmFzZSA9IGAke3RoaXMuc2NoZW1lfTovLyR7dGhpcy5zZXJ2ZXJ9OiR7dGhpcy5wb3J0fSR7dGhpcy5iYXNlfWA7XG4gICAgY29uc3QgZW5kcG9pbnRSZSA9ICcoLyhzZXNzaW9ufHN0YXR1cykpJztcbiAgICBsZXQgcmVtYWluaW5nVXJsID0gJyc7XG4gICAgaWYgKC9eaHR0cC8udGVzdCh1cmwpKSB7XG4gICAgICBjb25zdCBmaXJzdCA9IChuZXcgUmVnRXhwKGAoaHR0cHM/Oi8vLispJHtlbmRwb2ludFJlfWApKS5leGVjKHVybCk7XG4gICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignR290IGEgY29tcGxldGUgdXJsIGJ1dCBjb3VsZCBub3QgZXh0cmFjdCBKV1AgZW5kcG9pbnQnKTtcbiAgICAgIH1cbiAgICAgIHJlbWFpbmluZ1VybCA9IHVybC5yZXBsYWNlKGZpcnN0WzFdLCAnJyk7XG4gICAgfSBlbHNlIGlmICgobmV3IFJlZ0V4cCgnXi8nKSkudGVzdCh1cmwpKSB7XG4gICAgICByZW1haW5pbmdVcmwgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGlkIG5vdCBrbm93IHdoYXQgdG8gZG8gd2l0aCB1cmwgJyR7dXJsfSdgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJpcFByZWZpeFJlID0gbmV3IFJlZ0V4cCgnXi4rKC8oc2Vzc2lvbnxzdGF0dXMpLiopJCcpO1xuICAgIGlmIChzdHJpcFByZWZpeFJlLnRlc3QocmVtYWluaW5nVXJsKSkge1xuICAgICAgcmVtYWluaW5nVXJsID0gc3RyaXBQcmVmaXhSZS5leGVjKHJlbWFpbmluZ1VybClbMV07XG4gICAgfVxuXG4gICAgaWYgKCEobmV3IFJlZ0V4cChlbmRwb2ludFJlKSkudGVzdChyZW1haW5pbmdVcmwpKSB7XG4gICAgICByZW1haW5pbmdVcmwgPSBgL3Nlc3Npb24vJHt0aGlzLnNlc3Npb25JZH0ke3JlbWFpbmluZ1VybH1gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVpcmVzU2Vzc2lvbklkID0gdGhpcy5lbmRwb2ludFJlcXVpcmVzU2Vzc2lvbklkKHJlbWFpbmluZ1VybCk7XG5cbiAgICBpZiAocmVxdWlyZXNTZXNzaW9uSWQgJiYgdGhpcy5zZXNzaW9uSWQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHByb3h5IGEgc2Vzc2lvbiBjb21tYW5kIHdpdGhvdXQgc2Vzc2lvbiBpZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlc3Npb25CYXNlUmUgPSBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vKFteL10rKScpO1xuICAgIGlmIChzZXNzaW9uQmFzZVJlLnRlc3QocmVtYWluaW5nVXJsKSkge1xuICAgICAgLy8gd2UgaGF2ZSBzb21ldGhpbmcgbGlrZSAvc2Vzc2lvbi86aWQvZm9vYmFyLCBzbyB3ZSBuZWVkIHRvIHJlcGxhY2VcbiAgICAgIC8vIHRoZSBzZXNzaW9uIGlkXG4gICAgICBjb25zdCBtYXRjaCA9IHNlc3Npb25CYXNlUmUuZXhlYyhyZW1haW5pbmdVcmwpO1xuICAgICAgcmVtYWluaW5nVXJsID0gcmVtYWluaW5nVXJsLnJlcGxhY2UobWF0Y2hbMV0sIHRoaXMuc2Vzc2lvbklkKTtcbiAgICB9IGVsc2UgaWYgKHJlcXVpcmVzU2Vzc2lvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIDpzZXNzaW9uIHNlY3Rpb24gZm9yIHVybDogJHtyZW1haW5pbmdVcmx9YCk7XG4gICAgfVxuICAgIHJlbWFpbmluZ1VybCA9IHJlbWFpbmluZ1VybC5yZXBsYWNlKC9cXC8kLywgJycpOyAvLyBjYW4ndCBoYXZlIHRyYWlsaW5nIHNsYXNoZXNcbiAgICByZXR1cm4gcHJveHlCYXNlICsgcmVtYWluaW5nVXJsO1xuICB9XG5cbiAgYXN5bmMgcHJveHkgKHVybCwgbWV0aG9kLCBib2R5ID0gbnVsbCkge1xuICAgIG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5ld1VybCA9IHRoaXMuZ2V0VXJsRm9yUHJveHkodXJsKTtcbiAgICBjb25zdCByZXFPcHRzID0ge1xuICAgICAgdXJsOiBuZXdVcmwsXG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICd1c2VyLWFnZW50JzogJ2FwcGl1bScsXG4gICAgICAgIGFjY2VwdDogJyovKicsXG4gICAgICB9LFxuICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICB0aW1lb3V0OiAyNDAwMDAsXG4gICAgICBmb3JldmVyOiB0cnVlLFxuICAgIH07XG4gICAgaWYgKGJvZHkgIT09IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgYm9keSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICB9XG4gICAgICByZXFPcHRzLmpzb24gPSBib2R5O1xuICAgIH1cblxuICAgIC8vIEdFVCBtZXRob2RzIHNob3VsZG4ndCBoYXZlIGFueSBib2R5LiBNb3N0IHNlcnZlcnMgYXJlIE9LIHdpdGggdGhpcywgYnV0IFdlYkRyaXZlckFnZW50IHRocm93cyA0MDAgZXJyb3JzXG4gICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgIHJlcU9wdHMuanNvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYFByb3h5aW5nIFske21ldGhvZH0gJHt1cmwgfHwgXCIvXCJ9XSB0byBbJHttZXRob2R9ICR7bmV3VXJsfV0gYCArXG4gICAgICAgICAgICAgKGJvZHkgPyBgd2l0aCBib2R5OiAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWAgOiAnd2l0aCBubyBib2R5JykpO1xuICAgIGxldCByZXMsIHJlc0JvZHk7XG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IGF3YWl0IHRoaXMucmVxdWVzdChyZXFPcHRzKTtcbiAgICAgIHJlc0JvZHkgPSByZXMuYm9keTtcbiAgICAgIGxvZy5pbmZvKGBHb3QgcmVzcG9uc2Ugd2l0aCBzdGF0dXMgJHtyZXMuc3RhdHVzQ29kZX06ICR7SlNPTi5zdHJpbmdpZnkocmVzQm9keSl9YCk7XG4gICAgICBpZiAoL1xcL3Nlc3Npb24kLy50ZXN0KHVybCkgJiYgbWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25JZCA9IHJlc0JvZHkuc2Vzc2lvbklkO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDMpIHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25JZCA9IC9cXC9zZXNzaW9uXFwvKFteXFwvXSspLy5leGVjKHJlc0JvZHkpWzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Qcm94eVJlcXVlc3RFcnJvcihgQ291bGQgbm90IHByb3h5IGNvbW1hbmQgdG8gcmVtb3RlIHNlcnZlci4gYCAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gLCBlLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIFtyZXMsIHJlc0JvZHldO1xuICB9XG5cbiAgYXN5bmMgY29tbWFuZCAodXJsLCBtZXRob2QsIGJvZHkgPSBudWxsKSB7XG4gICAgbGV0IFtyZXNwb25zZSwgcmVzQm9keV0gPSBhd2FpdCB0aGlzLnByb3h5KHVybCwgbWV0aG9kLCBib2R5KTtcbiAgICBsZXQgc3RhdHVzQ29kZXNXaXRoUmVzID0gWzEwMCwgMjAwLCA1MDBdO1xuICAgIHJlc0JvZHkgPSB1dGlsLnNhZmVKc29uUGFyc2UocmVzQm9keSk7XG4gICAgaWYgKF8uaW5jbHVkZXMoc3RhdHVzQ29kZXNXaXRoUmVzLCByZXNwb25zZS5zdGF0dXNDb2RlKSAmJlxuICAgICAgICAoXy5pc1VuZGVmaW5lZChyZXNCb2R5LnN0YXR1cykgfHwgXy5pc1VuZGVmaW5lZChyZXNCb2R5LnZhbHVlKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGlkIG5vdCBnZXQgYSB2YWxpZCByZXNwb25zZSBvYmplY3QuIE9iamVjdCB3YXM6ICR7SlNPTi5zdHJpbmdpZnkocmVzQm9keSl9YCk7XG4gICAgfVxuICAgIGlmIChfLmluY2x1ZGVzKHN0YXR1c0NvZGVzV2l0aFJlcywgcmVzcG9uc2Uuc3RhdHVzQ29kZSkpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSAyMDAgJiYgcmVzQm9keS5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJlc0JvZHkudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gcmVzQm9keTtcbiAgICAgIH1cbiAgICAgIGxldCBtZXNzYWdlID0gZ2V0U3VtbWFyeUJ5Q29kZShyZXNCb2R5LnN0YXR1cyk7XG4gICAgICBpZiAocmVzQm9keS52YWx1ZS5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCAoT3JpZ2luYWwgZXJyb3I6ICR7cmVzQm9keS52YWx1ZS5tZXNzYWdlfSlgO1xuICAgICAgfVxuICAgICAgbGV0IGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICBlLnN0YXR1cyA9IHJlc0JvZHkuc3RhdHVzO1xuICAgICAgZS52YWx1ZSA9IHJlc0JvZHkudmFsdWU7XG4gICAgICBlLmh0dHBDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgRGlkbid0IGtub3cgd2hhdCB0byBkbyB3aXRoIHJlc3BvbnNlIGNvZGUgJyR7cmVzcG9uc2Uuc3RhdHVzQ29kZX0nYCk7XG4gIH1cblxuICBnZXRTZXNzaW9uSWRGcm9tVXJsICh1cmwpIHtcbiAgICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaCgvXFwvc2Vzc2lvblxcLyhbXlxcL10rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbiAgfVxuXG4gIGFzeW5jIHByb3h5UmVxUmVzIChyZXEsIHJlcykge1xuICAgIGxldCBbcmVzcG9uc2UsIGJvZHldID0gYXdhaXQgdGhpcy5wcm94eShyZXEub3JpZ2luYWxVcmwsIHJlcS5tZXRob2QsIHJlcS5ib2R5KTtcbiAgICByZXMuaGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gICAgcmVzLnNldCgnQ29udGVudC10eXBlJywgcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10pO1xuICAgIC8vIGlmIHRoZSBwcm94aWVkIHJlc3BvbnNlIGNvbnRhaW5zIGEgc2Vzc2lvbklkIHRoYXQgdGhlIGRvd25zdHJlYW1cbiAgICAvLyBkcml2ZXIgaGFzIGdlbmVyYXRlZCwgd2UgZG9uJ3Qgd2FudCB0byByZXR1cm4gdGhhdCB0byB0aGUgY2xpZW50LlxuICAgIC8vIEluc3RlYWQsIHJldHVybiB0aGUgaWQgZnJvbSB0aGUgcmVxdWVzdCBvciBmcm9tIGN1cnJlbnQgc2Vzc2lvblxuICAgIGJvZHkgPSB1dGlsLnNhZmVKc29uUGFyc2UoYm9keSk7XG4gICAgaWYgKGJvZHkgJiYgYm9keS5zZXNzaW9uSWQpIHtcbiAgICAgIGNvbnN0IHJlcVNlc3Npb25JZCA9IHRoaXMuZ2V0U2Vzc2lvbklkRnJvbVVybChyZXEub3JpZ2luYWxVcmwpO1xuICAgICAgaWYgKHJlcVNlc3Npb25JZCkge1xuICAgICAgICBsb2cuaW5mbyhgUmVwbGFjaW5nIHNlc3Npb25JZCAke2JvZHkuc2Vzc2lvbklkfSB3aXRoICR7cmVxU2Vzc2lvbklkfWApO1xuICAgICAgICBib2R5LnNlc3Npb25JZCA9IHJlcVNlc3Npb25JZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXNzaW9uSWQpIHtcbiAgICAgICAgbG9nLmluZm8oYFJlcGxhY2luZyBzZXNzaW9uSWQgJHtib2R5LnNlc3Npb25JZH0gd2l0aCAke3RoaXMuc2Vzc2lvbklkfWApO1xuICAgICAgICBib2R5LnNlc3Npb25JZCA9IHRoaXMuc2Vzc2lvbklkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1c0NvZGUpLnNlbmQoSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpXUHJveHk7XG4iXX0=