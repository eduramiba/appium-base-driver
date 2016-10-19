'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _mjsonwp = require('../../mjsonwp');

var _uuidJs = require('uuid-js');

var _uuidJs2 = _interopRequireDefault(_uuidJs);

var commands = {};

commands.createSession = function callee$0$0(caps) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(this.sessionId !== null)) {
          context$1$0.next = 2;
          break;
        }

        throw new _mjsonwp.errors.SessionNotCreatedError('Cannot create a new session ' + 'while one is in progress');

      case 2:
        caps = fixCaps(caps, this.desiredCapConstraints);
        this.validateDesiredCaps(caps);
        this.sessionId = _uuidJs2['default'].create().hex;
        this.caps = caps;
        this.opts = _lodash2['default'].cloneDeep(this.initialOpts);

        // merge caps onto opts so we don't need to worry about what's where
        _Object$assign(this.opts, this.caps);

        // deal with reset
        if (this.opts.noReset === true) this.opts.fullReset = false;
        if (this.opts.fullReset === true) this.opts.noReset = false;
        this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
        this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

        // Prevents empty string caps so we don't need to test it everywhere
        if (typeof this.opts.app === 'string' && this.opts.app.trim() === '') {
          this.opts.app = null;
        }

        if (!_lodash2['default'].isUndefined(this.caps.newCommandTimeout)) {
          this.newCommandTimeoutMs = this.caps.newCommandTimeout * 1000;
        }

        // We need to ininitialize one onUnexpectedShutdow promise per session
        // to avoid the promise fulfilment being propagated between sessions.
        this.resetOnUnexpectedShutdown();

        _logger2['default'].info('Session created with session id: ' + this.sessionId);

        return context$1$0.abrupt('return', [this.sessionId, caps]);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSessions = function callee$0$0() {
  var ret;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        ret = [];

        if (this.sessionId) {
          ret.push({
            id: this.sessionId,
            capabilities: this.caps
          });
        }

        return context$1$0.abrupt('return', ret);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSession = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', this.caps);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.deleteSession = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.clearNewCommandTimeout();
        this.sessionId = null;

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function fixCaps(originalCaps) {
  var desiredCapConstraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var caps = _lodash2['default'].clone(originalCaps);

  // boolean capabilities can be passed in as strings 'false' and 'true'
  // which we want to translate into boolean values
  var booleanCaps = _lodash2['default'].keys(_lodash2['default'].pickBy(desiredCapConstraints, function (k) {
    return k.isBoolean === true;
  }));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(booleanCaps), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cap = _step.value;

      var value = originalCaps[cap];
      if (_lodash2['default'].isString(value)) {
        value = value.toLowerCase();
        if (value === 'true' || value === 'false') {
          _logger2['default'].warn('Capability \'' + cap + '\' changed from string to boolean. This may cause unexpected behavior');
          caps[cap] = value === 'true';
        }
      }
    }

    // int capabilities are often sent in as strings by frameworks
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

  var intCaps = _lodash2['default'].keys(_lodash2['default'].pickBy(desiredCapConstraints, function (k) {
    return k.isNumber === true;
  }));
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(intCaps), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var cap = _step2.value;

      var value = originalCaps[cap];
      if (_lodash2['default'].isString(value)) {
        var newValue = parseInt(value, 10);
        if (value.indexOf('.') !== -1) {
          newValue = parseFloat(value);
        }
        _logger2['default'].warn('Capability \'' + cap + '\' changed from string (\'' + value + '\') to integer (' + newValue + '). This may cause unexpected behavior');
        caps[cap] = newValue;
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

  return caps;
}

exports['default'] = commands;
module.exports = exports['default'];
/* sessionId */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3Nlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztzQkFDTixXQUFXOzs7O3VCQUNKLGVBQWU7O3NCQUNyQixTQUFTOzs7O0FBRTFCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsUUFBUSxDQUFDLGFBQWEsR0FBRyxvQkFBZ0IsSUFBSTs7OztjQUN2QyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTs7Ozs7Y0FDbkIsSUFBSSxnQkFBTyxzQkFBc0IsQ0FBQyw4QkFBOEIsR0FDOUIsMEJBQTBCLENBQUM7OztBQUVyRSxZQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsWUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBSyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDbkMsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLElBQUksR0FBRyxvQkFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7QUFHMUMsdUJBQWMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdwQyxZQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDNUQsWUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzVELFlBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElB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O0FBQzlCLFVBQUksb0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3JCLFlBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsWUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQzdCLGtCQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0FBQ0QsNEJBQUksSUFBSSxtQkFBZ0IsR0FBRyxrQ0FBMkIsS0FBSyx3QkFBa0IsUUFBUSwyQ0FBd0MsQ0FBQztBQUM5SCxZQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO09BQ3RCO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxTQUFPLElBQUksQ0FBQztDQUNiOztxQkFFYyxRQUFRIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3Nlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnLi4vLi4vbWpzb253cCc7XG5pbXBvcnQgVVVJRCBmcm9tICd1dWlkLWpzJztcblxubGV0IGNvbW1hbmRzID0ge307XG5cbmNvbW1hbmRzLmNyZWF0ZVNlc3Npb24gPSBhc3luYyBmdW5jdGlvbiAoY2Fwcykge1xuICBpZiAodGhpcy5zZXNzaW9uSWQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlNlc3Npb25Ob3RDcmVhdGVkRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgYSBuZXcgc2Vzc2lvbiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlIG9uZSBpcyBpbiBwcm9ncmVzcycpO1xuICB9XG4gIGNhcHMgPSBmaXhDYXBzKGNhcHMsIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzKTtcbiAgdGhpcy52YWxpZGF0ZURlc2lyZWRDYXBzKGNhcHMpO1xuICB0aGlzLnNlc3Npb25JZCA9IFVVSUQuY3JlYXRlKCkuaGV4O1xuICB0aGlzLmNhcHMgPSBjYXBzO1xuICB0aGlzLm9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLmluaXRpYWxPcHRzKTtcblxuICAvLyBtZXJnZSBjYXBzIG9udG8gb3B0cyBzbyB3ZSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IHdoYXQncyB3aGVyZVxuICBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgdGhpcy5jYXBzKTtcblxuICAvLyBkZWFsIHdpdGggcmVzZXRcbiAgaWYgKHRoaXMub3B0cy5ub1Jlc2V0ID09PSB0cnVlKSB0aGlzLm9wdHMuZnVsbFJlc2V0ID0gZmFsc2U7XG4gIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ID09PSB0cnVlKSB0aGlzLm9wdHMubm9SZXNldCA9IGZhbHNlO1xuICB0aGlzLm9wdHMuZmFzdFJlc2V0ID0gIXRoaXMub3B0cy5mdWxsUmVzZXQgJiYgIXRoaXMub3B0cy5ub1Jlc2V0O1xuICB0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCA9IHRoaXMub3B0cy5mYXN0UmVzZXQgfHwgdGhpcy5vcHRzLm5vUmVzZXQ7XG5cbiAgLy8gUHJldmVudHMgZW1wdHkgc3RyaW5nIGNhcHMgc28gd2UgZG9uJ3QgbmVlZCB0byB0ZXN0IGl0IGV2ZXJ5d2hlcmVcbiAgaWYgKHR5cGVvZiB0aGlzLm9wdHMuYXBwID09PSAnc3RyaW5nJyAmJiB0aGlzLm9wdHMuYXBwLnRyaW0oKSA9PT0gJycpIHtcbiAgICB0aGlzLm9wdHMuYXBwID0gbnVsbDtcbiAgfVxuXG4gIGlmICghXy5pc1VuZGVmaW5lZCh0aGlzLmNhcHMubmV3Q29tbWFuZFRpbWVvdXQpKSB7XG4gICAgdGhpcy5uZXdDb21tYW5kVGltZW91dE1zID0gKHRoaXMuY2Fwcy5uZXdDb21tYW5kVGltZW91dCAqIDEwMDApO1xuICB9XG5cbiAgLy8gV2UgbmVlZCB0byBpbmluaXRpYWxpemUgb25lIG9uVW5leHBlY3RlZFNodXRkb3cgcHJvbWlzZSBwZXIgc2Vzc2lvblxuICAvLyB0byBhdm9pZCB0aGUgcHJvbWlzZSBmdWxmaWxtZW50IGJlaW5nIHByb3BhZ2F0ZWQgYmV0d2VlbiBzZXNzaW9ucy5cbiAgdGhpcy5yZXNldE9uVW5leHBlY3RlZFNodXRkb3duKCk7XG5cbiAgbG9nLmluZm8oYFNlc3Npb24gY3JlYXRlZCB3aXRoIHNlc3Npb24gaWQ6ICR7dGhpcy5zZXNzaW9uSWR9YCk7XG5cbiAgcmV0dXJuIFt0aGlzLnNlc3Npb25JZCwgY2Fwc107XG59O1xuXG5jb21tYW5kcy5nZXRTZXNzaW9ucyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHJldCA9IFtdO1xuXG4gIGlmICh0aGlzLnNlc3Npb25JZCkge1xuICAgIHJldC5wdXNoKHtcbiAgICAgIGlkOiB0aGlzLnNlc3Npb25JZCxcbiAgICAgIGNhcGFiaWxpdGllczogdGhpcy5jYXBzXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuY29tbWFuZHMuZ2V0U2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY2Fwcztcbn07XG5cbmNvbW1hbmRzLmRlbGV0ZVNlc3Npb24gPSBhc3luYyBmdW5jdGlvbiAoLyogc2Vzc2lvbklkICovKSB7XG4gIHRoaXMuY2xlYXJOZXdDb21tYW5kVGltZW91dCgpO1xuICB0aGlzLnNlc3Npb25JZCA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBmaXhDYXBzIChvcmlnaW5hbENhcHMsIGRlc2lyZWRDYXBDb25zdHJhaW50cyA9IHt9KSB7XG4gIGxldCBjYXBzID0gXy5jbG9uZShvcmlnaW5hbENhcHMpO1xuXG4gIC8vIGJvb2xlYW4gY2FwYWJpbGl0aWVzIGNhbiBiZSBwYXNzZWQgaW4gYXMgc3RyaW5ncyAnZmFsc2UnIGFuZCAndHJ1ZSdcbiAgLy8gd2hpY2ggd2Ugd2FudCB0byB0cmFuc2xhdGUgaW50byBib29sZWFuIHZhbHVlc1xuICBsZXQgYm9vbGVhbkNhcHMgPSBfLmtleXMoXy5waWNrQnkoZGVzaXJlZENhcENvbnN0cmFpbnRzLCAoaykgPT4gay5pc0Jvb2xlYW4gPT09IHRydWUpKTtcbiAgZm9yIChsZXQgY2FwIG9mIGJvb2xlYW5DYXBzKSB7XG4gICAgbGV0IHZhbHVlID0gb3JpZ2luYWxDYXBzW2NhcF07XG4gICAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodmFsdWUgPT09ICd0cnVlJyB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICBsb2cud2FybihgQ2FwYWJpbGl0eSAnJHtjYXB9JyBjaGFuZ2VkIGZyb20gc3RyaW5nIHRvIGJvb2xlYW4uIFRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3JgKTtcbiAgICAgICAgY2Fwc1tjYXBdID0gKHZhbHVlID09PSAndHJ1ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGludCBjYXBhYmlsaXRpZXMgYXJlIG9mdGVuIHNlbnQgaW4gYXMgc3RyaW5ncyBieSBmcmFtZXdvcmtzXG4gIGxldCBpbnRDYXBzID0gXy5rZXlzKF8ucGlja0J5KGRlc2lyZWRDYXBDb25zdHJhaW50cywgKGspID0+IGsuaXNOdW1iZXIgPT09IHRydWUpKTtcbiAgZm9yIChsZXQgY2FwIG9mIGludENhcHMpIHtcbiAgICBsZXQgdmFsdWUgPSBvcmlnaW5hbENhcHNbY2FwXTtcbiAgICBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIGxldCBuZXdWYWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgICBpZiAodmFsdWUuaW5kZXhPZignLicpICE9PSAtMSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgfVxuICAgICAgbG9nLndhcm4oYENhcGFiaWxpdHkgJyR7Y2FwfScgY2hhbmdlZCBmcm9tIHN0cmluZyAoJyR7dmFsdWV9JykgdG8gaW50ZWdlciAoJHtuZXdWYWx1ZX0pLiBUaGlzIG1heSBjYXVzZSB1bmV4cGVjdGVkIGJlaGF2aW9yYCk7XG4gICAgICBjYXBzW2NhcF0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2Fwcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXX0=