'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _2 = require('../..');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var FakeDriver = (function (_MobileJsonWireProtocol) {
  _inherits(FakeDriver, _MobileJsonWireProtocol);

  function FakeDriver() {
    _classCallCheck(this, FakeDriver);

    _get(Object.getPrototypeOf(FakeDriver.prototype), 'constructor', this).call(this);
    this.sessionId = null;
    this.jwpProxyActive = false;
  }

  _createClass(FakeDriver, [{
    key: 'sessionExists',
    value: function sessionExists(sessionId) {
      if (!sessionId) return false;
      return sessionId === this.sessionId;
    }
  }, {
    key: 'driverForSession',
    value: function driverForSession() /*sessionId*/{
      return this;
    }
  }, {
    key: 'createSession',
    value: function createSession(desiredCapabilities) {
      var requiredCapabilities = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.sessionId = "1234";
            this.desiredCapabilities = desiredCapabilities;
            this.requiredCapabilities = requiredCapabilities;
            return context$2$0.abrupt('return', [this.sessionId, _lodash2['default'].extend({}, desiredCapabilities, requiredCapabilities)]);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'executeCommand',
    value: function executeCommand(cmd) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _regeneratorRuntime.async(function executeCommand$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (this[cmd]) {
              context$2$0.next = 2;
              break;
            }

            throw new _2.errors.NotYetImplementedError();

          case 2:
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this[cmd].apply(this, args));

          case 4:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.jwpProxyActive = false;
            this.sessionId = null;

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return _regeneratorRuntime.async(function getStatus$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', "I'm fine");

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'setUrl',
    value: function setUrl(url) {
      return _regeneratorRuntime.async(function setUrl$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', 'Navigated to: ' + url);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      return _regeneratorRuntime.async(function getUrl$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', "http://foobar.com");

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'back',
    value: function back(sessionId) {
      return _regeneratorRuntime.async(function back$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', sessionId);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'forward',
    value: function forward() {
      return _regeneratorRuntime.async(function forward$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      return _regeneratorRuntime.async(function refresh$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            throw new Error('Too Fresh!');

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getSession',
    value: function getSession() {
      return _regeneratorRuntime.async(function getSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            throw new _2.errors.NoSuchDriverError();

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'click',
    value: function click(elementId, sessionId) {
      return _regeneratorRuntime.async(function click$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', [elementId, sessionId]);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'implicitWait',
    value: function implicitWait(ms) {
      return _regeneratorRuntime.async(function implicitWait$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', ms);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'clickCurrent',
    value: function clickCurrent(button) {
      return _regeneratorRuntime.async(function clickCurrent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', button);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'setNetworkConnection',
    value: function setNetworkConnection(type) {
      return _regeneratorRuntime.async(function setNetworkConnection$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', type);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(element, xOffset, yOffset) {
      return _regeneratorRuntime.async(function moveTo$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', [element, xOffset, yOffset]);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getText',
    value: function getText() {
      return _regeneratorRuntime.async(function getText$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', "");

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(attr, elementId, sessionId) {
      return _regeneratorRuntime.async(function getAttribute$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', [attr, elementId, sessionId]);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'setValue',
    value: function setValue(elementId, value) {
      return _regeneratorRuntime.async(function setValue$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', value);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'performTouch',
    value: function performTouch() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _regeneratorRuntime.async(function performTouch$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', args);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'setFrame',
    value: function setFrame(frameId) {
      return _regeneratorRuntime.async(function setFrame$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', frameId);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'removeApp',
    value: function removeApp(app) {
      return _regeneratorRuntime.async(function removeApp$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', app);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'receiveAsyncResponse',
    value: function receiveAsyncResponse() {
      return _regeneratorRuntime.async(function receiveAsyncResponse$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', { status: 13, value: 'Mishandled Driver Error' });

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive() /*sessionId*/{
      return false;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList() /*sessionId*/{
      return [];
    }
  }, {
    key: 'canProxy',
    value: function canProxy() /*sessionId*/{
      return false;
    }
  }]);

  return FakeDriver;
})(_2.MobileJsonWireProtocol);

exports.FakeDriver = FakeDriver;

// this is here to test a failing command that does not throw an error
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9mYWtlLWRyaXZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBQStDLE9BQU87O3NCQUN4QyxRQUFROzs7O0lBRWhCLFVBQVU7WUFBVixVQUFVOztBQUVGLFdBRlIsVUFBVSxHQUVDOzBCQUZYLFVBQVU7O0FBR1osK0JBSEUsVUFBVSw2Q0FHSjtBQUNSLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0dBQzdCOztlQU5HLFVBQVU7O1dBUUEsdUJBQUMsU0FBUyxFQUFFO0FBQ3hCLFVBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDN0IsYUFBTyxTQUFTLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNyQzs7O1dBRWdCLHlDQUFnQjtBQUMvQixhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFbUIsdUJBQUMsbUJBQW1CO1VBQUUsb0JBQW9CLHlEQUFDLEVBQUU7Ozs7QUFDL0QsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDL0MsZ0JBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztnREFDMUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7Ozs7OztLQUNqRjs7O1dBRW9CLHdCQUFDLEdBQUc7d0NBQUssSUFBSTtBQUFKLFlBQUk7Ozs7OztnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7a0JBQ04sSUFBSSxVQUFPLHNCQUFzQixFQUFFOzs7OzZDQUU5QixJQUFJLENBQUMsR0FBRyxPQUFDLENBQVQsSUFBSSxFQUFTLElBQUksQ0FBQzs7Ozs7Ozs7OztLQUNoQzs7O1dBRW1COzs7O0FBQ2xCLGdCQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1QixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7S0FDdkI7OztXQUVlOzs7O2dEQUNQLFVBQVU7Ozs7Ozs7S0FDbEI7OztXQUVZLGdCQUFDLEdBQUc7Ozs7bUVBQ1MsR0FBRzs7Ozs7OztLQUM1Qjs7O1dBRVk7Ozs7Z0RBQ0osbUJBQW1COzs7Ozs7O0tBQzNCOzs7V0FFVSxjQUFDLFNBQVM7Ozs7Z0RBQ1osU0FBUzs7Ozs7OztLQUNqQjs7O1dBRWE7Ozs7Ozs7O0tBQUs7OztXQUVMOzs7O2tCQUNOLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQzs7Ozs7OztLQUM5Qjs7O1dBRWdCOzs7O2tCQUNULElBQUksVUFBTyxpQkFBaUIsRUFBRTs7Ozs7OztLQUNyQzs7O1dBRVcsZUFBQyxTQUFTLEVBQUUsU0FBUzs7OztnREFDeEIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDOzs7Ozs7O0tBQzlCOzs7V0FFa0Isc0JBQUMsRUFBRTs7OztnREFDYixFQUFFOzs7Ozs7O0tBQ1Y7OztXQUVrQixzQkFBQyxNQUFNOzs7O2dEQUNqQixNQUFNOzs7Ozs7O0tBQ2Q7OztXQUUwQiw4QkFBQyxJQUFJOzs7O2dEQUN2QixJQUFJOzs7Ozs7O0tBQ1o7OztXQUVZLGdCQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTzs7OztnREFDOUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzs7Ozs7OztLQUNuQzs7O1dBRWE7Ozs7Z0RBQ0wsRUFBRTs7Ozs7OztLQUNWOzs7V0FFa0Isc0JBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTOzs7O2dEQUNyQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDOzs7Ozs7O0tBQ3BDOzs7V0FFYyxrQkFBQyxTQUFTLEVBQUUsS0FBSzs7OztnREFDdkIsS0FBSzs7Ozs7OztLQUNiOzs7V0FFa0I7eUNBQUksSUFBSTtBQUFKLFlBQUk7Ozs7OztnREFDbEIsSUFBSTs7Ozs7OztLQUNaOzs7V0FFYyxrQkFBQyxPQUFPOzs7O2dEQUNkLE9BQU87Ozs7Ozs7S0FDZjs7O1dBRWUsbUJBQUMsR0FBRzs7OztnREFDWCxHQUFHOzs7Ozs7O0tBQ1g7OztXQUUwQjs7OztnREFFbEIsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBQzs7Ozs7OztLQUN0RDs7O1dBRVcsb0NBQWdCO0FBQzFCLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztXQUVpQiwwQ0FBZ0I7QUFDaEMsYUFBTyxFQUFFLENBQUM7S0FDWDs7O1dBRVEsaUNBQWdCO0FBQ3ZCLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQXpIRyxVQUFVOzs7UUE0SFAsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoidGVzdC9tanNvbndwL2Zha2UtZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JzLCBNb2JpbGVKc29uV2lyZVByb3RvY29sIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY2xhc3MgRmFrZURyaXZlciBleHRlbmRzIE1vYmlsZUpzb25XaXJlUHJvdG9jb2wge1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2Vzc2lvbklkID0gbnVsbDtcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBzZXNzaW9uRXhpc3RzIChzZXNzaW9uSWQpIHtcbiAgICBpZiAoIXNlc3Npb25JZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBzZXNzaW9uSWQgPT09IHRoaXMuc2Vzc2lvbklkO1xuICB9XG5cbiAgZHJpdmVyRm9yU2Vzc2lvbiAoLypzZXNzaW9uSWQqLykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoZGVzaXJlZENhcGFiaWxpdGllcywgcmVxdWlyZWRDYXBhYmlsaXRpZXM9e30pIHtcbiAgICB0aGlzLnNlc3Npb25JZCA9IFwiMTIzNFwiO1xuICAgIHRoaXMuZGVzaXJlZENhcGFiaWxpdGllcyA9IGRlc2lyZWRDYXBhYmlsaXRpZXM7XG4gICAgdGhpcy5yZXF1aXJlZENhcGFiaWxpdGllcyA9IHJlcXVpcmVkQ2FwYWJpbGl0aWVzO1xuICAgIHJldHVybiBbdGhpcy5zZXNzaW9uSWQsIF8uZXh0ZW5kKHt9LCBkZXNpcmVkQ2FwYWJpbGl0aWVzLCByZXF1aXJlZENhcGFiaWxpdGllcyldO1xuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZUNvbW1hbmQgKGNtZCwgLi4uYXJncykge1xuICAgIGlmICghdGhpc1tjbWRdKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vdFlldEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHRoaXNbY21kXSguLi5hcmdzKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKCkge1xuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNlc3Npb25JZCA9IG51bGw7XG4gIH1cblxuICBhc3luYyBnZXRTdGF0dXMgKCkge1xuICAgIHJldHVybiBcIkknbSBmaW5lXCI7XG4gIH1cblxuICBhc3luYyBzZXRVcmwgKHVybCkge1xuICAgIHJldHVybiBgTmF2aWdhdGVkIHRvOiAke3VybH1gO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXJsICgpIHtcbiAgICByZXR1cm4gXCJodHRwOi8vZm9vYmFyLmNvbVwiO1xuICB9XG5cbiAgYXN5bmMgYmFjayAoc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuIHNlc3Npb25JZDtcbiAgfVxuXG4gIGFzeW5jIGZvcndhcmQgKCkge31cblxuICBhc3luYyByZWZyZXNoICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvbyBGcmVzaCEnKTtcbiAgfVxuXG4gIGFzeW5jIGdldFNlc3Npb24gKCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoRHJpdmVyRXJyb3IoKTtcbiAgfVxuXG4gIGFzeW5jIGNsaWNrIChlbGVtZW50SWQsIHNlc3Npb25JZCkge1xuICAgIHJldHVybiBbZWxlbWVudElkLCBzZXNzaW9uSWRdO1xuICB9XG5cbiAgYXN5bmMgaW1wbGljaXRXYWl0IChtcykge1xuICAgIHJldHVybiBtcztcbiAgfVxuXG4gIGFzeW5jIGNsaWNrQ3VycmVudCAoYnV0dG9uKSB7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIGFzeW5jIHNldE5ldHdvcmtDb25uZWN0aW9uICh0eXBlKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICBhc3luYyBtb3ZlVG8gKGVsZW1lbnQsIHhPZmZzZXQsIHlPZmZzZXQpIHtcbiAgICByZXR1cm4gW2VsZW1lbnQsIHhPZmZzZXQsIHlPZmZzZXRdO1xuICB9XG5cbiAgYXN5bmMgZ2V0VGV4dCAoKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBhc3luYyBnZXRBdHRyaWJ1dGUgKGF0dHIsIGVsZW1lbnRJZCwgc2Vzc2lvbklkKSB7XG4gICAgcmV0dXJuIFthdHRyLCBlbGVtZW50SWQsIHNlc3Npb25JZF07XG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSAoZWxlbWVudElkLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGFzeW5jIHBlcmZvcm1Ub3VjaCAoLi4uYXJncykge1xuICAgIHJldHVybiBhcmdzO1xuICB9XG5cbiAgYXN5bmMgc2V0RnJhbWUgKGZyYW1lSWQpIHtcbiAgICByZXR1cm4gZnJhbWVJZDtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUFwcCAoYXBwKSB7XG4gICAgcmV0dXJuIGFwcDtcbiAgfVxuXG4gIGFzeW5jIHJlY2VpdmVBc3luY1Jlc3BvbnNlICgpIHtcbiAgICAvLyB0aGlzIGlzIGhlcmUgdG8gdGVzdCBhIGZhaWxpbmcgY29tbWFuZCB0aGF0IGRvZXMgbm90IHRocm93IGFuIGVycm9yXG4gICAgcmV0dXJuIHtzdGF0dXM6IDEzLCB2YWx1ZTogJ01pc2hhbmRsZWQgRHJpdmVyIEVycm9yJ307XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoLypzZXNzaW9uSWQqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0ICgvKnNlc3Npb25JZCovKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY2FuUHJveHkgKC8qc2Vzc2lvbklkKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IHsgRmFrZURyaXZlciB9O1xuIl19