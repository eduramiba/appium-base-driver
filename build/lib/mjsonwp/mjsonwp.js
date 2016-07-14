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

          if (!((0, _errors.isErrorType)(context$2$0.t0, _errors.MJSONWPError) || (0, _errors.isErrorType)(context$2$0.t0, _errors.errors.BadParametersError))) {
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
        context$1$0.next = 11;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](3);
        throw new Error('Could not proxy. Proxy error: ' + context$1$0.t0.message);

      case 11:
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
//# sourceMappingURL=data:application/json;base64,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QVMsQ0FBQzs7Ozs7Y0FDbEMsSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUM7Ozs7O3lDQUc3RSxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7Y0FFcEUsSUFBSSxLQUFLLG9DQUFrQyxlQUFJLE9BQU8sQ0FBRzs7Ozs7OztDQUVsRTs7UUFHUSxPQUFPLEdBQVAsT0FBTztRQUFFLHdCQUF3QixHQUF4Qix3QkFBd0I7UUFBRSxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9tanNvbndwL21qc29ud3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSAnYXBwaXVtLWxvZ2dlcic7XG5pbXBvcnQgeyB2YWxpZGF0b3JzIH0gZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IGVycm9ycywgaXNFcnJvclR5cGUsIE1KU09OV1BFcnJvciwgZXJyb3JGcm9tQ29kZSB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IE1FVEhPRF9NQVAsIE5PX1NFU1NJT05fSURfQ09NTUFORFMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuXG5jb25zdCBsb2cgPSBnZXRMb2dnZXIoJ01KU09OV1AnKTtcbmNvbnN0IEpTT05XUF9TVUNDRVNTX1NUQVRVU19DT0RFID0gMDtcbmNvbnN0IExPR19PQkpfTEVOR1RIID0gMTUwO1xuXG5jbGFzcyBNSlNPTldQIHt9XG5cbmZ1bmN0aW9uIGlzU2Vzc2lvbkNvbW1hbmQgKGNvbW1hbmQpIHtcbiAgcmV0dXJuICFfLmluY2x1ZGVzKE5PX1NFU1NJT05fSURfQ09NTUFORFMsIGNvbW1hbmQpO1xufVxuXG5mdW5jdGlvbiB3cmFwUGFyYW1zIChwYXJhbVNldHMsIGpzb25PYmopIHtcbiAgLyogVGhlcmUgYXJlIGNvbW1hbmRzIGxpa2UgcGVyZm9ybVRvdWNoIHdoaWNoIHRha2UgYSBzaW5nbGUgcGFyYW1ldGVyIChwcmltaXRpdmUgdHlwZSBvciBhcnJheSkuXG4gICAqIFNvbWUgZHJpdmVycyBjaG9vc2UgdG8gcGFzcyB0aGlzIHBhcmFtZXRlciBhcyBhIHZhbHVlIChlZy4gW2FjdGlvbjEsIGFjdGlvbjIuLi5dKSB3aGlsZSBvdGhlcnMgdG9cbiAgICogd3JhcCBpdCB3aXRoaW4gYW4gb2JqZWN0KGVnJyB7Z2VzdHVyZTogIFthY3Rpb24xLCBhY3Rpb24yLi4uXX0pLCB3aGljaCBtYWtlcyBpdCBoYXJkIHRvIHZhbGlkYXRlLlxuICAgKiBUaGUgd3JhcCBvcHRpb24gaW4gdGhlIHNwZWMgZW5mb3JjZSB3cmFwcGluZyBiZWZvcmUgdmFsaWRhdGlvbiwgc28gdGhhdCBhbGwgcGFyYW1zIGFyZSB3cmFwcGVkIGF0XG4gICAqIHRoZSB0aW1lIHRoZXkgYXJlIHZhbGlkYXRlZCBhbmQgbGF0ZXIgcGFzc2VkIHRvIHRoZSBjb21tYW5kcy5cbiAgICovXG4gIGxldCByZXMgPSBqc29uT2JqO1xuICBpZiAoXy5pc0FycmF5KGpzb25PYmopIHx8ICFfLmlzT2JqZWN0KGpzb25PYmopKSB7XG4gICAgcmVzID0ge307XG4gICAgcmVzW3BhcmFtU2V0cy53cmFwXSA9IGpzb25PYmo7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gdW53cmFwUGFyYW1zIChwYXJhbVNldHMsIGpzb25PYmopIHtcbiAgLyogVGhlcmUgYXJlIGNvbW1hbmRzIGxpa2Ugc2V0TmV0d29ya0Nvbm5lY3Rpb24gd2hpY2ggc2VuZCBwYXJhbWV0ZXJzIHdyYXBwZWQgaW5zaWRlIGEga2V5IHN1Y2ggYXNcbiAgICogXCJwYXJhbWV0ZXJzXCIuIFRoaXMgZnVuY3Rpb24gdW53cmFwcyB0aGVtIChlZy4ge1wicGFyYW1ldGVyc1wiOiB7XCJ0eXBlXCI6IDF9fSBiZWNvbWVzIHtcInR5cGVcIjogMX0pLlxuICAgKi9cbiAgbGV0IHJlcyA9IGpzb25PYmo7XG4gIGlmIChfLmlzT2JqZWN0KGpzb25PYmopKSB7XG4gICAgLy8gc29tZSBjbGllbnRzLCBsaWtlIHJ1YnksIGRvbid0IHdyYXBcbiAgICBpZiAoanNvbk9ialtwYXJhbVNldHMudW53cmFwXSkge1xuICAgICAgcmVzID0ganNvbk9ialtwYXJhbVNldHMudW53cmFwXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY2hlY2tQYXJhbXMgKHBhcmFtU2V0cywganNvbk9iaikge1xuICBsZXQgcmVxdWlyZWRQYXJhbXMgPSBbXTtcbiAgbGV0IG9wdGlvbmFsUGFyYW1zID0gW107XG4gIGxldCByZWNlaXZlZFBhcmFtcyA9IF8ua2V5cyhqc29uT2JqKTtcblxuICBpZiAocGFyYW1TZXRzKSB7XG4gICAgaWYgKHBhcmFtU2V0cy5yZXF1aXJlZCkge1xuICAgICAgLy8gd2UgbWlnaHQgaGF2ZSBhbiBhcnJheSBvZiBwYXJhbWV0ZXJzLFxuICAgICAgLy8gb3IgYW4gYXJyYXkgb2YgYXJyYXlzIG9mIHBhcmFtZXRlcnMsIHNvIHN0YW5kYXJkaXplXG4gICAgICBpZiAoIV8uaXNBcnJheShfLmZpcnN0KHBhcmFtU2V0cy5yZXF1aXJlZCkpKSB7XG4gICAgICAgIHJlcXVpcmVkUGFyYW1zID0gW3BhcmFtU2V0cy5yZXF1aXJlZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1aXJlZFBhcmFtcyA9IHBhcmFtU2V0cy5yZXF1aXJlZDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gb3B0aW9uYWwgcGFyYW1ldGVycyBhcmUganVzdCBhbiBhcnJheVxuICAgIGlmIChwYXJhbVNldHMub3B0aW9uYWwpIHtcbiAgICAgIG9wdGlvbmFsUGFyYW1zID0gcGFyYW1TZXRzLm9wdGlvbmFsO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgbm8gcmVxdWlyZWQgcGFyYW1ldGVycywgYWxsIGlzIHdlbGxcbiAgaWYgKHJlcXVpcmVkUGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHNvbWUgY2xpZW50cyBwYXNzIGluIHRoZSBzZXNzaW9uIGlkIGluIHRoZSBwYXJhbXNcbiAgb3B0aW9uYWxQYXJhbXMucHVzaCgnc2Vzc2lvbklkJyk7XG5cbiAgLy8gc29tZSBjbGllbnRzIHBhc3MgaW4gYW4gZWxlbWVudCBpZCBpbiB0aGUgcGFyYW1zXG4gIG9wdGlvbmFsUGFyYW1zLnB1c2goJ2lkJyk7XG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBhbmQgY2hlY2sgYWdhaW5zdCBvdXIgYXJndW1lbnRzXG4gIGZvciAobGV0IHBhcmFtcyBvZiByZXF1aXJlZFBhcmFtcykge1xuICAgIGlmIChfLmRpZmZlcmVuY2UocmVjZWl2ZWRQYXJhbXMsIHBhcmFtcywgb3B0aW9uYWxQYXJhbXMpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBfLmRpZmZlcmVuY2UocGFyYW1zLCByZWNlaXZlZFBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyB3ZSBoYXZlIGEgc2V0IG9mIHBhcmFtZXRlcnMgdGhhdCBpcyBjb3JyZWN0XG4gICAgICAvLyBzbyBzaG9ydC1jaXJjdWl0XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBlcnJvcnMuQmFkUGFyYW1ldGVyc0Vycm9yKHBhcmFtU2V0cywgcmVjZWl2ZWRQYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBtYWtlQXJncyAocmVxUGFyYW1zLCBqc29uT2JqLCBwYXlsb2FkUGFyYW1zKSB7XG4gIC8vIHdlIHdhbnQgdG8gcGFzcyB0aGUgdXJsIHBhcmFtZXRlcnMgdG8gdGhlIGNvbW1hbmRzIGluIHJldmVyc2Ugb3JkZXJcbiAgLy8gc2luY2UgdGhlIGNvbW1hbmQgd2lsbCBzb21ldGltZXMgd2FudCB0byBpZ25vcmUsIHNheSwgdGhlIHNlc3Npb25JZFxuICBsZXQgdXJsUGFyYW1zID0gXy5rZXlzKHJlcVBhcmFtcykucmV2ZXJzZSgpO1xuXG4gIC8vIHRoZXJlIGNhbiBiZSBtdWx0aXBsZSBzZXRzIG9mIHJlcXVpcmVkIHBhcmFtcywgc28gZmluZCB0aGUgY29ycmVjdCBvbmVcbiAgbGV0IHJlYWxSZXF1aXJlZFBhcmFtcyA9IHBheWxvYWRQYXJhbXMucmVxdWlyZWQ7XG4gIGlmIChfLmlzQXJyYXkoXy5maXJzdChwYXlsb2FkUGFyYW1zLnJlcXVpcmVkKSkpIHtcbiAgICBsZXQga2V5cyA9IF8ua2V5cyhqc29uT2JqKTtcbiAgICBmb3IgKGxldCBwYXJhbXMgb2YgcGF5bG9hZFBhcmFtcy5yZXF1aXJlZCkge1xuICAgICAgLy8gY2hlY2sgaWYgYWxsIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBpbiB0aGUganNvbiBvYmplY3RcbiAgICAgIGlmIChfLndpdGhvdXQocGFyYW1zLCAuLi5rZXlzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gd2UgaGF2ZSBhbGwgdGhlIHBhcmFtZXRlcnMgZm9yIHRoaXMgc2V0XG4gICAgICAgIHJlYWxSZXF1aXJlZFBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxldCBhcmdzID0gXy5mbGF0dGVuKHJlYWxSZXF1aXJlZFBhcmFtcykubWFwKChwKSA9PiBqc29uT2JqW3BdKTtcblxuICBpZiAocGF5bG9hZFBhcmFtcy5vcHRpb25hbCkge1xuICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChfLmZsYXR0ZW4ocGF5bG9hZFBhcmFtcy5vcHRpb25hbCkubWFwKChwKSA9PiBqc29uT2JqW3BdKSk7XG4gIH1cbiAgYXJncyA9IGFyZ3MuY29uY2F0KHVybFBhcmFtcy5tYXAoKHUpID0+IHJlcVBhcmFtc1t1XSkpO1xuICByZXR1cm4gYXJncztcbn1cblxuZnVuY3Rpb24gZ2V0UmVzcG9uc2VGb3JKc29ud3BFcnJvciAoZXJyKSB7XG4gIGxldCBodHRwU3RhdHVzID0gNTAwO1xuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgc3RhdHVzOiBlcnIuanNvbndwQ29kZSxcbiAgICB2YWx1ZToge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICB9XG4gIH07XG5cbiAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA0MDAgaWYgd2UgaGF2ZSBiYWQgcGFyYW1ldGVyc1xuICAgIGxvZy5kZWJ1ZyhgQmFkIHBhcmFtZXRlcnM6ICR7ZXJyfWApO1xuICAgIGh0dHBTdGF0dXMgPSA0MDA7XG4gICAgaHR0cFJlc0JvZHkgPSBlcnIubWVzc2FnZTtcbiAgfSBlbHNlIGlmIChpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yKSB8fFxuICAgICAgICAgICAgIGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IpKSB7XG4gICAgLy8gcmVzcG9uZCB3aXRoIGEgNTAxIGlmIHRoZSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkXG4gICAgaHR0cFN0YXR1cyA9IDUwMTtcbiAgfSBlbHNlIGlmIChpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Ob1N1Y2hEcml2ZXJFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA0MDQgaWYgdGhlcmUgaXMgbm8gZHJpdmVyIGZvciB0aGUgc2Vzc2lvblxuICAgIGh0dHBTdGF0dXMgPSA0MDQ7XG4gIH1cblxuXG4gIHJldHVybiBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldO1xufVxuXG5mdW5jdGlvbiByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24gKGRyaXZlcikge1xuICBpZiAoIWRyaXZlci5zZXNzaW9uRXhpc3RzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEcml2ZXJzIHVzZWQgd2l0aCBNSlNPTldQIG11c3QgaW1wbGVtZW50IGBzZXNzaW9uRXhpc3RzYCcpO1xuICB9XG5cbiAgaWYgKCEoZHJpdmVyLmV4ZWN1dGVDb21tYW5kIHx8IGRyaXZlci5leGVjdXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRHJpdmVycyB1c2VkIHdpdGggTUpTT05XUCBtdXN0IGltcGxlbWVudCBgZXhlY3V0ZUNvbW1hbmRgIG9yIGBleGVjdXRlYCcpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBhZGQgYWxsIHRoZSByb3V0ZXMgdG8gdGhlIGRyaXZlclxuICByZXR1cm4gZnVuY3Rpb24gKGFwcCkge1xuICAgIGZvciAobGV0IFtwYXRoLCBtZXRob2RzXSBvZiBfLnRvUGFpcnMoTUVUSE9EX01BUCkpIHtcbiAgICAgIGZvciAobGV0IFttZXRob2QsIHNwZWNdIG9mIF8udG9QYWlycyhtZXRob2RzKSkge1xuICAgICAgICBsZXQgaXNTZXNzQ21kID0gaXNTZXNzaW9uQ29tbWFuZChzcGVjLmNvbW1hbmQpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgZXhwcmVzcyByb3V0ZSBoYW5kbGVyXG4gICAgICAgIGJ1aWxkSGFuZGxlcihhcHAsIG1ldGhvZCwgcGF0aCwgc3BlYywgZHJpdmVyLCBpc1Nlc3NDbWQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIYW5kbGVyIChhcHAsIG1ldGhvZCwgcGF0aCwgc3BlYywgZHJpdmVyLCBpc1Nlc3NDbWQpIHtcbiAgbGV0IGFzeW5jSGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGxldCBqc29uT2JqID0gcmVxLmJvZHk7XG4gICAgbGV0IGh0dHBSZXNCb2R5ID0ge307XG4gICAgbGV0IGh0dHBTdGF0dXMgPSAyMDA7XG4gICAgbGV0IG5ld1Nlc3Npb25JZDtcbiAgICB0cnkge1xuICAgICAgLy8gaWYgdGhpcyBpcyBhIHNlc3Npb24gY29tbWFuZCBidXQgd2UgZG9uJ3QgaGF2ZSBhIHNlc3Npb24sXG4gICAgICAvLyBlcnJvciBvdXQgZWFybHkgKGVzcGVjaWFsbHkgYmVmb3JlIHByb3h5aW5nKVxuICAgICAgaWYgKGlzU2Vzc0NtZCAmJiAhZHJpdmVyLnNlc3Npb25FeGlzdHMocmVxLnBhcmFtcy5zZXNzaW9uSWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoRHJpdmVyRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIGRyaXZlciBpcyBjdXJyZW50bHkgcHJveHlpbmcgY29tbWFuZHMgdG8gYW5vdGhlciBKU09OV1BcbiAgICAgIC8vIHNlcnZlciwgYnlwYXNzIGFsbCBvdXIgY2hlY2tzIGFuZCBhc3N1bWUgdGhlIHVwc3RyZWFtIHNlcnZlciBrbm93c1xuICAgICAgLy8gd2hhdCBpdCdzIGRvaW5nLiBCdXQga2VlcCB0aGlzIGluIHRoZSB0cnkvY2F0Y2ggYmxvY2sgc28gaWYgcHJveHlpbmdcbiAgICAgIC8vIGl0c2VsZiBmYWlscywgd2UgZ2l2ZSBhIG1lc3NhZ2UgdG8gdGhlIGNsaWVudC4gT2YgY291cnNlIHdlIG9ubHlcbiAgICAgIC8vIHdhbnQgdG8gZG8gdGhlc2Ugd2hlbiB3ZSBoYXZlIGEgc2Vzc2lvbiBjb21tYW5kOyB0aGUgQXBwaXVtIGRyaXZlclxuICAgICAgLy8gbXVzdCBiZSByZXNwb25zaWJsZSBmb3Igc3RhcnQvc3RvcCBzZXNzaW9uLCBldGMuLi5cbiAgICAgIGlmIChpc1Nlc3NDbWQgJiYgZHJpdmVyU2hvdWxkRG9Kd3BQcm94eShkcml2ZXIsIHJlcSwgc3BlYy5jb21tYW5kKSkge1xuICAgICAgICBhd2FpdCBkb0p3cFByb3h5KGRyaXZlciwgcmVxLCByZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGEgY29tbWFuZCBpcyBub3QgaW4gb3VyIG1ldGhvZCBtYXAsIGl0J3MgYmVjYXVzZSB3ZVxuICAgICAgLy8gaGF2ZSBubyBwbGFucyB0byBldmVyIGltcGxlbWVudCBpdFxuICAgICAgaWYgKCFzcGVjLmNvbW1hbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdyYXAgcGFyYW1zIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKHNwZWMucGF5bG9hZFBhcmFtcyAmJiBzcGVjLnBheWxvYWRQYXJhbXMud3JhcCkge1xuICAgICAgICBqc29uT2JqID0gd3JhcFBhcmFtcyhzcGVjLnBheWxvYWRQYXJhbXMsIGpzb25PYmopO1xuICAgICAgfVxuXG4gICAgICAvLyB1bndyYXAgcGFyYW1zIGlmIG5lY2Vzc2FyeVxuICAgICAgaWYgKHNwZWMucGF5bG9hZFBhcmFtcyAmJiBzcGVjLnBheWxvYWRQYXJhbXMudW53cmFwKSB7XG4gICAgICAgIGpzb25PYmogPSB1bndyYXBQYXJhbXMoc3BlYy5wYXlsb2FkUGFyYW1zLCBqc29uT2JqKTtcbiAgICAgIH1cblxuICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGpzb24gcGF5bG9hZCBjb25mb3JtcyB0byB0aGUgc3BlY1xuICAgICAgY2hlY2tQYXJhbXMoc3BlYy5wYXlsb2FkUGFyYW1zLCBqc29uT2JqKTtcbiAgICAgIC8vIGVuc3VyZSB0aGUgc2Vzc2lvbiB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlIGlzIHZhbGlkXG5cbiAgICAgIC8vIHR1cm4gdGhlIGNvbW1hbmQgYW5kIGpzb24gcGF5bG9hZCBpbnRvIGFuIGFyZ3VtZW50IGxpc3QgZm9yXG4gICAgICAvLyB0aGUgZHJpdmVyIG1ldGhvZHNcbiAgICAgIGxldCBhcmdzID0gbWFrZUFyZ3MocmVxLnBhcmFtcywganNvbk9iaiwgc3BlYy5wYXlsb2FkUGFyYW1zIHx8IFtdKTtcbiAgICAgIGxldCBkcml2ZXJSZXM7XG4gICAgICAvLyB2YWxpZGF0ZSBjb21tYW5kIGFyZ3MgYWNjb3JkaW5nIHRvIE1KU09OV1BcbiAgICAgIGlmICh2YWxpZGF0b3JzW3NwZWMuY29tbWFuZF0pIHtcbiAgICAgICAgdmFsaWRhdG9yc1tzcGVjLmNvbW1hbmRdKC4uLmFyZ3MpO1xuICAgICAgfVxuICAgICAgLy8gcnVuIHRoZSBkcml2ZXIgY29tbWFuZCB3cmFwcGVkIGluc2lkZSB0aGUgYXJndW1lbnQgdmFsaWRhdG9yc1xuICAgICAgbG9nLmluZm8oYENhbGxpbmcgJHtkcml2ZXIuY29uc3RydWN0b3IubmFtZX0uJHtzcGVjLmNvbW1hbmR9KCkgd2l0aCBhcmdzOiBgICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG5cbiAgICAgIGlmIChkcml2ZXIuZXhlY3V0ZUNvbW1hbmQpIHtcbiAgICAgICAgZHJpdmVyUmVzID0gYXdhaXQgZHJpdmVyLmV4ZWN1dGVDb21tYW5kKHNwZWMuY29tbWFuZCwgLi4uYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcml2ZXJSZXMgPSBhd2FpdCBkcml2ZXIuZXhlY3V0ZShzcGVjLmNvbW1hbmQsIC4uLmFyZ3MpO1xuICAgICAgfVxuXG4gICAgICAvLyB1bnBhY2sgY3JlYXRlU2Vzc2lvbiByZXNwb25zZVxuICAgICAgaWYgKHNwZWMuY29tbWFuZCA9PT0gJ2NyZWF0ZVNlc3Npb24nKSB7XG4gICAgICAgIG5ld1Nlc3Npb25JZCA9IGRyaXZlclJlc1swXTtcbiAgICAgICAgZHJpdmVyUmVzID0gZHJpdmVyUmVzWzFdO1xuICAgICAgfVxuXG4gICAgICAvLyBjb252ZXJ0IHVuZGVmaW5lZCB0byBudWxsLCBidXQgbGVhdmUgYWxsIG90aGVyIHZhbHVlcyB0aGUgc2FtZVxuICAgICAgaWYgKF8uaXNVbmRlZmluZWQoZHJpdmVyUmVzKSkge1xuICAgICAgICBkcml2ZXJSZXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWxldGUgc2hvdWxkIG5vdCByZXR1cm4gYW55dGhpbmcgZXZlbiBpZiBzdWNjZXNzZnVsXG4gICAgICBpZiAoc3BlYy5jb21tYW5kID09PSAnZGVsZXRlU2Vzc2lvbicpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBSZWNlaXZlZCByZXNwb25zZTogJHtKU09OLnN0cmluZ2lmeShkcml2ZXJSZXMpfWApO1xuICAgICAgICBsb2cuZGVidWcoJ0J1dCBkZWxldGluZyBzZXNzaW9uLCBzbyBub3QgcmV0dXJuaW5nJyk7XG4gICAgICAgIGRyaXZlclJlcyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzdGF0dXMgaXMgbm90IDAsICB0aHJvdyB0aGUgYXBwcm9wcmlhdGUgZXJyb3IgZm9yIHN0YXR1cyBjb2RlLlxuICAgICAgaWYgKHV0aWwuaGFzVmFsdWUoZHJpdmVyUmVzKSAmJiB1dGlsLmhhc1ZhbHVlKGRyaXZlclJlcy5zdGF0dXMpICYmIHBhcnNlSW50KGRyaXZlclJlcy5zdGF0dXMsIDEwKSAhPT0gMCkge1xuICAgICAgICB0aHJvdyBlcnJvckZyb21Db2RlKGRyaXZlclJlcy5zdGF0dXMsIGRyaXZlclJlcy52YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc3BvbnNlIHN0YXR1cyBzaG91bGQgYmUgdGhlIHN0YXR1cyBzZXQgYnkgdGhlIGRyaXZlciByZXNwb25zZS5cbiAgICAgIGh0dHBSZXNCb2R5LnN0YXR1cyA9IChfLmlzTmlsKGRyaXZlclJlcykgfHwgXy5pc1VuZGVmaW5lZChkcml2ZXJSZXMuc3RhdHVzKSkgPyBKU09OV1BfU1VDQ0VTU19TVEFUVVNfQ09ERSA6IGRyaXZlclJlcy5zdGF0dXM7XG4gICAgICBodHRwUmVzQm9keS52YWx1ZSA9IGRyaXZlclJlcztcbiAgICAgIGxvZy5pbmZvKGBSZXNwb25kaW5nIHRvIGNsaWVudCB3aXRoIGRyaXZlci4ke3NwZWMuY29tbWFuZH0oKSBgICtcbiAgICAgICAgICAgICAgIGByZXN1bHQ6ICR7SlNPTi5zdHJpbmdpZnkoZHJpdmVyUmVzKX1gKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxldCBhY3R1YWxFcnIgPSBlcnI7XG4gICAgICBpZiAoIShpc0Vycm9yVHlwZShlcnIsIE1KU09OV1BFcnJvcikgfHxcbiAgICAgICAgICAgIGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcikpKSB7XG4gICAgICAgIGxvZy5lcnJvcihgRW5jb3VudGVyZWQgaW50ZXJuYWwgZXJyb3IgcnVubmluZyBjb21tYW5kOiAke2Vyci5zdGFja31gKTtcbiAgICAgICAgYWN0dWFsRXJyID0gbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGFueXRoaW5nIGdvZXMgd3JvbmcsIGZpZ3VyZSBvdXQgd2hhdCBvdXIgcmVzcG9uc2Ugc2hvdWxkIGJlXG4gICAgICAvLyBiYXNlZCBvbiB0aGUgdHlwZSBvZiBlcnJvciB0aGF0IHdlIGVuY291bnRlcmVkXG4gICAgICBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldID0gZ2V0UmVzcG9uc2VGb3JKc29ud3BFcnJvcihhY3R1YWxFcnIpO1xuICAgIH1cblxuICAgIC8vIGRlY29kZSB0aGUgcmVzcG9uc2UsIHdoaWNoIGlzIGVpdGhlciBhIHN0cmluZyBvciBqc29uXG4gICAgaWYgKF8uaXNTdHJpbmcoaHR0cFJlc0JvZHkpKSB7XG4gICAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXMpLnNlbmQoaHR0cFJlc0JvZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV3U2Vzc2lvbklkKSB7XG4gICAgICAgIGh0dHBSZXNCb2R5LnNlc3Npb25JZCA9IG5ld1Nlc3Npb25JZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGh0dHBSZXNCb2R5LnNlc3Npb25JZCA9IHJlcS5wYXJhbXMuc2Vzc2lvbklkIHx8IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1cykuanNvbihodHRwUmVzQm9keSk7XG4gICAgfVxuICB9O1xuICAvLyBhZGQgdGhlIG1ldGhvZCB0byB0aGUgYXBwXG4gIGFwcFttZXRob2QudG9Mb3dlckNhc2UoKV0ocGF0aCwgKHJlcSwgcmVzKSA9PiB7XG4gICAgQi5yZXNvbHZlKGFzeW5jSGFuZGxlcihyZXEsIHJlcykpLmRvbmUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyaXZlclNob3VsZERvSndwUHJveHkgKGRyaXZlciwgcmVxLCBjb21tYW5kKSB7XG4gIC8vIGRyaXZlcnMgbmVlZCB0byBleHBsaWNpdGx5IHNheSB3aGVuIHRoZSBwcm94eSBpcyBhY3RpdmVcbiAgaWYgKCFkcml2ZXIucHJveHlBY3RpdmUocmVxLnBhcmFtcy5zZXNzaW9uSWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gd2Ugc2hvdWxkIG5ldmVyIHByb3h5IGRlbGV0ZVNlc3Npb24gYmVjYXVzZSB3ZSBuZWVkIHRvIGdpdmUgdGhlIGNvbnRhaW5pbmdcbiAgLy8gZHJpdmVyIGFuIG9wcG9ydHVuaXR5IHRvIGNsZWFuIGl0c2VsZiB1cFxuICBpZiAoY29tbWFuZCA9PT0gJ2RlbGV0ZVNlc3Npb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gdmFsaWRhdGUgYXZvaWRhbmNlIHNjaGVtYSwgYW5kIHNheSB3ZSBzaG91bGRuJ3QgcHJveHkgaWYgYW55dGhpbmcgaW4gdGhlXG4gIC8vIGF2b2lkIGxpc3QgbWF0Y2hlcyBvdXIgcmVxXG4gIGxldCBwcm94eUF2b2lkTGlzdCA9IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdChyZXEucGFyYW1zLnNlc3Npb25JZCk7XG4gIGZvciAobGV0IGF2b2lkU2NoZW1hIG9mIHByb3h5QXZvaWRMaXN0KSB7XG4gICAgaWYgKCFfLmlzQXJyYXkoYXZvaWRTY2hlbWEpIHx8IGF2b2lkU2NoZW1hLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm94eSBhdm9pZGFuY2UgbXVzdCBiZSBhIGxpc3Qgb2YgcGFpcnMnKTtcbiAgICB9XG4gICAgbGV0IFthdm9pZE1ldGhvZCwgYXZvaWRQYXRoUmVnZXhdID0gYXZvaWRTY2hlbWE7XG4gICAgaWYgKCFfLmluY2x1ZGVzKFsnR0VUJywgJ1BPU1QnLCAnREVMRVRFJ10sIGF2b2lkTWV0aG9kKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnJlY29nbml6ZWQgcHJveHkgYXZvaWRhbmNlIG1ldGhvZCAnJHthdm9pZE1ldGhvZH0nYCk7XG4gICAgfVxuICAgIGlmICghKGF2b2lkUGF0aFJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm94eSBhdm9pZGFuY2UgcGF0aCBtdXN0IGJlIGEgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgfVxuICAgIGxldCBub3JtYWxpemVkVXJsID0gcmVxLm9yaWdpbmFsVXJsLnJlcGxhY2UoL15cXC93ZFxcL2h1Yi8sICcnKTtcbiAgICBpZiAoYXZvaWRNZXRob2QgPT09IHJlcS5tZXRob2QgJiYgYXZvaWRQYXRoUmVnZXgudGVzdChub3JtYWxpemVkVXJsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb0p3cFByb3h5IChkcml2ZXIsIHJlcSwgcmVzKSB7XG4gIGxvZy5pbmZvKCdEcml2ZXIgcHJveHkgYWN0aXZlLCBwYXNzaW5nIHJlcXVlc3Qgb24gdmlhIEhUVFAgcHJveHknKTtcblxuICAvLyBjaGVjayB0aGF0IHRoZSBpbm5lciBkcml2ZXIgaGFzIGEgcHJveHkgZnVuY3Rpb25cbiAgaWYgKCFkcml2ZXIuY2FuUHJveHkocmVxLnBhcmFtcy5zZXNzaW9uSWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gcHJveHkgdG8gYSBKU09OV1Agc2VydmVyIGJ1dCBkcml2ZXIgaXMgdW5hYmxlIHRvIHByb3h5Jyk7XG4gIH1cbiAgdHJ5IHtcbiAgICBhd2FpdCBkcml2ZXIuZXhlY3V0ZUNvbW1hbmQoJ3Byb3h5UmVxUmVzJywgcmVxLCByZXMsIHJlcS5wYXJhbXMuc2Vzc2lvbklkKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcHJveHkuIFByb3h5IGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICB9XG59XG5cblxuZXhwb3J0IHsgTUpTT05XUCwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uLCBpc1Nlc3Npb25Db21tYW5kIH07XG4iXX0=