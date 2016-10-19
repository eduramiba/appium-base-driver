'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumLogger = require('appium-logger');

var _validators = require('./validators');

var _errors = require('./errors');

var _routes = require('./routes');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var log = (0, _appiumLogger.getLogger)('MJSONWP');
var JSONWP_SUCCESS_STATUS_CODE = 0;
var LOG_OBJ_LENGTH = 150;

var MJSONWP = function MJSONWP() {
  _classCallCheck(this, MJSONWP);
};

function isSessionCommand(command) {
  return !_lodash2['default'].includes(_routes.NO_SESSION_ID_COMMANDS, command);
}

function wrapParams(paramSets, jsonObj) {
  /* There are commands like performTouch which take a single parameter (primitive type or array).
   * Some drivers choose to pass this parameter as a value (eg. [action1, action2...]) while others to
   * wrap it within an object(eg' {gesture:  [action1, action2...]}), which makes it hard to validate.
   * The wrap option in the spec enforce wrapping before validation, so that all params are wrapped at
   * the time they are validated and later passed to the commands.
   */
  var res = jsonObj;
  if (_lodash2['default'].isArray(jsonObj) || !_lodash2['default'].isObject(jsonObj)) {
    res = {};
    res[paramSets.wrap] = jsonObj;
  }
  return res;
}

function unwrapParams(paramSets, jsonObj) {
  /* There are commands like setNetworkConnection which send parameters wrapped inside a key such as
   * "parameters". This function unwraps them (eg. {"parameters": {"type": 1}} becomes {"type": 1}).
   */
  var res = jsonObj;
  if (_lodash2['default'].isObject(jsonObj)) {
    // some clients, like ruby, don't wrap
    if (jsonObj[paramSets.unwrap]) {
      res = jsonObj[paramSets.unwrap];
    }
  }
  return res;
}

