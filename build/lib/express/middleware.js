'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _mjsonwp = require('../mjsonwp');

function allowCrossDomain(req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');

    // need to respond 200 to OPTIONS
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  } catch (err) {
    _logger2['default'].error('Unexpected error: ' + err.stack);
    next();
  }
}

function fixPythonContentType(req, res, next) {
  // hack because python client library gives us wrong content-type
  if (/^\/wd/.test(req.path) && /^Python/.test(req.headers['user-agent'])) {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.headers['content-type'] = 'application/json';
    }
  }
  next();
}

function catchAllHandler(err, req, res, next) {
  _logger2['default'].error('Uncaught error: ' + err.message);
  _logger2['default'].error('Sending generic error response');
  try {
    res.status(500).send({
      status: _mjsonwp.errors.UnknownError.code(),
      value: 'ERROR running Appium command: ' + err.message
    });
    _logger2['default'].error(err);
  } catch (ign) {
    next(ign);
  }
}

function catch4XXHandler(err, req, res, next) {
  if (err.status >= 400 && err.status < 500) {
    // set the content type to `text/plain`
    // https://code.google.com/p/selenium/wiki/JsonWireProtocol#Responses
    _logger2['default'].debug('Setting content type to \'text/plain\' for HTTP status \'' + err.status + '\'');
    res.set('Content-Type', 'text/plain');
    res.status(err.status).send('Unable to process request: ' + err.message);
  } else {
    next(err);
  }
}

function catch404Handler(req, res) {
  // set the content type to `text/plain`
  // https://code.google.com/p/selenium/wiki/JsonWireProtocol#Responses
  _logger2['default'].debug('No route found. Setting content type to \'text/plain\'');
  res.set('Content-Type', 'text/plain');
  res.status(404).send('The URL \'' + req.originalUrl + '\' did not map to a valid resource');
}

