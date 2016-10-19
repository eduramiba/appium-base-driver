require('source-map-support').install();

/* global describe:true, it:true */

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _ = require('../..');

var _mockRequest = require('./mock-request');

var _mockRequest2 = _interopRequireDefault(_mockRequest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function buildReqRes(url, method, body) {
  var req = { originalUrl: url, method: method, body: body };
  var res = {};
  res.headers = {};
  res.set = function (k, v) {
    res[k] = v;
  };
  res.status = function (code) {
    res.sentCode = code;
    return res;
  };
  res.send = function (body) {
    try {
      body = JSON.parse(body);
    } catch (e) {}
    res.sentBody = body;
  };
  return [req, res];
}

function mockProxy() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var proxy = new _.JWProxy(opts);
  proxy.request = function callee$1$0() {
    var args$2$0 = arguments;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_mockRequest2['default'].apply(undefined, args$2$0));

        case 2:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
  return proxy;
}

describe('proxy', function () {
  it('should override default params', function () {
    var j = mockProxy({ server: '127.0.0.2' });
    j.server.should.equal('127.0.0.2');
    j.port.should.equal(4444);
  });
  it('should save session id on session creation', function callee$1$0() {
    var j, _ref, _ref2, res, body;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          j = mockProxy();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(j.proxy('/session', 'POST', { desiredCapabilities: {} }));

        case 3:
          _ref = context$2$0.sent;
          _ref2 = _slicedToArray(_ref, 2);
          res = _ref2[0];
          body = _ref2[1];

          res.statusCode.should.equal(200);
          body.should.eql({ status: 0, sessionId: '123', value: { browserName: 'boo' } });
          j.sessionId.should.equal('123');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should save session id on session creation with 303', function callee$1$0() {
    var j, _ref3, _ref32, res, body;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          j = mockProxy();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(j.proxy('/session', 'POST', { desiredCapabilities: { redirect: true } }));

        case 3:
          _ref3 = context$2$0.sent;
          _ref32 = _slicedToArray(_ref3, 2);
          res = _ref32[0];
          body = _ref32[1];

          res.statusCode.should.equal(303);
          body.should.eql('http://localhost:4444/wd/hub/session/123');
          j.sessionId.should.equal('123');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('getUrlForProxy', function () {
    it('should modify session id, host, and port', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('http://host.com:1234/wd/hub/session/456/element/200/value').should.eql('http://localhost:4444/wd/hub/session/123/element/200/value');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should prepend scheme, host and port if not provided', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('/wd/hub/session/456/element/200/value').should.eql('http://localhost:4444/wd/hub/session/123/element/200/value');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should work with urls which do not have sessiopn ids', function callee$2$0() {
      var j, newUrl;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('http://host.com:1234/wd/hub/session').should.eql('http://localhost:4444/wd/hub/session');

            newUrl = j.getUrlForProxy('/wd/hub/session');

            newUrl.should.eql('http://localhost:4444/wd/hub/session');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if url requires a sessionId but its null', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            e = undefined;

            try {
              j.getUrlForProxy('/wd/hub/session/456/element/200/value');
            } catch (err) {
              e = err;
            }
            should.exist(e);
            e.message.should.contain('without session id');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throw an error if url does not require a session id and its null', function callee$2$0() {
      var j, newUrl;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            newUrl = j.getUrlForProxy('/wd/hub/status');

            should.exist(newUrl);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('straight proxy', function () {
    it('should successfully proxy straight', function callee$2$0() {
      var j, _ref4, _ref42, res, body;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.proxy('/status', 'GET'));

          case 3:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 2);
            res = _ref42[0];
            body = _ref42[1];

            res.statusCode.should.equal(200);
            body.should.eql({ status: 0, value: { foo: 'bar' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should pass along request errors', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.proxy('/badurl', 'GET').should.eventually.be.rejectedWith("Could not proxy");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should proxy error responses and codes', function callee$2$0() {
      var j, _ref5, _ref52, res, body;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.proxy('/element/bad/text', 'GET'));

          case 3:
            _ref5 = context$3$0.sent;
            _ref52 = _slicedToArray(_ref5, 2);
            res = _ref52[0];
            body = _ref52[1];

            res.statusCode.should.equal(500);
            body.should.eql({ status: 11, value: { message: 'Invisible element' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('command proxy', function () {
    it('should successfully proxy command', function callee$2$0() {
      var j, res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.command('/status', 'GET'));

          case 3:
            res = context$3$0.sent;

            res.should.eql({ foo: 'bar' });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should pass along request errors', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.command('/badurl', 'GET').should.eventually.be.rejectedWith("Could not proxy");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw when a command fails', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            e = null;
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(j.command('/element/bad/text', 'GET'));

          case 5:
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

            e = context$3$0.t0;

          case 10:
            should.exist(e);
            e.message.should.contain('Original error: Invisible element');
            e.value.should.eql({ message: 'Invisible element' });
            e.status.should.equal(11);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 7]]);
    });
    it('should return response body when a command fails with a 200', function callee$2$0() {
      var j, res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.command('/element/200/text', 'GET'));

          case 3:
            res = context$3$0.sent;

            res.value.should.eql({ message: 'Invisible element' });
            res.status.should.eql(11);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw when a command fails with a 100', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            e = null;
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(j.command('/session/badchrome/nochrome', 'GET'));

          case 5:
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

            e = context$3$0.t0;

          case 10:
            should.exist(e);
            e.message.should.contain('Original error: chrome not reachable');
            e.value.should.eql({ message: 'chrome not reachable' });
            e.status.should.equal(0);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[2, 7]]);
    });
  });
  describe('req/res proxy', function () {
    it('should successfully proxy via req and send to res', function callee$2$0() {
      var j, _buildReqRes, _buildReqRes2, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            _buildReqRes = buildReqRes('/status', 'GET');
            _buildReqRes2 = _slicedToArray(_buildReqRes, 2);
            req = _buildReqRes2[0];
            res = _buildReqRes2[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.headers['Content-type'].should.equal('application/json');
            res.sentCode.should.equal(200);
            res.sentBody.should.eql({ status: 0, value: { foo: 'bar' } });

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should rewrite the inner session id so it doesnt change', function callee$2$0() {
      var j, _buildReqRes3, _buildReqRes32, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes3 = buildReqRes('/element/200/value', 'GET');
            _buildReqRes32 = _slicedToArray(_buildReqRes3, 2);
            req = _buildReqRes32[0];
            res = _buildReqRes32[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: 'foobar', sessionId: '123' });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should rewrite the inner session id with sessionId in url', function callee$2$0() {
      var j, _buildReqRes4, _buildReqRes42, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes4 = buildReqRes('/wd/hub/session/456/element/200/value', 'POST');
            _buildReqRes42 = _slicedToArray(_buildReqRes4, 2);
            req = _buildReqRes42[0];
            res = _buildReqRes42[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: 'foobar', sessionId: '456' });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should pass through urls that do not require session IDs', function callee$2$0() {
      var j, _buildReqRes5, _buildReqRes52, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes5 = buildReqRes('/wd/hub/status', 'GET');
            _buildReqRes52 = _slicedToArray(_buildReqRes5, 2);
            req = _buildReqRes52[0];
            res = _buildReqRes52[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: { 'foo': 'bar' } });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should proxy strange responses', function callee$2$0() {
      var j, _buildReqRes6, _buildReqRes62, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes6 = buildReqRes('/nochrome', 'GET');
            _buildReqRes62 = _slicedToArray(_buildReqRes6, 2);
            req = _buildReqRes62[0];
            res = _buildReqRes62[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentCode.should.equal(100);
            res.sentBody.should.eql({ status: 0, value: { message: 'chrome not reachable' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvanNvbndwLXByb3h5L3Byb3h5LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Z0JBR3dCLE9BQU87OzJCQUNYLGdCQUFnQjs7OztvQkFDbkIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7QUFHN0MsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsU0FBUyxXQUFXLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDdkMsTUFBSSxHQUFHLEdBQUcsRUFBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDO0FBQzNDLE1BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLEtBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLEtBQUcsQ0FBQyxHQUFHLEdBQUcsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQUUsT0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUFFLENBQUM7QUFDcEMsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFDLElBQUksRUFBSztBQUNyQixPQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNwQixXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUM7QUFDRixLQUFHLENBQUMsSUFBSSxHQUFHLFVBQUMsSUFBSSxFQUFLO0FBQ25CLFFBQUk7QUFDRixVQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6QixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDZCxPQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztHQUNyQixDQUFDO0FBQ0YsU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNuQjs7QUFFRCxTQUFTLFNBQVMsR0FBYTtNQUFYLElBQUks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QyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7QUFDN0IsZUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLGVBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFDLEVBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2hGLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2pzb253cC1wcm94eS9wcm94eS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuLyogZ2xvYmFsIGRlc2NyaWJlOnRydWUsIGl0OnRydWUgKi9cblxuaW1wb3J0IHsgSldQcm94eSB9IGZyb20gJy4uLy4uJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vbW9jay1yZXF1ZXN0JztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuXG5cbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmZ1bmN0aW9uIGJ1aWxkUmVxUmVzICh1cmwsIG1ldGhvZCwgYm9keSkge1xuICBsZXQgcmVxID0ge29yaWdpbmFsVXJsOiB1cmwsIG1ldGhvZCwgYm9keX07XG4gIGxldCByZXMgPSB7fTtcbiAgcmVzLmhlYWRlcnMgPSB7fTtcbiAgcmVzLnNldCA9IChrLCB2KSA9PiB7IHJlc1trXSA9IHY7IH07XG4gIHJlcy5zdGF0dXMgPSAoY29kZSkgPT4ge1xuICAgIHJlcy5zZW50Q29kZSA9IGNvZGU7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgcmVzLnNlbmQgPSAoYm9keSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJlcy5zZW50Qm9keSA9IGJvZHk7XG4gIH07XG4gIHJldHVybiBbcmVxLCByZXNdO1xufVxuXG5mdW5jdGlvbiBtb2NrUHJveHkgKG9wdHMgPSB7fSkge1xuICBsZXQgcHJveHkgPSBuZXcgSldQcm94eShvcHRzKTtcbiAgcHJveHkucmVxdWVzdCA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3QoLi4uYXJncyk7XG4gIH07XG4gIHJldHVybiBwcm94eTtcbn1cblxuZGVzY3JpYmUoJ3Byb3h5JywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG92ZXJyaWRlIGRlZmF1bHQgcGFyYW1zJywgKCkgPT4ge1xuICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXJ2ZXI6ICcxMjcuMC4wLjInfSk7XG4gICAgai5zZXJ2ZXIuc2hvdWxkLmVxdWFsKCcxMjcuMC4wLjInKTtcbiAgICBqLnBvcnQuc2hvdWxkLmVxdWFsKDQ0NDQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzYXZlIHNlc3Npb24gaWQgb24gc2Vzc2lvbiBjcmVhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xuICAgIGxldCBbcmVzLCBib2R5XSA9IGF3YWl0IGoucHJveHkoJy9zZXNzaW9uJywgJ1BPU1QnLCB7ZGVzaXJlZENhcGFiaWxpdGllczoge319KTtcbiAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICBib2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgc2Vzc2lvbklkOiAnMTIzJywgdmFsdWU6IHticm93c2VyTmFtZTogJ2Jvbyd9fSk7XG4gICAgai5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKCcxMjMnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2F2ZSBzZXNzaW9uIGlkIG9uIHNlc3Npb24gY3JlYXRpb24gd2l0aCAzMDMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGogPSBtb2NrUHJveHkoKTtcbiAgICBsZXQgW3JlcywgYm9keV0gPSBhd2FpdCBqLnByb3h5KCcvc2Vzc2lvbicsICdQT1NUJywge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IHtyZWRpcmVjdDogdHJ1ZX19KTtcbiAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMzAzKTtcbiAgICBib2R5LnNob3VsZC5lcWwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDQ0NC93ZC9odWIvc2Vzc2lvbi8xMjMnKTtcbiAgICBqLnNlc3Npb25JZC5zaG91bGQuZXF1YWwoJzEyMycpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2dldFVybEZvclByb3h5JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgbW9kaWZ5IHNlc3Npb24gaWQsIGhvc3QsIGFuZCBwb3J0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGouZ2V0VXJsRm9yUHJveHkoJ2h0dHA6Ly9ob3N0LmNvbToxMjM0L3dkL2h1Yi9zZXNzaW9uLzQ1Ni9lbGVtZW50LzIwMC92YWx1ZScpXG4gICAgICAgLnNob3VsZC5lcWwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDQ0NC93ZC9odWIvc2Vzc2lvbi8xMjMvZWxlbWVudC8yMDAvdmFsdWUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHByZXBlbmQgc2NoZW1lLCBob3N0IGFuZCBwb3J0IGlmIG5vdCBwcm92aWRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgICBqLmdldFVybEZvclByb3h5KCcvd2QvaHViL3Nlc3Npb24vNDU2L2VsZW1lbnQvMjAwL3ZhbHVlJylcbiAgICAgICAuc2hvdWxkLmVxbCgnaHR0cDovL2xvY2FsaG9zdDo0NDQ0L3dkL2h1Yi9zZXNzaW9uLzEyMy9lbGVtZW50LzIwMC92YWx1ZScpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHVybHMgd2hpY2ggZG8gbm90IGhhdmUgc2Vzc2lvcG4gaWRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGouZ2V0VXJsRm9yUHJveHkoJ2h0dHA6Ly9ob3N0LmNvbToxMjM0L3dkL2h1Yi9zZXNzaW9uJylcbiAgICAgICAuc2hvdWxkLmVxbCgnaHR0cDovL2xvY2FsaG9zdDo0NDQ0L3dkL2h1Yi9zZXNzaW9uJyk7XG5cbiAgICAgIGxldCBuZXdVcmwgPSBqLmdldFVybEZvclByb3h5KCcvd2QvaHViL3Nlc3Npb24nKTtcbiAgICAgIG5ld1VybC5zaG91bGQuZXFsKCdodHRwOi8vbG9jYWxob3N0OjQ0NDQvd2QvaHViL3Nlc3Npb24nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHVybCByZXF1aXJlcyBhIHNlc3Npb25JZCBidXQgaXRzIG51bGwnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xuICAgICAgbGV0IGU7XG4gICAgICB0cnkge1xuICAgICAgICBqLmdldFVybEZvclByb3h5KCcvd2QvaHViL3Nlc3Npb24vNDU2L2VsZW1lbnQvMjAwL3ZhbHVlJyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZSA9IGVycjtcbiAgICAgIH1cbiAgICAgIHNob3VsZC5leGlzdChlKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbignd2l0aG91dCBzZXNzaW9uIGlkJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgdXJsIGRvZXMgbm90IHJlcXVpcmUgYSBzZXNzaW9uIGlkIGFuZCBpdHMgbnVsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KCk7XG4gICAgICBsZXQgbmV3VXJsID0gai5nZXRVcmxGb3JQcm94eSgnL3dkL2h1Yi9zdGF0dXMnKTtcblxuICAgICAgc2hvdWxkLmV4aXN0KG5ld1VybCk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc3RyYWlnaHQgcHJveHknLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdWNjZXNzZnVsbHkgcHJveHkgc3RyYWlnaHQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xuICAgICAgbGV0IFtyZXMsIGJvZHldID0gYXdhaXQgai5wcm94eSgnL3N0YXR1cycsICdHRVQnKTtcbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgYm9keS5zaG91bGQuZXFsKHtzdGF0dXM6IDAsIHZhbHVlOiB7Zm9vOiAnYmFyJ319KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBhc3MgYWxvbmcgcmVxdWVzdCBlcnJvcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xuICAgICAgai5wcm94eSgnL2JhZHVybCcsICdHRVQnKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgcHJveHlcIik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwcm94eSBlcnJvciByZXNwb25zZXMgYW5kIGNvZGVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGxldCBbcmVzLCBib2R5XSA9IGF3YWl0IGoucHJveHkoJy9lbGVtZW50L2JhZC90ZXh0JywgJ0dFVCcpO1xuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICBib2R5LnNob3VsZC5lcWwoe3N0YXR1czogMTEsIHZhbHVlOiB7bWVzc2FnZTogJ0ludmlzaWJsZSBlbGVtZW50J319KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdjb21tYW5kIHByb3h5JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3VjY2Vzc2Z1bGx5IHByb3h5IGNvbW1hbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGouY29tbWFuZCgnL3N0YXR1cycsICdHRVQnKTtcbiAgICAgIHJlcy5zaG91bGQuZXFsKHtmb286ICdiYXInfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXNzIGFsb25nIHJlcXVlc3QgZXJyb3JzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGouY29tbWFuZCgnL2JhZHVybCcsICdHRVQnKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgcHJveHlcIik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIGEgY29tbWFuZCBmYWlscycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgICBsZXQgZSA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBqLmNvbW1hbmQoJy9lbGVtZW50L2JhZC90ZXh0JywgJ0dFVCcpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGUgPSBlcnI7XG4gICAgICB9XG4gICAgICBzaG91bGQuZXhpc3QoZSk7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ09yaWdpbmFsIGVycm9yOiBJbnZpc2libGUgZWxlbWVudCcpO1xuICAgICAgZS52YWx1ZS5zaG91bGQuZXFsKHttZXNzYWdlOiAnSW52aXNpYmxlIGVsZW1lbnQnfSk7XG4gICAgICBlLnN0YXR1cy5zaG91bGQuZXF1YWwoMTEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlc3BvbnNlIGJvZHkgd2hlbiBhIGNvbW1hbmQgZmFpbHMgd2l0aCBhIDIwMCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgai5jb21tYW5kKCcvZWxlbWVudC8yMDAvdGV4dCcsICdHRVQnKTtcbiAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKHttZXNzYWdlOiAnSW52aXNpYmxlIGVsZW1lbnQnfSk7XG4gICAgICByZXMuc3RhdHVzLnNob3VsZC5lcWwoMTEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBhIGNvbW1hbmQgZmFpbHMgd2l0aCBhIDEwMCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgICBsZXQgZSA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBqLmNvbW1hbmQoJy9zZXNzaW9uL2JhZGNocm9tZS9ub2Nocm9tZScsICdHRVQnKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlID0gZXJyO1xuICAgICAgfVxuICAgICAgc2hvdWxkLmV4aXN0KGUpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdPcmlnaW5hbCBlcnJvcjogY2hyb21lIG5vdCByZWFjaGFibGUnKTtcbiAgICAgIGUudmFsdWUuc2hvdWxkLmVxbCh7bWVzc2FnZTogJ2Nocm9tZSBub3QgcmVhY2hhYmxlJ30pO1xuICAgICAgZS5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3JlcS9yZXMgcHJveHknLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzdWNjZXNzZnVsbHkgcHJveHkgdmlhIHJlcSBhbmQgc2VuZCB0byByZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xuICAgICAgbGV0IFtyZXEsIHJlc10gPSBidWlsZFJlcVJlcygnL3N0YXR1cycsICdHRVQnKTtcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xuICAgICAgcmVzLmhlYWRlcnNbJ0NvbnRlbnQtdHlwZSddLnNob3VsZC5lcXVhbCgnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmVzLnNlbnRDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6IHtmb286ICdiYXInfX0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV3cml0ZSB0aGUgaW5uZXIgc2Vzc2lvbiBpZCBzbyBpdCBkb2VzbnQgY2hhbmdlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGxldCBbcmVxLCByZXNdID0gYnVpbGRSZXFSZXMoJy9lbGVtZW50LzIwMC92YWx1ZScsICdHRVQnKTtcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6ICdmb29iYXInLCBzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXdyaXRlIHRoZSBpbm5lciBzZXNzaW9uIGlkIHdpdGggc2Vzc2lvbklkIGluIHVybCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XG4gICAgICBsZXQgW3JlcSwgcmVzXSA9IGJ1aWxkUmVxUmVzKCcvd2QvaHViL3Nlc3Npb24vNDU2L2VsZW1lbnQvMjAwL3ZhbHVlJywgJ1BPU1QnKTtcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6ICdmb29iYXInLCBzZXNzaW9uSWQ6ICc0NTYnfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXNzIHRocm91Z2ggdXJscyB0aGF0IGRvIG5vdCByZXF1aXJlIHNlc3Npb24gSURzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcbiAgICAgIGxldCBbcmVxLCByZXNdID0gYnVpbGRSZXFSZXMoJy93ZC9odWIvc3RhdHVzJywgJ0dFVCcpO1xuICAgICAgYXdhaXQgai5wcm94eVJlcVJlcyhyZXEsIHJlcyk7XG4gICAgICByZXMuc2VudEJvZHkuc2hvdWxkLmVxbCh7c3RhdHVzOiAwLCB2YWx1ZTogeydmb28nOidiYXInfX0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcHJveHkgc3RyYW5nZSByZXNwb25zZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xuICAgICAgbGV0IFtyZXEsIHJlc10gPSBidWlsZFJlcVJlcygnL25vY2hyb21lJywgJ0dFVCcpO1xuICAgICAgYXdhaXQgai5wcm94eVJlcVJlcyhyZXEsIHJlcyk7XG4gICAgICByZXMuc2VudENvZGUuc2hvdWxkLmVxdWFsKDEwMCk7XG4gICAgICByZXMuc2VudEJvZHkuc2hvdWxkLmVxbCh7c3RhdHVzOiAwLCB2YWx1ZToge21lc3NhZ2U6ICdjaHJvbWUgbm90IHJlYWNoYWJsZSd9fSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=