function checkParams(paramSets, jsonObj) {
  var requiredParams = [];
  var optionalParams = [];
  var receivedParams = _lodash2['default'].keys(jsonObj);

  if (paramSets) {
    if (paramSets.required) {
      // we might have an array of parameters,
      // or an array of arrays of parameters, so standardize
      if (!_lodash2['default'].isArray(_lodash2['default'].first(paramSets.required))) {
        requiredParams = [paramSets.required];
      } else {
        requiredParams = paramSets.required;
      }
    }
    // optional parameters are just an array
    if (paramSets.optional) {
      optionalParams = paramSets.optional;
    }
  }

  // if we have no required parameters, all is well
  if (requiredParams.length === 0) {
    return;
  }

  // some clients pass in the session id in the params
  optionalParams.push('sessionId');

  // some clients pass in an element id in the params
  optionalParams.push('id');

  // go through the required parameters and check against our arguments
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(requiredParams), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var params = _step.value;

      if (_lodash2['default'].difference(receivedParams, params, optionalParams).length === 0 && _lodash2['default'].difference(params, receivedParams).length === 0) {
        // we have a set of parameters that is correct
        // so short-circuit
        return;
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

  throw new _errors.errors.BadParametersError(paramSets, receivedParams);
}

function makeArgs(reqParams, jsonObj, payloadParams) {
  // we want to pass the url parameters to the commands in reverse order
  // since the command will sometimes want to ignore, say, the sessionId
  var urlParams = _lodash2['default'].keys(reqParams).reverse();

  // there can be multiple sets of required params, so find the correct one
  var realRequiredParams = payloadParams.required;
  if (_lodash2['default'].isArray(_lodash2['default'].first(payloadParams.required))) {
    var keys = _lodash2['default'].keys(jsonObj);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(payloadParams.required), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var params = _step2.value;

        // check if all the required parameters are in the json object
        if (_lodash2['default'].without.apply(_lodash2['default'], [params].concat(_toConsumableArray(keys))).length === 0) {
          // we have all the parameters for this set
          realRequiredParams = params;
          break;
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
  var args = _lodash2['default'].flatten(realRequiredParams).map(function (p) {
    return jsonObj[p];
  });

  if (payloadParams.optional) {
    args = args.concat(_lodash2['default'].flatten(payloadParams.optional).map(function (p) {
      return jsonObj[p];
    }));
  }
  args = args.concat(urlParams.map(function (u) {
    return reqParams[u];
  }));
  return args;
}

function getResponseForJsonwpError(err) {
  var httpStatus = 500;
  var httpResBody = {
    status: err.jsonwpCode,
    value: {
      message: err.message
    }
  };

  if ((0, _errors.isErrorType)(err, _errors.errors.BadParametersError)) {
    // respond with a 400 if we have bad parameters
    log.debug('Bad parameters: ' + err);
    httpStatus = 400;
    httpResBody = err.message;
  } else if ((0, _errors.isErrorType)(err, _errors.errors.NotYetImplementedError) || (0, _errors.isErrorType)(err, _errors.errors.NotImplementedError)) {
    // respond with a 501 if the method is not implemented
    httpStatus = 501;
  } else if ((0, _errors.isErrorType)(err, _errors.errors.NoSuchDriverError)) {
    // respond with a 404 if there is no driver for the session
    httpStatus = 404;
  }

  return [httpStatus, httpResBody];
}

function routeConfiguringFunction(driver) {
  if (!driver.sessionExists) {
    throw new Error('Drivers used with MJSONWP must implement `sessionExists`');
  }

  if (!(driver.executeCommand || driver.execute)) {
    throw new Error('Drivers used with MJSONWP must implement `executeCommand` or `execute`');
  }

  // return a function which will add all the routes to the driver
  return function (app) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(_routes.METHOD_MAP)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var path = _step3$value[0];
        var methods = _step3$value[1];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _getIterator(_lodash2['default'].toPairs(methods)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = _slicedToArray(_step4.value, 2);

            var method = _step4$value[0];
            var spec = _step4$value[1];

            var isSessCmd = isSessionCommand(spec.command);

            // set up the express route handler
            buildHandler(app, method, path, spec, driver, isSessCmd);
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
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  };
}

function buildHandler(app, method, path, spec, driver, isSessCmd) {
  var _this = this;

  var asyncHandler = function asyncHandler(req, res) {
    var jsonObj, httpResBody, httpStatus, newSessionId, args, driverRes, actualErr, _getResponseForJsonwpError, _getResponseForJsonwpError2;

    return _regeneratorRuntime.async(function asyncHandler$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          jsonObj = req.body;
          httpResBody = {};
          httpStatus = 200;
          newSessionId = undefined;
          context$2$0.prev = 4;

          if (!(isSessCmd && !driver.sessionExists(req.params.sessionId))) {
            context$2$0.next = 7;
            break;
          }

          throw new _errors.errors.NoSuchDriverError();

        case 7:
          if (!(isSessCmd && driverShouldDoJwpProxy(driver, req, spec.command))) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(doJwpProxy(driver, req, res));

        case 10:
          return context$2$0.abrupt('return');

        case 11:
          if (spec.command) {
            context$2$0.next = 13;
            break;
          }

          throw new _errors.errors.NotImplementedError();

        case 13:

          // wrap params if necessary
          if (spec.payloadParams && spec.payloadParams.wrap) {
            jsonObj = wrapParams(spec.payloadParams, jsonObj);
          }

          // unwrap params if necessary
          if (spec.payloadParams && spec.payloadParams.unwrap) {
            jsonObj = unwrapParams(spec.payloadParams, jsonObj);
          }

          // ensure that the json payload conforms to the spec
          checkParams(spec.payloadParams, jsonObj);
          // ensure the session the user is trying to use is valid

          // turn the command and json payload into an argument list for
          // the driver methods
          args = makeArgs(req.params, jsonObj, spec.payloadParams || []);
          driverRes = undefined;

          // validate command args according to MJSONWP
          if (_validators.validators[spec.command]) {
            _validators.validators[spec.command].apply(_validators.validators, _toConsumableArray(args));
          }
          // run the driver command wrapped inside the argument validators
          log.info('Calling ' + driver.constructor.name + '.' + spec.command + '() with args: ' + JSON.stringify(args));

          if (!driver.executeCommand) {
            context$2$0.next = 26;
            break;
          }

          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(driver.executeCommand.apply(driver, [spec.command].concat(_toConsumableArray(args))));

        case 23:
          driverRes = context$2$0.sent;
          context$2$0.next = 29;
          break;

        case 26:
          context$2$0.next = 28;
          return _regeneratorRuntime.awrap(driver.execute.apply(driver, [spec.command].concat(_toConsumableArray(args))));

        case 28:
          driverRes = context$2$0.sent;

        case 29:

          // unpack createSession response
          if (spec.command === 'createSession') {
            newSessionId = driverRes[0];
            driverRes = driverRes[1];
          }

          // convert undefined to null, but leave all other values the same
          if (_lodash2['default'].isUndefined(driverRes)) {
            driverRes = null;
          }

          // delete should not return anything even if successful
          if (spec.command === 'deleteSession') {
            log.debug('Received response: ' + JSON.stringify(driverRes));
            log.debug('But deleting session, so not returning');
            driverRes = null;
          }

          // if the status is not 0,  throw the appropriate error for status code.

          if (!(_appiumSupport.util.hasValue(driverRes) && _appiumSupport.util.hasValue(driverRes.status) && parseInt(driverRes.status, 10) !== 0)) {
            context$2$0.next = 34;
            break;
          }

          throw (0, _errors.errorFromCode)(driverRes.status, driverRes.value);

        case 34:

          // Response status should be the status set by the driver response.
          httpResBody.status = _lodash2['default'].isNil(driverRes) || _lodash2['default'].isUndefined(driverRes.status) ? JSONWP_SUCCESS_STATUS_CODE : driverRes.status;
          httpResBody.value = driverRes;
          log.info('Responding to client with driver.' + spec.command + '() ' + ('result: ' + JSON.stringify(driverRes)));
          context$2$0.next = 47;
          break;

        case 39:
          context$2$0.prev = 39;
          context$2$0.t0 = context$2$0['catch'](4);
          actualErr = context$2$0.t0;

          if ((0, _errors.isErrorType)(context$2$0.t0, _errors.errors.ProxyRequestError)) {
            log.error('Encountered internal error running command:  ' + JSON.stringify(context$2$0.t0) + ' ' + context$2$0.t0.stack);
            actualErr = context$2$0.t0.getActualError();
          } else if (!((0, _errors.isErrorType)(context$2$0.t0, _errors.MJSONWPError) || (0, _errors.isErrorType)(context$2$0.t0, _errors.errors.BadParametersError))) {
            log.error('Encountered internal error running command: ' + context$2$0.t0.stack);
            actualErr = new _errors.errors.UnknownError(context$2$0.t0);
          }
          // if anything goes wrong, figure out what our response should be
          // based on the type of error that we encountered
          _getResponseForJsonwpError = getResponseForJsonwpError(actualErr);
          _getResponseForJsonwpError2 = _slicedToArray(_getResponseForJsonwpError, 2);
          httpStatus = _getResponseForJsonwpError2[0];
          httpResBody = _getResponseForJsonwpError2[1];

        case 47:

          // decode the response, which is either a string or json
          if (_lodash2['default'].isString(httpResBody)) {
            res.status(httpStatus).send(httpResBody);
          } else {
            if (newSessionId) {
              httpResBody.sessionId = newSessionId;
            } else {
              httpResBody.sessionId = req.params.sessionId || null;
            }

            res.status(httpStatus).json(httpResBody);
          }

        case 48:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[4, 39]]);
  };
  // add the method to the app
  app[method.toLowerCase()](path, function (req, res) {
    _bluebird2['default'].resolve(asyncHandler(req, res)).done();
  });
}

function driverShouldDoJwpProxy(driver, req, command) {
  // drivers need to explicitly say when the proxy is active
  if (!driver.proxyActive(req.params.sessionId)) {
    return false;
  }

  // we should never proxy deleteSession because we need to give the containing
  // driver an opportunity to clean itself up
  if (command === 'deleteSession') {
    return false;
  }

  // validate avoidance schema, and say we shouldn't proxy if anything in the
  // avoid list matches our req
  var proxyAvoidList = driver.getProxyAvoidList(req.params.sessionId);
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(proxyAvoidList), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var avoidSchema = _step5.value;

      if (!_lodash2['default'].isArray(avoidSchema) || avoidSchema.length !== 2) {
        throw new Error('Proxy avoidance must be a list of pairs');
      }

      var _avoidSchema = _slicedToArray(avoidSchema, 2);

      var avoidMethod = _avoidSchema[0];
      var avoidPathRegex = _avoidSchema[1];

      if (!_lodash2['default'].includes(['GET', 'POST', 'DELETE'], avoidMethod)) {
        throw new Error('Unrecognized proxy avoidance method \'' + avoidMethod + '\'');
      }
      if (!(avoidPathRegex instanceof RegExp)) {
        throw new Error('Proxy avoidance path must be a regular expression');
      }
      var normalizedUrl = req.originalUrl.replace(/^\/wd\/hub/, '');
      if (avoidMethod === req.method && avoidPathRegex.test(normalizedUrl)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return true;
}

function doJwpProxy(driver, req, res) {
  return _regeneratorRuntime.async(function doJwpProxy$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        log.info('Driver proxy active, passing request on via HTTP proxy');

        // check that the inner driver has a proxy function

        if (driver.canProxy(req.params.sessionId)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error('Trying to proxy to a JSONWP server but driver is unable to proxy');

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(driver.executeCommand('proxyReqRes', req, res, req.params.sessionId));

      case 6:
        context$1$0.next = 15;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](3);

        if (!(0, _errors.isErrorType)(context$1$0.t0, _errors.errors.ProxyRequestError)) {
          context$1$0.next = 14;
          break;
        }

        throw context$1$0.t0;

      case 14:
        throw new Error('Could not proxy. Proxy error: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 8]]);
}

exports.MJSONWP = MJSONWP;
exports.routeConfiguringFunction = routeConfiguringFunction;
exports.isSessionCommand = isSessionCommand;

// if this is a session command but we don't have a session,
// error out early (especially before proxying)

// if the driver is currently proxying commands to another JSONWP
// server, bypass all our checks and assume the upstream server knows
// what it's doing. But keep this in the try/catch block so if proxying
// itself fails, we give a message to the client. Of course we only
// want to do these when we have a session command; the Appium driver
// must be responsible for start/stop session, etc...

// if a command is not in our method map, it's because we
// have no plans to ever implement it
//# sourceMappingURL=data:application/json;base64,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QUksQ0FBQztDQUNiOztBQUVELFNBQWUsVUFBVSxDQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRzs7OztBQUN6QyxXQUFHLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7Ozs7WUFHOUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Ozs7Y0FDbEMsSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUM7Ozs7O3lDQUc3RSxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7O2FBRXRFLHlDQUFpQixlQUFPLGlCQUFpQixDQUFDOzs7Ozs7OztjQUd0QyxJQUFJLEtBQUssb0NBQWtDLGVBQUksT0FBTyxDQUFHOzs7Ozs7O0NBR3BFOztRQUdRLE9BQU8sR0FBUCxPQUFPO1FBQUUsd0JBQXdCLEdBQXhCLHdCQUF3QjtRQUFFLGdCQUFnQixHQUFoQixnQkFBZ0IiLCJmaWxlIjoibGliL21qc29ud3AvbWpzb253cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tICdhcHBpdW0tbG9nZ2VyJztcbmltcG9ydCB7IHZhbGlkYXRvcnMgfSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgZXJyb3JzLCBpc0Vycm9yVHlwZSwgTUpTT05XUEVycm9yLCBlcnJvckZyb21Db2RlIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgTUVUSE9EX01BUCwgTk9fU0VTU0lPTl9JRF9DT01NQU5EUyB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5cbmNvbnN0IGxvZyA9IGdldExvZ2dlcignTUpTT05XUCcpO1xuY29uc3QgSlNPTldQX1NVQ0NFU1NfU1RBVFVTX0NPREUgPSAwO1xuY29uc3QgTE9HX09CSl9MRU5HVEggPSAxNTA7XG5cbmNsYXNzIE1KU09OV1Age31cblxuZnVuY3Rpb24gaXNTZXNzaW9uQ29tbWFuZCAoY29tbWFuZCkge1xuICByZXR1cm4gIV8uaW5jbHVkZXMoTk9fU0VTU0lPTl9JRF9DT01NQU5EUywgY29tbWFuZCk7XG59XG5cbmZ1bmN0aW9uIHdyYXBQYXJhbXMgKHBhcmFtU2V0cywganNvbk9iaikge1xuICAvKiBUaGVyZSBhcmUgY29tbWFuZHMgbGlrZSBwZXJmb3JtVG91Y2ggd2hpY2ggdGFrZSBhIHNpbmdsZSBwYXJhbWV0ZXIgKHByaW1pdGl2ZSB0eXBlIG9yIGFycmF5KS5cbiAgICogU29tZSBkcml2ZXJzIGNob29zZSB0byBwYXNzIHRoaXMgcGFyYW1ldGVyIGFzIGEgdmFsdWUgKGVnLiBbYWN0aW9uMSwgYWN0aW9uMi4uLl0pIHdoaWxlIG90aGVycyB0b1xuICAgKiB3cmFwIGl0IHdpdGhpbiBhbiBvYmplY3QoZWcnIHtnZXN0dXJlOiAgW2FjdGlvbjEsIGFjdGlvbjIuLi5dfSksIHdoaWNoIG1ha2VzIGl0IGhhcmQgdG8gdmFsaWRhdGUuXG4gICAqIFRoZSB3cmFwIG9wdGlvbiBpbiB0aGUgc3BlYyBlbmZvcmNlIHdyYXBwaW5nIGJlZm9yZSB2YWxpZGF0aW9uLCBzbyB0aGF0IGFsbCBwYXJhbXMgYXJlIHdyYXBwZWQgYXRcbiAgICogdGhlIHRpbWUgdGhleSBhcmUgdmFsaWRhdGVkIGFuZCBsYXRlciBwYXNzZWQgdG8gdGhlIGNvbW1hbmRzLlxuICAgKi9cbiAgbGV0IHJlcyA9IGpzb25PYmo7XG4gIGlmIChfLmlzQXJyYXkoanNvbk9iaikgfHwgIV8uaXNPYmplY3QoanNvbk9iaikpIHtcbiAgICByZXMgPSB7fTtcbiAgICByZXNbcGFyYW1TZXRzLndyYXBdID0ganNvbk9iajtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiB1bndyYXBQYXJhbXMgKHBhcmFtU2V0cywganNvbk9iaikge1xuICAvKiBUaGVyZSBhcmUgY29tbWFuZHMgbGlrZSBzZXROZXR3b3JrQ29ubmVjdGlvbiB3aGljaCBzZW5kIHBhcmFtZXRlcnMgd3JhcHBlZCBpbnNpZGUgYSBrZXkgc3VjaCBhc1xuICAgKiBcInBhcmFtZXRlcnNcIi4gVGhpcyBmdW5jdGlvbiB1bndyYXBzIHRoZW0gKGVnLiB7XCJwYXJhbWV0ZXJzXCI6IHtcInR5cGVcIjogMX19IGJlY29tZXMge1widHlwZVwiOiAxfSkuXG4gICAqL1xuICBsZXQgcmVzID0ganNvbk9iajtcbiAgaWYgKF8uaXNPYmplY3QoanNvbk9iaikpIHtcbiAgICAvLyBzb21lIGNsaWVudHMsIGxpa2UgcnVieSwgZG9uJ3Qgd3JhcFxuICAgIGlmIChqc29uT2JqW3BhcmFtU2V0cy51bndyYXBdKSB7XG4gICAgICByZXMgPSBqc29uT2JqW3BhcmFtU2V0cy51bndyYXBdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBjaGVja1BhcmFtcyAocGFyYW1TZXRzLCBqc29uT2JqKSB7XG4gIGxldCByZXF1aXJlZFBhcmFtcyA9IFtdO1xuICBsZXQgb3B0aW9uYWxQYXJhbXMgPSBbXTtcbiAgbGV0IHJlY2VpdmVkUGFyYW1zID0gXy5rZXlzKGpzb25PYmopO1xuXG4gIGlmIChwYXJhbVNldHMpIHtcbiAgICBpZiAocGFyYW1TZXRzLnJlcXVpcmVkKSB7XG4gICAgICAvLyB3ZSBtaWdodCBoYXZlIGFuIGFycmF5IG9mIHBhcmFtZXRlcnMsXG4gICAgICAvLyBvciBhbiBhcnJheSBvZiBhcnJheXMgb2YgcGFyYW1ldGVycywgc28gc3RhbmRhcmRpemVcbiAgICAgIGlmICghXy5pc0FycmF5KF8uZmlyc3QocGFyYW1TZXRzLnJlcXVpcmVkKSkpIHtcbiAgICAgICAgcmVxdWlyZWRQYXJhbXMgPSBbcGFyYW1TZXRzLnJlcXVpcmVkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVpcmVkUGFyYW1zID0gcGFyYW1TZXRzLnJlcXVpcmVkO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzIGFyZSBqdXN0IGFuIGFycmF5XG4gICAgaWYgKHBhcmFtU2V0cy5vcHRpb25hbCkge1xuICAgICAgb3B0aW9uYWxQYXJhbXMgPSBwYXJhbVNldHMub3B0aW9uYWw7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgd2UgaGF2ZSBubyByZXF1aXJlZCBwYXJhbWV0ZXJzLCBhbGwgaXMgd2VsbFxuICBpZiAocmVxdWlyZWRQYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gc29tZSBjbGllbnRzIHBhc3MgaW4gdGhlIHNlc3Npb24gaWQgaW4gdGhlIHBhcmFtc1xuICBvcHRpb25hbFBhcmFtcy5wdXNoKCdzZXNzaW9uSWQnKTtcblxuICAvLyBzb21lIGNsaWVudHMgcGFzcyBpbiBhbiBlbGVtZW50IGlkIGluIHRoZSBwYXJhbXNcbiAgb3B0aW9uYWxQYXJhbXMucHVzaCgnaWQnKTtcblxuICAvLyBnbyB0aHJvdWdoIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFuZCBjaGVjayBhZ2FpbnN0IG91ciBhcmd1bWVudHNcbiAgZm9yIChsZXQgcGFyYW1zIG9mIHJlcXVpcmVkUGFyYW1zKSB7XG4gICAgaWYgKF8uZGlmZmVyZW5jZShyZWNlaXZlZFBhcmFtcywgcGFyYW1zLCBvcHRpb25hbFBhcmFtcykubGVuZ3RoID09PSAwICYmXG4gICAgICAgIF8uZGlmZmVyZW5jZShwYXJhbXMsIHJlY2VpdmVkUGFyYW1zKS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHdlIGhhdmUgYSBzZXQgb2YgcGFyYW1ldGVycyB0aGF0IGlzIGNvcnJlY3RcbiAgICAgIC8vIHNvIHNob3J0LWNpcmN1aXRcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IocGFyYW1TZXRzLCByZWNlaXZlZFBhcmFtcyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VBcmdzIChyZXFQYXJhbXMsIGpzb25PYmosIHBheWxvYWRQYXJhbXMpIHtcbiAgLy8gd2Ugd2FudCB0byBwYXNzIHRoZSB1cmwgcGFyYW1ldGVycyB0byB0aGUgY29tbWFuZHMgaW4gcmV2ZXJzZSBvcmRlclxuICAvLyBzaW5jZSB0aGUgY29tbWFuZCB3aWxsIHNvbWV0aW1lcyB3YW50IHRvIGlnbm9yZSwgc2F5LCB0aGUgc2Vzc2lvbklkXG4gIGxldCB1cmxQYXJhbXMgPSBfLmtleXMocmVxUGFyYW1zKS5yZXZlcnNlKCk7XG5cbiAgLy8gdGhlcmUgY2FuIGJlIG11bHRpcGxlIHNldHMgb2YgcmVxdWlyZWQgcGFyYW1zLCBzbyBmaW5kIHRoZSBjb3JyZWN0IG9uZVxuICBsZXQgcmVhbFJlcXVpcmVkUGFyYW1zID0gcGF5bG9hZFBhcmFtcy5yZXF1aXJlZDtcbiAgaWYgKF8uaXNBcnJheShfLmZpcnN0KHBheWxvYWRQYXJhbXMucmVxdWlyZWQpKSkge1xuICAgIGxldCBrZXlzID0gXy5rZXlzKGpzb25PYmopO1xuICAgIGZvciAobGV0IHBhcmFtcyBvZiBwYXlsb2FkUGFyYW1zLnJlcXVpcmVkKSB7XG4gICAgICAvLyBjaGVjayBpZiBhbGwgdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgYXJlIGluIHRoZSBqc29uIG9iamVjdFxuICAgICAgaWYgKF8ud2l0aG91dChwYXJhbXMsIC4uLmtleXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB3ZSBoYXZlIGFsbCB0aGUgcGFyYW1ldGVycyBmb3IgdGhpcyBzZXRcbiAgICAgICAgcmVhbFJlcXVpcmVkUGFyYW1zID0gcGFyYW1zO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGV0IGFyZ3MgPSBfLmZsYXR0ZW4ocmVhbFJlcXVpcmVkUGFyYW1zKS5tYXAoKHApID0+IGpzb25PYmpbcF0pO1xuXG4gIGlmIChwYXlsb2FkUGFyYW1zLm9wdGlvbmFsKSB7XG4gICAgYXJncyA9IGFyZ3MuY29uY2F0KF8uZmxhdHRlbihwYXlsb2FkUGFyYW1zLm9wdGlvbmFsKS5tYXAoKHApID0+IGpzb25PYmpbcF0pKTtcbiAgfVxuICBhcmdzID0gYXJncy5jb25jYXQodXJsUGFyYW1zLm1hcCgodSkgPT4gcmVxUGFyYW1zW3VdKSk7XG4gIHJldHVybiBhcmdzO1xufVxuXG5mdW5jdGlvbiBnZXRSZXNwb25zZUZvckpzb253cEVycm9yIChlcnIpIHtcbiAgbGV0IGh0dHBTdGF0dXMgPSA1MDA7XG4gIGxldCBodHRwUmVzQm9keSA9IHtcbiAgICBzdGF0dXM6IGVyci5qc29ud3BDb2RlLFxuICAgIHZhbHVlOiB7XG4gICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgIH1cbiAgfTtcblxuICBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuQmFkUGFyYW1ldGVyc0Vycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwMCBpZiB3ZSBoYXZlIGJhZCBwYXJhbWV0ZXJzXG4gICAgbG9nLmRlYnVnKGBCYWQgcGFyYW1ldGVyczogJHtlcnJ9YCk7XG4gICAgaHR0cFN0YXR1cyA9IDQwMDtcbiAgICBodHRwUmVzQm9keSA9IGVyci5tZXNzYWdlO1xuICB9IGVsc2UgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vdFlldEltcGxlbWVudGVkRXJyb3IpIHx8XG4gICAgICAgICAgICAgaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA1MDEgaWYgdGhlIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWRcbiAgICBodHRwU3RhdHVzID0gNTAxO1xuICB9IGVsc2UgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwNCBpZiB0aGVyZSBpcyBubyBkcml2ZXIgZm9yIHRoZSBzZXNzaW9uXG4gICAgaHR0cFN0YXR1cyA9IDQwNDtcbiAgfVxuXG5cbiAgcmV0dXJuIFtodHRwU3RhdHVzLCBodHRwUmVzQm9keV07XG59XG5cbmZ1bmN0aW9uIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiAoZHJpdmVyKSB7XG4gIGlmICghZHJpdmVyLnNlc3Npb25FeGlzdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RyaXZlcnMgdXNlZCB3aXRoIE1KU09OV1AgbXVzdCBpbXBsZW1lbnQgYHNlc3Npb25FeGlzdHNgJyk7XG4gIH1cblxuICBpZiAoIShkcml2ZXIuZXhlY3V0ZUNvbW1hbmQgfHwgZHJpdmVyLmV4ZWN1dGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEcml2ZXJzIHVzZWQgd2l0aCBNSlNPTldQIG11c3QgaW1wbGVtZW50IGBleGVjdXRlQ29tbWFuZGAgb3IgYGV4ZWN1dGVgJyk7XG4gIH1cblxuICAvLyByZXR1cm4gYSBmdW5jdGlvbiB3aGljaCB3aWxsIGFkZCBhbGwgdGhlIHJvdXRlcyB0byB0aGUgZHJpdmVyXG4gIHJldHVybiBmdW5jdGlvbiAoYXBwKSB7XG4gICAgZm9yIChsZXQgW3BhdGgsIG1ldGhvZHNdIG9mIF8udG9QYWlycyhNRVRIT0RfTUFQKSkge1xuICAgICAgZm9yIChsZXQgW21ldGhvZCwgc3BlY10gb2YgXy50b1BhaXJzKG1ldGhvZHMpKSB7XG4gICAgICAgIGxldCBpc1Nlc3NDbWQgPSBpc1Nlc3Npb25Db21tYW5kKHNwZWMuY29tbWFuZCk7XG5cbiAgICAgICAgLy8gc2V0IHVwIHRoZSBleHByZXNzIHJvdXRlIGhhbmRsZXJcbiAgICAgICAgYnVpbGRIYW5kbGVyKGFwcCwgbWV0aG9kLCBwYXRoLCBzcGVjLCBkcml2ZXIsIGlzU2Vzc0NtZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZEhhbmRsZXIgKGFwcCwgbWV0aG9kLCBwYXRoLCBzcGVjLCBkcml2ZXIsIGlzU2Vzc0NtZCkge1xuICBsZXQgYXN5bmNIYW5kbGVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgbGV0IGpzb25PYmogPSByZXEuYm9keTtcbiAgICBsZXQgaHR0cFJlc0JvZHkgPSB7fTtcbiAgICBsZXQgaHR0cFN0YXR1cyA9IDIwMDtcbiAgICBsZXQgbmV3U2Vzc2lvbklkO1xuICAgIHRyeSB7XG4gICAgICAvLyBpZiB0aGlzIGlzIGEgc2Vzc2lvbiBjb21tYW5kIGJ1dCB3ZSBkb24ndCBoYXZlIGEgc2Vzc2lvbixcbiAgICAgIC8vIGVycm9yIG91dCBlYXJseSAoZXNwZWNpYWxseSBiZWZvcmUgcHJveHlpbmcpXG4gICAgICBpZiAoaXNTZXNzQ21kICYmICFkcml2ZXIuc2Vzc2lvbkV4aXN0cyhyZXEucGFyYW1zLnNlc3Npb25JZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hEcml2ZXJFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgZHJpdmVyIGlzIGN1cnJlbnRseSBwcm94eWluZyBjb21tYW5kcyB0byBhbm90aGVyIEpTT05XUFxuICAgICAgLy8gc2VydmVyLCBieXBhc3MgYWxsIG91ciBjaGVja3MgYW5kIGFzc3VtZSB0aGUgdXBzdHJlYW0gc2VydmVyIGtub3dzXG4gICAgICAvLyB3aGF0IGl0J3MgZG9pbmcuIEJ1dCBrZWVwIHRoaXMgaW4gdGhlIHRyeS9jYXRjaCBibG9jayBzbyBpZiBwcm94eWluZ1xuICAgICAgLy8gaXRzZWxmIGZhaWxzLCB3ZSBnaXZlIGEgbWVzc2FnZSB0byB0aGUgY2xpZW50LiBPZiBjb3Vyc2Ugd2Ugb25seVxuICAgICAgLy8gd2FudCB0byBkbyB0aGVzZSB3aGVuIHdlIGhhdmUgYSBzZXNzaW9uIGNvbW1hbmQ7IHRoZSBBcHBpdW0gZHJpdmVyXG4gICAgICAvLyBtdXN0IGJlIHJlc3BvbnNpYmxlIGZvciBzdGFydC9zdG9wIHNlc3Npb24sIGV0Yy4uLlxuICAgICAgaWYgKGlzU2Vzc0NtZCAmJiBkcml2ZXJTaG91bGREb0p3cFByb3h5KGRyaXZlciwgcmVxLCBzcGVjLmNvbW1hbmQpKSB7XG4gICAgICAgIGF3YWl0IGRvSndwUHJveHkoZHJpdmVyLCByZXEsIHJlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgYSBjb21tYW5kIGlzIG5vdCBpbiBvdXIgbWV0aG9kIG1hcCwgaXQncyBiZWNhdXNlIHdlXG4gICAgICAvLyBoYXZlIG5vIHBsYW5zIHRvIGV2ZXIgaW1wbGVtZW50IGl0XG4gICAgICBpZiAoIXNwZWMuY29tbWFuZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgLy8gd3JhcCBwYXJhbXMgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoc3BlYy5wYXlsb2FkUGFyYW1zICYmIHNwZWMucGF5bG9hZFBhcmFtcy53cmFwKSB7XG4gICAgICAgIGpzb25PYmogPSB3cmFwUGFyYW1zKHNwZWMucGF5bG9hZFBhcmFtcywganNvbk9iaik7XG4gICAgICB9XG5cbiAgICAgIC8vIHVud3JhcCBwYXJhbXMgaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoc3BlYy5wYXlsb2FkUGFyYW1zICYmIHNwZWMucGF5bG9hZFBhcmFtcy51bndyYXApIHtcbiAgICAgICAganNvbk9iaiA9IHVud3JhcFBhcmFtcyhzcGVjLnBheWxvYWRQYXJhbXMsIGpzb25PYmopO1xuICAgICAgfVxuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB0aGUganNvbiBwYXlsb2FkIGNvbmZvcm1zIHRvIHRoZSBzcGVjXG4gICAgICBjaGVja1BhcmFtcyhzcGVjLnBheWxvYWRQYXJhbXMsIGpzb25PYmopO1xuICAgICAgLy8gZW5zdXJlIHRoZSBzZXNzaW9uIHRoZSB1c2VyIGlzIHRyeWluZyB0byB1c2UgaXMgdmFsaWRcblxuICAgICAgLy8gdHVybiB0aGUgY29tbWFuZCBhbmQganNvbiBwYXlsb2FkIGludG8gYW4gYXJndW1lbnQgbGlzdCBmb3JcbiAgICAgIC8vIHRoZSBkcml2ZXIgbWV0aG9kc1xuICAgICAgbGV0IGFyZ3MgPSBtYWtlQXJncyhyZXEucGFyYW1zLCBqc29uT2JqLCBzcGVjLnBheWxvYWRQYXJhbXMgfHwgW10pO1xuICAgICAgbGV0IGRyaXZlclJlcztcbiAgICAgIC8vIHZhbGlkYXRlIGNvbW1hbmQgYXJncyBhY2NvcmRpbmcgdG8gTUpTT05XUFxuICAgICAgaWYgKHZhbGlkYXRvcnNbc3BlYy5jb21tYW5kXSkge1xuICAgICAgICB2YWxpZGF0b3JzW3NwZWMuY29tbWFuZF0oLi4uYXJncyk7XG4gICAgICB9XG4gICAgICAvLyBydW4gdGhlIGRyaXZlciBjb21tYW5kIHdyYXBwZWQgaW5zaWRlIHRoZSBhcmd1bWVudCB2YWxpZGF0b3JzXG4gICAgICBsb2cuaW5mbyhgQ2FsbGluZyAke2RyaXZlci5jb25zdHJ1Y3Rvci5uYW1lfS4ke3NwZWMuY29tbWFuZH0oKSB3aXRoIGFyZ3M6IGAgKyBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG5cbiAgICAgIGlmIChkcml2ZXIuZXhlY3V0ZUNvbW1hbmQpIHtcbiAgICAgICAgZHJpdmVyUmVzID0gYXdhaXQgZHJpdmVyLmV4ZWN1dGVDb21tYW5kKHNwZWMuY29tbWFuZCwgLi4uYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcml2ZXJSZXMgPSBhd2FpdCBkcml2ZXIuZXhlY3V0ZShzcGVjLmNvbW1hbmQsIC4uLmFyZ3MpO1xuICAgICAgfVxuXG4gICAgICAvLyB1bnBhY2sgY3JlYXRlU2Vzc2lvbiByZXNwb25zZVxuICAgICAgaWYgKHNwZWMuY29tbWFuZCA9PT0gJ2NyZWF0ZVNlc3Npb24nKSB7XG4gICAgICAgIG5ld1Nlc3Npb25JZCA9IGRyaXZlclJlc1swXTtcbiAgICAgICAgZHJpdmVyUmVzID0gZHJpdmVyUmVzWzFdO1xuICAgICAgfVxuXG4gICAgICAvLyBjb252ZXJ0IHVuZGVmaW5lZCB0byBudWxsLCBidXQgbGVhdmUgYWxsIG90aGVyIHZhbHVlcyB0aGUgc2FtZVxuICAgICAgaWYgKF8uaXNVbmRlZmluZWQoZHJpdmVyUmVzKSkge1xuICAgICAgICBkcml2ZXJSZXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWxldGUgc2hvdWxkIG5vdCByZXR1cm4gYW55dGhpbmcgZXZlbiBpZiBzdWNjZXNzZnVsXG4gICAgICBpZiAoc3BlYy5jb21tYW5kID09PSAnZGVsZXRlU2Vzc2lvbicpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBSZWNlaXZlZCByZXNwb25zZTogJHtKU09OLnN0cmluZ2lmeShkcml2ZXJSZXMpfWApO1xuICAgICAgICBsb2cuZGVidWcoJ0J1dCBkZWxldGluZyBzZXNzaW9uLCBzbyBub3QgcmV0dXJuaW5nJyk7XG4gICAgICAgIGRyaXZlclJlcyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzdGF0dXMgaXMgbm90IDAsICB0aHJvdyB0aGUgYXBwcm9wcmlhdGUgZXJyb3IgZm9yIHN0YXR1cyBjb2RlLlxuICAgICAgaWYgKHV0aWwuaGFzVmFsdWUoZHJpdmVyUmVzKSAmJiB1dGlsLmhhc1ZhbHVlKGRyaXZlclJlcy5zdGF0dXMpICYmIHBhcnNlSW50KGRyaXZlclJlcy5zdGF0dXMsIDEwKSAhPT0gMCkge1xuICAgICAgICB0aHJvdyBlcnJvckZyb21Db2RlKGRyaXZlclJlcy5zdGF0dXMsIGRyaXZlclJlcy52YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIHN0YXR1cyBzaG91bGQgYmUgdGhlIHN0YXR1cyBzZXQgYnkgdGhlIGRyaXZlciByZXNwb25zZS5cbiAgICAgIGh0dHBSZXNCb2R5LnN0YXR1cyA9IChfLmlzTmlsKGRyaXZlclJlcykgfHwgXy5pc1VuZGVmaW5lZChkcml2ZXJSZXMuc3RhdHVzKSkgPyBKU09OV1BfU1VDQ0VTU19TVEFUVVNfQ09ERSA6IGRyaXZlclJlcy5zdGF0dXM7XG4gICAgICBodHRwUmVzQm9keS52YWx1ZSA9IGRyaXZlclJlcztcbiAgICAgIGxvZy5pbmZvKGBSZXNwb25kaW5nIHRvIGNsaWVudCB3aXRoIGRyaXZlci4ke3NwZWMuY29tbWFuZH0oKSBgICtcbiAgICAgICAgICAgICAgIGByZXN1bHQ6ICR7SlNPTi5zdHJpbmdpZnkoZHJpdmVyUmVzKX1gKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxldCBhY3R1YWxFcnIgPSBlcnI7XG4gICAgICBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IpKSB7XG4gICAgICAgIGxvZy5lcnJvcihgRW5jb3VudGVyZWQgaW50ZXJuYWwgZXJyb3IgcnVubmluZyBjb21tYW5kOiAgJHtKU09OLnN0cmluZ2lmeShlcnIpfSAke2Vyci5zdGFja31gKTtcbiAgICAgICAgYWN0dWFsRXJyID0gZXJyLmdldEFjdHVhbEVycm9yKCk7XG4gICAgICB9IGVsc2UgaWYgKCEoaXNFcnJvclR5cGUoZXJyLCBNSlNPTldQRXJyb3IpIHx8XG4gICAgICAgICAgICBpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IpKSkge1xuICAgICAgICBsb2cuZXJyb3IoYEVuY291bnRlcmVkIGludGVybmFsIGVycm9yIHJ1bm5pbmcgY29tbWFuZDogJHtlcnIuc3RhY2t9YCk7XG4gICAgICAgIGFjdHVhbEVyciA9IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVycik7XG4gICAgICB9XG4gICAgICAvLyBpZiBhbnl0aGluZyBnb2VzIHdyb25nLCBmaWd1cmUgb3V0IHdoYXQgb3VyIHJlc3BvbnNlIHNob3VsZCBiZVxuICAgICAgLy8gYmFzZWQgb24gdGhlIHR5cGUgb2YgZXJyb3IgdGhhdCB3ZSBlbmNvdW50ZXJlZFxuICAgICAgW2h0dHBTdGF0dXMsIGh0dHBSZXNCb2R5XSA9IGdldFJlc3BvbnNlRm9ySnNvbndwRXJyb3IoYWN0dWFsRXJyKTtcbiAgICB9XG5cbiAgICAvLyBkZWNvZGUgdGhlIHJlc3BvbnNlLCB3aGljaCBpcyBlaXRoZXIgYSBzdHJpbmcgb3IganNvblxuICAgIGlmIChfLmlzU3RyaW5nKGh0dHBSZXNCb2R5KSkge1xuICAgICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzKS5zZW5kKGh0dHBSZXNCb2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5ld1Nlc3Npb25JZCkge1xuICAgICAgICBodHRwUmVzQm9keS5zZXNzaW9uSWQgPSBuZXdTZXNzaW9uSWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBodHRwUmVzQm9keS5zZXNzaW9uSWQgPSByZXEucGFyYW1zLnNlc3Npb25JZCB8fCBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXMpLmpzb24oaHR0cFJlc0JvZHkpO1xuICAgIH1cbiAgfTtcbiAgLy8gYWRkIHRoZSBtZXRob2QgdG8gdGhlIGFwcFxuICBhcHBbbWV0aG9kLnRvTG93ZXJDYXNlKCldKHBhdGgsIChyZXEsIHJlcykgPT4ge1xuICAgIEIucmVzb2x2ZShhc3luY0hhbmRsZXIocmVxLCByZXMpKS5kb25lKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkcml2ZXJTaG91bGREb0p3cFByb3h5IChkcml2ZXIsIHJlcSwgY29tbWFuZCkge1xuICAvLyBkcml2ZXJzIG5lZWQgdG8gZXhwbGljaXRseSBzYXkgd2hlbiB0aGUgcHJveHkgaXMgYWN0aXZlXG4gIGlmICghZHJpdmVyLnByb3h5QWN0aXZlKHJlcS5wYXJhbXMuc2Vzc2lvbklkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHdlIHNob3VsZCBuZXZlciBwcm94eSBkZWxldGVTZXNzaW9uIGJlY2F1c2Ugd2UgbmVlZCB0byBnaXZlIHRoZSBjb250YWluaW5nXG4gIC8vIGRyaXZlciBhbiBvcHBvcnR1bml0eSB0byBjbGVhbiBpdHNlbGYgdXBcbiAgaWYgKGNvbW1hbmQgPT09ICdkZWxldGVTZXNzaW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHZhbGlkYXRlIGF2b2lkYW5jZSBzY2hlbWEsIGFuZCBzYXkgd2Ugc2hvdWxkbid0IHByb3h5IGlmIGFueXRoaW5nIGluIHRoZVxuICAvLyBhdm9pZCBsaXN0IG1hdGNoZXMgb3VyIHJlcVxuICBsZXQgcHJveHlBdm9pZExpc3QgPSBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QocmVxLnBhcmFtcy5zZXNzaW9uSWQpO1xuICBmb3IgKGxldCBhdm9pZFNjaGVtYSBvZiBwcm94eUF2b2lkTGlzdCkge1xuICAgIGlmICghXy5pc0FycmF5KGF2b2lkU2NoZW1hKSB8fCBhdm9pZFNjaGVtYS5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJveHkgYXZvaWRhbmNlIG11c3QgYmUgYSBsaXN0IG9mIHBhaXJzJyk7XG4gICAgfVxuICAgIGxldCBbYXZvaWRNZXRob2QsIGF2b2lkUGF0aFJlZ2V4XSA9IGF2b2lkU2NoZW1hO1xuICAgIGlmICghXy5pbmNsdWRlcyhbJ0dFVCcsICdQT1NUJywgJ0RFTEVURSddLCBhdm9pZE1ldGhvZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5yZWNvZ25pemVkIHByb3h5IGF2b2lkYW5jZSBtZXRob2QgJyR7YXZvaWRNZXRob2R9J2ApO1xuICAgIH1cbiAgICBpZiAoIShhdm9pZFBhdGhSZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJveHkgYXZvaWRhbmNlIHBhdGggbXVzdCBiZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbicpO1xuICAgIH1cbiAgICBsZXQgbm9ybWFsaXplZFVybCA9IHJlcS5vcmlnaW5hbFVybC5yZXBsYWNlKC9eXFwvd2RcXC9odWIvLCAnJyk7XG4gICAgaWYgKGF2b2lkTWV0aG9kID09PSByZXEubWV0aG9kICYmIGF2b2lkUGF0aFJlZ2V4LnRlc3Qobm9ybWFsaXplZFVybCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9Kd3BQcm94eSAoZHJpdmVyLCByZXEsIHJlcykge1xuICBsb2cuaW5mbygnRHJpdmVyIHByb3h5IGFjdGl2ZSwgcGFzc2luZyByZXF1ZXN0IG9uIHZpYSBIVFRQIHByb3h5Jyk7XG5cbiAgLy8gY2hlY2sgdGhhdCB0aGUgaW5uZXIgZHJpdmVyIGhhcyBhIHByb3h5IGZ1bmN0aW9uXG4gIGlmICghZHJpdmVyLmNhblByb3h5KHJlcS5wYXJhbXMuc2Vzc2lvbklkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHByb3h5IHRvIGEgSlNPTldQIHNlcnZlciBidXQgZHJpdmVyIGlzIHVuYWJsZSB0byBwcm94eScpO1xuICB9XG4gIHRyeSB7XG4gICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGVDb21tYW5kKCdwcm94eVJlcVJlcycsIHJlcSwgcmVzLCByZXEucGFyYW1zLnNlc3Npb25JZCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Qcm94eVJlcXVlc3RFcnJvcikpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcHJveHkuIFByb3h5IGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCB7IE1KU09OV1AsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgaXNTZXNzaW9uQ29tbWFuZCB9O1xuIl19