'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function isNumber(o) {
  return _lodash2['default'].isNumber(o) || !_lodash2['default'].isNaN(parseInt(o)) || !_lodash2['default'].isNaN(parseFloat(o));
}

function msValidator(ms) {
  if (!_lodash2['default'].isNumber(ms) || ms < 0) {
    throw new Error('Wait ms must be a number equal to 0 or greater');
  }
}

var validators = {
  setUrl: function setUrl(url) {
    // either an `xyz://`, `about:`, or `data:` scheme is allowed
    if (!url || !url.match(/^([a-zA-Z0-9_-]+:\/\/)|(about:)|(data:)/)) {
      throw new Error('Url or Uri must start with <scheme>://');
    }
  },
  implicitWait: function implicitWait(ms) {
    msValidator(ms);
  },
  asyncScriptTimeout: function asyncScriptTimeout(ms) {
    msValidator(ms);
  },
  timeouts: function timeouts(type, ms) {
    msValidator(ms);
    if (!_lodash2['default'].includes(['script', 'implicit', 'page load', 'command'], type)) {
      throw new Error('\'' + type + '\' is not a valid timeout type');
    }
  },
  clickCurrent: function clickCurrent(button) {
    if (!(isNumber(button) || _lodash2['default'].isUndefined(button)) || button < 0 || button > 2) {
      throw new Error('Click button must be 0, 1, or 2');
    }
  },
  setNetworkConnection: function setNetworkConnection(type) {
    if (!isNumber(type) || [0, 1, 2, 4, 6].indexOf(type) === -1) {
      throw new Error('Network type must be one of 0, 1, 2, 4, 6');
    }
  }
};

exports.validators = validators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tanNvbndwL3ZhbGlkYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztBQUd0QixTQUFTLFFBQVEsQ0FBRSxDQUFDLEVBQUU7QUFDcEIsU0FBTyxvQkFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDMUU7O0FBRUQsU0FBUyxXQUFXLENBQUUsRUFBRSxFQUFFO0FBQ3hCLE1BQUksQ0FBQyxvQkFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtBQUM3QixVQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7R0FDbkU7Q0FDRjs7QUFFRCxJQUFNLFVBQVUsR0FBRztBQUNqQixRQUFNLEVBQUUsZ0JBQUMsR0FBRyxFQUFLOztBQUVmLFFBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLEVBQUU7QUFDakUsWUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0tBQzNEO0dBQ0Y7QUFDRCxjQUFZLEVBQUUsc0JBQUMsRUFBRSxFQUFLO0FBQ3BCLGVBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNqQjtBQUNELG9CQUFrQixFQUFFLDRCQUFDLEVBQUUsRUFBSztBQUMxQixlQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDakI7QUFDRCxVQUFRLEVBQUUsa0JBQUMsSUFBSSxFQUFFLEVBQUUsRUFBSztBQUN0QixlQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsUUFBSSxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ3JFLFlBQU0sSUFBSSxLQUFLLFFBQUssSUFBSSxvQ0FBZ0MsQ0FBQztLQUMxRDtHQUNGO0FBQ0QsY0FBWSxFQUFFLHNCQUFDLE1BQU0sRUFBSztBQUN4QixRQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG9CQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQSxBQUFDLElBQUssTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxBQUFDLEVBQUU7QUFDOUUsWUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ3BEO0dBQ0Y7QUFDRCxzQkFBb0IsRUFBRSw4QkFBQyxJQUFJLEVBQUs7QUFDOUIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDM0QsWUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0tBQzlEO0dBQ0Y7Q0FDRixDQUFDOztRQUVPLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6ImxpYi9tanNvbndwL3ZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyIChvKSB7XG4gIHJldHVybiBfLmlzTnVtYmVyKG8pIHx8ICFfLmlzTmFOKHBhcnNlSW50KG8pKSB8fCAhXy5pc05hTihwYXJzZUZsb2F0KG8pKTtcbn1cblxuZnVuY3Rpb24gbXNWYWxpZGF0b3IgKG1zKSB7XG4gIGlmICghXy5pc051bWJlcihtcykgfHwgbXMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXYWl0IG1zIG11c3QgYmUgYSBudW1iZXIgZXF1YWwgdG8gMCBvciBncmVhdGVyJyk7XG4gIH1cbn1cblxuY29uc3QgdmFsaWRhdG9ycyA9IHtcbiAgc2V0VXJsOiAodXJsKSA9PiB7XG4gICAgLy8gZWl0aGVyIGFuIGB4eXo6Ly9gLCBgYWJvdXQ6YCwgb3IgYGRhdGE6YCBzY2hlbWUgaXMgYWxsb3dlZFxuICAgIGlmICghdXJsIHx8ICF1cmwubWF0Y2goL14oW2EtekEtWjAtOV8tXSs6XFwvXFwvKXwoYWJvdXQ6KXwoZGF0YTopLykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVXJsIG9yIFVyaSBtdXN0IHN0YXJ0IHdpdGggPHNjaGVtZT46Ly8nKTtcbiAgICB9XG4gIH0sXG4gIGltcGxpY2l0V2FpdDogKG1zKSA9PiB7XG4gICAgbXNWYWxpZGF0b3IobXMpO1xuICB9LFxuICBhc3luY1NjcmlwdFRpbWVvdXQ6IChtcykgPT4ge1xuICAgIG1zVmFsaWRhdG9yKG1zKTtcbiAgfSxcbiAgdGltZW91dHM6ICh0eXBlLCBtcykgPT4ge1xuICAgIG1zVmFsaWRhdG9yKG1zKTtcbiAgICBpZiAoIV8uaW5jbHVkZXMoWydzY3JpcHQnLCAnaW1wbGljaXQnLCAncGFnZSBsb2FkJywgJ2NvbW1hbmQnXSwgdHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7dHlwZX0nIGlzIG5vdCBhIHZhbGlkIHRpbWVvdXQgdHlwZWApO1xuICAgIH1cbiAgfSxcbiAgY2xpY2tDdXJyZW50OiAoYnV0dG9uKSA9PiB7XG4gICAgaWYgKCEoaXNOdW1iZXIoYnV0dG9uKSB8fCBfLmlzVW5kZWZpbmVkKGJ1dHRvbikpIHx8IChidXR0b24gPCAwIHx8IGJ1dHRvbiA+IDIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWNrIGJ1dHRvbiBtdXN0IGJlIDAsIDEsIG9yIDInKTtcbiAgICB9XG4gIH0sXG4gIHNldE5ldHdvcmtDb25uZWN0aW9uOiAodHlwZSkgPT4ge1xuICAgIGlmICghaXNOdW1iZXIodHlwZSkgfHwgWzAsIDEsIDIsIDQsIDZdLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgdHlwZSBtdXN0IGJlIG9uZSBvZiAwLCAxLCAyLCA0LCA2Jyk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyB2YWxpZGF0b3JzIH07XG4iXX0=