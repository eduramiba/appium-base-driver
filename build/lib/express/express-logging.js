'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('colors');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

// Copied the morgan compile function over so that cooler formats
// may be configured
function compile(fmt) {
  // escape quotes
  fmt = fmt.replace(/"/g, '\\"');
  fmt = fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
    return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
  });
  var js = '  return "' + fmt + '";';
  // jshint evil:true
  return new Function('tokens, req, res', js);
}

function requestEndLoggingFormat(tokens, req, res) {
  var status = res.statusCode;
  var statusStr = ':status';
  if (status >= 500) {
    statusStr = statusStr.red;
  } else if (status >= 400) {
    statusStr = statusStr.yellow;
  } else if (status >= 300) {
    statusStr = statusStr.cyan;
  } else {
    statusStr = statusStr.green;
  }
  var fn = compile('' + '<-- :method :url '.white + statusStr + ' ' + ':response-time ms - :res[content-length]'.grey);
  return fn(tokens, req, res);
}

var endLogFormatter = (0, _morgan2['default'])(function (tokens, req, res) {
  _logger2['default'].info(requestEndLoggingFormat(tokens, req, res), (res.jsonResp || '').grey);
});

var requestStartLoggingFormat = compile('-->'.white + ' ' + ':method'.white + ' ' + ':url'.white);

var startLogFormatter = (0, _morgan2['default'])(function (tokens, req, res) {
  // morgan output is redirected straight to winston
  var data = '';
  try {
    if (req.body) {
      data = JSON.stringify(req.body).substring(0, 1000);
    }
  } catch (ign) {}
  _logger2['default'].info(requestStartLoggingFormat(tokens, req, res), data.grey);
}, { immediate: true });

