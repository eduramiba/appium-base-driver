'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

// wrap these tests in a function so we can export the tests and re-use them
// for actual driver implementations
function baseDriverUnitTests(DriverClass) {
  var _this = this;

  var defaultCaps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  describe('BaseDriver', function () {

    var d = undefined;
    beforeEach(function () {
      d = new DriverClass();
    });

    it('should return an empty status object', function callee$2$0() {
      var status;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.getStatus());

          case 2:
            status = context$3$0.sent;

            status.should.eql({});

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return a sessionId from createSession', function callee$2$0() {
      var _ref, _ref2, sessId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref = context$3$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessId = _ref2[0];

            should.exist(sessId);
            sessId.should.be.a('string');
            sessId.length.should.be.above(5);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should not be able to start two sessions without closing the first', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps).should.eventually.be.rejectedWith('session'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should be able to delete a session', function callee$2$0() {
      var sessionId1, sessionId2;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            sessionId1 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.deleteSession());

          case 5:
            should.equal(d.sessionId, null);
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 8:
            sessionId2 = context$3$0.sent;

            sessionId1.should.not.eql(sessionId2);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should get the current session', function callee$2$0() {
      var _ref3, _ref32, caps;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref3 = context$3$0.sent;
            _ref32 = _slicedToArray(_ref3, 2);
            caps = _ref32[1];
            context$3$0.t0 = caps.should;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.getSession());

          case 8:
            context$3$0.t1 = context$3$0.sent;
            context$3$0.t0.equal.call(context$3$0.t0, context$3$0.t1);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return sessions if no session exists', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 2:
            sessions = context$3$0.sent;

            sessions.length.should.equal(0);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return sessions', function callee$2$0() {
      var caps, sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].clone(defaultCaps);

            caps.a = 'cap';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 6:
            sessions = context$3$0.sent;

            sessions.length.should.equal(1);
            sessions[0].should.eql({
              id: d.sessionId,
              capabilities: caps
            });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should fulfill an unexpected driver quit promise', function callee$2$0() {
      var cmdPromise;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.getStatus = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            cmdPromise = d.executeCommand('getStatus');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(0));

          case 4:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(cmdPromise.should.be.rejectedWith(/We crashed/));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should not allow commands in middle of unexpected shutdown', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.oldDeleteSession = d.deleteSession;
            d.deleteSession = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(this.oldDeleteSession());

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            caps = _lodash2['default'].clone(defaultCaps);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 5:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(d.executeCommand('getSession').should.be.rejectedWith(/shut down/));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow new commands after done shutting down', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // make a command that will wait a bit so we can crash while it's running
            d.oldDeleteSession = d.deleteSession;
            d.deleteSession = (function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(this.oldDeleteSession());

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }).bind(d);
            caps = _lodash2['default'].clone(defaultCaps);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.createSession(caps));

          case 5:
            d.startUnexpectedShutdown(new Error('We crashed'));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(d.onUnexpectedShutdown.should.be.rejectedWith(/We crashed/));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(d.executeCommand('getSession').should.be.rejectedWith(/shut down/));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(d.executeCommand('createSession', caps));

          case 14:
            context$3$0.next = 16;
            return _regeneratorRuntime.awrap(d.deleteSession());

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should have a method to get driver for a session', function callee$2$0() {
      var _ref4, _ref42, sessId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

          case 2:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 1);
            sessId = _ref42[0];

            d.driverForSession(sessId).should.eql(d);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('command queue', function () {
      var d = new DriverClass();

      var waitMs = 10;
      d.getStatus = (function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(waitMs));

            case 2:
              return context$4$0.abrupt('return', Date.now());

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      }).bind(d);

      d.getSessions = (function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(waitMs));

            case 2:
              throw new Error('multipass');

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      }).bind(d);

      afterEach(function () {
        d.clearNewCommandTimeout();
      });

      it('should queue commands and.executeCommand/respond in the order received', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 5:
              results = context$4$0.sent;
              i = 1;

            case 7:
              if (!(i < numCmds)) {
                context$4$0.next = 13;
                break;
              }

              if (!(results[i] <= results[i - 1])) {
                context$4$0.next = 10;
                break;
              }

              throw new Error('Got result out of order');

            case 10:
              i++;
              context$4$0.next = 7;
              break;

            case 13:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should handle errors correctly when queuing', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                if (i === 5) {
                  cmds.push(d.executeCommand('getSessions'));
                } else {
                  cmds.push(d.executeCommand('getStatus'));
                }
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].settle(cmds));

            case 5:
              results = context$4$0.sent;
              i = 1;

            case 7:
              if (!(i < 5)) {
                context$4$0.next = 13;
                break;
              }

              if (!(results[i].value() <= results[i - 1].value())) {
                context$4$0.next = 10;
                break;
              }

              throw new Error('Got result out of order');

            case 10:
              i++;
              context$4$0.next = 7;
              break;

            case 13:
              results[5].reason().message.should.contain('multipass');
              i = 7;

            case 15:
              if (!(i < numCmds)) {
                context$4$0.next = 21;
                break;
              }

              if (!(results[i].value() <= results[i - 1].value())) {
                context$4$0.next = 18;
                break;
              }

              throw new Error('Got result out of order');

            case 18:
              i++;
              context$4$0.next = 15;
              break;

            case 21:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should not care if queue empties for a bit', function callee$3$0() {
        var numCmds, cmds, i, results;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              numCmds = 10;
              cmds = [];

              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 5:
              results = context$4$0.sent;

              cmds = [];
              for (i = 0; i < numCmds; i++) {
                cmds.push(d.executeCommand('getStatus'));
              }
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(_bluebird2['default'].all(cmds));

            case 10:
              results = context$4$0.sent;
              i = 1;

            case 12:
              if (!(i < numCmds)) {
                context$4$0.next = 18;
                break;
              }

              if (!(results[i] <= results[i - 1])) {
                context$4$0.next = 15;
                break;
              }

              throw new Error('Got result out of order');

            case 15:
              i++;
              context$4$0.next = 12;
              break;

            case 18:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('timeouts', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('command', function () {
        it('should exist by default', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                d.newCommandTimeoutMs.should.equal(60000);

              case 1:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
        it('should be settable through `timeouts`', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.timeouts('command', 20));

              case 2:
                d.newCommandTimeoutMs.should.equal(20);

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
      describe('implicit', function () {
        it('should not exist by default', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                d.implicitWaitMs.should.equal(0);

              case 1:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
        it('should be settable through `timeouts`', function callee$4$0() {
          return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
            while (1) switch (context$5$0.prev = context$5$0.next) {
              case 0:
                context$5$0.next = 2;
                return _regeneratorRuntime.awrap(d.timeouts('implicit', 20));

              case 2:
                d.implicitWaitMs.should.equal(20);

              case 3:
              case 'end':
                return context$5$0.stop();
            }
          }, null, _this);
        });
      });
    });

    describe('proxying', function () {
      var sessId = undefined;
      beforeEach(function callee$3$0() {
        var _ref5, _ref52;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(d.createSession(defaultCaps));

            case 2:
              _ref5 = context$4$0.sent;
              _ref52 = _slicedToArray(_ref5, 1);
              sessId = _ref52[0];

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      describe('#proxyActive', function () {
        it('should exist', function () {
          d.proxyActive.should.be.an['instanceof'](Function);
        });
        it('should return false', function () {
          d.proxyActive(sessId).should.be['false'];
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.proxyActive('aaa');
          }).should['throw'];
        });
      });

      describe('#getProxyAvoidList', function () {
        it('should exist', function () {
          d.getProxyAvoidList.should.be.an['instanceof'](Function);
        });
        it('should return an array', function () {
          d.getProxyAvoidList(sessId).should.be.an['instanceof'](Array);
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.getProxyAvoidList('aaa');
          }).should['throw'];
        });
      });

      describe('#canProxy', function () {
        it('should have a #canProxy method', function () {
          d.canProxy.should.be.an['instanceof'](Function);
        });
        it('should return false from #canProxy', function () {
          d.canProxy(sessId).should.be['false'];
        });
        it('should throw an error when sessionId is wrong', function () {
          (function () {
            d.canProxy();
          }).should['throw'];
        });
      });
    });
  });
}

