'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var DeviceSettings = (function () {
  function DeviceSettings() {
    var defaultSettings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var onSettingsUpdate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, DeviceSettings);

    this._settings = defaultSettings;
    this.onSettingsUpdate = onSettingsUpdate;
  }

  // calls updateSettings from implementing driver every time a setting is changed.

  _createClass(DeviceSettings, [{
    key: 'update',
    value: function update(newSettings) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, prop;

      return _regeneratorRuntime.async(function update$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (_lodash2['default'].isObject(newSettings)) {
              context$2$0.next = 2;
              break;
            }

            throw new Error('Settings update should be called with valid JSON');

          case 2:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 5;
            _iterator = _getIterator(_lodash2['default'].keys(newSettings));

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 20;
              break;
            }

            prop = _step.value;

            if (!(this._settings[prop] !== newSettings[prop])) {
              context$2$0.next = 17;
              break;
            }

            if (!this.onSettingsUpdate) {
              context$2$0.next = 16;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.onSettingsUpdate(prop, newSettings[prop], this._settings[prop]));

          case 13:
            this._settings[prop] = newSettings[prop];
            context$2$0.next = 17;
            break;

          case 16:
            _logger2['default'].errorAndThrow('Unable to update settings; onSettingsUpdate method not found');

          case 17:
            _iteratorNormalCompletion = true;
            context$2$0.next = 7;
            break;

          case 20:
            context$2$0.next = 26;
            break;

          case 22:
            context$2$0.prev = 22;
            context$2$0.t0 = context$2$0['catch'](5);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 26:
            context$2$0.prev = 26;
            context$2$0.prev = 27;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 29:
            context$2$0.prev = 29;

            if (!_didIteratorError) {
              context$2$0.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return context$2$0.finish(29);

          case 33:
            return context$2$0.finish(26);

          case 34:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[5, 22, 26, 34], [27,, 29, 33]]);
    }
  }, {
    key: 'getSettings',
    value: function getSettings() {
      return this._settings;
    }
  }]);

  return DeviceSettings;
})();

exports['default'] = DeviceSettings;
module.exports = exports['default'];

// update setting only when there is updateSettings defined.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2RldmljZS1zZXR0aW5ncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ04sVUFBVTs7OztJQUVwQixjQUFjO0FBRU4sV0FGUixjQUFjLEdBRTBDO1FBQS9DLGVBQWUseURBQUcsRUFBRTtRQUFFLGdCQUFnQix5REFBRyxJQUFJOzswQkFGdEQsY0FBYzs7QUFHaEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7QUFDakMsUUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0dBQzFDOzs7O2VBTEcsY0FBYzs7V0FRTCxnQkFBQyxXQUFXOzBGQUlkLElBQUk7Ozs7O2dCQUhSLG9CQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUM7Ozs7O2tCQUNwQixJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQzs7Ozs7OztxQ0FFcEQsb0JBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7QUFBM0IsZ0JBQUk7O2tCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7OztpQkFFeEMsSUFBSSxDQUFDLGdCQUFnQjs7Ozs7OzZDQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFDMUUsZ0JBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztBQUV6QyxnQ0FBSSxhQUFhLENBQUMsOERBQThELENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUl6Rjs7O1dBRVcsdUJBQUc7QUFDYixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7OztTQTNCRyxjQUFjOzs7cUJBOEJMLGNBQWMiLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvZGV2aWNlLXNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5jbGFzcyBEZXZpY2VTZXR0aW5ncyB7XG5cbiAgY29uc3RydWN0b3IgKGRlZmF1bHRTZXR0aW5ncyA9IHt9LCBvblNldHRpbmdzVXBkYXRlID0gbnVsbCkge1xuICAgIHRoaXMuX3NldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzO1xuICAgIHRoaXMub25TZXR0aW5nc1VwZGF0ZSA9IG9uU2V0dGluZ3NVcGRhdGU7XG4gIH1cblxuICAvLyBjYWxscyB1cGRhdGVTZXR0aW5ncyBmcm9tIGltcGxlbWVudGluZyBkcml2ZXIgZXZlcnkgdGltZSBhIHNldHRpbmcgaXMgY2hhbmdlZC5cbiAgYXN5bmMgdXBkYXRlIChuZXdTZXR0aW5ncykge1xuICAgIGlmICghXy5pc09iamVjdChuZXdTZXR0aW5ncykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2V0dGluZ3MgdXBkYXRlIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB2YWxpZCBKU09OJyk7XG4gICAgfVxuICAgIGZvciAobGV0IHByb3Agb2YgXy5rZXlzKG5ld1NldHRpbmdzKSkge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzW3Byb3BdICE9PSBuZXdTZXR0aW5nc1twcm9wXSkge1xuICAgICAgICAvLyB1cGRhdGUgc2V0dGluZyBvbmx5IHdoZW4gdGhlcmUgaXMgdXBkYXRlU2V0dGluZ3MgZGVmaW5lZC5cbiAgICAgICAgaWYgKHRoaXMub25TZXR0aW5nc1VwZGF0ZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMub25TZXR0aW5nc1VwZGF0ZShwcm9wLCBuZXdTZXR0aW5nc1twcm9wXSwgdGhpcy5fc2V0dGluZ3NbcHJvcF0pO1xuICAgICAgICAgIHRoaXMuX3NldHRpbmdzW3Byb3BdID0gbmV3U2V0dGluZ3NbcHJvcF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmVycm9yQW5kVGhyb3coJ1VuYWJsZSB0byB1cGRhdGUgc2V0dGluZ3M7IG9uU2V0dGluZ3NVcGRhdGUgbWV0aG9kIG5vdCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U2V0dGluZ3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VTZXR0aW5ncztcbiJdfQ==