exports.endLogFormatter = endLogFormatter;
exports.startLogFormatter = startLogFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL2V4cHJlc3MtbG9nZ2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUFPLFFBQVE7O3NCQUNJLFFBQVE7Ozs7c0JBQ1gsVUFBVTs7Ozs7O0FBSzFCLFNBQVMsT0FBTyxDQUFFLEdBQUcsRUFBRTs7QUFFckIsS0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9CLEtBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUNoRCxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLGtDQUE0QixJQUFJLHNCQUFpQixHQUFHLG9CQUFpQjtHQUN0RSxDQUFDLENBQUM7QUFDTCxNQUFJLEVBQUUsa0JBQWdCLEdBQUcsT0FBSSxDQUFDOztBQUU5QixTQUFPLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQzdDOztBQUVELFNBQVMsdUJBQXVCLENBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDbEQsTUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUM1QixNQUFJLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsTUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ2pCLGFBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO0dBQzNCLE1BQU0sSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3hCLGFBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0dBQzlCLE1BQU0sSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3hCLGFBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0dBQzVCLE1BQU07QUFDTCxhQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztHQUM3QjtBQUNELE1BQUksRUFBRSxHQUFHLE9BQU8sTUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsU0FBUyxTQUFJLDBDQUEwQyxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ2hILFNBQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDN0I7O0FBRUQsSUFBTSxlQUFlLEdBQUcseUJBQU8sVUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUNuRCxzQkFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDaEQsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQSxDQUFFLElBQUksQ0FBQyxDQUFDO0NBQzlCLENBQUMsQ0FBQzs7QUFFSCxJQUFNLHlCQUF5QixHQUFHLE9BQU8sQ0FBSSxLQUFLLENBQUMsS0FBSyxTQUFJLFNBQVMsQ0FBQyxLQUFLLFNBQUksTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDOztBQUUvRixJQUFNLGlCQUFpQixHQUFHLHlCQUFPLFVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUs7O0FBRXJELE1BQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLE1BQUk7QUFDRixRQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDWixVQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNwRDtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRTtBQUNoQixzQkFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDbEUsRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDOztRQUViLGVBQWUsR0FBZixlQUFlO1FBQUUsaUJBQWlCLEdBQWpCLGlCQUFpQiIsImZpbGUiOiJsaWIvZXhwcmVzcy9leHByZXNzLWxvZ2dpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcblxuXG4vLyBDb3BpZWQgdGhlIG1vcmdhbiBjb21waWxlIGZ1bmN0aW9uIG92ZXIgc28gdGhhdCBjb29sZXIgZm9ybWF0c1xuLy8gbWF5IGJlIGNvbmZpZ3VyZWRcbmZ1bmN0aW9uIGNvbXBpbGUgKGZtdCkge1xuICAvLyBlc2NhcGUgcXVvdGVzXG4gIGZtdCA9IGZtdC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyk7XG4gIGZtdCA9IGZtdC5yZXBsYWNlKC86KFstXFx3XXsyLH0pKD86XFxbKFteXFxdXSspXFxdKT8vZyxcbiAgICBmdW5jdGlvbiAoXywgbmFtZSwgYXJnKSB7XG4gICAgICByZXR1cm4gYFwiXFxuICAgICsgKHRva2Vuc1tcIiR7bmFtZX1cIl0ocmVxLCByZXMsIFwiJHthcmd9XCIpIHx8IFwiLVwiKSArIFwiYDtcbiAgICB9KTtcbiAgbGV0IGpzID0gYCAgcmV0dXJuIFwiJHtmbXR9XCI7YDtcbiAgLy8ganNoaW50IGV2aWw6dHJ1ZVxuICByZXR1cm4gbmV3IEZ1bmN0aW9uKCd0b2tlbnMsIHJlcSwgcmVzJywganMpO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0RW5kTG9nZ2luZ0Zvcm1hdCAodG9rZW5zLCByZXEsIHJlcykge1xuICBsZXQgc3RhdHVzID0gcmVzLnN0YXR1c0NvZGU7XG4gIGxldCBzdGF0dXNTdHIgPSAnOnN0YXR1cyc7XG4gIGlmIChzdGF0dXMgPj0gNTAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLnJlZDtcbiAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLnllbGxvdztcbiAgfSBlbHNlIGlmIChzdGF0dXMgPj0gMzAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLmN5YW47XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLmdyZWVuO1xuICB9XG4gIGxldCBmbiA9IGNvbXBpbGUoYCR7JzwtLSA6bWV0aG9kIDp1cmwgJy53aGl0ZX0ke3N0YXR1c1N0cn0gJHsnOnJlc3BvbnNlLXRpbWUgbXMgLSA6cmVzW2NvbnRlbnQtbGVuZ3RoXScuZ3JleX1gKTtcbiAgcmV0dXJuIGZuKHRva2VucywgcmVxLCByZXMpO1xufVxuXG5jb25zdCBlbmRMb2dGb3JtYXR0ZXIgPSBtb3JnYW4oKHRva2VucywgcmVxLCByZXMpID0+IHtcbiAgbG9nLmluZm8ocmVxdWVzdEVuZExvZ2dpbmdGb3JtYXQodG9rZW5zLCByZXEsIHJlcyksXG4gICAgKHJlcy5qc29uUmVzcCB8fCAnJykuZ3JleSk7XG59KTtcblxuY29uc3QgcmVxdWVzdFN0YXJ0TG9nZ2luZ0Zvcm1hdCA9IGNvbXBpbGUoYCR7Jy0tPicud2hpdGV9ICR7JzptZXRob2QnLndoaXRlfSAkeyc6dXJsJy53aGl0ZX1gKTtcblxuY29uc3Qgc3RhcnRMb2dGb3JtYXR0ZXIgPSBtb3JnYW4oKHRva2VucywgcmVxLCByZXMpID0+IHtcbiAgLy8gbW9yZ2FuIG91dHB1dCBpcyByZWRpcmVjdGVkIHN0cmFpZ2h0IHRvIHdpbnN0b25cbiAgbGV0IGRhdGEgPSAnJztcbiAgdHJ5IHtcbiAgICBpZiAocmVxLmJvZHkpIHtcbiAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShyZXEuYm9keSkuc3Vic3RyaW5nKDAsIDEwMDApO1xuICAgIH1cbiAgfSBjYXRjaCAoaWduKSB7fVxuICBsb2cuaW5mbyhyZXF1ZXN0U3RhcnRMb2dnaW5nRm9ybWF0KHRva2VucywgcmVxLCByZXMpLCBkYXRhLmdyZXkpO1xufSwge2ltbWVkaWF0ZTogdHJ1ZX0pO1xuXG5leHBvcnQgeyBlbmRMb2dGb3JtYXR0ZXIsIHN0YXJ0TG9nRm9ybWF0dGVyIH07XG4iXX0=