exports.allowCrossDomain = allowCrossDomain;
exports.fixPythonContentType = fixPythonContentType;
exports.catchAllHandler = catchAllHandler;
exports.catch404Handler = catch404Handler;
exports.catch4XXHandler = catch4XXHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL21pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7c0JBQWdCLFVBQVU7Ozs7dUJBQ0gsWUFBWTs7QUFHbkMsU0FBUyxnQkFBZ0IsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN6QyxNQUFJO0FBQ0YsT0FBRyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMvQyxPQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDMUUsT0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDOzs7QUFHM0UsUUFBSSxTQUFTLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUM1QixTQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCLE1BQU07QUFDTCxVQUFJLEVBQUUsQ0FBQztLQUNSO0dBQ0YsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNaLHdCQUFJLEtBQUssd0JBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUcsQ0FBQztBQUM1QyxRQUFJLEVBQUUsQ0FBQztHQUNSO0NBQ0Y7O0FBRUQsU0FBUyxvQkFBb0IsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFN0MsTUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtBQUN2RSxRQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssbUNBQW1DLEVBQUU7QUFDdkUsU0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztLQUNsRDtHQUNGO0FBQ0QsTUFBSSxFQUFFLENBQUM7Q0FDUjs7QUFFRCxTQUFTLGVBQWUsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDN0Msc0JBQUksS0FBSyxzQkFBb0IsR0FBRyxDQUFDLE9BQU8sQ0FBRyxDQUFDO0FBQzVDLHNCQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzVDLE1BQUk7QUFDRixPQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuQixZQUFNLEVBQUUsZ0JBQU8sWUFBWSxDQUFDLElBQUksRUFBRTtBQUNsQyxXQUFLLHFDQUFtQyxHQUFHLENBQUMsT0FBTyxBQUFFO0tBQ3RELENBQUMsQ0FBQztBQUNILHdCQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNoQixDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1osUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7Q0FDRjs7QUFFRCxTQUFTLGVBQWUsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDN0MsTUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTs7O0FBR3pDLHdCQUFJLEtBQUssK0RBQTBELEdBQUcsQ0FBQyxNQUFNLFFBQUksQ0FBQztBQUNsRixPQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN0QyxPQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLGlDQUErQixHQUFHLENBQUMsT0FBTyxDQUFHLENBQUM7R0FDMUUsTUFBTTtBQUNMLFFBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNYO0NBQ0Y7O0FBRUQsU0FBUyxlQUFlLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O0FBR2xDLHNCQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0FBQ3BFLEtBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLEtBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxnQkFBYSxHQUFHLENBQUMsV0FBVyx3Q0FBb0MsQ0FBQztDQUN0Rjs7UUFFUSxnQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQUUsb0JBQW9CLEdBQXBCLG9CQUFvQjtRQUFFLGVBQWUsR0FBZixlQUFlO1FBQUUsZUFBZSxHQUFmLGVBQWU7UUFBRSxlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJsaWIvZXhwcmVzcy9taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICcuLi9tanNvbndwJztcblxuXG5mdW5jdGlvbiBhbGxvd0Nyb3NzRG9tYWluIChyZXEsIHJlcywgbmV4dCkge1xuICB0cnkge1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsICcqJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdHRVQsUE9TVCxQVVQsT1BUSU9OUyxERUxFVEUnKTtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJywgJ29yaWdpbiwgY29udGVudC10eXBlLCBhY2NlcHQnKTtcblxuICAgIC8vIG5lZWQgdG8gcmVzcG9uZCAyMDAgdG8gT1BUSU9OU1xuICAgIGlmICgnT1BUSU9OUycgPT09IHJlcS5tZXRob2QpIHtcbiAgICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy5lcnJvcihgVW5leHBlY3RlZCBlcnJvcjogJHtlcnIuc3RhY2t9YCk7XG4gICAgbmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpeFB5dGhvbkNvbnRlbnRUeXBlIChyZXEsIHJlcywgbmV4dCkge1xuICAvLyBoYWNrIGJlY2F1c2UgcHl0aG9uIGNsaWVudCBsaWJyYXJ5IGdpdmVzIHVzIHdyb25nIGNvbnRlbnQtdHlwZVxuICBpZiAoL15cXC93ZC8udGVzdChyZXEucGF0aCkgJiYgL15QeXRob24vLnRlc3QocmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSkpIHtcbiAgICBpZiAocmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09PSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykge1xuICAgICAgcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgIH1cbiAgfVxuICBuZXh0KCk7XG59XG5cbmZ1bmN0aW9uIGNhdGNoQWxsSGFuZGxlciAoZXJyLCByZXEsIHJlcywgbmV4dCkge1xuICBsb2cuZXJyb3IoYFVuY2F1Z2h0IGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICBsb2cuZXJyb3IoJ1NlbmRpbmcgZ2VuZXJpYyBlcnJvciByZXNwb25zZScpO1xuICB0cnkge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5zZW5kKHtcbiAgICAgIHN0YXR1czogZXJyb3JzLlVua25vd25FcnJvci5jb2RlKCksXG4gICAgICB2YWx1ZTogYEVSUk9SIHJ1bm5pbmcgQXBwaXVtIGNvbW1hbmQ6ICR7ZXJyLm1lc3NhZ2V9YFxuICAgIH0pO1xuICAgIGxvZy5lcnJvcihlcnIpO1xuICB9IGNhdGNoIChpZ24pIHtcbiAgICBuZXh0KGlnbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2F0Y2g0WFhIYW5kbGVyIChlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIGlmIChlcnIuc3RhdHVzID49IDQwMCAmJiBlcnIuc3RhdHVzIDwgNTAwKSB7XG4gICAgLy8gc2V0IHRoZSBjb250ZW50IHR5cGUgdG8gYHRleHQvcGxhaW5gXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9zZWxlbml1bS93aWtpL0pzb25XaXJlUHJvdG9jb2wjUmVzcG9uc2VzXG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIGNvbnRlbnQgdHlwZSB0byAndGV4dC9wbGFpbicgZm9yIEhUVFAgc3RhdHVzICcke2Vyci5zdGF0dXN9J2ApO1xuICAgIHJlcy5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3BsYWluJyk7XG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzKS5zZW5kKGBVbmFibGUgdG8gcHJvY2VzcyByZXF1ZXN0OiAke2Vyci5tZXNzYWdlfWApO1xuICB9IGVsc2Uge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXRjaDQwNEhhbmRsZXIgKHJlcSwgcmVzKSB7XG4gIC8vIHNldCB0aGUgY29udGVudCB0eXBlIHRvIGB0ZXh0L3BsYWluYFxuICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3NlbGVuaXVtL3dpa2kvSnNvbldpcmVQcm90b2NvbCNSZXNwb25zZXNcbiAgbG9nLmRlYnVnKCdObyByb3V0ZSBmb3VuZC4gU2V0dGluZyBjb250ZW50IHR5cGUgdG8gXFwndGV4dC9wbGFpblxcJycpO1xuICByZXMuc2V0KCdDb250ZW50LVR5cGUnLCAndGV4dC9wbGFpbicpO1xuICByZXMuc3RhdHVzKDQwNCkuc2VuZChgVGhlIFVSTCAnJHtyZXEub3JpZ2luYWxVcmx9JyBkaWQgbm90IG1hcCB0byBhIHZhbGlkIHJlc291cmNlYCk7XG59XG5cbmV4cG9ydCB7IGFsbG93Q3Jvc3NEb21haW4sIGZpeFB5dGhvbkNvbnRlbnRUeXBlLCBjYXRjaEFsbEhhbmRsZXIsIGNhdGNoNDA0SGFuZGxlciwgY2F0Y2g0WFhIYW5kbGVyIH07XG4iXX0=