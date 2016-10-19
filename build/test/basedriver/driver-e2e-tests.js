'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../..');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function baseDriverE2ETests(DriverClass) {
  var _this = this;

  var defaultCaps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  describe('BaseDriver (e2e)', function () {
    var baseServer = undefined,
        d = new DriverClass();
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(d), 8181));

          case 2:
            baseServer = context$3$0.sent;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(baseServer.close());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('session handling', function () {
      it('should create session and retrieve a session id, then delete it', function callee$3$0() {
        var res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session',
                method: 'POST',
                json: { desiredCapabilities: defaultCaps, requiredCapabilities: {} },
                simple: false,
                resolveWithFullResponse: true
              }));

            case 2:
              res = context$4$0.sent;

              res.statusCode.should.equal(200);
              res.body.status.should.equal(0);
              should.exist(res.body.sessionId);
              res.body.value.should.eql(defaultCaps);

              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId,
                method: 'DELETE',
                json: true,
                simple: false,
                resolveWithFullResponse: true
              }));

            case 9:
              res = context$4$0.sent;

              res.statusCode.should.equal(200);
              res.body.status.should.equal(0);
              should.equal(d.sessionId, null);

            case 13:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    it.skip('should throw NYI for commands not implemented', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('command timeouts', function () {
      function startSession(timeout) {
        var caps = _lodash2['default'].clone(defaultCaps);
        caps.newCommandTimeout = timeout;
        return (0, _requestPromise2['default'])({
          url: 'http://localhost:8181/wd/hub/session',
          method: 'POST',
          json: { desiredCapabilities: caps, requiredCapabilities: {} }
        });
      }

      function endSession(id) {
        return (0, _requestPromise2['default'])({
          url: 'http://localhost:8181/wd/hub/session/' + id,
          method: 'DELETE',
          json: true,
          simple: false
        });
      }

      d.findElement = (function () {
        return 'foo';
      }).bind(d);

      d.findElements = (function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(200));

            case 2:
              return context$4$0.abrupt('return', ['foo']);

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      }).bind(d);

      it('should set a default commandTimeout', function callee$3$0() {
        var newSession;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(startSession());

            case 2:
              newSession = context$4$0.sent;

              d.newCommandTimeoutMs.should.be.above(0);
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should timeout on commands using commandTimeout cap', function callee$3$0() {
        var newSession, res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(startSession(0.25));

            case 2:
              newSession = context$4$0.sent;
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId + '/element',
                method: 'POST',
                json: { using: 'name', value: 'foo' }
              }));

            case 5:
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(400));

            case 7:
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId,
                method: 'GET',
                json: true,
                simple: false
              }));

            case 9:
              res = context$4$0.sent;

              res.status.should.equal(6);
              should.equal(d.sessionId, null);
              context$4$0.next = 14;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 14:
              res = context$4$0.sent;

              res.status.should.equal(6);

            case 16:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not timeout with commandTimeout of false', function callee$3$0() {
        var newSession, start, res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(startSession(0.1));

            case 2:
              newSession = context$4$0.sent;
              start = Date.now();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId + '/elements',
                method: 'POST',
                json: { using: 'name', value: 'foo' }
              }));

            case 6:
              res = context$4$0.sent;

              (Date.now() - start).should.be.above(150);
              res.value.should.eql(['foo']);
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 11:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not timeout with commandTimeout of 0', function callee$3$0() {
        var newSession, res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              d.newCommandTimeoutMs = 2;
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(startSession(0));

            case 3:
              newSession = context$4$0.sent;
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId + '/element',
                method: 'POST',
                json: { using: 'name', value: 'foo' }
              }));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(400));

            case 8:
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId,
                method: 'GET',
                json: true,
                simple: false
              }));

            case 10:
              res = context$4$0.sent;

              res.status.should.equal(0);
              context$4$0.next = 14;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 14:
              res = context$4$0.sent;

              res.status.should.equal(0);

              d.newCommandTimeoutMs = 60 * 1000;

            case 17:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not timeout if its just the command taking awhile', function callee$3$0() {
        var newSession, res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(startSession(0.25));

            case 2:
              newSession = context$4$0.sent;
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId + '/element',
                method: 'POST',
                json: { using: 'name', value: 'foo' }
              }));

            case 5:
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(400));

            case 7:
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/session/' + d.sessionId,
                method: 'GET',
                json: true,
                simple: false
              }));

            case 9:
              res = context$4$0.sent;

              res.status.should.equal(6);
              should.equal(d.sessionId, null);
              context$4$0.next = 14;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 14:
              res = context$4$0.sent;

              res.status.should.equal(6);

            case 16:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not have a timer running before or after a session', function callee$3$0() {
        var newSession;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              should.not.exist(d.noCommandTimer);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(startSession(0.25));

            case 3:
              newSession = context$4$0.sent;

              newSession.sessionId.should.equal(d.sessionId);
              should.exist(d.noCommandTimer);
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(endSession(newSession.sessionId));

            case 8:
              should.not.exist(d.noCommandTimer);

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('settings api', function () {
      before(function () {
        d.settings = new _2.DeviceSettings({ ignoreUnimportantViews: false });
      });
      it('should be able to get settings object', function () {
        d.settings.getSettings().ignoreUnimportantViews.should.be['false'];
      });
      it('should throw error when updateSettings method is not defined', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.settings.update({ ignoreUnimportantViews: true }).should.eventually.be.rejectedWith('onSettingsUpdate'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw error for invalid update object', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.settings.update('invalid json').should.eventually.be.rejectedWith('JSON'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('unexpected exits', function () {
      it('should reject a current command when the driver crashes', function callee$3$0() {
        var p, res;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              d._oldGetStatus = d.getStatus;
              d.getStatus = (function callee$4$0() {
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(_bluebird2['default'].delay(5000));

                    case 2:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              }).bind(d);
              p = (0, _requestPromise2['default'])({
                url: 'http://localhost:8181/wd/hub/status',
                method: 'GET',
                json: true,
                simple: false
              });
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(20));

            case 5:
              d.startUnexpectedShutdown(new Error('Crashytimes'));
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(p);

            case 8:
              res = context$4$0.sent;

              res.status.should.equal(13);
              res.value.message.should.contain('Crashytimes');
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith('Crashytimes'));

            case 13:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });
}

exports['default'] = baseDriverE2ETests;
module.exports = exports['default'];

// make sure that the request gets to the server before our shutdown
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9kcml2ZXItZTJlLXRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztpQkFDMkMsT0FBTzs7OEJBQ3BELGlCQUFpQjs7OztvQkFDcEIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQy9CLFVBQVU7Ozs7QUFFeEIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsU0FBUyxrQkFBa0IsQ0FBRSxXQUFXLEVBQW9COzs7TUFBbEIsV0FBVyx5REFBRyxFQUFFOztBQUN4RCxVQUFRLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtBQUNqQyxRQUFJLFVBQVUsWUFBQTtRQUFFLENBQUMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ3RDLFVBQU0sQ0FBQzs7Ozs7NkNBQ2MsZUFBTyxpQ0FBeUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDOzs7QUFBNUQsc0JBQVU7Ozs7Ozs7S0FDWCxDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7OzZDQUNFLFVBQVUsQ0FBQyxLQUFLLEVBQUU7Ozs7Ozs7S0FDekIsQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQ2pDLFFBQUUsQ0FBQyxpRUFBaUUsRUFBRTtZQUNoRSxHQUFHOzs7OzsrQ0FBUyxpQ0FBUTtBQUN0QixtQkFBRyxFQUFFLHNDQUFzQztBQUMzQyxzQkFBTSxFQUFFLE1BQU07QUFDZCxvQkFBSSxFQUFFLEVBQUMsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLEVBQUUsRUFBQztBQUNsRSxzQkFBTSxFQUFFLEtBQUs7QUFDYix1Q0FBdUIsRUFBRSxJQUFJO2VBQzlCLENBQUM7OztBQU5FLGlCQUFHOztBQVFQLGlCQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7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QUMsR0FBRyxpQ0FBUTtBQUNkLG1CQUFHLEVBQUUscUNBQXFDO0FBQzFDLHNCQUFNLEVBQUUsS0FBSztBQUNiLG9CQUFJLEVBQUUsSUFBSTtBQUNWLHNCQUFNLEVBQUUsS0FBSztlQUNkLENBQUM7OytDQUVJLHNCQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7OztBQUNqQixlQUFDLENBQUMsdUJBQXVCLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7K0NBQ3BDLENBQUM7OztBQUFiLGlCQUFHOztBQUNQLGlCQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUIsaUJBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7OytDQUMxQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDOzs7Ozs7O09BQ25FLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUVKLENBQUMsQ0FBQztDQUNKOztxQkFFYyxrQkFBa0IiLCJmaWxlIjoidGVzdC9iYXNlZHJpdmVyL2RyaXZlci1lMmUtdGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc2VydmVyLCByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24sIERldmljZVNldHRpbmdzIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5mdW5jdGlvbiBiYXNlRHJpdmVyRTJFVGVzdHMgKERyaXZlckNsYXNzLCBkZWZhdWx0Q2FwcyA9IHt9KSB7XG4gIGRlc2NyaWJlKCdCYXNlRHJpdmVyIChlMmUpJywgKCkgPT4ge1xuICAgIGxldCBiYXNlU2VydmVyLCBkID0gbmV3IERyaXZlckNsYXNzKCk7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGJhc2VTZXJ2ZXIgPSBhd2FpdCBzZXJ2ZXIocm91dGVDb25maWd1cmluZ0Z1bmN0aW9uKGQpLCA4MTgxKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBiYXNlU2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2Vzc2lvbiBoYW5kbGluZycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY3JlYXRlIHNlc3Npb24gYW5kIHJldHJpZXZlIGEgc2Vzc2lvbiBpZCwgdGhlbiBkZWxldGUgaXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtkZXNpcmVkQ2FwYWJpbGl0aWVzOiBkZWZhdWx0Q2FwcywgcmVxdWlyZWRDYXBhYmlsaXRpZXM6IHt9fSxcbiAgICAgICAgICBzaW1wbGU6IGZhbHNlLFxuICAgICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgICByZXMuYm9keS5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICBzaG91bGQuZXhpc3QocmVzLmJvZHkuc2Vzc2lvbklkKTtcbiAgICAgICAgcmVzLmJvZHkudmFsdWUuc2hvdWxkLmVxbChkZWZhdWx0Q2Fwcyk7XG5cbiAgICAgICAgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9YCxcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZSxcbiAgICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgc2hvdWxkLmVxdWFsKGQuc2Vzc2lvbklkLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQuc2tpcCgnc2hvdWxkIHRocm93IE5ZSSBmb3IgY29tbWFuZHMgbm90IGltcGxlbWVudGVkJywgYXN5bmMgKCkgPT4ge1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbW1hbmQgdGltZW91dHMnLCAoKSA9PiB7XG4gICAgICBmdW5jdGlvbiBzdGFydFNlc3Npb24gKHRpbWVvdXQpIHtcbiAgICAgICAgbGV0IGNhcHMgPSBfLmNsb25lKGRlZmF1bHRDYXBzKTtcbiAgICAgICAgY2Fwcy5uZXdDb21tYW5kVGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtkZXNpcmVkQ2FwYWJpbGl0aWVzOiBjYXBzLCByZXF1aXJlZENhcGFiaWxpdGllczoge319LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZW5kU2Vzc2lvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke2lkfWAsXG4gICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGQuZmluZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnZm9vJztcbiAgICAgIH0uYmluZChkKTtcblxuICAgICAgZC5maW5kRWxlbWVudHMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMjAwKTtcbiAgICAgICAgcmV0dXJuIFsnZm9vJ107XG4gICAgICB9LmJpbmQoZCk7XG5cbiAgICAgIGl0KCdzaG91bGQgc2V0IGEgZGVmYXVsdCBjb21tYW5kVGltZW91dCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IG5ld1Nlc3Npb24gPSBhd2FpdCBzdGFydFNlc3Npb24oKTtcbiAgICAgICAgZC5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgICAgICAgYXdhaXQgZW5kU2Vzc2lvbihuZXdTZXNzaW9uLnNlc3Npb25JZCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCB0aW1lb3V0IG9uIGNvbW1hbmRzIHVzaW5nIGNvbW1hbmRUaW1lb3V0IGNhcCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IG5ld1Nlc3Npb24gPSBhd2FpdCBzdGFydFNlc3Npb24oMC4yNSk7XG5cbiAgICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9L2VsZW1lbnRgLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt1c2luZzogJ25hbWUnLCB2YWx1ZTogJ2Zvbyd9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgQi5kZWxheSg0MDApO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9YCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoNik7XG4gICAgICAgIHNob3VsZC5lcXVhbChkLnNlc3Npb25JZCwgbnVsbCk7XG4gICAgICAgIHJlcyA9IGF3YWl0IGVuZFNlc3Npb24obmV3U2Vzc2lvbi5zZXNzaW9uSWQpO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCB0aW1lb3V0IHdpdGggY29tbWFuZFRpbWVvdXQgb2YgZmFsc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBuZXdTZXNzaW9uID0gYXdhaXQgc3RhcnRTZXNzaW9uKDAuMSk7XG4gICAgICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtkLnNlc3Npb25JZH0vZWxlbWVudHNgLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt1c2luZzogJ25hbWUnLCB2YWx1ZTogJ2Zvbyd9LFxuICAgICAgICB9KTtcbiAgICAgICAgKERhdGUubm93KCkgLSBzdGFydCkuc2hvdWxkLmJlLmFib3ZlKDE1MCk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKFsnZm9vJ10pO1xuICAgICAgICBhd2FpdCBlbmRTZXNzaW9uKG5ld1Nlc3Npb24uc2Vzc2lvbklkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCB0aW1lb3V0IHdpdGggY29tbWFuZFRpbWVvdXQgb2YgMCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgZC5uZXdDb21tYW5kVGltZW91dE1zID0gMjtcbiAgICAgICAgbGV0IG5ld1Nlc3Npb24gPSBhd2FpdCBzdGFydFNlc3Npb24oMCk7XG5cbiAgICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9L2VsZW1lbnRgLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt1c2luZzogJ25hbWUnLCB2YWx1ZTogJ2Zvbyd9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgQi5kZWxheSg0MDApO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9YCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgIHJlcyA9IGF3YWl0IGVuZFNlc3Npb24obmV3U2Vzc2lvbi5zZXNzaW9uSWQpO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcblxuICAgICAgICBkLm5ld0NvbW1hbmRUaW1lb3V0TXMgPSA2MCAqIDEwMDA7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBub3QgdGltZW91dCBpZiBpdHMganVzdCB0aGUgY29tbWFuZCB0YWtpbmcgYXdoaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgbmV3U2Vzc2lvbiA9IGF3YWl0IHN0YXJ0U2Vzc2lvbigwLjI1KTtcbiAgICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9L2VsZW1lbnRgLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt1c2luZzogJ25hbWUnLCB2YWx1ZTogJ2Zvbyd9LFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgQi5kZWxheSg0MDApO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7ZC5zZXNzaW9uSWR9YCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoNik7XG4gICAgICAgIHNob3VsZC5lcXVhbChkLnNlc3Npb25JZCwgbnVsbCk7XG4gICAgICAgIHJlcyA9IGF3YWl0IGVuZFNlc3Npb24obmV3U2Vzc2lvbi5zZXNzaW9uSWQpO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIGEgdGltZXIgcnVubmluZyBiZWZvcmUgb3IgYWZ0ZXIgYSBzZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBzaG91bGQubm90LmV4aXN0KGQubm9Db21tYW5kVGltZXIpO1xuICAgICAgICBsZXQgbmV3U2Vzc2lvbiA9IGF3YWl0IHN0YXJ0U2Vzc2lvbigwLjI1KTtcbiAgICAgICAgbmV3U2Vzc2lvbi5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKGQuc2Vzc2lvbklkKTtcbiAgICAgICAgc2hvdWxkLmV4aXN0KGQubm9Db21tYW5kVGltZXIpO1xuICAgICAgICBhd2FpdCBlbmRTZXNzaW9uKG5ld1Nlc3Npb24uc2Vzc2lvbklkKTtcbiAgICAgICAgc2hvdWxkLm5vdC5leGlzdChkLm5vQ29tbWFuZFRpbWVyKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0dGluZ3MgYXBpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlKCgpID0+IHtcbiAgICAgICAgZC5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9KTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBzZXR0aW5ncyBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGQuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKS5pZ25vcmVVbmltcG9ydGFudFZpZXdzLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciB3aGVuIHVwZGF0ZVNldHRpbmdzIG1ldGhvZCBpcyBub3QgZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZC5zZXR0aW5ncy51cGRhdGUoe2lnbm9yZVVuaW1wb3J0YW50Vmlld3M6IHRydWV9KS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAgICAgICAgIC5iZS5yZWplY3RlZFdpdGgoJ29uU2V0dGluZ3NVcGRhdGUnKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3IgaW52YWxpZCB1cGRhdGUgb2JqZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkLnNldHRpbmdzLnVwZGF0ZSgnaW52YWxpZCBqc29uJykuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgICAgICAgICAuYmUucmVqZWN0ZWRXaXRoKCdKU09OJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1bmV4cGVjdGVkIGV4aXRzJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZWplY3QgYSBjdXJyZW50IGNvbW1hbmQgd2hlbiB0aGUgZHJpdmVyIGNyYXNoZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGQuX29sZEdldFN0YXR1cyA9IGQuZ2V0U3RhdHVzO1xuICAgICAgICBkLmdldFN0YXR1cyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhd2FpdCBCLmRlbGF5KDUwMDApO1xuICAgICAgICB9LmJpbmQoZCk7XG4gICAgICAgIGxldCBwID0gcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zdGF0dXMnLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgcmVxdWVzdCBnZXRzIHRvIHRoZSBzZXJ2ZXIgYmVmb3JlIG91ciBzaHV0ZG93blxuICAgICAgICBhd2FpdCBCLmRlbGF5KDIwKTtcbiAgICAgICAgZC5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihuZXcgRXJyb3IoJ0NyYXNoeXRpbWVzJykpO1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcDtcbiAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMTMpO1xuICAgICAgICByZXMudmFsdWUubWVzc2FnZS5zaG91bGQuY29udGFpbignQ3Jhc2h5dGltZXMnKTtcbiAgICAgICAgYXdhaXQgZC5vblVuZXhwZWN0ZWRTaHV0ZG93bi5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdDcmFzaHl0aW1lcycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VEcml2ZXJFMkVUZXN0cztcbiJdfQ==