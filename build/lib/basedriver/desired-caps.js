'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _validateJs = require('validate.js');

var _validateJs2 = _interopRequireDefault(_validateJs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var desiredCapabilityConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: ['iOS', 'Android', 'FirefoxOS', 'Windows', 'Fake']
  },
  deviceName: {
    presence: true,
    isString: true
  },
  platformVersion: {},
  newCommandTimeout: {
    isNumber: true
  },
  automationName: {
    inclusionCaseInsensitive: ['Appium', 'Selendroid', 'XCUITest', 'YouiEngine']
  },
  autoLaunch: {
    isBoolean: true
  },
  udid: {
    isString: true
  },
  orientation: {
    inclusion: ['LANDSCAPE', 'PORTRAIT']
  },
  autoWebview: {
    isBoolean: true
  },
  noReset: {
    isBoolean: true
  },
  fullReset: {
    isBoolean: true
  },
  language: {
    isString: true
  },
  locale: {
    isString: true
  }
};

_validateJs2['default'].validators.isString = function (value) {
  if (typeof value === 'string') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type string';
};
_validateJs2['default'].validators.isNumber = function (value) {
  if (typeof value === 'number') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type number';
};
_validateJs2['default'].validators.isBoolean = function (value) {
  if (typeof value === 'boolean') {
    return null;
  }

  // allow a string value
  if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false' || value === '')) {
    _logger2['default'].warn('Boolean capability passed in as string. Functionality may be compromised.');
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type boolean';
};
_validateJs2['default'].validators.isObject = function (value) {
  if (typeof value === 'object') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type object';
};
_validateJs2['default'].validators.deprecated = function (value, options, key) {
  if (options) {
    _logger2['default'].warn(key + ' is a deprecated capability');
  }
  return null;
};
_validateJs2['default'].validators.inclusionCaseInsensitive = function (value, options) {
  if (typeof value === 'undefined') {
    return null;
  } else if (typeof value !== 'string') {
    return 'unrecognised';
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if (option.toLowerCase() === value.toLowerCase()) {
        return null;
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

  return value + ' not part of ' + options.toString();
};

_validateJs2['default'].promise = _bluebird2['default'];
_validateJs2['default'].prettify = function (val) {
  return val;
};

exports.desiredCapabilityConstraints = desiredCapabilityConstraints;
exports.validator = _validateJs2['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2Rlc2lyZWQtY2Fwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NCQUFnQixVQUFVOzs7OzBCQUNKLGFBQWE7Ozs7d0JBQ3JCLFVBQVU7Ozs7QUFHeEIsSUFBSSw0QkFBNEIsR0FBRztBQUNqQyxjQUFZLEVBQUU7QUFDWixZQUFRLEVBQUUsSUFBSTtBQUNkLFlBQVEsRUFBRSxJQUFJO0FBQ2QsNEJBQXdCLEVBQUUsQ0FDeEIsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULE1BQU0sQ0FDUDtHQUNGO0FBQ0QsWUFBVSxFQUFFO0FBQ1YsWUFBUSxFQUFFLElBQUk7QUFDZCxZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0QsaUJBQWUsRUFBRSxFQUFFO0FBQ25CLG1CQUFpQixFQUFFO0FBQ2pCLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxnQkFBYyxFQUFFO0FBQ2QsNEJBQXdCLEVBQUUsQ0FDeEIsUUFBUSxFQUNSLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxDQUNiO0dBQ0Y7QUFDRCxZQUFVLEVBQUU7QUFDVixhQUFTLEVBQUUsSUFBSTtHQUNoQjtBQUNELE1BQUksRUFBRTtBQUNKLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxhQUFXLEVBQUU7QUFDWCxhQUFTLEVBQUUsQ0FDVCxXQUFXLEVBQ1gsVUFBVSxDQUNYO0dBQ0Y7QUFDRCxhQUFXLEVBQUU7QUFDWCxhQUFTLEVBQUUsSUFBSTtHQUNoQjtBQUNELFNBQU8sRUFBRTtBQUNQLGFBQVMsRUFBRSxJQUFJO0dBQ2hCO0FBQ0QsV0FBUyxFQUFFO0FBQ1QsYUFBUyxFQUFFLElBQUk7R0FDaEI7QUFDRCxVQUFRLEVBQUU7QUFDUixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0QsUUFBTSxFQUFFO0FBQ04sWUFBUSxFQUFFLElBQUk7R0FDZjtDQUNGLENBQUM7O0FBRUYsd0JBQVUsVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUMvQyxNQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixXQUFPLElBQUksQ0FBQztHQUNiOztBQUVELE1BQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQ2hDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsU0FBTyx3QkFBd0IsQ0FBQztDQUNqQyxDQUFDO0FBQ0Ysd0JBQVUsVUFBVSxDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUMvQyxNQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixXQUFPLElBQUksQ0FBQztHQUNiOztBQUVELE1BQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO0FBQ2hDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsU0FBTyx3QkFBd0IsQ0FBQztDQUNqQyxDQUFDO0FBQ0Ysd0JBQVUsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssRUFBRTtBQUNoRCxNQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUM5QixXQUFPLElBQUksQ0FBQztHQUNiOzs7QUFHRCxNQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsS0FDeEIsQUFBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLElBQ2pFLEtBQUssS0FBSyxFQUFFLENBQUMsQUFBQyxFQUFFO0FBQ3BCLHdCQUFJLElBQUksQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO0FBQ3RGLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsTUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDaEMsV0FBTyxJQUFJLENBQUM7R0FDYjs7QUFFRCxTQUFPLHlCQUF5QixDQUFDO0NBQ2xDLENBQUM7QUFDRix3QkFBVSxVQUFVLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQy9DLE1BQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQzdCLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsTUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDaEMsV0FBTyxJQUFJLENBQUM7R0FDYjs7QUFFRCxTQUFPLHdCQUF3QixDQUFDO0NBQ2pDLENBQUM7QUFDRix3QkFBVSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7QUFDL0QsTUFBSSxPQUFPLEVBQUU7QUFDWCx3QkFBSSxJQUFJLENBQUksR0FBRyxpQ0FBOEIsQ0FBQztHQUMvQztBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQztBQUNGLHdCQUFVLFVBQVUsQ0FBQyx3QkFBd0IsR0FBRyxVQUFVLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDeEUsTUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7QUFDaEMsV0FBTyxJQUFJLENBQUM7R0FDYixNQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3BDLFdBQU8sY0FBYyxDQUFDO0dBQ3ZCOzs7Ozs7QUFDRCxzQ0FBbUIsT0FBTyw0R0FBRTtVQUFuQixNQUFNOztBQUNiLFVBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNoRCxlQUFPLElBQUksQ0FBQztPQUNiO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFVLEtBQUsscUJBQWdCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBRztDQUNyRCxDQUFDOztBQUVGLHdCQUFVLE9BQU8sd0JBQUksQ0FBQztBQUN0Qix3QkFBVSxRQUFRLEdBQUcsVUFBQyxHQUFHLEVBQUs7QUFBRSxTQUFPLEdBQUcsQ0FBQztDQUFFLENBQUM7O1FBR3JDLDRCQUE0QixHQUE1Qiw0QkFBNEI7UUFBRSxTQUFTIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2Rlc2lyZWQtY2Fwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHZhbGlkYXRvciBmcm9tICd2YWxpZGF0ZS5qcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cblxubGV0IGRlc2lyZWRDYXBhYmlsaXR5Q29uc3RyYWludHMgPSB7XG4gIHBsYXRmb3JtTmFtZToge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGlzU3RyaW5nOiB0cnVlLFxuICAgIGluY2x1c2lvbkNhc2VJbnNlbnNpdGl2ZTogW1xuICAgICAgJ2lPUycsXG4gICAgICAnQW5kcm9pZCcsXG4gICAgICAnRmlyZWZveE9TJyxcbiAgICAgICdXaW5kb3dzJyxcbiAgICAgICdGYWtlJ1xuICAgIF1cbiAgfSxcbiAgZGV2aWNlTmFtZToge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGlzU3RyaW5nOiB0cnVlXG4gIH0sXG4gIHBsYXRmb3JtVmVyc2lvbjoge30sXG4gIG5ld0NvbW1hbmRUaW1lb3V0OiB7XG4gICAgaXNOdW1iZXI6IHRydWVcbiAgfSxcbiAgYXV0b21hdGlvbk5hbWU6IHtcbiAgICBpbmNsdXNpb25DYXNlSW5zZW5zaXRpdmU6IFtcbiAgICAgICdBcHBpdW0nLFxuICAgICAgJ1NlbGVuZHJvaWQnLFxuICAgICAgJ1hDVUlUZXN0JyxcbiAgICAgICdZb3VpRW5naW5lJ1xuICAgIF1cbiAgfSxcbiAgYXV0b0xhdW5jaDoge1xuICAgIGlzQm9vbGVhbjogdHJ1ZVxuICB9LFxuICB1ZGlkOiB7XG4gICAgaXNTdHJpbmc6IHRydWVcbiAgfSxcbiAgb3JpZW50YXRpb246IHtcbiAgICBpbmNsdXNpb246IFtcbiAgICAgICdMQU5EU0NBUEUnLFxuICAgICAgJ1BPUlRSQUlUJ1xuICAgIF1cbiAgfSxcbiAgYXV0b1dlYnZpZXc6IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbiAgbm9SZXNldDoge1xuICAgIGlzQm9vbGVhbjogdHJ1ZVxuICB9LFxuICBmdWxsUmVzZXQ6IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbiAgbGFuZ3VhZ2U6IHtcbiAgICBpc1N0cmluZzogdHJ1ZVxuICB9LFxuICBsb2NhbGU6IHtcbiAgICBpc1N0cmluZzogdHJ1ZVxuICB9XG59O1xuXG52YWxpZGF0b3IudmFsaWRhdG9ycy5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAnbXVzdCBiZSBvZiB0eXBlIHN0cmluZyc7XG59O1xudmFsaWRhdG9yLnZhbGlkYXRvcnMuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gJ211c3QgYmUgb2YgdHlwZSBudW1iZXInO1xufTtcbnZhbGlkYXRvci52YWxpZGF0b3JzLmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGFsbG93IGEgc3RyaW5nIHZhbHVlXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAoKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSB8fFxuICAgICAgICh2YWx1ZSA9PT0gJycpKSkge1xuICAgIGxvZy53YXJuKCdCb29sZWFuIGNhcGFiaWxpdHkgcGFzc2VkIGluIGFzIHN0cmluZy4gRnVuY3Rpb25hbGl0eSBtYXkgYmUgY29tcHJvbWlzZWQuJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuICdtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbic7XG59O1xudmFsaWRhdG9yLnZhbGlkYXRvcnMuaXNPYmplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gJ211c3QgYmUgb2YgdHlwZSBvYmplY3QnO1xufTtcbnZhbGlkYXRvci52YWxpZGF0b3JzLmRlcHJlY2F0ZWQgPSBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMsIGtleSkge1xuICBpZiAob3B0aW9ucykge1xuICAgIGxvZy53YXJuKGAke2tleX0gaXMgYSBkZXByZWNhdGVkIGNhcGFiaWxpdHlgKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG52YWxpZGF0b3IudmFsaWRhdG9ycy5pbmNsdXNpb25DYXNlSW5zZW5zaXRpdmUgPSBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuICd1bnJlY29nbmlzZWQnO1xuICB9XG4gIGZvciAobGV0IG9wdGlvbiBvZiBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbi50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGAke3ZhbHVlfSBub3QgcGFydCBvZiAke29wdGlvbnMudG9TdHJpbmcoKX1gO1xufTtcblxudmFsaWRhdG9yLnByb21pc2UgPSBCO1xudmFsaWRhdG9yLnByZXR0aWZ5ID0gKHZhbCkgPT4geyByZXR1cm4gdmFsOyB9O1xuXG5cbmV4cG9ydCB7IGRlc2lyZWRDYXBhYmlsaXR5Q29uc3RyYWludHMsIHZhbGlkYXRvciB9O1xuIl19