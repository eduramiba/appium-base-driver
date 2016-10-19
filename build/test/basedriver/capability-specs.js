'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libBasedriverLogger = require('../../lib/basedriver/logger');

var _libBasedriverLogger2 = _interopRequireDefault(_libBasedriverLogger);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Desired Capabilities', function () {

  var d = undefined;

  beforeEach(function () {
    d = new _2['default']();
    _sinon2['default'].spy(_libBasedriverLogger2['default'], 'warn');
  });

  afterEach(function () {
    _libBasedriverLogger2['default'].warn.restore();
  });

  it('should require platformName and deviceName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({}));

        case 3:
          context$2$0.next = 11;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 11:

          should.fail('error should have been thrown');

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should require platformName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({ 'platformName': 'iOS' }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should require deviceName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({ 'deviceName': 'Delorean' }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  it('should not care about cap order', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(d.createSession({
            deviceName: 'Delorean',
            platformName: 'iOS'
          }));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should check required caps which are added to driver', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            necessary: {
              presence: true
            },
            proper: {
              presence: true,
              isString: true,
              inclusion: ['Delorean', 'Reventon']
            }
          };

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean'
          }));

        case 4:
          context$2$0.next = 12;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('necessary');
          context$2$0.t0.message.should.contain('proper');
          return context$2$0.abrupt('return');

        case 12:

          should.fail('error should have been thrown');

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[1, 6]]);
  });

  it('should check added required caps in addition to base', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            necessary: {
              presence: true
            },
            proper: {
              presence: true,
              isString: true,
              inclusion: ['Delorean', 'Reventon']
            }
          };

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            necessary: 'yup',
            proper: 'yup, your highness'
          }));

        case 4:
          context$2$0.next = 12;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          context$2$0.t0.message.should.contain('deviceName');
          return context$2$0.abrupt('return');

        case 12:

          should.fail('error should have been thrown');

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[1, 6]]);
  });

  it('should accept extra capabilities', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'extra': 'cheese',
            'hold the': 'sauce'
          }));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should log the use of extra caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'extra': 'cheese',
            'hold the': 'sauce'
          }));

        case 3:

          _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should be sensitive to the case of caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformname': 'iOS',
            'deviceName': 'Delorean'
          }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });

  describe('boolean capabilities', function () {
    it('should allow a string "false"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'noReset': 'false'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.noReset.should.eql(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "true"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'noReset': 'true'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.noReset.should.eql(true);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "true" in string capabilities', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'language': 'true'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.language.should.eql('true');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('number capabilities', function () {
    it('should allow a string "1"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'newCommandTimeout': '1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.newCommandTimeout.should.eql(1);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "1.1"', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'newCommandTimeout': '1.1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.newCommandTimeout.should.eql(1.1);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should allow a string "1" in string capabilities', function callee$2$0() {
      var sessions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(d.createSession({
              'platformName': 'iOS',
              'deviceName': 'Delorean',
              'language': '1'
            }));

          case 2:
            _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(d.getSessions());

          case 5:
            sessions = context$3$0.sent;

            sessions[0].capabilities.language.should.eql('1');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  it('should error if objects in caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': { a: 'iOS' },
            'deviceName': 'Delorean'
          }));

        case 3:
          context$2$0.next = 10;
          break;

        case 5:
          context$2$0.prev = 5;
          context$2$0.t0 = context$2$0['catch'](0);

          context$2$0.t0.should.be['instanceof'](_.errors.SessionNotCreatedError);
          context$2$0.t0.message.should.contain('platformName');
          return context$2$0.abrupt('return');

        case 10:

          should.fail('error should have been thrown');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[0, 5]]);
  });

  it('should check for deprecated caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          d.desiredCapConstraints = {
            'lynx-version': {
              deprecated: true
            }
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'lynx-version': 5
          }));

        case 4:

          _libBasedriverLogger2['default'].warn.callCount.should.be.above(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should not warn if deprecated=false', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(500);

          d.desiredCapConstraints = {
            'lynx-version': {
              deprecated: false
            }
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(d.createSession({
            'platformName': 'iOS',
            'deviceName': 'Delorean',
            'lynx-version': 5
          }));

        case 4:

          _libBasedriverLogger2['default'].warn.callCount.should.equal(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should not validate against null/undefined caps', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            'foo': {
              isString: true
            }
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: null
          }));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: 1
          }).should.eventually.be.rejectedWith(/was not valid/));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: undefined
          }));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: ''
          }));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(d.deleteSession());

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should still validate null/undefined caps whose presence is required', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          d.desiredCapConstraints = {
            foo: {
              presence: true
            }
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: null
          }).should.eventually.be.rejectedWith(/blank/));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(d.createSession({
            platformName: 'iOS',
            deviceName: 'Dumb',
            foo: ''
          }).should.eventually.be.rejectedWith(/blank/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXR5LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2dCQUE4QyxPQUFPOzs7O29CQUNwQyxNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OzttQ0FDMUIsNkJBQTZCOzs7O3FCQUM5QixPQUFPOzs7O0FBRXpCLElBQU0sTUFBTSxHQUFHLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQzdCLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFNOztBQUVyQyxNQUFJLENBQUMsWUFBQSxDQUFDOztBQUVOLFlBQVUsQ0FBQyxZQUFNO0FBQ2YsS0FBQyxHQUFHLG1CQUFnQixDQUFDO0FBQ3JCLHVCQUFNLEdBQUcsbUNBQVMsTUFBTSxDQUFDLENBQUM7R0FDM0IsQ0FBQyxDQUFDOztBQUVILFdBQVMsQ0FBQyxZQUFNO0FBQ2QscUNBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3ZCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsNENBQTRDLEVBQUU7Ozs7OzsyQ0FFdkMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUFFekIseUJBQUUsTUFBTSxDQUFDLEVBQUUsY0FBVyxDQUFDLFNBQU8sc0JBQXNCLENBQUMsQ0FBQztBQUN0RCx5QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6Qyx5QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7QUFJekMsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDZCQUE2QixFQUFFOzs7Ozs7MkNBRXhCLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFDLENBQUM7Ozs7Ozs7Ozs7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QUMsYUFBYSxDQUFDO0FBQ3BCLHdCQUFZLEVBQUUsS0FBSztBQUNuQixzQkFBVSxFQUFFLE1BQU07QUFDbEIsZUFBRyxFQUFFLFNBQVM7V0FDZixDQUFDOzs7OzJDQUNJLENBQUMsQ0FBQyxhQUFhLEVBQUU7Ozs7MkNBRWpCLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDcEIsd0JBQVksRUFBRSxLQUFLO0FBQ25CLHNCQUFVLEVBQUUsTUFBTTtBQUNsQixlQUFHLEVBQUUsRUFBRTtXQUNSLENBQUM7Ozs7MkNBQ0ksQ0FBQyxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUN4QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHNFQUFzRSxFQUFFOzs7O0FBQ3pFLFdBQUMsQ0FBQyxxQkFBcUIsR0FBRztBQUN4QixlQUFHLEVBQUU7QUFDSCxzQkFBUSxFQUFFLElBQUk7YUFDZjtXQUNGLENBQUM7OzsyQ0FFSSxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQ3BCLHdCQUFZLEVBQUUsS0FBSztBQUNuQixzQkFBVSxFQUFFLE1BQU07QUFDbEIsZUFBRyxFQUFFLElBQUk7V0FDVixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OzsyQ0FFdkMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUNwQix3QkFBWSxFQUFFLEtBQUs7QUFDbkIsc0JBQVUsRUFBRSxNQUFNO0FBQ2xCLGVBQUcsRUFBRSxFQUFFO1dBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FFOUMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXR5LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmYXVsdCBhcyBCYXNlRHJpdmVyLCBlcnJvcnMgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vLi4vbGliL2Jhc2Vkcml2ZXIvbG9nZ2VyJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdEZXNpcmVkIENhcGFiaWxpdGllcycsICgpID0+IHtcblxuICBsZXQgZDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBkID0gbmV3IEJhc2VEcml2ZXIoKTtcbiAgICBzaW5vbi5zcHkobG9nZ2VyLCAnd2FybicpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGxvZ2dlci53YXJuLnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXF1aXJlIHBsYXRmb3JtTmFtZSBhbmQgZGV2aWNlTmFtZScsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHt9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbigncGxhdGZvcm1OYW1lJyk7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ2RldmljZU5hbWUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGQuZmFpbCgnZXJyb3Igc2hvdWxkIGhhdmUgYmVlbiB0aHJvd24nKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXF1aXJlIHBsYXRmb3JtTmFtZScsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHsncGxhdGZvcm1OYW1lJzogJ2lPUyd9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbignZGV2aWNlTmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZC5mYWlsKCdlcnJvciBzaG91bGQgaGF2ZSBiZWVuIHRocm93bicpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlcXVpcmUgZGV2aWNlTmFtZScsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHsnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbid9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNob3VsZC5iZS5pbnN0YW5jZW9mKGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbigncGxhdGZvcm1OYW1lJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkLmZhaWwoJ2Vycm9yIHNob3VsZCBoYXZlIGJlZW4gdGhyb3duJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbm90IGNhcmUgYWJvdXQgY2FwIG9yZGVyJywgYXN5bmMgKCkgPT4ge1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgIGRldmljZU5hbWU6ICdEZWxvcmVhbicsXG4gICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnXG4gICAgfSk7XG5cbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjaGVjayByZXF1aXJlZCBjYXBzIHdoaWNoIGFyZSBhZGRlZCB0byBkcml2ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgZC5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7XG4gICAgICBuZWNlc3Nhcnk6IHtcbiAgICAgICAgcHJlc2VuY2U6IHRydWVcbiAgICAgIH0sXG4gICAgICBwcm9wZXI6IHtcbiAgICAgICAgcHJlc2VuY2U6IHRydWUsXG4gICAgICAgIGlzU3RyaW5nOiB0cnVlLFxuICAgICAgICBpbmNsdXNpb246IFsnRGVsb3JlYW4nLCAnUmV2ZW50b24nXVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbidcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc2hvdWxkLmJlLmluc3RhbmNlb2YoZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCduZWNlc3NhcnknKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbigncHJvcGVyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkLmZhaWwoJ2Vycm9yIHNob3VsZCBoYXZlIGJlZW4gdGhyb3duJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgY2hlY2sgYWRkZWQgcmVxdWlyZWQgY2FwcyBpbiBhZGRpdGlvbiB0byBiYXNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGQuZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge1xuICAgICAgbmVjZXNzYXJ5OiB7XG4gICAgICAgIHByZXNlbmNlOiB0cnVlXG4gICAgICB9LFxuICAgICAgcHJvcGVyOiB7XG4gICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICBpc1N0cmluZzogdHJ1ZSxcbiAgICAgICAgaW5jbHVzaW9uOiBbJ0RlbG9yZWFuJywgJ1JldmVudG9uJ11cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgIG5lY2Vzc2FyeTogJ3l1cCcsXG4gICAgICAgIHByb3BlcjogJ3l1cCwgeW91ciBoaWdobmVzcydcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc2hvdWxkLmJlLmluc3RhbmNlb2YoZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdwbGF0Zm9ybU5hbWUnKTtcbiAgICAgIGUubWVzc2FnZS5zaG91bGQuY29udGFpbignZGV2aWNlTmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZC5mYWlsKCdlcnJvciBzaG91bGQgaGF2ZSBiZWVuIHRocm93bicpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGFjY2VwdCBleHRyYSBjYXBhYmlsaXRpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICdleHRyYSc6ICdjaGVlc2UnLFxuICAgICAgJ2hvbGQgdGhlJzogJ3NhdWNlJ1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGxvZyB0aGUgdXNlIG9mIGV4dHJhIGNhcHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50aW1lb3V0KDUwMCk7XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgJ2V4dHJhJzogJ2NoZWVzZScsXG4gICAgICAnaG9sZCB0aGUnOiAnc2F1Y2UnXG4gICAgfSk7XG5cbiAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmJlLmFib3ZlKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGJlIHNlbnNpdGl2ZSB0byB0aGUgY2FzZSBvZiBjYXBzJywgYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICAncGxhdGZvcm1uYW1lJzogJ2lPUycsXG4gICAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJ1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zaG91bGQuYmUuaW5zdGFuY2VvZihlcnJvcnMuU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcik7XG4gICAgICBlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3BsYXRmb3JtTmFtZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZC5mYWlsKCdlcnJvciBzaG91bGQgaGF2ZSBiZWVuIHRocm93bicpO1xuICB9KTtcblxuICBkZXNjcmliZSgnYm9vbGVhbiBjYXBhYmlsaXRpZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhIHN0cmluZyBcImZhbHNlXCInLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgICAncGxhdGZvcm1OYW1lJzogJ2lPUycsXG4gICAgICAgICdkZXZpY2VOYW1lJzogJ0RlbG9yZWFuJyxcbiAgICAgICAgJ25vUmVzZXQnOiAnZmFsc2UnXG4gICAgICB9KTtcbiAgICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuYmUuYWJvdmUoMCk7XG5cbiAgICAgIGxldCBzZXNzaW9ucyA9IGF3YWl0IGQuZ2V0U2Vzc2lvbnMoKTtcbiAgICAgIHNlc3Npb25zWzBdLmNhcGFiaWxpdGllcy5ub1Jlc2V0LnNob3VsZC5lcWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhIHN0cmluZyBcInRydWVcIicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgICAnbm9SZXNldCc6ICd0cnVlJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmJlLmFib3ZlKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubm9SZXNldC5zaG91bGQuZXFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhIHN0cmluZyBcInRydWVcIiBpbiBzdHJpbmcgY2FwYWJpbGl0aWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAgICdsYW5ndWFnZSc6ICd0cnVlJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubGFuZ3VhZ2Uuc2hvdWxkLmVxbCgndHJ1ZScpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnbnVtYmVyIGNhcGFiaWxpdGllcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGFsbG93IGEgc3RyaW5nIFwiMVwiJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAgICduZXdDb21tYW5kVGltZW91dCc6ICcxJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmJlLmFib3ZlKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubmV3Q29tbWFuZFRpbWVvdXQuc2hvdWxkLmVxbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgYSBzdHJpbmcgXCIxLjFcIicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnaU9TJyxcbiAgICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgICAnbmV3Q29tbWFuZFRpbWVvdXQnOiAnMS4xJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmJlLmFib3ZlKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubmV3Q29tbWFuZFRpbWVvdXQuc2hvdWxkLmVxbCgxLjEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBhIHN0cmluZyBcIjFcIiBpbiBzdHJpbmcgY2FwYWJpbGl0aWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAgICdsYW5ndWFnZSc6ICcxJ1xuICAgICAgfSk7XG4gICAgICBsb2dnZXIud2Fybi5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDApO1xuXG4gICAgICBsZXQgc2Vzc2lvbnMgPSBhd2FpdCBkLmdldFNlc3Npb25zKCk7XG4gICAgICBzZXNzaW9uc1swXS5jYXBhYmlsaXRpZXMubGFuZ3VhZ2Uuc2hvdWxkLmVxbCgnMScpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCAoJ3Nob3VsZCBlcnJvciBpZiBvYmplY3RzIGluIGNhcHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiB7YTogJ2lPUyd9LFxuICAgICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbidcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc2hvdWxkLmJlLmluc3RhbmNlb2YoZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IpO1xuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdwbGF0Zm9ybU5hbWUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG91bGQuZmFpbCgnZXJyb3Igc2hvdWxkIGhhdmUgYmVlbiB0aHJvd24nKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBjaGVjayBmb3IgZGVwcmVjYXRlZCBjYXBzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudGltZW91dCg1MDApO1xuXG4gICAgZC5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7XG4gICAgICAnbHlueC12ZXJzaW9uJzoge1xuICAgICAgICBkZXByZWNhdGVkOiB0cnVlXG4gICAgICB9XG4gICAgfTtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICAncGxhdGZvcm1OYW1lJzogJ2lPUycsXG4gICAgICAnZGV2aWNlTmFtZSc6ICdEZWxvcmVhbicsXG4gICAgICAnbHlueC12ZXJzaW9uJzogNVxuICAgIH0pO1xuXG4gICAgbG9nZ2VyLndhcm4uY2FsbENvdW50LnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBub3Qgd2FybiBpZiBkZXByZWNhdGVkPWZhbHNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudGltZW91dCg1MDApO1xuXG4gICAgZC5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7XG4gICAgICAnbHlueC12ZXJzaW9uJzoge1xuICAgICAgICBkZXByZWNhdGVkOiBmYWxzZVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdpT1MnLFxuICAgICAgJ2RldmljZU5hbWUnOiAnRGVsb3JlYW4nLFxuICAgICAgJ2x5bngtdmVyc2lvbic6IDVcbiAgICB9KTtcblxuICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgbm90IHZhbGlkYXRlIGFnYWluc3QgbnVsbC91bmRlZmluZWQgY2FwcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IHtcbiAgICAgICdmb28nOiB7XG4gICAgICAgIGlzU3RyaW5nOiB0cnVlXG4gICAgICB9XG4gICAgfTtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgZGV2aWNlTmFtZTogJ0R1bWInLFxuICAgICAgZm9vOiBudWxsXG4gICAgfSk7XG4gICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgIGRldmljZU5hbWU6ICdEdW1iJyxcbiAgICAgIGZvbzogMVxuICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvd2FzIG5vdCB2YWxpZC8pO1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICBkZXZpY2VOYW1lOiAnRHVtYicsXG4gICAgICBmb286IHVuZGVmaW5lZFxuICAgIH0pO1xuICAgIGF3YWl0IGQuZGVsZXRlU2Vzc2lvbigpO1xuXG4gICAgYXdhaXQgZC5jcmVhdGVTZXNzaW9uKHtcbiAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICBkZXZpY2VOYW1lOiAnRHVtYicsXG4gICAgICBmb286ICcnXG4gICAgfSk7XG4gICAgYXdhaXQgZC5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc3RpbGwgdmFsaWRhdGUgbnVsbC91bmRlZmluZWQgY2FwcyB3aG9zZSBwcmVzZW5jZSBpcyByZXF1aXJlZCcsIGFzeW5jICgpID0+IHtcbiAgICBkLmRlc2lyZWRDYXBDb25zdHJhaW50cyA9IHtcbiAgICAgIGZvbzoge1xuICAgICAgICBwcmVzZW5jZTogdHJ1ZVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oe1xuICAgICAgcGxhdGZvcm1OYW1lOiAnaU9TJyxcbiAgICAgIGRldmljZU5hbWU6ICdEdW1iJyxcbiAgICAgIGZvbzogbnVsbFxuICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvYmxhbmsvKTtcblxuICAgIGF3YWl0IGQuY3JlYXRlU2Vzc2lvbih7XG4gICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgZGV2aWNlTmFtZTogJ0R1bWInLFxuICAgICAgZm9vOiAnJ1xuICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvYmxhbmsvKTtcblxuICB9KTtcbn0pO1xuIl19