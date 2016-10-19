'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _mjsonwp = require('../../mjsonwp');

var commands = {},
    helpers = {},
    extensions = {};

var MIN_TIMEOUT = 0;

commands.timeouts = function callee$0$0(type, duration) {
  var ms;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        ms = this.parseTimeoutArgument(duration);
        context$1$0.t0 = type;
        context$1$0.next = context$1$0.t0 === 'command' ? 4 : context$1$0.t0 === 'implicit' ? 6 : 8;
        break;

      case 4:
        this.setNewCommandTimeout(ms);
        return context$1$0.abrupt('break', 9);

      case 6:
        this.setImplicitWait(ms);
        return context$1$0.abrupt('break', 9);

      case 8:
        throw new Error('Invalid timeout \'' + type + '\'');

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.implicitWait = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.setImplicitWait(this.parseTimeoutArgument(ms));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setImplicitWait = function (ms) {
  this.implicitWaitMs = ms;
  _logger2['default'].debug('Set implicit wait to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting implicit wait on managed drivers');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(this.managedDrivers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var driver = _step.value;

        if (_lodash2['default'].isFunction(driver.setImplicitWait)) {
          driver.setImplicitWait(ms);
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
  }
};

helpers.setNewCommandTimeout = function (ms) {
  this.newCommandTimeoutMs = ms;
  _logger2['default'].debug('Set new command timeout to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting new command timeout on managed drivers');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(this.managedDrivers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var driver = _step2.value;

        if (_lodash2['default'].isFunction(driver.setNewCommandTimeout)) {
          driver.setNewCommandTimeout(ms);
        }
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
};

helpers.clearNewCommandTimeout = function () {
  if (this.noCommandTimer) {
    this.noCommandTimer.cancel();
    this.noCommandTimer = null;
  }
};

helpers.startNewCommandTimeout = function () {
  var _this = this;

  // make sure there are no rogue timeouts
  this.clearNewCommandTimeout();

  // if command timeout is 0, it is disabled
  if (!this.newCommandTimeoutMs) return;

  this.noCommandTimer = _appiumSupport.util.cancellableDelay(this.newCommandTimeoutMs);
  this.noCommandTimer.then(function callee$1$0() {
    var errorMessage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _logger2['default'].warn('Shutting down because we waited ' + (this.newCommandTimeoutMs / 1000 + ' seconds for a command'));
          errorMessage = 'New Command Timeout of ' + (this.newCommandTimeoutMs / 1000 + ' seconds ') + 'expired. Try customizing the timeout using the ' + '\'newCommandTimeout\' desired capability';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(new Error(errorMessage)));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  })['catch'](_bluebird2['default'].CancellationError, function () /*err*/{
    // ignore
  });
};

helpers.implicitWaitForCondition = function callee$0$0(condFn) {
  var wrappedCondFn;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Waiting up to ' + this.implicitWaitMs + ' ms for condition');

        wrappedCondFn = (function callee$1$0() {
          var args$2$0 = arguments;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                // reset command timeout
                this.clearNewCommandTimeout();

                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(condFn.apply(undefined, args$2$0));

              case 3:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        }).bind(this);

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(wrappedCondFn, {
          waitMs: this.implicitWaitMs, intervalMs: 500, logger: _logger2['default']
        }));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.parseTimeoutArgument = function (ms) {
  var duration = parseInt(ms, 10);
  if (_lodash2['default'].isNaN(duration) || duration < MIN_TIMEOUT) {
    throw new _mjsonwp.errors.UnknownError('Invalid timeout value \'' + ms + '\'');
  }
  return duration;
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
// TODO: fix jshint and use an arrow function
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3RpbWVvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWdCLFdBQVc7Ozs7d0JBQ00sVUFBVTs7d0JBQzdCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O3VCQUNkLGVBQWU7O0FBR3RDLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQzs7QUFFdEIsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsSUFBSSxFQUFFLFFBQVE7TUFDNUMsRUFBRTs7OztBQUFGLFVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDO3lCQUNwQyxJQUFJOzhDQUNMLFNBQVMsMEJBR1QsVUFBVTs7OztBQUZiLFlBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztBQUc5QixZQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O2NBR25CLElBQUksS0FBSyx3QkFBcUIsSUFBSSxRQUFJOzs7Ozs7O0NBRWpELENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRyxvQkFBZ0IsRUFBRTs7OztBQUN4QyxZQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0NBQ3JELENBQUM7O0FBRUYsT0FBTyxDQUFDLGVBQWUsR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUN0QyxNQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN6QixzQkFBSSxLQUFLLDJCQUF5QixFQUFFLFFBQUssQ0FBQztBQUMxQyxNQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7QUFDckQsd0JBQUksS0FBSyxDQUFDLDBDQUEw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LGdCQUFPLFlBQVksOEJBQTJCLEVBQUUsUUFBSSxDQUFDO0dBQ2hFO0FBQ0QsU0FBTyxRQUFRLENBQUM7Q0FDakIsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3RpbWVvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyB3YWl0Rm9yQ29uZGl0aW9uIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICcuLi8uLi9tanNvbndwJztcblxuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbnN0IE1JTl9USU1FT1VUID0gMDtcblxuY29tbWFuZHMudGltZW91dHMgPSBhc3luYyBmdW5jdGlvbiAodHlwZSwgZHVyYXRpb24pIHtcbiAgbGV0IG1zID0gdGhpcy5wYXJzZVRpbWVvdXRBcmd1bWVudChkdXJhdGlvbik7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2NvbW1hbmQnOlxuICAgICAgdGhpcy5zZXROZXdDb21tYW5kVGltZW91dChtcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbXBsaWNpdCc6XG4gICAgICB0aGlzLnNldEltcGxpY2l0V2FpdChtcyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRpbWVvdXQgJyR7dHlwZX0nYCk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLmltcGxpY2l0V2FpdCA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICB0aGlzLnNldEltcGxpY2l0V2FpdCh0aGlzLnBhcnNlVGltZW91dEFyZ3VtZW50KG1zKSk7XG59O1xuXG5oZWxwZXJzLnNldEltcGxpY2l0V2FpdCA9IGZ1bmN0aW9uIChtcykge1xuICB0aGlzLmltcGxpY2l0V2FpdE1zID0gbXM7XG4gIGxvZy5kZWJ1ZyhgU2V0IGltcGxpY2l0IHdhaXQgdG8gJHttc31tc2ApO1xuICBpZiAodGhpcy5tYW5hZ2VkRHJpdmVycyAmJiB0aGlzLm1hbmFnZWREcml2ZXJzLmxlbmd0aCkge1xuICAgIGxvZy5kZWJ1ZygnU2V0dGluZyBpbXBsaWNpdCB3YWl0IG9uIG1hbmFnZWQgZHJpdmVycycpO1xuICAgIGZvciAobGV0IGRyaXZlciBvZiB0aGlzLm1hbmFnZWREcml2ZXJzKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRyaXZlci5zZXRJbXBsaWNpdFdhaXQpKSB7XG4gICAgICAgIGRyaXZlci5zZXRJbXBsaWNpdFdhaXQobXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy5zZXROZXdDb21tYW5kVGltZW91dCA9IGZ1bmN0aW9uIChtcykge1xuICB0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMgPSBtcztcbiAgbG9nLmRlYnVnKGBTZXQgbmV3IGNvbW1hbmQgdGltZW91dCB0byAke21zfW1zYCk7XG4gIGlmICh0aGlzLm1hbmFnZWREcml2ZXJzICYmIHRoaXMubWFuYWdlZERyaXZlcnMubGVuZ3RoKSB7XG4gICAgbG9nLmRlYnVnKCdTZXR0aW5nIG5ldyBjb21tYW5kIHRpbWVvdXQgb24gbWFuYWdlZCBkcml2ZXJzJyk7XG4gICAgZm9yIChsZXQgZHJpdmVyIG9mIHRoaXMubWFuYWdlZERyaXZlcnMpIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24oZHJpdmVyLnNldE5ld0NvbW1hbmRUaW1lb3V0KSkge1xuICAgICAgICBkcml2ZXIuc2V0TmV3Q29tbWFuZFRpbWVvdXQobXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5ub0NvbW1hbmRUaW1lcikge1xuICAgIHRoaXMubm9Db21tYW5kVGltZXIuY2FuY2VsKCk7XG4gICAgdGhpcy5ub0NvbW1hbmRUaW1lciA9IG51bGw7XG4gIH1cbn07XG5cbmhlbHBlcnMuc3RhcnROZXdDb21tYW5kVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyByb2d1ZSB0aW1lb3V0c1xuICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcblxuICAvLyBpZiBjb21tYW5kIHRpbWVvdXQgaXMgMCwgaXQgaXMgZGlzYWJsZWRcbiAgaWYgKCF0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMpIHJldHVybjtcblxuICB0aGlzLm5vQ29tbWFuZFRpbWVyID0gdXRpbC5jYW5jZWxsYWJsZURlbGF5KHRoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyk7XG4gIHRoaXMubm9Db21tYW5kVGltZXJcbiAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICBsb2cud2FybihgU2h1dHRpbmcgZG93biBiZWNhdXNlIHdlIHdhaXRlZCBgICtcbiAgICAgICAgICAgICAgIGAke3RoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyAvIDEwMDB9IHNlY29uZHMgZm9yIGEgY29tbWFuZGApO1xuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IGBOZXcgQ29tbWFuZCBUaW1lb3V0IG9mIGAgK1xuICAgICAgICAgICAgICAgYCR7dGhpcy5uZXdDb21tYW5kVGltZW91dE1zIC8gMTAwMH0gc2Vjb25kcyBgICtcbiAgICAgICAgICAgICAgIGBleHBpcmVkLiBUcnkgY3VzdG9taXppbmcgdGhlIHRpbWVvdXQgdXNpbmcgdGhlIGAgK1xuICAgICAgICAgICAgICAgYCduZXdDb21tYW5kVGltZW91dCcgZGVzaXJlZCBjYXBhYmlsaXR5YDtcbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24obmV3IEVycm9yKGVycm9yTWVzc2FnZSkpO1xuICAgIH0pXG4gICAgLmNhdGNoKEIuQ2FuY2VsbGF0aW9uRXJyb3IsICgvKmVyciovKSA9PiB7XG4gICAgICAvLyBpZ25vcmVcbiAgICB9KTtcbn07XG5cbmhlbHBlcnMuaW1wbGljaXRXYWl0Rm9yQ29uZGl0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGNvbmRGbikge1xuICBsb2cuZGVidWcoYFdhaXRpbmcgdXAgdG8gJHt0aGlzLmltcGxpY2l0V2FpdE1zfSBtcyBmb3IgY29uZGl0aW9uYCk7XG4gIGxldCB3cmFwcGVkQ29uZEZuID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAvLyByZXNldCBjb21tYW5kIHRpbWVvdXRcbiAgICB0aGlzLmNsZWFyTmV3Q29tbWFuZFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBjb25kRm4oLi4uYXJncyk7XG4gIH0uYmluZCh0aGlzKTsgLy8gVE9ETzogZml4IGpzaGludCBhbmQgdXNlIGFuIGFycm93IGZ1bmN0aW9uXG4gIHJldHVybiBhd2FpdCB3YWl0Rm9yQ29uZGl0aW9uKHdyYXBwZWRDb25kRm4sIHtcbiAgICB3YWl0TXM6IHRoaXMuaW1wbGljaXRXYWl0TXMsIGludGVydmFsTXM6IDUwMCwgbG9nZ2VyOiBsb2dcbiAgfSk7XG59O1xuXG5oZWxwZXJzLnBhcnNlVGltZW91dEFyZ3VtZW50ID0gZnVuY3Rpb24gKG1zKSB7XG4gIGxldCBkdXJhdGlvbiA9IHBhcnNlSW50KG1zLCAxMCk7XG4gIGlmIChfLmlzTmFOKGR1cmF0aW9uKSB8fCBkdXJhdGlvbiA8IE1JTl9USU1FT1VUKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoYEludmFsaWQgdGltZW91dCB2YWx1ZSAnJHttc30nYCk7XG4gIH1cbiAgcmV0dXJuIGR1cmF0aW9uO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==