exports['default'] = baseDriverUnitTests;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9kcml2ZXItdGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQy9CLFVBQVU7Ozs7QUFFeEIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7OztBQUl6QixTQUFTLG1CQUFtQixDQUFFLFdBQVcsRUFBb0I7OztNQUFsQixXQUFXLHlEQUFHLEVBQUU7O0FBQ3pELFVBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBTTs7QUFFM0IsUUFBSSxDQUFDLFlBQUEsQ0FBQztBQUNOLGNBQVUsQ0FBQyxZQUFNO0FBQ2YsT0FBQyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7S0FDdkIsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxzQ0FBc0MsRUFBRTtVQUNyQyxNQUFNOzs7Ozs2Q0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFOzs7QUFBNUIsa0JBQU07O0FBQ1Ysa0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7O0tBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsOENBQThDLEVBQUU7dUJBQzVDLE1BQU07Ozs7Ozs2Q0FBVSxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7QUFBNUMsa0JBQU07O0FBQ1gsa0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckIsa0JBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNsQyxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLG9FQUFvRSxFQUFFOzs7Ozs2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LGNBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RCxDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsd0JBQXdCLEVBQUUsWUFBTTtBQUNqQyxXQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1RCxDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsK0NBQStDLEVBQUUsWUFBTTtBQUN4RCxXQUFDLFlBQU07QUFBRSxhQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7V0FBRSxDQUFBLENBQUUsTUFBTSxTQUFNLENBQUM7U0FDdEQsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDOztBQUVILGNBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtBQUMxQixVQUFFLENBQUMsZ0NBQWdDLEVBQUUsWUFBTTtBQUN6QyxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0FBQ0gsVUFBRSxDQUFDLG9DQUFvQyxFQUFFLFlBQU07QUFDN0MsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0FBQ0gsVUFBRSxDQUFDLCtDQUErQyxFQUFFLFlBQU07QUFDeEQsV0FBQyxZQUFNO0FBQUUsYUFBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQUUsQ0FBQSxDQUFFLE1BQU0sU0FBTSxDQUFDO1NBQ3hDLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKOztxQkFFYyxtQkFBbUIiLCJmaWxlIjoidGVzdC9iYXNlZHJpdmVyL2RyaXZlci10ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuLy8gd3JhcCB0aGVzZSB0ZXN0cyBpbiBhIGZ1bmN0aW9uIHNvIHdlIGNhbiBleHBvcnQgdGhlIHRlc3RzIGFuZCByZS11c2UgdGhlbVxuLy8gZm9yIGFjdHVhbCBkcml2ZXIgaW1wbGVtZW50YXRpb25zXG5mdW5jdGlvbiBiYXNlRHJpdmVyVW5pdFRlc3RzIChEcml2ZXJDbGFzcywgZGVmYXVsdENhcHMgPSB7fSkge1xuICBkZXNjcmliZSgnQmFzZURyaXZlcicsICgpID0+IHtcblxuICAgIGxldCBkO1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZCA9IG5ldyBEcml2ZXJDbGFzcygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RhdHVzIG9iamVjdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzdGF0dXMgPSBhd2FpdCBkLmdldFN0YXR1cygpO1xuICAgICAgc3RhdHVzLnNob3VsZC5lcWwoe30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYSBzZXNzaW9uSWQgZnJvbSBjcmVhdGVTZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IFtzZXNzSWRdID0gYXdhaXQgZC5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICAgIHNob3VsZC5leGlzdChzZXNzSWQpO1xuICAgICAgc2Vzc0lkLnNob3VsZC5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIHNlc3NJZC5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgYWJsZSB0byBzdGFydCB0d28gc2Vzc2lvbnMgd2l0aG91dCBjbG9zaW5nIHRoZSBmaXJzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnc2Vzc2lvbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGRlbGV0ZSBhIHNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2Vzc2lvbklkMSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIHNob3VsZC5lcXVhbChkLnNlc3Npb25JZCwgbnVsbCk7XG4gICAgICBsZXQgc2Vzc2lvbklkMiA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBzZXNzaW9uSWQxLnNob3VsZC5ub3QuZXFsKHNlc3Npb25JZDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGN1cnJlbnQgc2Vzc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBbLCBjYXBzXSA9IGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgICBjYXBzLnNob3VsZC5lcXVhbChhd2FpdCBkLmdldFNlc3Npb24oKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBzZXNzaW9ucyBpZiBubyBzZXNzaW9uIGV4aXN0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9ucyA9IGF3YWl0IGQuZ2V0U2Vzc2lvbnMoKTtcbiAgICAgIHNlc3Npb25zLmxlbmd0aC5zaG91bGQuZXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0gXy5jbG9uZShkZWZhdWx0Q2Fwcyk7XG4gICAgICBjYXBzLmEgPSAnY2FwJztcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICAgIGxldCBzZXNzaW9ucyA9IGF3YWl0IGQuZ2V0U2Vzc2lvbnMoKTtcblxuICAgICAgc2Vzc2lvbnMubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICAgIHNlc3Npb25zWzBdLnNob3VsZC5lcWwoe1xuICAgICAgICBpZDogZC5zZXNzaW9uSWQsXG4gICAgICAgIGNhcGFiaWxpdGllczogY2Fwc1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZ1bGZpbGwgYW4gdW5leHBlY3RlZCBkcml2ZXIgcXVpdCBwcm9taXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gbWFrZSBhIGNvbW1hbmQgdGhhdCB3aWxsIHdhaXQgYSBiaXQgc28gd2UgY2FuIGNyYXNoIHdoaWxlIGl0J3MgcnVubmluZ1xuICAgICAgZC5nZXRTdGF0dXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcbiAgICAgIH0uYmluZChkKTtcbiAgICAgIGxldCBjbWRQcm9taXNlID0gZC5leGVjdXRlQ29tbWFuZCgnZ2V0U3RhdHVzJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDApO1xuICAgICAgZC5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihuZXcgRXJyb3IoJ1dlIGNyYXNoZWQnKSk7XG4gICAgICBhd2FpdCBjbWRQcm9taXNlLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL1dlIGNyYXNoZWQvKTtcbiAgICAgIGF3YWl0IGQub25VbmV4cGVjdGVkU2h1dGRvd24uc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvV2UgY3Jhc2hlZC8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgY29tbWFuZHMgaW4gbWlkZGxlIG9mIHVuZXhwZWN0ZWQgc2h1dGRvd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBtYWtlIGEgY29tbWFuZCB0aGF0IHdpbGwgd2FpdCBhIGJpdCBzbyB3ZSBjYW4gY3Jhc2ggd2hpbGUgaXQncyBydW5uaW5nXG4gICAgICBkLm9sZERlbGV0ZVNlc3Npb24gPSBkLmRlbGV0ZVNlc3Npb247XG4gICAgICBkLmRlbGV0ZVNlc3Npb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcbiAgICAgICAgYXdhaXQgdGhpcy5vbGREZWxldGVTZXNzaW9uKCk7XG4gICAgICB9LmJpbmQoZCk7XG4gICAgICBsZXQgY2FwcyA9IF8uY2xvbmUoZGVmYXVsdENhcHMpO1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgICAgZC5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihuZXcgRXJyb3IoJ1dlIGNyYXNoZWQnKSk7XG4gICAgICBhd2FpdCBkLm9uVW5leHBlY3RlZFNodXRkb3duLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL1dlIGNyYXNoZWQvKTtcbiAgICAgIGF3YWl0IGQuZXhlY3V0ZUNvbW1hbmQoJ2dldFNlc3Npb24nKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9zaHV0IGRvd24vKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgbmV3IGNvbW1hbmRzIGFmdGVyIGRvbmUgc2h1dHRpbmcgZG93bicsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIG1ha2UgYSBjb21tYW5kIHRoYXQgd2lsbCB3YWl0IGEgYml0IHNvIHdlIGNhbiBjcmFzaCB3aGlsZSBpdCdzIHJ1bm5pbmdcbiAgICAgIGQub2xkRGVsZXRlU2Vzc2lvbiA9IGQuZGVsZXRlU2Vzc2lvbjtcbiAgICAgIGQuZGVsZXRlU2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgQi5kZWxheSgxMDApO1xuICAgICAgICBhd2FpdCB0aGlzLm9sZERlbGV0ZVNlc3Npb24oKTtcbiAgICAgIH0uYmluZChkKTtcbiAgICAgIGxldCBjYXBzID0gXy5jbG9uZShkZWZhdWx0Q2Fwcyk7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgICBkLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKG5ldyBFcnJvcignV2UgY3Jhc2hlZCcpKTtcbiAgICAgIGF3YWl0IGQub25VbmV4cGVjdGVkU2h1dGRvd24uc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvV2UgY3Jhc2hlZC8pO1xuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnZ2V0U2Vzc2lvbicpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL3NodXQgZG93bi8pO1xuICAgICAgYXdhaXQgQi5kZWxheSgxMDApO1xuICAgICAgYXdhaXQgZC5leGVjdXRlQ29tbWFuZCgnY3JlYXRlU2Vzc2lvbicsIGNhcHMpO1xuICAgICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYSBtZXRob2QgdG8gZ2V0IGRyaXZlciBmb3IgYSBzZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IFtzZXNzSWRdID0gYXdhaXQgZC5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICAgIGQuZHJpdmVyRm9yU2Vzc2lvbihzZXNzSWQpLnNob3VsZC5lcWwoZCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29tbWFuZCBxdWV1ZScsICgpID0+IHtcbiAgICAgIGxldCBkID0gbmV3IERyaXZlckNsYXNzKCk7XG5cbiAgICAgIGxldCB3YWl0TXMgPSAxMDtcbiAgICAgIGQuZ2V0U3RhdHVzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBCLmRlbGF5KHdhaXRNcyk7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgICAgfS5iaW5kKGQpO1xuXG4gICAgICBkLmdldFNlc3Npb25zID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBCLmRlbGF5KHdhaXRNcyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbXVsdGlwYXNzJyk7XG4gICAgICB9LmJpbmQoZCk7XG5cbiAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGQuY2xlYXJOZXdDb21tYW5kVGltZW91dCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcXVldWUgY29tbWFuZHMgYW5kLmV4ZWN1dGVDb21tYW5kL3Jlc3BvbmQgaW4gdGhlIG9yZGVyIHJlY2VpdmVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgbnVtQ21kcyA9IDEwO1xuICAgICAgICBsZXQgY21kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGNtZHMucHVzaChkLmV4ZWN1dGVDb21tYW5kKCdnZXRTdGF0dXMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBCLmFsbChjbWRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1DbWRzOyBpKyspIHtcbiAgICAgICAgICBpZiAocmVzdWx0c1tpXSA8PSByZXN1bHRzW2kgLSAxXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHb3QgcmVzdWx0IG91dCBvZiBvcmRlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGVycm9ycyBjb3JyZWN0bHkgd2hlbiBxdWV1aW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgbnVtQ21kcyA9IDEwO1xuICAgICAgICBsZXQgY21kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNtZHM7IGkrKykge1xuICAgICAgICAgIGlmIChpID09PSA1KSB7XG4gICAgICAgICAgICBjbWRzLnB1c2goZC5leGVjdXRlQ29tbWFuZCgnZ2V0U2Vzc2lvbnMnKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtZHMucHVzaChkLmV4ZWN1dGVDb21tYW5kKCdnZXRTdGF0dXMnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgQi5zZXR0bGUoY21kcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdHNbaV0udmFsdWUoKSA8PSByZXN1bHRzW2kgLSAxXS52YWx1ZSgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCByZXN1bHQgb3V0IG9mIG9yZGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHNbNV0ucmVhc29uKCkubWVzc2FnZS5zaG91bGQuY29udGFpbignbXVsdGlwYXNzJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSA3OyBpIDwgbnVtQ21kczsgaSsrKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdHNbaV0udmFsdWUoKSA8PSByZXN1bHRzW2kgLSAxXS52YWx1ZSgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvdCByZXN1bHQgb3V0IG9mIG9yZGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBub3QgY2FyZSBpZiBxdWV1ZSBlbXB0aWVzIGZvciBhIGJpdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IG51bUNtZHMgPSAxMDtcbiAgICAgICAgbGV0IGNtZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DbWRzOyBpKyspIHtcbiAgICAgICAgICBjbWRzLnB1c2goZC5leGVjdXRlQ29tbWFuZCgnZ2V0U3RhdHVzJykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgQi5hbGwoY21kcyk7XG4gICAgICAgIGNtZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DbWRzOyBpKyspIHtcbiAgICAgICAgICBjbWRzLnB1c2goZC5leGVjdXRlQ29tbWFuZCgnZ2V0U3RhdHVzJykpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMgPSBhd2FpdCBCLmFsbChjbWRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1DbWRzOyBpKyspIHtcbiAgICAgICAgICBpZiAocmVzdWx0c1tpXSA8PSByZXN1bHRzW2kgLSAxXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHb3QgcmVzdWx0IG91dCBvZiBvcmRlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndGltZW91dHMnLCAoKSA9PiB7XG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnY29tbWFuZCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBleGlzdCBieSBkZWZhdWx0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGQubmV3Q29tbWFuZFRpbWVvdXRNcy5zaG91bGQuZXF1YWwoNjAwMDApO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBzZXR0YWJsZSB0aHJvdWdoIGB0aW1lb3V0c2AnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgZC50aW1lb3V0cygnY29tbWFuZCcsIDIwKTtcbiAgICAgICAgICBkLm5ld0NvbW1hbmRUaW1lb3V0TXMuc2hvdWxkLmVxdWFsKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdpbXBsaWNpdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZXhpc3QgYnkgZGVmYXVsdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBkLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgc2V0dGFibGUgdGhyb3VnaCBgdGltZW91dHNgJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IGQudGltZW91dHMoJ2ltcGxpY2l0JywgMjApO1xuICAgICAgICAgIGQuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxdWFsKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwcm94eWluZycsICgpID0+IHtcbiAgICAgIGxldCBzZXNzSWQ7XG4gICAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgW3Nlc3NJZF0gPSBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnI3Byb3h5QWN0aXZlJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgIGQucHJveHlBY3RpdmUuc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoRnVuY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgZC5wcm94eUFjdGl2ZShzZXNzSWQpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBzZXNzaW9uSWQgaXMgd3JvbmcnLCAoKSA9PiB7XG4gICAgICAgICAgKCgpID0+IHsgZC5wcm94eUFjdGl2ZSgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJyNnZXRQcm94eUF2b2lkTGlzdCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgICBkLmdldFByb3h5QXZvaWRMaXN0LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5JywgKCkgPT4ge1xuICAgICAgICAgIGQuZ2V0UHJveHlBdm9pZExpc3Qoc2Vzc0lkKS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihBcnJheSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gc2Vzc2lvbklkIGlzIHdyb25nJywgKCkgPT4ge1xuICAgICAgICAgICgoKSA9PiB7IGQuZ2V0UHJveHlBdm9pZExpc3QoJ2FhYScpOyB9KS5zaG91bGQudGhyb3c7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCcjY2FuUHJveHknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhICNjYW5Qcm94eSBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgICAgZC5jYW5Qcm94eS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmcm9tICNjYW5Qcm94eScsICgpID0+IHtcbiAgICAgICAgICBkLmNhblByb3h5KHNlc3NJZCkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciB3aGVuIHNlc3Npb25JZCBpcyB3cm9uZycsICgpID0+IHtcbiAgICAgICAgICAoKCkgPT4geyBkLmNhblByb3h5KCk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VEcml2ZXJVbml0VGVzdHM7XG4iXX0=