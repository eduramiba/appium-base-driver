'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mjsonwp = require('../mjsonwp');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _desiredCaps = require('./desired-caps');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var NEW_COMMAND_TIMEOUT_MS = 60 * 1000;

var BaseDriver = (function (_MobileJsonWireProtocol) {
  _inherits(BaseDriver, _MobileJsonWireProtocol);

  function BaseDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, BaseDriver);

    _get(Object.getPrototypeOf(BaseDriver.prototype), 'constructor', this).call(this);

    // setup state
    this.sessionId = null;
    this.opts = opts;
    this.caps = null;
    this.helpers = _helpers2['default'];

    // timeout initialization
    this.newCommandTimeoutMs = NEW_COMMAND_TIMEOUT_MS;
    this.implicitWaitMs = 0;

    this._constraints = _lodash2['default'].cloneDeep(_desiredCaps.desiredCapabilityConstraints);
    this.locatorStrategies = [];
    this.webLocatorStrategies = [];

    // use a custom tmp dir to avoid losing data and app when computer is
    // restarted
    this.opts.tmpDir = this.opts.tmpDir || process.env.APPIUM_TMP_DIR || _os2['default'].tmpDir();

    // base-driver internals
    this.curCommand = new _bluebird2['default'](function (r) {
      r();
    }); // see note in execute
    this.curCommandCancellable = new _bluebird2['default'](function (r) {
      r();
    }); // see note in execute
    this.shutdownUnexpectedly = false;
    this.noCommandTimer = null;
    this.shouldValidateCaps = shouldValidateCaps;
    // settings should be instantiated by implementing drivers
    this.settings = null;
    this.resetOnUnexpectedShutdown();

    // keeping track of initial opts
    this.initialOpts = _lodash2['default'].cloneDeep(this.opts);

    // allow subclasses to have internal drivers
    this.managedDrivers = [];
  }

  /*
   * Overridden in appium driver, but here so that individual drivers can be
   * tested with clients that poll
   */

  _createClass(BaseDriver, [{
    key: 'getStatus',
    value: function getStatus() {
      return _regeneratorRuntime.async(function getStatus$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', {});

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /*
     * Initialize a new onUnexpectedShutdown promise, cancelling existing one.
     */
  }, {
    key: 'resetOnUnexpectedShutdown',
    value: function resetOnUnexpectedShutdown() {
      var _this = this;

      if (this.onUnexpectedShutdown && !this.onUnexpectedShutdown.isFulfilled()) {
        this.onUnexpectedShutdown.cancel();
      }
      this.onUnexpectedShutdown = new _bluebird2['default'](function (resolve, reject) {
        _this.unexpectedShutdownDeferred = { resolve: resolve, reject: reject };
      }).cancellable();
      // noop handler to avoid warning.
      this.onUnexpectedShutdown['catch'](function () {});
    }

    // we only want subclasses to ever extend the contraints
  }, {
    key: 'sessionExists',

    // method required by MJSONWP in order to determine whether it should
    // respond with an invalid session response
    value: function sessionExists(sessionId) {
      if (!sessionId) return false;
      return sessionId === this.sessionId;
    }

    // method required by MJSONWP in order to determine if the command should
    // be proxied directly to the driver
  }, {
    key: 'driverForSession',
    value: function driverForSession() /*sessionId*/{
      return this;
    }
  }, {
    key: 'logExtraCaps',
    value: function logExtraCaps(caps) {
      var extraCaps = _lodash2['default'].difference(_lodash2['default'].keys(caps), _lodash2['default'].keys(this._constraints));
      if (extraCaps.length) {
        _logger2['default'].warn('The following capabilities were provided, but are not ' + ('recognized by appium: ' + extraCaps.join(', ') + '.'));
      }
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      if (!this.shouldValidateCaps) {
        return true;
      }

      // we validate on only caps that are not null or undefined so that if
      // someone sends in e.g. null they don't get a 'was not a string'
      // error; just count as though it weren't sent in at all
      var validationErrors = _desiredCaps.validator.validate(_lodash2['default'].pickBy(caps, _appiumSupport.util.hasValue), this._constraints, { fullMessages: false });

      if (validationErrors) {
        var message = 'The desiredCapabilities object was not valid for the ' + 'following reason(s):';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(_lodash2['default'].toPairs(validationErrors)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var attribute = _step$value[0];
            var reasons = _step$value[1];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _getIterator(reasons), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var reason = _step2.value;

                message += ' ' + attribute + ' ' + reason + ',';
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        message = message.slice(0, -1) + '.';
        _logger2['default'].errorAndThrow(new _mjsonwp.errors.SessionNotCreatedError(message));
      }

      this.logExtraCaps(caps);

      return true;
    }

    // This is the main command handler for the driver. It wraps command
    // execution with timeout logic, checking that we have a valid session,
    // and ensuring that we execute commands one at a time. This method is called
    // by MJSONWP's express router.
  }, {
    key: 'executeCommand',
    value: function executeCommand(cmd) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var nextCommand, res;
      return _regeneratorRuntime.async(function executeCommand$(context$2$0) {
        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // if we had a command timer running, clear it now that we're starting
            // a new command and so don't want to time out
            this.clearNewCommandTimeout();

            // if we don't have this command, it must not be implemented

            if (this[cmd]) {
              context$2$0.next = 3;
              break;
            }

            throw new _mjsonwp.errors.NotYetImplementedError();

          case 3:
            nextCommand = this.curCommand.then(function () {
              // if we unexpectedly shut down, we need to reject every command in
              // the queue before we actually try to run it
              if (_this2.shutdownUnexpectedly) {
                return _bluebird2['default'].reject(new _mjsonwp.errors.NoSuchDriverError('The driver was unexpectedly shut down!'));
              }
              // We also need to turn the command into a cancellable promise so if we
              // have an unexpected shutdown event, for example, we can cancel it from
              // outside, rejecting the current command immediately
              _this2.curCommandCancellable = new _bluebird2['default'](function (r) {
                r();
              }).then(function () {
                return _this2[cmd].apply(_this2, args);
              }).cancellable();
              return _this2.curCommandCancellable;
            });

            this.curCommand = nextCommand['catch'](function () {});
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(nextCommand);

          case 7:
            res = context$2$0.sent;

            // if we have set a new command timeout (which is the default), start a
            // timer once we've finished executing this command. If we don't clear
            // the timer (which is done when a new command comes in), we will trigger
            // automatic session deletion in this.onCommandTimeout. Of course we don't
            // want to trigger the timer when the user is shutting down the session
            // intentionally
            if (cmd !== 'deleteSession') {
              // reseting existing timeout
              this.startNewCommandTimeout();
            }

            return context$2$0.abrupt('return', res);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startUnexpectedShutdown',
    value: function startUnexpectedShutdown() {
      var err = arguments.length <= 0 || arguments[0] === undefined ? new _mjsonwp.errors.NoSuchDriverError('The driver was unexpectedly shut down!') : arguments[0];
      return _regeneratorRuntime.async(function startUnexpectedShutdown$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.unexpectedShutdownDeferred.reject(err); // allow others to listen for this
            this.curCommandCancellable.cancel(err);
            this.shutdownUnexpectedly = true;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.deleteSession(this.sessionId));

          case 5:
            this.shutdownUnexpectedly = false;

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'validateLocatorStrategy',
    value: function validateLocatorStrategy(strategy) {
      var webContext = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var validStrategies = this.locatorStrategies;
      _logger2['default'].debug('Valid locator strategies for this request: ' + validStrategies.join(', '));

      if (webContext) {
        validStrategies = validStrategies.concat(this.webLocatorStrategies);
      }

      if (!_lodash2['default'].includes(validStrategies, strategy)) {
        throw new _mjsonwp.errors.InvalidSelectorError('Locator Strategy \'' + strategy + '\' is not supported for this session');
      }
    }

    /*
     * Restart the session with the original caps,
     * preserving the timeout config.
     */
  }, {
    key: 'reset',
    value: function reset() {
      var currentConfig, _arr, _i, property, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, key, value;

      return _regeneratorRuntime.async(function reset$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Resetting app mid-session');
            _logger2['default'].debug('Running generic full reset');

            // preserving state
            currentConfig = {};
            _arr = ['implicitWaitMs', 'newCommandTimeoutMs', 'sessionId', 'resetOnUnexpectedShutdown'];

            for (_i = 0; _i < _arr.length; _i++) {
              property = _arr[_i];

              currentConfig[property] = this[property];
            }

            // We also need to preserve the unexpected shutdown, and make sure it is not cancelled during reset.
            this.resetOnUnexpectedShutdown = function () {};

            context$2$0.prev = 6;
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(this.deleteSession(this.sessionId));

          case 9:
            _logger2['default'].debug('Restarting app');
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.createSession(this.caps));

          case 12:
            context$2$0.prev = 12;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 16;

            // always restore state.
            for (_iterator3 = _getIterator(_lodash2['default'].toPairs(currentConfig)); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              _step3$value = _slicedToArray(_step3.value, 2);
              key = _step3$value[0];
              value = _step3$value[1];

              this[key] = value;
            }
            context$2$0.next = 24;
            break;

          case 20:
            context$2$0.prev = 20;
            context$2$0.t0 = context$2$0['catch'](16);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t0;

          case 24:
            context$2$0.prev = 24;
            context$2$0.prev = 25;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 27:
            context$2$0.prev = 27;

            if (!_didIteratorError3) {
              context$2$0.next = 30;
              break;
            }

            throw _iteratorError3;

          case 30:
            return context$2$0.finish(27);

          case 31:
            return context$2$0.finish(24);

          case 32:
            return context$2$0.finish(12);

          case 33:
            this.clearNewCommandTimeout();

          case 34:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[6,, 12, 33], [16, 20, 24, 32], [25,, 27, 31]]);
    }
  }, {
    key: 'getSwipeOptions',
    value: function getSwipeOptions(gestures) {
      var touchCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
      var startX, startY, endX, endY, duration, element, destElement, locResult, sizeResult, offsetX, offsetY, firstElLocation;
      return _regeneratorRuntime.async(function getSwipeOptions$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            startX = this.helpers.getCoordDefault(gestures[0].options.x), startY = this.helpers.getCoordDefault(gestures[0].options.y), endX = this.helpers.getCoordDefault(gestures[2].options.x), endY = this.helpers.getCoordDefault(gestures[2].options.y), duration = this.helpers.getSwipeTouchDuration(gestures[1]), element = gestures[0].options.element, destElement = gestures[2].options.element || gestures[0].options.element;

            if (!_appiumSupport.util.hasValue(destElement)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.getLocationInView(destElement));

          case 4:
            locResult = context$2$0.sent;
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.getSize(destElement));

          case 7:
            sizeResult = context$2$0.sent;
            offsetX = Math.abs(endX) < 1 && Math.abs(endX) > 0 ? sizeResult.width * endX : endX;
            offsetY = Math.abs(endY) < 1 && Math.abs(endY) > 0 ? sizeResult.height * endY : endY;

            endX = locResult.x + offsetX;
            endY = locResult.y + offsetY;
            // if the target element was provided, the coordinates for the destination need to be relative to it.

            if (!_appiumSupport.util.hasValue(element)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.getLocationInView(element));

          case 15:
            firstElLocation = context$2$0.sent;

            endX -= firstElLocation.x;
            endY -= firstElLocation.y;

          case 18:
            return context$2$0.abrupt('return', { startX:
              // clients are responsible to use these options correctly
              startX, startY: startY, endX: endX, endY: endY, duration: duration, touchCount: touchCount, element: element });

          case 19:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive() /* sessionId */{
      return false;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList() /* sessionId */{
      return [];
    }
  }, {
    key: 'canProxy',
    value: function canProxy() /* sessionId */{
      return false;
    }
  }, {
    key: 'addManagedDriver',
    value: function addManagedDriver(driver) {
      this.managedDrivers.push(driver);
    }
  }, {
    key: 'getManagedDrivers',
    value: function getManagedDrivers() {
      return this.managedDrivers;
    }
  }, {
    key: 'desiredCapConstraints',
    set: function set(constraints) {
      this._constraints = _Object$assign(this._constraints, constraints);
    },
    get: function get() {
      return this._constraints;
    }
  }]);

  return BaseDriver;
})(_mjsonwp.MobileJsonWireProtocol);

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {

  for (var _iterator4 = _getIterator(_lodash2['default'].toPairs(_commands2['default'])), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _step4$value = _slicedToArray(_step4.value, 2);

    var cmd = _step4$value[0];
    var fn = _step4$value[1];

    BaseDriver.prototype[cmd] = fn;
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
      _iterator4['return']();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

exports['default'] = BaseDriver;
module.exports = exports['default'];

// What we're doing here is pretty clever. this.curCommand is always
// a promise representing the command currently being executed by the
// driver, or the last command executed by the driver (it starts off as
// essentially a pre-resolved promise). When a command comes in, we tack it
// to the end of this.curCommand, essentially saying we want to execute it
// whenever this.curCommand is done. We call this new promise nextCommand,
// and its resolution is what we ultimately will return to whomever called
// us. Meanwhile, we reset this.curCommand to _be_ nextCommand (but
// ignoring any rejections), so that if another command comes into the
// server, it gets tacked on to the end of nextCommand. Thus we create
// a chain of promises that acts as a queue with single concurrency.

// there's no destination element handling in bootstrap and since it applies to all platforms, we handle it here
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2RyaXZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQ3VCLFlBQVk7O2tCQUNwQixJQUFJOzs7O3dCQUNFLFlBQVk7Ozs7dUJBQ2IsV0FBVzs7OztzQkFDZixVQUFVOzs7OzJCQUM4QixnQkFBZ0I7O3dCQUMxRCxVQUFVOzs7O3NCQUNWLFFBQVE7Ozs7NkJBQ0QsZ0JBQWdCOztBQUdyQyxJQUFNLHNCQUFzQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7O0lBRW5DLFVBQVU7WUFBVixVQUFVOztBQUVGLFdBRlIsVUFBVSxHQUVxQztRQUF0QyxJQUFJLHlEQUFHLEVBQUU7UUFBRSxrQkFBa0IseURBQUcsSUFBSTs7MEJBRjdDLFVBQVU7O0FBR1osK0JBSEUsVUFBVSw2Q0FHSjs7O0FBR1IsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLE9BQU8sdUJBQVUsQ0FBQzs7O0FBR3ZCLFFBQUksQ0FBQyxtQkFBbUIsR0FBRyxzQkFBc0IsQ0FBQztBQUNsRCxRQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQzs7QUFFeEIsUUFBSSxDQUFDLFlBQVksR0FBRyxvQkFBRSxTQUFTLDJDQUE4QixDQUFDO0FBQzlELFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDNUIsUUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQzs7OztBQUkvQixRQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQzFCLGdCQUFHLE1BQU0sRUFBRSxDQUFDOzs7QUFHL0IsUUFBSSxDQUFDLFVBQVUsR0FBRywwQkFBTSxVQUFD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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2JpbGVKc29uV2lyZVByb3RvY29sLFxuICAgICAgICAgZXJyb3JzIH0gZnJvbSAnLi4vbWpzb253cCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cywgdmFsaWRhdG9yIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5cblxuY29uc3QgTkVXX0NPTU1BTkRfVElNRU9VVF9NUyA9IDYwICogMTAwMDtcblxuY2xhc3MgQmFzZURyaXZlciBleHRlbmRzIE1vYmlsZUpzb25XaXJlUHJvdG9jb2wge1xuXG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gc2V0dXAgc3RhdGVcbiAgICB0aGlzLnNlc3Npb25JZCA9IG51bGw7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLmNhcHMgPSBudWxsO1xuICAgIHRoaXMuaGVscGVycyA9IGhlbHBlcnM7XG5cbiAgICAvLyB0aW1lb3V0IGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5uZXdDb21tYW5kVGltZW91dE1zID0gTkVXX0NPTU1BTkRfVElNRU9VVF9NUztcbiAgICB0aGlzLmltcGxpY2l0V2FpdE1zID0gMDtcblxuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gXy5jbG9uZURlZXAoZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cyk7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFtdO1xuICAgIHRoaXMud2ViTG9jYXRvclN0cmF0ZWdpZXMgPSBbXTtcblxuICAgIC8vIHVzZSBhIGN1c3RvbSB0bXAgZGlyIHRvIGF2b2lkIGxvc2luZyBkYXRhIGFuZCBhcHAgd2hlbiBjb21wdXRlciBpc1xuICAgIC8vIHJlc3RhcnRlZFxuICAgIHRoaXMub3B0cy50bXBEaXIgPSB0aGlzLm9wdHMudG1wRGlyIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkFQUElVTV9UTVBfRElSIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIG9zLnRtcERpcigpO1xuXG4gICAgLy8gYmFzZS1kcml2ZXIgaW50ZXJuYWxzXG4gICAgdGhpcy5jdXJDb21tYW5kID0gbmV3IEIoKHIpID0+IHsgcigpOyB9KTsgLy8gc2VlIG5vdGUgaW4gZXhlY3V0ZVxuICAgIHRoaXMuY3VyQ29tbWFuZENhbmNlbGxhYmxlID0gbmV3IEIoKHIpID0+IHsgcigpOyB9KTsgLy8gc2VlIG5vdGUgaW4gZXhlY3V0ZVxuICAgIHRoaXMuc2h1dGRvd25VbmV4cGVjdGVkbHkgPSBmYWxzZTtcbiAgICB0aGlzLm5vQ29tbWFuZFRpbWVyID0gbnVsbDtcbiAgICB0aGlzLnNob3VsZFZhbGlkYXRlQ2FwcyA9IHNob3VsZFZhbGlkYXRlQ2FwcztcbiAgICAvLyBzZXR0aW5ncyBzaG91bGQgYmUgaW5zdGFudGlhdGVkIGJ5IGltcGxlbWVudGluZyBkcml2ZXJzXG4gICAgdGhpcy5zZXR0aW5ncyA9IG51bGw7XG4gICAgdGhpcy5yZXNldE9uVW5leHBlY3RlZFNodXRkb3duKCk7XG5cbiAgICAvLyBrZWVwaW5nIHRyYWNrIG9mIGluaXRpYWwgb3B0c1xuICAgIHRoaXMuaW5pdGlhbE9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLm9wdHMpO1xuXG4gICAgLy8gYWxsb3cgc3ViY2xhc3NlcyB0byBoYXZlIGludGVybmFsIGRyaXZlcnNcbiAgICB0aGlzLm1hbmFnZWREcml2ZXJzID0gW107XG4gIH1cblxuICAvKlxuICAgKiBPdmVycmlkZGVuIGluIGFwcGl1bSBkcml2ZXIsIGJ1dCBoZXJlIHNvIHRoYXQgaW5kaXZpZHVhbCBkcml2ZXJzIGNhbiBiZVxuICAgKiB0ZXN0ZWQgd2l0aCBjbGllbnRzIHRoYXQgcG9sbFxuICAgKi9cbiAgYXN5bmMgZ2V0U3RhdHVzICgpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKlxuICAgKiBJbml0aWFsaXplIGEgbmV3IG9uVW5leHBlY3RlZFNodXRkb3duIHByb21pc2UsIGNhbmNlbGxpbmcgZXhpc3Rpbmcgb25lLlxuICAgKi9cbiAgcmVzZXRPblVuZXhwZWN0ZWRTaHV0ZG93biAoKSB7XG4gICAgaWYgKHRoaXMub25VbmV4cGVjdGVkU2h1dGRvd24gJiYgIXRoaXMub25VbmV4cGVjdGVkU2h1dGRvd24uaXNGdWxmaWxsZWQoKSkge1xuICAgICAgdGhpcy5vblVuZXhwZWN0ZWRTaHV0ZG93bi5jYW5jZWwoKTtcbiAgICB9XG4gICAgdGhpcy5vblVuZXhwZWN0ZWRTaHV0ZG93biA9IG5ldyBCKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMudW5leHBlY3RlZFNodXRkb3duRGVmZXJyZWQgID0ge3Jlc29sdmUsIHJlamVjdH07XG4gICAgfSkuY2FuY2VsbGFibGUoKTtcbiAgICAvLyBub29wIGhhbmRsZXIgdG8gYXZvaWQgd2FybmluZy5cbiAgICB0aGlzLm9uVW5leHBlY3RlZFNodXRkb3duLmNhdGNoKCgpID0+IHt9KTtcbiAgfVxuXG4gIC8vIHdlIG9ubHkgd2FudCBzdWJjbGFzc2VzIHRvIGV2ZXIgZXh0ZW5kIHRoZSBjb250cmFpbnRzXG4gIHNldCBkZXNpcmVkQ2FwQ29uc3RyYWludHMgKGNvbnN0cmFpbnRzKSB7XG4gICAgdGhpcy5fY29uc3RyYWludHMgPSBPYmplY3QuYXNzaWduKHRoaXMuX2NvbnN0cmFpbnRzLCBjb25zdHJhaW50cyk7XG4gIH1cblxuICBnZXQgZGVzaXJlZENhcENvbnN0cmFpbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uc3RyYWludHM7XG4gIH1cblxuICAvLyBtZXRob2QgcmVxdWlyZWQgYnkgTUpTT05XUCBpbiBvcmRlciB0byBkZXRlcm1pbmUgd2hldGhlciBpdCBzaG91bGRcbiAgLy8gcmVzcG9uZCB3aXRoIGFuIGludmFsaWQgc2Vzc2lvbiByZXNwb25zZVxuICBzZXNzaW9uRXhpc3RzIChzZXNzaW9uSWQpIHtcbiAgICBpZiAoIXNlc3Npb25JZCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBzZXNzaW9uSWQgPT09IHRoaXMuc2Vzc2lvbklkO1xuICB9XG5cbiAgLy8gbWV0aG9kIHJlcXVpcmVkIGJ5IE1KU09OV1AgaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21tYW5kIHNob3VsZFxuICAvLyBiZSBwcm94aWVkIGRpcmVjdGx5IHRvIHRoZSBkcml2ZXJcbiAgZHJpdmVyRm9yU2Vzc2lvbiAoLypzZXNzaW9uSWQqLykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbG9nRXh0cmFDYXBzIChjYXBzKSB7XG4gICAgbGV0IGV4dHJhQ2FwcyA9IF8uZGlmZmVyZW5jZShfLmtleXMoY2FwcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmtleXModGhpcy5fY29uc3RyYWludHMpKTtcbiAgICBpZiAoZXh0cmFDYXBzLmxlbmd0aCkge1xuICAgICAgbG9nLndhcm4oYFRoZSBmb2xsb3dpbmcgY2FwYWJpbGl0aWVzIHdlcmUgcHJvdmlkZWQsIGJ1dCBhcmUgbm90IGAgK1xuICAgICAgICAgICAgICAgYHJlY29nbml6ZWQgYnkgYXBwaXVtOiAke2V4dHJhQ2Fwcy5qb2luKCcsICcpfS5gKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZURlc2lyZWRDYXBzIChjYXBzKSB7XG4gICAgaWYgKCF0aGlzLnNob3VsZFZhbGlkYXRlQ2Fwcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gd2UgdmFsaWRhdGUgb24gb25seSBjYXBzIHRoYXQgYXJlIG5vdCBudWxsIG9yIHVuZGVmaW5lZCBzbyB0aGF0IGlmXG4gICAgLy8gc29tZW9uZSBzZW5kcyBpbiBlLmcuIG51bGwgdGhleSBkb24ndCBnZXQgYSAnd2FzIG5vdCBhIHN0cmluZydcbiAgICAvLyBlcnJvcjsganVzdCBjb3VudCBhcyB0aG91Z2ggaXQgd2VyZW4ndCBzZW50IGluIGF0IGFsbFxuICAgIGxldCB2YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdG9yLnZhbGlkYXRlKF8ucGlja0J5KGNhcHMsIHV0aWwuaGFzVmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnN0cmFpbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmdWxsTWVzc2FnZXM6IGZhbHNlfSk7XG5cbiAgICBpZiAodmFsaWRhdGlvbkVycm9ycykge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBgVGhlIGRlc2lyZWRDYXBhYmlsaXRpZXMgb2JqZWN0IHdhcyBub3QgdmFsaWQgZm9yIHRoZSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGZvbGxvd2luZyByZWFzb24ocyk6YDtcbiAgICAgIGZvciAobGV0IFthdHRyaWJ1dGUsIHJlYXNvbnNdIG9mIF8udG9QYWlycyh2YWxpZGF0aW9uRXJyb3JzKSkge1xuICAgICAgICBmb3IgKGxldCByZWFzb24gb2YgcmVhc29ucykge1xuICAgICAgICAgIG1lc3NhZ2UgKz0gYCAke2F0dHJpYnV0ZX0gJHtyZWFzb259LGA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlLnNsaWNlKDAsIC0xKX0uYDtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KG5ldyBlcnJvcnMuU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcihtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dFeHRyYUNhcHMoY2Fwcyk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgdGhlIG1haW4gY29tbWFuZCBoYW5kbGVyIGZvciB0aGUgZHJpdmVyLiBJdCB3cmFwcyBjb21tYW5kXG4gIC8vIGV4ZWN1dGlvbiB3aXRoIHRpbWVvdXQgbG9naWMsIGNoZWNraW5nIHRoYXQgd2UgaGF2ZSBhIHZhbGlkIHNlc3Npb24sXG4gIC8vIGFuZCBlbnN1cmluZyB0aGF0IHdlIGV4ZWN1dGUgY29tbWFuZHMgb25lIGF0IGEgdGltZS4gVGhpcyBtZXRob2QgaXMgY2FsbGVkXG4gIC8vIGJ5IE1KU09OV1AncyBleHByZXNzIHJvdXRlci5cbiAgYXN5bmMgZXhlY3V0ZUNvbW1hbmQgKGNtZCwgLi4uYXJncykge1xuICAgIC8vIGlmIHdlIGhhZCBhIGNvbW1hbmQgdGltZXIgcnVubmluZywgY2xlYXIgaXQgbm93IHRoYXQgd2UncmUgc3RhcnRpbmdcbiAgICAvLyBhIG5ldyBjb21tYW5kIGFuZCBzbyBkb24ndCB3YW50IHRvIHRpbWUgb3V0XG4gICAgdGhpcy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG5cbiAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIHRoaXMgY29tbWFuZCwgaXQgbXVzdCBub3QgYmUgaW1wbGVtZW50ZWRcbiAgICBpZiAoIXRoaXNbY21kXSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgfVxuXG4gICAgLy8gV2hhdCB3ZSdyZSBkb2luZyBoZXJlIGlzIHByZXR0eSBjbGV2ZXIuIHRoaXMuY3VyQ29tbWFuZCBpcyBhbHdheXNcbiAgICAvLyBhIHByb21pc2UgcmVwcmVzZW50aW5nIHRoZSBjb21tYW5kIGN1cnJlbnRseSBiZWluZyBleGVjdXRlZCBieSB0aGVcbiAgICAvLyBkcml2ZXIsIG9yIHRoZSBsYXN0IGNvbW1hbmQgZXhlY3V0ZWQgYnkgdGhlIGRyaXZlciAoaXQgc3RhcnRzIG9mZiBhc1xuICAgIC8vIGVzc2VudGlhbGx5IGEgcHJlLXJlc29sdmVkIHByb21pc2UpLiBXaGVuIGEgY29tbWFuZCBjb21lcyBpbiwgd2UgdGFjayBpdFxuICAgIC8vIHRvIHRoZSBlbmQgb2YgdGhpcy5jdXJDb21tYW5kLCBlc3NlbnRpYWxseSBzYXlpbmcgd2Ugd2FudCB0byBleGVjdXRlIGl0XG4gICAgLy8gd2hlbmV2ZXIgdGhpcy5jdXJDb21tYW5kIGlzIGRvbmUuIFdlIGNhbGwgdGhpcyBuZXcgcHJvbWlzZSBuZXh0Q29tbWFuZCxcbiAgICAvLyBhbmQgaXRzIHJlc29sdXRpb24gaXMgd2hhdCB3ZSB1bHRpbWF0ZWx5IHdpbGwgcmV0dXJuIHRvIHdob21ldmVyIGNhbGxlZFxuICAgIC8vIHVzLiBNZWFud2hpbGUsIHdlIHJlc2V0IHRoaXMuY3VyQ29tbWFuZCB0byBfYmVfIG5leHRDb21tYW5kIChidXRcbiAgICAvLyBpZ25vcmluZyBhbnkgcmVqZWN0aW9ucyksIHNvIHRoYXQgaWYgYW5vdGhlciBjb21tYW5kIGNvbWVzIGludG8gdGhlXG4gICAgLy8gc2VydmVyLCBpdCBnZXRzIHRhY2tlZCBvbiB0byB0aGUgZW5kIG9mIG5leHRDb21tYW5kLiBUaHVzIHdlIGNyZWF0ZVxuICAgIC8vIGEgY2hhaW4gb2YgcHJvbWlzZXMgdGhhdCBhY3RzIGFzIGEgcXVldWUgd2l0aCBzaW5nbGUgY29uY3VycmVuY3kuXG4gICAgbGV0IG5leHRDb21tYW5kID0gdGhpcy5jdXJDb21tYW5kLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gaWYgd2UgdW5leHBlY3RlZGx5IHNodXQgZG93biwgd2UgbmVlZCB0byByZWplY3QgZXZlcnkgY29tbWFuZCBpblxuICAgICAgLy8gdGhlIHF1ZXVlIGJlZm9yZSB3ZSBhY3R1YWxseSB0cnkgdG8gcnVuIGl0XG4gICAgICBpZiAodGhpcy5zaHV0ZG93blVuZXhwZWN0ZWRseSkge1xuICAgICAgICByZXR1cm4gQi5yZWplY3QobmV3IGVycm9ycy5Ob1N1Y2hEcml2ZXJFcnJvcignVGhlIGRyaXZlciB3YXMgdW5leHBlY3RlZGx5IHNodXQgZG93biEnKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gdHVybiB0aGUgY29tbWFuZCBpbnRvIGEgY2FuY2VsbGFibGUgcHJvbWlzZSBzbyBpZiB3ZVxuICAgICAgLy8gaGF2ZSBhbiB1bmV4cGVjdGVkIHNodXRkb3duIGV2ZW50LCBmb3IgZXhhbXBsZSwgd2UgY2FuIGNhbmNlbCBpdCBmcm9tXG4gICAgICAvLyBvdXRzaWRlLCByZWplY3RpbmcgdGhlIGN1cnJlbnQgY29tbWFuZCBpbW1lZGlhdGVseVxuICAgICAgdGhpcy5jdXJDb21tYW5kQ2FuY2VsbGFibGUgPSBuZXcgQigocikgPT4geyByKCk7IH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpc1tjbWRdKC4uLmFyZ3MpO1xuICAgICAgfSkuY2FuY2VsbGFibGUoKTtcbiAgICAgIHJldHVybiB0aGlzLmN1ckNvbW1hbmRDYW5jZWxsYWJsZTtcbiAgICB9KTtcbiAgICB0aGlzLmN1ckNvbW1hbmQgPSBuZXh0Q29tbWFuZC5jYXRjaCgoKSA9PiB7fSk7XG4gICAgbGV0IHJlcyA9IGF3YWl0IG5leHRDb21tYW5kO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBzZXQgYSBuZXcgY29tbWFuZCB0aW1lb3V0ICh3aGljaCBpcyB0aGUgZGVmYXVsdCksIHN0YXJ0IGFcbiAgICAvLyB0aW1lciBvbmNlIHdlJ3ZlIGZpbmlzaGVkIGV4ZWN1dGluZyB0aGlzIGNvbW1hbmQuIElmIHdlIGRvbid0IGNsZWFyXG4gICAgLy8gdGhlIHRpbWVyICh3aGljaCBpcyBkb25lIHdoZW4gYSBuZXcgY29tbWFuZCBjb21lcyBpbiksIHdlIHdpbGwgdHJpZ2dlclxuICAgIC8vIGF1dG9tYXRpYyBzZXNzaW9uIGRlbGV0aW9uIGluIHRoaXMub25Db21tYW5kVGltZW91dC4gT2YgY291cnNlIHdlIGRvbid0XG4gICAgLy8gd2FudCB0byB0cmlnZ2VyIHRoZSB0aW1lciB3aGVuIHRoZSB1c2VyIGlzIHNodXR0aW5nIGRvd24gdGhlIHNlc3Npb25cbiAgICAvLyBpbnRlbnRpb25hbGx5XG4gICAgaWYgKGNtZCAhPT0gJ2RlbGV0ZVNlc3Npb24nKSB7XG4gICAgICAvLyByZXNldGluZyBleGlzdGluZyB0aW1lb3V0XG4gICAgICB0aGlzLnN0YXJ0TmV3Q29tbWFuZFRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24gKGVyciA9IG5ldyBlcnJvcnMuTm9TdWNoRHJpdmVyRXJyb3IoJ1RoZSBkcml2ZXIgd2FzIHVuZXhwZWN0ZWRseSBzaHV0IGRvd24hJykpIHtcbiAgICB0aGlzLnVuZXhwZWN0ZWRTaHV0ZG93bkRlZmVycmVkLnJlamVjdChlcnIpOyAvLyBhbGxvdyBvdGhlcnMgdG8gbGlzdGVuIGZvciB0aGlzXG4gICAgdGhpcy5jdXJDb21tYW5kQ2FuY2VsbGFibGUuY2FuY2VsKGVycik7XG4gICAgdGhpcy5zaHV0ZG93blVuZXhwZWN0ZWRseSA9IHRydWU7XG4gICAgYXdhaXQgdGhpcy5kZWxldGVTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcbiAgICB0aGlzLnNodXRkb3duVW5leHBlY3RlZGx5ID0gZmFsc2U7XG4gIH1cblxuICB2YWxpZGF0ZUxvY2F0b3JTdHJhdGVneSAoc3RyYXRlZ3ksIHdlYkNvbnRleHQgPSBmYWxzZSkge1xuICAgIGxldCB2YWxpZFN0cmF0ZWdpZXMgPSB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzO1xuICAgIGxvZy5kZWJ1ZyhgVmFsaWQgbG9jYXRvciBzdHJhdGVnaWVzIGZvciB0aGlzIHJlcXVlc3Q6ICR7dmFsaWRTdHJhdGVnaWVzLmpvaW4oJywgJyl9YCk7XG5cbiAgICBpZiAod2ViQ29udGV4dCkge1xuICAgICAgdmFsaWRTdHJhdGVnaWVzID0gdmFsaWRTdHJhdGVnaWVzLmNvbmNhdCh0aGlzLndlYkxvY2F0b3JTdHJhdGVnaWVzKTtcbiAgICB9XG5cbiAgICBpZiAoIV8uaW5jbHVkZXModmFsaWRTdHJhdGVnaWVzLCBzdHJhdGVneSkpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZFNlbGVjdG9yRXJyb3IoYExvY2F0b3IgU3RyYXRlZ3kgJyR7c3RyYXRlZ3l9JyBpcyBub3Qgc3VwcG9ydGVkIGZvciB0aGlzIHNlc3Npb25gKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBSZXN0YXJ0IHRoZSBzZXNzaW9uIHdpdGggdGhlIG9yaWdpbmFsIGNhcHMsXG4gICAqIHByZXNlcnZpbmcgdGhlIHRpbWVvdXQgY29uZmlnLlxuICAgKi9cbiAgYXN5bmMgcmVzZXQgKCkge1xuICAgIGxvZy5kZWJ1ZygnUmVzZXR0aW5nIGFwcCBtaWQtc2Vzc2lvbicpO1xuICAgIGxvZy5kZWJ1ZygnUnVubmluZyBnZW5lcmljIGZ1bGwgcmVzZXQnKTtcblxuICAgIC8vIHByZXNlcnZpbmcgc3RhdGVcbiAgICBsZXQgY3VycmVudENvbmZpZyA9IHt9O1xuICAgIGZvciAobGV0IHByb3BlcnR5IG9mIFsnaW1wbGljaXRXYWl0TXMnLCAnbmV3Q29tbWFuZFRpbWVvdXRNcycsICdzZXNzaW9uSWQnLCAncmVzZXRPblVuZXhwZWN0ZWRTaHV0ZG93biddKSB7XG4gICAgICBjdXJyZW50Q29uZmlnW3Byb3BlcnR5XSA9IHRoaXNbcHJvcGVydHldO1xuICAgIH1cblxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBwcmVzZXJ2ZSB0aGUgdW5leHBlY3RlZCBzaHV0ZG93biwgYW5kIG1ha2Ugc3VyZSBpdCBpcyBub3QgY2FuY2VsbGVkIGR1cmluZyByZXNldC5cbiAgICB0aGlzLnJlc2V0T25VbmV4cGVjdGVkU2h1dGRvd24gPSAoKSA9PiB7fTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICAgICAgbG9nLmRlYnVnKCdSZXN0YXJ0aW5nIGFwcCcpO1xuICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTZXNzaW9uKHRoaXMuY2Fwcyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIGFsd2F5cyByZXN0b3JlIHN0YXRlLlxuICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIF8udG9QYWlycyhjdXJyZW50Q29uZmlnKSkge1xuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG4gIH1cblxuICBhc3luYyBnZXRTd2lwZU9wdGlvbnMgKGdlc3R1cmVzLCB0b3VjaENvdW50ID0gMSkge1xuICAgIGxldCBzdGFydFggPSAgdGhpcy5oZWxwZXJzLmdldENvb3JkRGVmYXVsdChnZXN0dXJlc1swXS5vcHRpb25zLngpLFxuICAgICAgICBzdGFydFkgPSB0aGlzLmhlbHBlcnMuZ2V0Q29vcmREZWZhdWx0KGdlc3R1cmVzWzBdLm9wdGlvbnMueSksXG4gICAgICAgIGVuZFggPSB0aGlzLmhlbHBlcnMuZ2V0Q29vcmREZWZhdWx0KGdlc3R1cmVzWzJdLm9wdGlvbnMueCksXG4gICAgICAgIGVuZFkgPSB0aGlzLmhlbHBlcnMuZ2V0Q29vcmREZWZhdWx0KGdlc3R1cmVzWzJdLm9wdGlvbnMueSksXG4gICAgICAgIGR1cmF0aW9uID0gdGhpcy5oZWxwZXJzLmdldFN3aXBlVG91Y2hEdXJhdGlvbihnZXN0dXJlc1sxXSksXG4gICAgICAgIGVsZW1lbnQgPSBnZXN0dXJlc1swXS5vcHRpb25zLmVsZW1lbnQsXG4gICAgICAgIGRlc3RFbGVtZW50ID0gZ2VzdHVyZXNbMl0ub3B0aW9ucy5lbGVtZW50IHx8IGdlc3R1cmVzWzBdLm9wdGlvbnMuZWxlbWVudDtcblxuICAgIC8vIHRoZXJlJ3Mgbm8gZGVzdGluYXRpb24gZWxlbWVudCBoYW5kbGluZyBpbiBib290c3RyYXAgYW5kIHNpbmNlIGl0IGFwcGxpZXMgdG8gYWxsIHBsYXRmb3Jtcywgd2UgaGFuZGxlIGl0IGhlcmVcbiAgICBpZiAodXRpbC5oYXNWYWx1ZShkZXN0RWxlbWVudCkpIHtcbiAgICAgIGxldCBsb2NSZXN1bHQgPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KGRlc3RFbGVtZW50KTtcbiAgICAgIGxldCBzaXplUmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRTaXplKGRlc3RFbGVtZW50KTtcbiAgICAgIGxldCBvZmZzZXRYID0gKE1hdGguYWJzKGVuZFgpIDwgMSAmJiBNYXRoLmFicyhlbmRYKSA+IDApID8gc2l6ZVJlc3VsdC53aWR0aCAqIGVuZFggOiBlbmRYO1xuICAgICAgbGV0IG9mZnNldFkgPSAoTWF0aC5hYnMoZW5kWSkgPCAxICYmIE1hdGguYWJzKGVuZFkpID4gMCkgPyBzaXplUmVzdWx0LmhlaWdodCAqIGVuZFkgOiBlbmRZO1xuICAgICAgZW5kWCA9IGxvY1Jlc3VsdC54ICsgb2Zmc2V0WDtcbiAgICAgIGVuZFkgPSBsb2NSZXN1bHQueSArIG9mZnNldFk7XG4gICAgICAvLyBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgd2FzIHByb3ZpZGVkLCB0aGUgY29vcmRpbmF0ZXMgZm9yIHRoZSBkZXN0aW5hdGlvbiBuZWVkIHRvIGJlIHJlbGF0aXZlIHRvIGl0LlxuICAgICAgaWYgKHV0aWwuaGFzVmFsdWUoZWxlbWVudCkpIHtcbiAgICAgICAgbGV0IGZpcnN0RWxMb2NhdGlvbiA9IGF3YWl0IHRoaXMuZ2V0TG9jYXRpb25JblZpZXcoZWxlbWVudCk7XG4gICAgICAgIGVuZFggLT0gZmlyc3RFbExvY2F0aW9uLng7XG4gICAgICAgIGVuZFkgLT0gZmlyc3RFbExvY2F0aW9uLnk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNsaWVudHMgYXJlIHJlc3BvbnNpYmxlIHRvIHVzZSB0aGVzZSBvcHRpb25zIGNvcnJlY3RseVxuICAgIHJldHVybiB7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCB0b3VjaENvdW50LCBlbGVtZW50fTtcbiAgfVxuXG4gIHByb3h5QWN0aXZlICgvKiBzZXNzaW9uSWQgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoLyogc2Vzc2lvbklkICovKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY2FuUHJveHkgKC8qIHNlc3Npb25JZCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZE1hbmFnZWREcml2ZXIgKGRyaXZlcikge1xuICAgIHRoaXMubWFuYWdlZERyaXZlcnMucHVzaChkcml2ZXIpO1xuICB9XG5cbiAgZ2V0TWFuYWdlZERyaXZlcnMgKCkge1xuICAgIHJldHVybiB0aGlzLm1hbmFnZWREcml2ZXJzO1xuICB9XG59XG5cbmZvciAobGV0IFtjbWQsIGZuXSBvZiBfLnRvUGFpcnMoY29tbWFuZHMpKSB7XG4gIEJhc2VEcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZURyaXZlcjtcbiJdfQ==