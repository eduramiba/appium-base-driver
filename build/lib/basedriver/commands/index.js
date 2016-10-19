'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _timeout = require('./timeout');

var _timeout2 = _interopRequireDefault(_timeout);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var commands = {};
_Object$assign(commands, _session2['default'], _settings2['default'], _timeout2['default'], _find2['default']
// add other command types here
);

exports['default'] = commands;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7dUJBQXdCLFdBQVc7Ozs7d0JBQ1YsWUFBWTs7Ozt1QkFDYixXQUFXOzs7O29CQUNkLFFBQVE7Ozs7QUFFN0IsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLGVBQ0UsUUFBUTs7Q0FNVCxDQUFDOztxQkFFYSxRQUFRIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlc3Npb25DbWRzIGZyb20gJy4vc2Vzc2lvbic7XG5pbXBvcnQgc2V0dGluZ3NDbWRzIGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHRpbWVvdXRDbWRzIGZyb20gJy4vdGltZW91dCc7XG5pbXBvcnQgZmluZENtZHMgZnJvbSAnLi9maW5kJztcblxubGV0IGNvbW1hbmRzID0ge307XG5PYmplY3QuYXNzaWduKFxuICBjb21tYW5kcyxcbiAgc2Vzc2lvbkNtZHMsXG4gIHNldHRpbmdzQ21kcyxcbiAgdGltZW91dENtZHMsXG4gIGZpbmRDbWRzXG4gIC8vIGFkZCBvdGhlciBjb21tYW5kIHR5cGVzIGhlcmVcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl19