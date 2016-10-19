'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

// base error class for all of our errors

var MJSONWPError = (function (_ES6Error) {
  _inherits(MJSONWPError, _ES6Error);

  function MJSONWPError(msg, jsonwpCode) {
    _classCallCheck(this, MJSONWPError);

    _get(Object.getPrototypeOf(MJSONWPError.prototype), 'constructor', this).call(this, msg);
    this.jsonwpCode = jsonwpCode;
  }

  return MJSONWPError;
})(_es6Error2['default']);

var NoSuchDriverError = (function (_MJSONWPError) {
  _inherits(NoSuchDriverError, _MJSONWPError);

  _createClass(NoSuchDriverError, null, [{
    key: 'code',
    value: function code() {
      return 6;
    }
  }]);

  function NoSuchDriverError(err) {
    _classCallCheck(this, NoSuchDriverError);

    _get(Object.getPrototypeOf(NoSuchDriverError.prototype), 'constructor', this).call(this, err || 'A session is either terminated or not started', NoSuchDriverError.code());
  }

  return NoSuchDriverError;
})(MJSONWPError);

var NoSuchElementError = (function (_MJSONWPError2) {
  _inherits(NoSuchElementError, _MJSONWPError2);

  _createClass(NoSuchElementError, null, [{
    key: 'code',
    value: function code() {
      return 7;
    }
  }]);

  function NoSuchElementError(err) {
    _classCallCheck(this, NoSuchElementError);

    _get(Object.getPrototypeOf(NoSuchElementError.prototype), 'constructor', this).call(this, err || 'An element could not be located on the page using the given ' + 'search parameters.', NoSuchElementError.code());
  }

  return NoSuchElementError;
})(MJSONWPError);

var NoSuchFrameError = (function (_MJSONWPError3) {
  _inherits(NoSuchFrameError, _MJSONWPError3);

  _createClass(NoSuchFrameError, null, [{
    key: 'code',
    value: function code() {
      return 8;
    }
  }]);

  function NoSuchFrameError(err) {
    _classCallCheck(this, NoSuchFrameError);

    _get(Object.getPrototypeOf(NoSuchFrameError.prototype), 'constructor', this).call(this, err || 'A request to switch to a frame could not be satisfied because ' + 'the frame could not be found.', NoSuchFrameError.code());
  }

  return NoSuchFrameError;
})(MJSONWPError);

var UnknownCommandError = (function (_MJSONWPError4) {
  _inherits(UnknownCommandError, _MJSONWPError4);

  _createClass(UnknownCommandError, null, [{
    key: 'code',
    value: function code() {
      return 9;
    }
  }]);

  function UnknownCommandError(err) {
    _classCallCheck(this, UnknownCommandError);

    _get(Object.getPrototypeOf(UnknownCommandError.prototype), 'constructor', this).call(this, err || 'The requested resource could not be found, or a request was ' + 'received using an HTTP method that is not supported by the mapped ' + 'resource.', UnknownCommandError.code());
  }

  return UnknownCommandError;
})(MJSONWPError);

var StaleElementReferenceError = (function (_MJSONWPError5) {
  _inherits(StaleElementReferenceError, _MJSONWPError5);

  _createClass(StaleElementReferenceError, null, [{
    key: 'code',
    value: function code() {
      return 10;
    }
  }]);

  function StaleElementReferenceError(err) {
    _classCallCheck(this, StaleElementReferenceError);

    _get(Object.getPrototypeOf(StaleElementReferenceError.prototype), 'constructor', this).call(this, err || 'An element command failed because the referenced element is no ' + 'longer attached to the DOM.', StaleElementReferenceError.code());
  }

  return StaleElementReferenceError;
})(MJSONWPError);

var ElementNotVisibleError = (function (_MJSONWPError6) {
  _inherits(ElementNotVisibleError, _MJSONWPError6);

  _createClass(ElementNotVisibleError, null, [{
    key: 'code',
    value: function code() {
      return 11;
    }
  }]);

  function ElementNotVisibleError(err) {
    _classCallCheck(this, ElementNotVisibleError);

    _get(Object.getPrototypeOf(ElementNotVisibleError.prototype), 'constructor', this).call(this, err || 'An element command could not be completed because the element is ' + 'not visible on the page.', ElementNotVisibleError.code());
  }

  return ElementNotVisibleError;
})(MJSONWPError);

var InvalidElementStateError = (function (_MJSONWPError7) {
  _inherits(InvalidElementStateError, _MJSONWPError7);

  _createClass(InvalidElementStateError, null, [{
    key: 'code',
    value: function code() {
      return 12;
    }
  }]);

  function InvalidElementStateError(err) {
    _classCallCheck(this, InvalidElementStateError);

    _get(Object.getPrototypeOf(InvalidElementStateError.prototype), 'constructor', this).call(this, err || 'An element command could not be completed because the element is ' + 'in an invalid state (e.g. attempting to click a disabled element).', InvalidElementStateError.code());
  }

  return InvalidElementStateError;
})(MJSONWPError);

var UnknownError = (function (_MJSONWPError8) {
  _inherits(UnknownError, _MJSONWPError8);

  _createClass(UnknownError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }]);

  function UnknownError(originalError) {
    _classCallCheck(this, UnknownError);

    var origMessage = originalError;
    if (originalError instanceof Error) {
      origMessage = originalError.message;
    }
    var message = 'An unknown server-side error occurred while processing ' + 'the command.';
    if (originalError) {
      message = message + ' Original error: ' + origMessage;
    }

    _get(Object.getPrototypeOf(UnknownError.prototype), 'constructor', this).call(this, message, UnknownError.code());
  }

  return UnknownError;
})(MJSONWPError);

var ElementIsNotSelectableError = (function (_MJSONWPError9) {
  _inherits(ElementIsNotSelectableError, _MJSONWPError9);

  _createClass(ElementIsNotSelectableError, null, [{
    key: 'code',
    value: function code() {
      return 15;
    }
  }]);

  function ElementIsNotSelectableError(err) {
    _classCallCheck(this, ElementIsNotSelectableError);

    _get(Object.getPrototypeOf(ElementIsNotSelectableError.prototype), 'constructor', this).call(this, err || 'An attempt was made to select an element that cannot be selected.', ElementIsNotSelectableError.code());
  }

  return ElementIsNotSelectableError;
})(MJSONWPError);

var JavaScriptError = (function (_MJSONWPError10) {
  _inherits(JavaScriptError, _MJSONWPError10);

  _createClass(JavaScriptError, null, [{
    key: 'code',
    value: function code() {
      return 17;
    }
  }]);

  function JavaScriptError(err) {
    _classCallCheck(this, JavaScriptError);

    _get(Object.getPrototypeOf(JavaScriptError.prototype), 'constructor', this).call(this, err || 'An error occurred while executing user supplied JavaScript.', JavaScriptError.code());
  }

  return JavaScriptError;
})(MJSONWPError);

var XPathLookupError = (function (_MJSONWPError11) {
  _inherits(XPathLookupError, _MJSONWPError11);

  _createClass(XPathLookupError, null, [{
    key: 'code',
    value: function code() {
      return 19;
    }
  }]);

  function XPathLookupError(err) {
    _classCallCheck(this, XPathLookupError);

    _get(Object.getPrototypeOf(XPathLookupError.prototype), 'constructor', this).call(this, err || 'An error occurred while searching for an element by XPath.', XPathLookupError.code());
  }

  return XPathLookupError;
})(MJSONWPError);

var TimeoutError = (function (_MJSONWPError12) {
  _inherits(TimeoutError, _MJSONWPError12);

  _createClass(TimeoutError, null, [{
    key: 'code',
    value: function code() {
      return 21;
    }
  }]);

  function TimeoutError(err) {
    _classCallCheck(this, TimeoutError);

    _get(Object.getPrototypeOf(TimeoutError.prototype), 'constructor', this).call(this, err || 'An operation did not complete before its timeout expired.', TimeoutError.code());
  }

  return TimeoutError;
})(MJSONWPError);

var NoSuchWindowError = (function (_MJSONWPError13) {
  _inherits(NoSuchWindowError, _MJSONWPError13);

  _createClass(NoSuchWindowError, null, [{
    key: 'code',
    value: function code() {
      return 23;
    }
  }]);

  function NoSuchWindowError(err) {
    _classCallCheck(this, NoSuchWindowError);

    _get(Object.getPrototypeOf(NoSuchWindowError.prototype), 'constructor', this).call(this, err || 'A request to switch to a different window could not be satisfied ' + 'because the window could not be found.', NoSuchWindowError.code());
  }

  return NoSuchWindowError;
})(MJSONWPError);

var InvalidCookieDomainError = (function (_MJSONWPError14) {
  _inherits(InvalidCookieDomainError, _MJSONWPError14);

  _createClass(InvalidCookieDomainError, null, [{
    key: 'code',
    value: function code() {
      return 24;
    }
  }]);

  function InvalidCookieDomainError(err) {
    _classCallCheck(this, InvalidCookieDomainError);

    _get(Object.getPrototypeOf(InvalidCookieDomainError.prototype), 'constructor', this).call(this, err || 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.', InvalidCookieDomainError.code());
  }

  return InvalidCookieDomainError;
})(MJSONWPError);

var UnableToSetCookieError = (function (_MJSONWPError15) {
  _inherits(UnableToSetCookieError, _MJSONWPError15);

  _createClass(UnableToSetCookieError, null, [{
    key: 'code',
    value: function code() {
      return 25;
    }
  }]);

  function UnableToSetCookieError(err) {
    _classCallCheck(this, UnableToSetCookieError);

    _get(Object.getPrototypeOf(UnableToSetCookieError.prototype), 'constructor', this).call(this, err || 'A request to set a cookie\'s value could not be satisfied.', UnableToSetCookieError.code());
  }

  return UnableToSetCookieError;
})(MJSONWPError);

var UnexpectedAlertOpenError = (function (_MJSONWPError16) {
  _inherits(UnexpectedAlertOpenError, _MJSONWPError16);

  _createClass(UnexpectedAlertOpenError, null, [{
    key: 'code',
    value: function code() {
      return 26;
    }
  }]);

  function UnexpectedAlertOpenError(err) {
    _classCallCheck(this, UnexpectedAlertOpenError);

    _get(Object.getPrototypeOf(UnexpectedAlertOpenError.prototype), 'constructor', this).call(this, err || 'A modal dialog was open, blocking this operation', UnexpectedAlertOpenError.code());
  }

  return UnexpectedAlertOpenError;
})(MJSONWPError);

var NoAlertOpenError = (function (_MJSONWPError17) {
  _inherits(NoAlertOpenError, _MJSONWPError17);

  _createClass(NoAlertOpenError, null, [{
    key: 'code',
    value: function code() {
      return 27;
    }
  }]);

  function NoAlertOpenError(err) {
    _classCallCheck(this, NoAlertOpenError);

    _get(Object.getPrototypeOf(NoAlertOpenError.prototype), 'constructor', this).call(this, err || 'An attempt was made to operate on a modal dialog when one ' + 'was not open.', NoAlertOpenError.code());
  }

  return NoAlertOpenError;
})(MJSONWPError);

var ScriptTimeoutError = (function (_MJSONWPError18) {
  _inherits(ScriptTimeoutError, _MJSONWPError18);

  _createClass(ScriptTimeoutError, null, [{
    key: 'code',
    value: function code() {
      return 28;
    }
  }]);

  function ScriptTimeoutError(err) {
    _classCallCheck(this, ScriptTimeoutError);

    _get(Object.getPrototypeOf(ScriptTimeoutError.prototype), 'constructor', this).call(this, err || 'A script did not complete before its timeout expired.', ScriptTimeoutError.code());
  }

  return ScriptTimeoutError;
})(MJSONWPError);

var InvalidElementCoordinatesError = (function (_MJSONWPError19) {
  _inherits(InvalidElementCoordinatesError, _MJSONWPError19);

  _createClass(InvalidElementCoordinatesError, null, [{
    key: 'code',
    value: function code() {
      return 29;
    }
  }]);

  function InvalidElementCoordinatesError(err) {
    _classCallCheck(this, InvalidElementCoordinatesError);

    _get(Object.getPrototypeOf(InvalidElementCoordinatesError.prototype), 'constructor', this).call(this, err || 'The coordinates provided to an interactions operation are invalid.', InvalidElementCoordinatesError.code());
  }

  return InvalidElementCoordinatesError;
})(MJSONWPError);

var IMENotAvailableError = (function (_MJSONWPError20) {
  _inherits(IMENotAvailableError, _MJSONWPError20);

  _createClass(IMENotAvailableError, null, [{
    key: 'code',
    value: function code() {
      return 30;
    }
  }]);

  function IMENotAvailableError(err) {
    _classCallCheck(this, IMENotAvailableError);

    _get(Object.getPrototypeOf(IMENotAvailableError.prototype), 'constructor', this).call(this, err || 'IME was not available.', IMENotAvailableError.code());
  }

  return IMENotAvailableError;
})(MJSONWPError);

var IMEEngineActivationFailedError = (function (_MJSONWPError21) {
  _inherits(IMEEngineActivationFailedError, _MJSONWPError21);

  _createClass(IMEEngineActivationFailedError, null, [{
    key: 'code',
    value: function code() {
      return 31;
    }
  }]);

  function IMEEngineActivationFailedError(err) {
    _classCallCheck(this, IMEEngineActivationFailedError);

    _get(Object.getPrototypeOf(IMEEngineActivationFailedError.prototype), 'constructor', this).call(this, err || 'An IME engine could not be started.', IMEEngineActivationFailedError.code());
  }

  return IMEEngineActivationFailedError;
})(MJSONWPError);

var InvalidSelectorError = (function (_MJSONWPError22) {
  _inherits(InvalidSelectorError, _MJSONWPError22);

  _createClass(InvalidSelectorError, null, [{
    key: 'code',
    value: function code() {
      return 32;
    }
  }]);

  function InvalidSelectorError(err) {
    _classCallCheck(this, InvalidSelectorError);

    _get(Object.getPrototypeOf(InvalidSelectorError.prototype), 'constructor', this).call(this, err || 'Argument was an invalid selector (e.g. XPath/CSS).', InvalidSelectorError.code());
  }

  return InvalidSelectorError;
})(MJSONWPError);

var SessionNotCreatedError = (function (_MJSONWPError23) {
  _inherits(SessionNotCreatedError, _MJSONWPError23);

  _createClass(SessionNotCreatedError, null, [{
    key: 'code',
    value: function code() {
      return 33;
    }
  }]);

  function SessionNotCreatedError(details) {
    _classCallCheck(this, SessionNotCreatedError);

    var message = 'A new session could not be created.';
    if (details) {
      message += ' Details: ' + details;
    }

    _get(Object.getPrototypeOf(SessionNotCreatedError.prototype), 'constructor', this).call(this, message, SessionNotCreatedError.code());
  }

  return SessionNotCreatedError;
})(MJSONWPError);

var MoveTargetOutOfBoundsError = (function (_MJSONWPError24) {
  _inherits(MoveTargetOutOfBoundsError, _MJSONWPError24);

  _createClass(MoveTargetOutOfBoundsError, null, [{
    key: 'code',
    value: function code() {
      return 34;
    }
  }]);

  function MoveTargetOutOfBoundsError(err) {
    _classCallCheck(this, MoveTargetOutOfBoundsError);

    _get(Object.getPrototypeOf(MoveTargetOutOfBoundsError.prototype), 'constructor', this).call(this, err || 'Target provided for a move action is out of bounds.', MoveTargetOutOfBoundsError.code());
  }

  return MoveTargetOutOfBoundsError;
})(MJSONWPError);

var NoSuchContextError = (function (_MJSONWPError25) {
  _inherits(NoSuchContextError, _MJSONWPError25);

  _createClass(NoSuchContextError, null, [{
    key: 'code',
    value: function code() {
      return 35;
    }
  }]);

  function NoSuchContextError(err) {
    _classCallCheck(this, NoSuchContextError);

    _get(Object.getPrototypeOf(NoSuchContextError.prototype), 'constructor', this).call(this, err || 'No such context found.', NoSuchContextError.code());
  }

  return NoSuchContextError;
})(MJSONWPError);

var InvalidContextError = (function (_MJSONWPError26) {
  _inherits(InvalidContextError, _MJSONWPError26);

  _createClass(InvalidContextError, null, [{
    key: 'code',
    value: function code() {
      return 36;
    }
  }]);

  function InvalidContextError(err) {
    _classCallCheck(this, InvalidContextError);

    _get(Object.getPrototypeOf(InvalidContextError.prototype), 'constructor', this).call(this, err || 'That command could not be executed in the current context.', InvalidContextError.code());
  }

  return InvalidContextError;
})(MJSONWPError);

var NotYetImplementedError = (function (_MJSONWPError27) {
  _inherits(NotYetImplementedError, _MJSONWPError27);

  _createClass(NotYetImplementedError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }]);

  function NotYetImplementedError(err) {
    _classCallCheck(this, NotYetImplementedError);

    _get(Object.getPrototypeOf(NotYetImplementedError.prototype), 'constructor', this).call(this, err || 'Method has not yet been implemented', NotYetImplementedError.code());
  }

  return NotYetImplementedError;
})(MJSONWPError);

var NotImplementedError = (function (_MJSONWPError28) {
  _inherits(NotImplementedError, _MJSONWPError28);

  _createClass(NotImplementedError, null, [{
    key: 'code',
    value: function code() {
      return 13;
    }
  }]);

  function NotImplementedError(err) {
    _classCallCheck(this, NotImplementedError);

    _get(Object.getPrototypeOf(NotImplementedError.prototype), 'constructor', this).call(this, err || 'Method is not implemented', NotImplementedError.code());
  }

  return NotImplementedError;
})(MJSONWPError);

var BadParametersError = (function (_ES6Error2) {
  _inherits(BadParametersError, _ES6Error2);

  function BadParametersError(requiredParams, actualParams) {
    _classCallCheck(this, BadParametersError);

    _get(Object.getPrototypeOf(BadParametersError.prototype), 'constructor', this).call(this, 'Parameters were incorrect. We wanted ' + (JSON.stringify(requiredParams) + ' and you ') + ('sent ' + JSON.stringify(actualParams)));
  }

  /**
   * ProxyRequestError is a custom error and will be thrown up on unsuccessful proxy request and
   * will contain information about the proxy failure.
   * In case of ProxyRequestError should fetch the actual error by calling `getActualError()`
   * for proxy failure to generate the client response.
   */
  return BadParametersError;
})(_es6Error2['default']);

var ProxyRequestError = (function (_ES6Error3) {
  _inherits(ProxyRequestError, _ES6Error3);

  function ProxyRequestError(err, jsonwp) {
    _classCallCheck(this, ProxyRequestError);

    var message = 'Proxy request unsuccessful. ' + (_appiumSupport.util.hasValue(jsonwp) ? jsonwp.value : '');
    _get(Object.getPrototypeOf(ProxyRequestError.prototype), 'constructor', this).call(this, err || message);
    if (typeof jsonwp === 'string') {
      this.jsonwp = JSON.parse(jsonwp);
    } else {
      this.jsonwp = jsonwp;
    }
  }

  // map of error class name to error class

  _createClass(ProxyRequestError, [{
    key: 'getActualError',
    value: function getActualError() {
      if (_appiumSupport.util.hasValue(this.jsonwp) && _appiumSupport.util.hasValue(this.jsonwp.status) && _appiumSupport.util.hasValue(this.jsonwp.value)) {
        //returns actual error cause for request failure based on `jsonwp.status`
        return errorFromCode(this.jsonwp.status, this.jsonwp.value);
      }
      return new UnknownError(this.message);
    }
  }]);

  return ProxyRequestError;
})(_es6Error2['default']);

var errors = { NotYetImplementedError: NotYetImplementedError,
  NotImplementedError: NotImplementedError,
  BadParametersError: BadParametersError,
  NoSuchDriverError: NoSuchDriverError,
  NoSuchElementError: NoSuchElementError,
  UnknownCommandError: UnknownCommandError,
  StaleElementReferenceError: StaleElementReferenceError,
  ElementNotVisibleError: ElementNotVisibleError,
  InvalidElementStateError: InvalidElementStateError,
  UnknownError: UnknownError,
  ElementIsNotSelectableError: ElementIsNotSelectableError,
  JavaScriptError: JavaScriptError,
  XPathLookupError: XPathLookupError,
  TimeoutError: TimeoutError,
  NoSuchWindowError: NoSuchWindowError,
  InvalidCookieDomainError: InvalidCookieDomainError,
  UnableToSetCookieError: UnableToSetCookieError,
  UnexpectedAlertOpenError: UnexpectedAlertOpenError,
  NoAlertOpenError: NoAlertOpenError,
  ScriptTimeoutError: ScriptTimeoutError,
  InvalidElementCoordinatesError: InvalidElementCoordinatesError,
  IMENotAvailableError: IMENotAvailableError,
  IMEEngineActivationFailedError: IMEEngineActivationFailedError,
  InvalidSelectorError: InvalidSelectorError,
  SessionNotCreatedError: SessionNotCreatedError,
  MoveTargetOutOfBoundsError: MoveTargetOutOfBoundsError,
  NoSuchContextError: NoSuchContextError,
  InvalidContextError: InvalidContextError,
  NoSuchFrameError: NoSuchFrameError,
  ProxyRequestError: ProxyRequestError };

// map of error code to error class
var errorCodeMap = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(_lodash2['default'].values(errors)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var ErrorClass = _step.value;

    if (ErrorClass.code) {
      errorCodeMap[ErrorClass.code()] = ErrorClass;
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

function isErrorType(err, type) {
  // `name` property is the constructor name
  if (type.name === MJSONWPError.name) {
    // `jsonwpCode` is `0` on success
    return !!err.jsonwpCode;
  } else if (type.name === ProxyRequestError.name) {
    // `status` is `0` on success
    var hasJsonwpObj = !!err.jsonwp;
    if (hasJsonwpObj) {
      return !!err.jsonwp.status;
    } else {
      return false;
    }
  }
  return err.constructor.name === type.name;
}

// retrieve an error with the code and message
function errorFromCode(code, message) {
  if (code !== 13 && errorCodeMap[code]) {
    return new errorCodeMap[code](message);
  }
  return new UnknownError(message);
}

exports.MJSONWPError = MJSONWPError;
exports.errors = errors;
exports.isErrorType = isErrorType;
exports.errorFromCode = errorFromCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tanNvbndwL2Vycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQXFCLFdBQVc7Ozs7c0JBQ2xCLFFBQVE7Ozs7NkJBQ0QsZ0JBQWdCOzs7O0lBRy9CLFlBQVk7WUFBWixZQUFZOztBQUNKLFdBRFIsWUFBWSxDQUNILEdBQUcsRUFBRSxVQUFVLEVBQUU7MEJBRDFCLFlBQVk7O0FBRWQsK0JBRkUsWUFBWSw2Q0FFUixHQUFHLEVBQUU7QUFDWCxRQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztHQUM5Qjs7U0FKRyxZQUFZOzs7SUFPWixpQkFBaUI7WUFBakIsaUJBQWlCOztlQUFqQixpQkFBaUI7O1dBQ1QsZ0JBQUc7QUFDYixhQUFPLENBQUMsQ0FBQztLQUNWOzs7QUFDVyxXQUpSLGlCQUFpQixDQUlSLEdBQUcsRUFBRTswQkFKZCxpQkFBaUI7O0FBS25CLCtCQUxFLGlCQUFpQiw2Q0FLYixHQUFHLElBQUksK0NBQStDLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDekY7O1NBTkcsaUJBQWlCO0dBQVMsWUFBWTs7SUFTdEMsa0JBQWtCO1lBQWxCLGtCQUFrQjs7ZUFBbEIsa0JBQWtCOztXQUNWLGdCQUFHO0FBQ2IsYUFBTyxDQUFDLENBQUM7S0FDVjs7O0FBQ1csV0FKUixrQkFBa0IsQ0FJVCxHQUFHLEVBQUU7MEJBSmQsa0JBQWtCOztBQUtwQiwrQkFMRSxrQkFBa0IsNkNBS2QsR0FBRyxJQUFJLDhEQUE4RCxHQUNyRSxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUN4RDs7U0FQRyxrQkFBa0I7R0FBUyxZQUFZOztJQVV2QyxnQkFBZ0I7WUFBaEIsZ0JBQWdCOztlQUFoQixnQkFBZ0I7O1dBQ1IsZ0JBQUc7QUFDYixhQUFPLENBQUMsQ0FBQztLQUNWOzs7QUFDVyxXQUpSLGdCQUFnQixDQUlQLEdBQUcsRUFBRTswQkFKZCxnQkFBZ0I7O0FBS2xCLCtCQUxFLGdCQUFnQiw2Q0FLWixHQUFHLElBQUksZ0VBQWdFLEdBQ3ZFLCtCQUErQixFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ2pFOztTQVBHLGdCQUFnQjtHQUFTLFlBQVk7O0lBVXJDLG1CQUFtQjtZQUFuQixtQkFBbUI7O2VBQW5CLG1CQUFtQjs7V0FDWCxnQkFBRztBQUNiLGFBQU8sQ0FBQyxDQUFDO0tBQ1Y7OztBQUNXLFdBSlIsbUJBQW1CLENBSVYsR0FBRyxFQUFFOzBCQUpkLG1CQUFtQjs7QUFLckIsK0JBTEUsbUJBQW1CLDZDQUtmLEdBQUcsSUFBSSw4REFBOEQsR0FDckUsb0VBQW9FLEdBQ3BFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUNoRDs7U0FSRyxtQkFBbUI7R0FBUyxZQUFZOztJQVd4QywwQkFBMEI7WUFBMUIsMEJBQTBCOztlQUExQiwwQkFBMEI7O1dBQ2xCLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUiwwQkFBMEIsQ0FJakIsR0FBRyxFQUFFOzBCQUpkLDBCQUEwQjs7QUFLNUIsK0JBTEUsMEJBQTBCLDZDQUt0QixHQUFHLElBQUksaUVBQWlFLEdBQ3hFLDZCQUE2QixFQUFFLDBCQUEwQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ3pFOztTQVBHLDBCQUEwQjtHQUFTLFlBQVk7O0lBVS9DLHNCQUFzQjtZQUF0QixzQkFBc0I7O2VBQXRCLHNCQUFzQjs7V0FDZCxnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsc0JBQXNCLENBSWIsR0FBRyxFQUFFOzBCQUpkLHNCQUFzQjs7QUFLeEIsK0JBTEUsc0JBQXNCLDZDQUtsQixHQUFHLElBQUksbUVBQW1FLEdBQzFFLDBCQUEwQixFQUFFLHNCQUFzQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ2xFOztTQVBHLHNCQUFzQjtHQUFTLFlBQVk7O0lBVTNDLHdCQUF3QjtZQUF4Qix3QkFBd0I7O2VBQXhCLHdCQUF3Qjs7V0FDaEIsZ0JBQUc7QUFDYixhQUFPLEVBQUUsQ0FBQztLQUNYOzs7QUFDVyxXQUpSLHdCQUF3QixDQUlmLEdBQUcsRUFBRTswQkFKZCx3QkFBd0I7O0FBSzFCLCtCQUxFLHdCQUF3Qiw2Q0FLcEIsR0FBRyxJQUFJLG1FQUFtRSxHQUMxRSxvRUFBb0UsRUFDcEUsd0JBQXdCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDeEM7O1NBUkcsd0JBQXdCO0dBQVMsWUFBWTs7SUFXN0MsWUFBWTtZQUFaLFlBQVk7O2VBQVosWUFBWTs7V0FDSixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsWUFBWSxDQUlILGFBQWEsRUFBRTswQkFKeEIsWUFBWTs7QUFLZCxRQUFJLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDaEMsUUFBSSxhQUFhLFlBQVksS0FBSyxFQUFFO0FBQ2xDLGlCQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztLQUNyQztBQUNELFFBQUksT0FBTyxHQUFHLHlEQUF5RCxHQUN6RCxjQUFjLENBQUM7QUFDN0IsUUFBSSxhQUFhLEVBQUU7QUFDakIsYUFBTyxHQUFNLE9BQU8seUJBQW9CLFdBQVcsQUFBRSxDQUFDO0tBQ3ZEOztBQUVELCtCQWZFLFlBQVksNkNBZVIsT0FBTyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUNyQzs7U0FoQkcsWUFBWTtHQUFTLFlBQVk7O0lBbUJqQywyQkFBMkI7WUFBM0IsMkJBQTJCOztlQUEzQiwyQkFBMkI7O1dBQ25CLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUiwyQkFBMkIsQ0FJbEIsR0FBRyxFQUFFOzBCQUpkLDJCQUEyQjs7QUFLN0IsK0JBTEUsMkJBQTJCLDZDQUt2QixHQUFHLElBQUksbUVBQW1FLEVBQzFFLDJCQUEyQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQzNDOztTQVBHLDJCQUEyQjtHQUFTLFlBQVk7O0lBVWhELGVBQWU7WUFBZixlQUFlOztlQUFmLGVBQWU7O1dBQ1AsZ0JBQUc7QUFDYixhQUFPLEVBQUUsQ0FBQztLQUNYOzs7QUFDVyxXQUpSLGVBQWUsQ0FJTixHQUFHLEVBQUU7MEJBSmQsZUFBZTs7QUFLakIsK0JBTEUsZUFBZSw2Q0FLWCxHQUFHLElBQUksNkRBQTZELEVBQ3BFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUMvQjs7U0FQRyxlQUFlO0dBQVMsWUFBWTs7SUFVcEMsZ0JBQWdCO1lBQWhCLGdCQUFnQjs7ZUFBaEIsZ0JBQWdCOztXQUNSLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixnQkFBZ0IsQ0FJUCxHQUFHLEVBQUU7MEJBSmQsZ0JBQWdCOztBQUtsQiwrQkFMRSxnQkFBZ0IsNkNBS1osR0FBRyxJQUFJLDREQUE0RCxFQUNuRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUNoQzs7U0FQRyxnQkFBZ0I7R0FBUyxZQUFZOztJQVVyQyxZQUFZO1lBQVosWUFBWTs7ZUFBWixZQUFZOztXQUNKLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixZQUFZLENBSUgsR0FBRyxFQUFFOzBCQUpkLFlBQVk7O0FBS2QsK0JBTEUsWUFBWSw2Q0FLUixHQUFHLElBQUksMkRBQTJELEVBQ2xFLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUM1Qjs7U0FQRyxZQUFZO0dBQVMsWUFBWTs7SUFVakMsaUJBQWlCO1lBQWpCLGlCQUFpQjs7ZUFBakIsaUJBQWlCOztXQUNULGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixpQkFBaUIsQ0FJUixHQUFHLEVBQUU7MEJBSmQsaUJBQWlCOztBQUtuQiwrQkFMRSxpQkFBaUIsNkNBS2IsR0FBRyxJQUFJLG1FQUFtRSxHQUMxRSx3Q0FBd0MsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUMzRTs7U0FQRyxpQkFBaUI7R0FBUyxZQUFZOztJQVV0Qyx3QkFBd0I7WUFBeEIsd0JBQXdCOztlQUF4Qix3QkFBd0I7O1dBQ2hCLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUix3QkFBd0IsQ0FJZixHQUFHLEVBQUU7MEJBSmQsd0JBQXdCOztBQUsxQiwrQkFMRSx3QkFBd0IsNkNBS3BCLEdBQUcsSUFBSSxnRUFBZ0UsR0FDdkUsK0JBQStCLEVBQUUsd0JBQXdCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDekU7O1NBUEcsd0JBQXdCO0dBQVMsWUFBWTs7SUFVN0Msc0JBQXNCO1lBQXRCLHNCQUFzQjs7ZUFBdEIsc0JBQXNCOztXQUNkLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixzQkFBc0IsQ0FJYixHQUFHLEVBQUU7MEJBSmQsc0JBQXNCOztBQUt4QiwrQkFMRSxzQkFBc0IsNkNBS2xCLEdBQUcsSUFBSSw0REFBNEQsRUFDbkUsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDdEM7O1NBUEcsc0JBQXNCO0dBQVMsWUFBWTs7SUFVM0Msd0JBQXdCO1lBQXhCLHdCQUF3Qjs7ZUFBeEIsd0JBQXdCOztXQUNoQixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsd0JBQXdCLENBSWYsR0FBRyxFQUFFOzBCQUpkLHdCQUF3Qjs7QUFLMUIsK0JBTEUsd0JBQXdCLDZDQUtwQixHQUFHLElBQUksa0RBQWtELEVBQ3pELHdCQUF3QixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ3hDOztTQVBHLHdCQUF3QjtHQUFTLFlBQVk7O0lBVTdDLGdCQUFnQjtZQUFoQixnQkFBZ0I7O2VBQWhCLGdCQUFnQjs7V0FDUixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsZ0JBQWdCLENBSVAsR0FBRyxFQUFFOzBCQUpkLGdCQUFnQjs7QUFLbEIsK0JBTEUsZ0JBQWdCLDZDQUtaLEdBQUcsSUFBSSw0REFBNEQsR0FDbkUsZUFBZSxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ2pEOztTQVBHLGdCQUFnQjtHQUFTLFlBQVk7O0lBVXJDLGtCQUFrQjtZQUFsQixrQkFBa0I7O2VBQWxCLGtCQUFrQjs7V0FDVixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsa0JBQWtCLENBSVQsR0FBRyxFQUFFOzBCQUpkLGtCQUFrQjs7QUFLcEIsK0JBTEUsa0JBQWtCLDZDQUtkLEdBQUcsSUFBSSx1REFBdUQsRUFDOUQsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDbEM7O1NBUEcsa0JBQWtCO0dBQVMsWUFBWTs7SUFVdkMsOEJBQThCO1lBQTlCLDhCQUE4Qjs7ZUFBOUIsOEJBQThCOztXQUN0QixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsOEJBQThCLENBSXJCLEdBQUcsRUFBRTswQkFKZCw4QkFBOEI7O0FBS2hDLCtCQUxFLDhCQUE4Qiw2Q0FLMUIsR0FBRyxJQUFJLG9FQUFvRSxFQUMzRSw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUM5Qzs7U0FQRyw4QkFBOEI7R0FBUyxZQUFZOztJQVVuRCxvQkFBb0I7WUFBcEIsb0JBQW9COztlQUFwQixvQkFBb0I7O1dBQ1osZ0JBQUc7QUFDYixhQUFPLEVBQUUsQ0FBQztLQUNYOzs7QUFDVyxXQUpSLG9CQUFvQixDQUlYLEdBQUcsRUFBRTswQkFKZCxvQkFBb0I7O0FBS3RCLCtCQUxFLG9CQUFvQiw2Q0FLaEIsR0FBRyxJQUFJLHdCQUF3QixFQUFFLG9CQUFvQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ3JFOztTQU5HLG9CQUFvQjtHQUFTLFlBQVk7O0lBU3pDLDhCQUE4QjtZQUE5Qiw4QkFBOEI7O2VBQTlCLDhCQUE4Qjs7V0FDdEIsZ0JBQUc7QUFDYixhQUFPLEVBQUUsQ0FBQztLQUNYOzs7QUFDVyxXQUpSLDhCQUE4QixDQUlyQixHQUFHLEVBQUU7MEJBSmQsOEJBQThCOztBQUtoQywrQkFMRSw4QkFBOEIsNkNBSzFCLEdBQUcsSUFBSSxxQ0FBcUMsRUFDNUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDOUM7O1NBUEcsOEJBQThCO0dBQVMsWUFBWTs7SUFVbkQsb0JBQW9CO1lBQXBCLG9CQUFvQjs7ZUFBcEIsb0JBQW9COztXQUNaLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixvQkFBb0IsQ0FJWCxHQUFHLEVBQUU7MEJBSmQsb0JBQW9COztBQUt0QiwrQkFMRSxvQkFBb0IsNkNBS2hCLEdBQUcsSUFBSSxvREFBb0QsRUFDM0Qsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDcEM7O1NBUEcsb0JBQW9CO0dBQVMsWUFBWTs7SUFVekMsc0JBQXNCO1lBQXRCLHNCQUFzQjs7ZUFBdEIsc0JBQXNCOztXQUNkLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixzQkFBc0IsQ0FJYixPQUFPLEVBQUU7MEJBSmxCLHNCQUFzQjs7QUFLeEIsUUFBSSxPQUFPLEdBQUcscUNBQXFDLENBQUM7QUFDcEQsUUFBSSxPQUFPLEVBQUU7QUFDWCxhQUFPLG1CQUFpQixPQUFPLEFBQUUsQ0FBQztLQUNuQzs7QUFFRCwrQkFWRSxzQkFBc0IsNkNBVWxCLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUMvQzs7U0FYRyxzQkFBc0I7R0FBUyxZQUFZOztJQWMzQywwQkFBMEI7WUFBMUIsMEJBQTBCOztlQUExQiwwQkFBMEI7O1dBQ2xCLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUiwwQkFBMEIsQ0FJakIsR0FBRyxFQUFFOzBCQUpkLDBCQUEwQjs7QUFLNUIsK0JBTEUsMEJBQTBCLDZDQUt0QixHQUFHLElBQUkscURBQXFELEVBQzVELDBCQUEwQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQzFDOztTQVBHLDBCQUEwQjtHQUFTLFlBQVk7O0lBVS9DLGtCQUFrQjtZQUFsQixrQkFBa0I7O2VBQWxCLGtCQUFrQjs7V0FDVixnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsa0JBQWtCLENBSVQsR0FBRyxFQUFFOzBCQUpkLGtCQUFrQjs7QUFLcEIsK0JBTEUsa0JBQWtCLDZDQUtkLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRTtHQUNuRTs7U0FORyxrQkFBa0I7R0FBUyxZQUFZOztJQVN2QyxtQkFBbUI7WUFBbkIsbUJBQW1COztlQUFuQixtQkFBbUI7O1dBQ1gsZ0JBQUc7QUFDYixhQUFPLEVBQUUsQ0FBQztLQUNYOzs7QUFDVyxXQUpSLG1CQUFtQixDQUlWLEdBQUcsRUFBRTswQkFKZCxtQkFBbUI7O0FBS3JCLCtCQUxFLG1CQUFtQiw2Q0FLZixHQUFHLElBQUksNERBQTRELEVBQ25FLG1CQUFtQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ25DOztTQVBHLG1CQUFtQjtHQUFTLFlBQVk7O0lBVXhDLHNCQUFzQjtZQUF0QixzQkFBc0I7O2VBQXRCLHNCQUFzQjs7V0FDZCxnQkFBRztBQUNiLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztBQUNXLFdBSlIsc0JBQXNCLENBSWIsR0FBRyxFQUFFOzBCQUpkLHNCQUFzQjs7QUFLeEIsK0JBTEUsc0JBQXNCLDZDQUtsQixHQUFHLElBQUkscUNBQXFDLEVBQUUsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDcEY7O1NBTkcsc0JBQXNCO0dBQVMsWUFBWTs7SUFTM0MsbUJBQW1CO1lBQW5CLG1CQUFtQjs7ZUFBbkIsbUJBQW1COztXQUNYLGdCQUFHO0FBQ2IsYUFBTyxFQUFFLENBQUM7S0FDWDs7O0FBQ1csV0FKUixtQkFBbUIsQ0FJVixHQUFHLEVBQUU7MEJBSmQsbUJBQW1COztBQUtyQiwrQkFMRSxtQkFBbUIsNkNBS2YsR0FBRyxJQUFJLDJCQUEyQixFQUFFLG1CQUFtQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ3ZFOztTQU5HLG1CQUFtQjtHQUFTLFlBQVk7O0lBU3hDLGtCQUFrQjtZQUFsQixrQkFBa0I7O0FBQ1YsV0FEUixrQkFBa0IsQ0FDVCxjQUFjLEVBQUUsWUFBWSxFQUFFOzBCQUR2QyxrQkFBa0I7O0FBRXBCLCtCQUZFLGtCQUFrQiw2Q0FFZCwyQ0FDRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxlQUFXLGNBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUUsRUFBRTtHQUMvQzs7Ozs7Ozs7U0FMRyxrQkFBa0I7OztJQWNsQixpQkFBaUI7WUFBakIsaUJBQWlCOztBQUNULFdBRFIsaUJBQWlCLENBQ1IsR0FBRyxFQUFFLE1BQU0sRUFBRTswQkFEdEIsaUJBQWlCOztBQUVuQixRQUFJLE9BQU8scUNBQWtDLG9CQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQSxBQUFFLENBQUM7QUFDekYsK0JBSEUsaUJBQWlCLDZDQUdiLEdBQUcsSUFBSSxPQUFPLEVBQUU7QUFDdEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDLE1BQU07QUFDTCxVQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtHQUNGOzs7O2VBVEcsaUJBQWlCOztXQVdOLDBCQUFHO0FBQ2hCLFVBQUksb0JBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxvQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxvQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFFdkcsZUFBTyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3RDtBQUNELGFBQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOzs7U0FqQkcsaUJBQWlCOzs7QUFvQnZCLElBQU0sTUFBTSxHQUFHLEVBQUMsc0JBQXNCLEVBQXRCLHNCQUFzQjtBQUN0QixxQkFBbUIsRUFBbkIsbUJBQW1CO0FBQ25CLG9CQUFrQixFQUFsQixrQkFBa0I7QUFDbEIsbUJBQWlCLEVBQWpCLGlCQUFpQjtBQUNqQixvQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLHFCQUFtQixFQUFuQixtQkFBbUI7QUFDbkIsNEJBQTBCLEVBQTFCLDBCQUEwQjtBQUMxQix3QkFBc0IsRUFBdEIsc0JBQXNCO0FBQ3RCLDBCQUF3QixFQUF4Qix3QkFBd0I7QUFDeEIsY0FBWSxFQUFaLFlBQVk7QUFDWiw2QkFBMkIsRUFBM0IsMkJBQTJCO0FBQzNCLGlCQUFlLEVBQWYsZUFBZTtBQUNmLGtCQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsY0FBWSxFQUFaLFlBQVk7QUFDWixtQkFBaUIsRUFBakIsaUJBQWlCO0FBQ2pCLDBCQUF3QixFQUF4Qix3QkFBd0I7QUFDeEIsd0JBQXNCLEVBQXRCLHNCQUFzQjtBQUN0QiwwQkFBd0IsRUFBeEIsd0JBQXdCO0FBQ3hCLGtCQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsb0JBQWtCLEVBQWxCLGtCQUFrQjtBQUNsQixnQ0FBOEIsRUFBOUIsOEJBQThCO0FBQzlCLHNCQUFvQixFQUFwQixvQkFBb0I7QUFDcEIsZ0NBQThCLEVBQTlCLDhCQUE4QjtBQUM5QixzQkFBb0IsRUFBcEIsb0JBQW9CO0FBQ3BCLHdCQUFzQixFQUF0QixzQkFBc0I7QUFDdEIsNEJBQTBCLEVBQTFCLDBCQUEwQjtBQUMxQixvQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLHFCQUFtQixFQUFuQixtQkFBbUI7QUFDbkIsa0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixtQkFBaUIsRUFBakIsaUJBQWlCLEVBQUMsQ0FBQzs7O0FBR25DLElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ3hCLG9DQUF1QixvQkFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLDRHQUFFO1FBQWhDLFVBQVU7O0FBQ2pCLFFBQUksVUFBVSxDQUFDLElBQUksRUFBRTtBQUNuQixrQkFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztLQUM5QztHQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFL0IsTUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUU7O0FBRW5DLFdBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7R0FDekIsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLENBQUMsSUFBSSxFQUFFOztBQUUvQyxRQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxRQUFJLFlBQVksRUFBRTtBQUNoQixhQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUM1QixNQUFNO0FBQ0wsYUFBTyxLQUFLLENBQUM7S0FDZDtHQUNGO0FBQ0QsU0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQzNDOzs7QUFHRCxTQUFTLGFBQWEsQ0FBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JDLE1BQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckMsV0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUN4QztBQUNELFNBQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDbEM7O1FBRVEsWUFBWSxHQUFaLFlBQVk7UUFBRSxNQUFNLEdBQU4sTUFBTTtRQUFFLFdBQVcsR0FBWCxXQUFXO1FBQUUsYUFBYSxHQUFiLGFBQWEiLCJmaWxlIjoibGliL21qc29ud3AvZXJyb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVTNkVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxuLy8gYmFzZSBlcnJvciBjbGFzcyBmb3IgYWxsIG9mIG91ciBlcnJvcnNcbmNsYXNzIE1KU09OV1BFcnJvciBleHRlbmRzIEVTNkVycm9yIHtcbiAgY29uc3RydWN0b3IgKG1zZywganNvbndwQ29kZSkge1xuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5qc29ud3BDb2RlID0ganNvbndwQ29kZTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hEcml2ZXJFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHNlc3Npb24gaXMgZWl0aGVyIHRlcm1pbmF0ZWQgb3Igbm90IHN0YXJ0ZWQnLCBOb1N1Y2hEcml2ZXJFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaEVsZW1lbnRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvdWxkIG5vdCBiZSBsb2NhdGVkIG9uIHRoZSBwYWdlIHVzaW5nIHRoZSBnaXZlbiAnICtcbiAgICAgICAgICAnc2VhcmNoIHBhcmFtZXRlcnMuJywgTm9TdWNoRWxlbWVudEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9TdWNoRnJhbWVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gODtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZnJhbWUgY291bGQgbm90IGJlIHNhdGlzZmllZCBiZWNhdXNlICcgK1xuICAgICAgICAgICd0aGUgZnJhbWUgY291bGQgbm90IGJlIGZvdW5kLicsIE5vU3VjaEZyYW1lRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duQ29tbWFuZEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA5O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ1RoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kLCBvciBhIHJlcXVlc3Qgd2FzICcgK1xuICAgICAgICAgICdyZWNlaXZlZCB1c2luZyBhbiBIVFRQIG1ldGhvZCB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIG1hcHBlZCAnICtcbiAgICAgICAgICAncmVzb3VyY2UuJywgVW5rbm93bkNvbW1hbmRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxMDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgZmFpbGVkIGJlY2F1c2UgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBubyAnICtcbiAgICAgICAgICAnbG9uZ2VyIGF0dGFjaGVkIHRvIHRoZSBET00uJywgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBFbGVtZW50Tm90VmlzaWJsZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxMTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzICcgK1xuICAgICAgICAgICdub3QgdmlzaWJsZSBvbiB0aGUgcGFnZS4nLCBFbGVtZW50Tm90VmlzaWJsZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxMjtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzICcgK1xuICAgICAgICAgICdpbiBhbiBpbnZhbGlkIHN0YXRlIChlLmcuIGF0dGVtcHRpbmcgdG8gY2xpY2sgYSBkaXNhYmxlZCBlbGVtZW50KS4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50U3RhdGVFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFVua25vd25FcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgY29uc3RydWN0b3IgKG9yaWdpbmFsRXJyb3IpIHtcbiAgICBsZXQgb3JpZ01lc3NhZ2UgPSBvcmlnaW5hbEVycm9yO1xuICAgIGlmIChvcmlnaW5hbEVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIG9yaWdNZXNzYWdlID0gb3JpZ2luYWxFcnJvci5tZXNzYWdlO1xuICAgIH1cbiAgICBsZXQgbWVzc2FnZSA9ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAndGhlIGNvbW1hbmQuJztcbiAgICBpZiAob3JpZ2luYWxFcnJvcikge1xuICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9IE9yaWdpbmFsIGVycm9yOiAke29yaWdNZXNzYWdlfWA7XG4gICAgfVxuXG4gICAgc3VwZXIobWVzc2FnZSwgVW5rbm93bkVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxNTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIHNlbGVjdCBhbiBlbGVtZW50IHRoYXQgY2Fubm90IGJlIHNlbGVjdGVkLicsXG4gICAgICAgICAgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSmF2YVNjcmlwdEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAxNztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBleGVjdXRpbmcgdXNlciBzdXBwbGllZCBKYXZhU2NyaXB0LicsXG4gICAgICAgICAgSmF2YVNjcmlwdEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgWFBhdGhMb29rdXBFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTk7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2VhcmNoaW5nIGZvciBhbiBlbGVtZW50IGJ5IFhQYXRoLicsXG4gICAgICAgICAgWFBhdGhMb29rdXBFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjE7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gb3BlcmF0aW9uIGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICAgICAgICBUaW1lb3V0RXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hXaW5kb3dFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjM7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGRpZmZlcmVudCB3aW5kb3cgY291bGQgbm90IGJlIHNhdGlzZmllZCAnICtcbiAgICAgICAgICAnYmVjYXVzZSB0aGUgd2luZG93IGNvdWxkIG5vdCBiZSBmb3VuZC4nLCBOb1N1Y2hXaW5kb3dFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb29raWVEb21haW5FcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjQ7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gaWxsZWdhbCBhdHRlbXB0IHdhcyBtYWRlIHRvIHNldCBhIGNvb2tpZSB1bmRlciBhIGRpZmZlcmVudCAnICtcbiAgICAgICAgICAnZG9tYWluIHRoYW4gdGhlIGN1cnJlbnQgcGFnZS4nLCBJbnZhbGlkQ29va2llRG9tYWluRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmFibGVUb1NldENvb2tpZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyNTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc2V0IGEgY29va2llXFwncyB2YWx1ZSBjb3VsZCBub3QgYmUgc2F0aXNmaWVkLicsXG4gICAgICAgICAgVW5hYmxlVG9TZXRDb29raWVFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjY7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBtb2RhbCBkaWFsb2cgd2FzIG9wZW4sIGJsb2NraW5nIHRoaXMgb3BlcmF0aW9uJyxcbiAgICAgICAgICBVbmV4cGVjdGVkQWxlcnRPcGVuRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBOb0FsZXJ0T3BlbkVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyNztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIG9wZXJhdGUgb24gYSBtb2RhbCBkaWFsb2cgd2hlbiBvbmUgJyArXG4gICAgICAgICAgJ3dhcyBub3Qgb3Blbi4nLCBOb0FsZXJ0T3BlbkVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgU2NyaXB0VGltZW91dEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyODtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHNjcmlwdCBkaWQgbm90IGNvbXBsZXRlIGJlZm9yZSBpdHMgdGltZW91dCBleHBpcmVkLicsXG4gICAgICAgICAgU2NyaXB0VGltZW91dEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEVsZW1lbnRDb29yZGluYXRlc0Vycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyOTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgY29vcmRpbmF0ZXMgcHJvdmlkZWQgdG8gYW4gaW50ZXJhY3Rpb25zIG9wZXJhdGlvbiBhcmUgaW52YWxpZC4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIElNRU5vdEF2YWlsYWJsZUVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdJTUUgd2FzIG5vdCBhdmFpbGFibGUuJywgSU1FTm90QXZhaWxhYmxlRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDMxO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIElNRSBlbmdpbmUgY291bGQgbm90IGJlIHN0YXJ0ZWQuJyxcbiAgICAgICAgICBJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VsZWN0b3JFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzI7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQXJndW1lbnQgd2FzIGFuIGludmFsaWQgc2VsZWN0b3IgKGUuZy4gWFBhdGgvQ1NTKS4nLFxuICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzM7XG4gIH1cbiAgY29uc3RydWN0b3IgKGRldGFpbHMpIHtcbiAgICBsZXQgbWVzc2FnZSA9ICdBIG5ldyBzZXNzaW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkLic7XG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIG1lc3NhZ2UgKz0gYCBEZXRhaWxzOiAke2RldGFpbHN9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLCBTZXNzaW9uTm90Q3JlYXRlZEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM0O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ1RhcmdldCBwcm92aWRlZCBmb3IgYSBtb3ZlIGFjdGlvbiBpcyBvdXQgb2YgYm91bmRzLicsXG4gICAgICAgICAgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hDb250ZXh0RXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM1O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ05vIHN1Y2ggY29udGV4dCBmb3VuZC4nLCBOb1N1Y2hDb250ZXh0RXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkQ29udGV4dEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzNjtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGF0IGNvbW1hbmQgY291bGQgbm90IGJlIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJyxcbiAgICAgICAgICBJbnZhbGlkQ29udGV4dEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm90WWV0SW1wbGVtZW50ZWRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTWV0aG9kIGhhcyBub3QgeWV0IGJlZW4gaW1wbGVtZW50ZWQnLCBOb3RZZXRJbXBsZW1lbnRlZEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm90SW1wbGVtZW50ZWRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCcsIE5vdEltcGxlbWVudGVkRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBCYWRQYXJhbWV0ZXJzRXJyb3IgZXh0ZW5kcyBFUzZFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChyZXF1aXJlZFBhcmFtcywgYWN0dWFsUGFyYW1zKSB7XG4gICAgc3VwZXIoYFBhcmFtZXRlcnMgd2VyZSBpbmNvcnJlY3QuIFdlIHdhbnRlZCBgICtcbiAgICAgICAgICBgJHtKU09OLnN0cmluZ2lmeShyZXF1aXJlZFBhcmFtcyl9IGFuZCB5b3UgYCArXG4gICAgICAgICAgYHNlbnQgJHtKU09OLnN0cmluZ2lmeShhY3R1YWxQYXJhbXMpfWApO1xuICB9XG59XG5cbi8qKlxuICogUHJveHlSZXF1ZXN0RXJyb3IgaXMgYSBjdXN0b20gZXJyb3IgYW5kIHdpbGwgYmUgdGhyb3duIHVwIG9uIHVuc3VjY2Vzc2Z1bCBwcm94eSByZXF1ZXN0IGFuZFxuICogd2lsbCBjb250YWluIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwcm94eSBmYWlsdXJlLlxuICogSW4gY2FzZSBvZiBQcm94eVJlcXVlc3RFcnJvciBzaG91bGQgZmV0Y2ggdGhlIGFjdHVhbCBlcnJvciBieSBjYWxsaW5nIGBnZXRBY3R1YWxFcnJvcigpYFxuICogZm9yIHByb3h5IGZhaWx1cmUgdG8gZ2VuZXJhdGUgdGhlIGNsaWVudCByZXNwb25zZS5cbiAqL1xuY2xhc3MgUHJveHlSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFUzZFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChlcnIsIGpzb253cCkge1xuICAgIGxldCBtZXNzYWdlID0gYFByb3h5IHJlcXVlc3QgdW5zdWNjZXNzZnVsLiAke3V0aWwuaGFzVmFsdWUoanNvbndwKSA/IGpzb253cC52YWx1ZSA6ICcnfWA7XG4gICAgc3VwZXIoZXJyIHx8IG1lc3NhZ2UpO1xuICAgIGlmICh0eXBlb2YganNvbndwID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5qc29ud3AgPSBKU09OLnBhcnNlKGpzb253cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanNvbndwID0ganNvbndwO1xuICAgIH1cbiAgfVxuXG4gIGdldEFjdHVhbEVycm9yICgpIHtcbiAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cCkgJiYgdXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cC5zdGF0dXMpICYmIHV0aWwuaGFzVmFsdWUodGhpcy5qc29ud3AudmFsdWUpKSB7XG4gICAgICAvL3JldHVybnMgYWN0dWFsIGVycm9yIGNhdXNlIGZvciByZXF1ZXN0IGZhaWx1cmUgYmFzZWQgb24gYGpzb253cC5zdGF0dXNgXG4gICAgICByZXR1cm4gZXJyb3JGcm9tQ29kZSh0aGlzLmpzb253cC5zdGF0dXMsIHRoaXMuanNvbndwLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBVbmtub3duRXJyb3IodGhpcy5tZXNzYWdlKTtcbiAgfVxufVxuLy8gbWFwIG9mIGVycm9yIGNsYXNzIG5hbWUgdG8gZXJyb3IgY2xhc3NcbmNvbnN0IGVycm9ycyA9IHtOb3RZZXRJbXBsZW1lbnRlZEVycm9yLFxuICAgICAgICAgICAgICAgIE5vdEltcGxlbWVudGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgQmFkUGFyYW1ldGVyc0Vycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaERyaXZlckVycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaEVsZW1lbnRFcnJvcixcbiAgICAgICAgICAgICAgICBVbmtub3duQ29tbWFuZEVycm9yLFxuICAgICAgICAgICAgICAgIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yLFxuICAgICAgICAgICAgICAgIFVua25vd25FcnJvcixcbiAgICAgICAgICAgICAgICBFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSmF2YVNjcmlwdEVycm9yLFxuICAgICAgICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IsXG4gICAgICAgICAgICAgICAgVGltZW91dEVycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaFdpbmRvd0Vycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvcixcbiAgICAgICAgICAgICAgICBVbmFibGVUb1NldENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcixcbiAgICAgICAgICAgICAgICBOb0FsZXJ0T3BlbkVycm9yLFxuICAgICAgICAgICAgICAgIFNjcmlwdFRpbWVvdXRFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FTm90QXZhaWxhYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLFxuICAgICAgICAgICAgICAgIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoQ29udGV4dEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRDb250ZXh0RXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRnJhbWVFcnJvcixcbiAgICAgICAgICAgICAgICBQcm94eVJlcXVlc3RFcnJvcn07XG5cbi8vIG1hcCBvZiBlcnJvciBjb2RlIHRvIGVycm9yIGNsYXNzXG5jb25zdCBlcnJvckNvZGVNYXAgPSB7fTtcbmZvciAobGV0IEVycm9yQ2xhc3Mgb2YgXy52YWx1ZXMoZXJyb3JzKSkge1xuICBpZiAoRXJyb3JDbGFzcy5jb2RlKSB7XG4gICAgZXJyb3JDb2RlTWFwW0Vycm9yQ2xhc3MuY29kZSgpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFcnJvclR5cGUgKGVyciwgdHlwZSkge1xuICAvLyBgbmFtZWAgcHJvcGVydHkgaXMgdGhlIGNvbnN0cnVjdG9yIG5hbWVcbiAgaWYgKHR5cGUubmFtZSA9PT0gTUpTT05XUEVycm9yLm5hbWUpIHtcbiAgICAvLyBganNvbndwQ29kZWAgaXMgYDBgIG9uIHN1Y2Nlc3NcbiAgICByZXR1cm4gISFlcnIuanNvbndwQ29kZTtcbiAgfSBlbHNlIGlmICh0eXBlLm5hbWUgPT09IFByb3h5UmVxdWVzdEVycm9yLm5hbWUpIHtcbiAgICAvLyBgc3RhdHVzYCBpcyBgMGAgb24gc3VjY2Vzc1xuICAgIHZhciBoYXNKc29ud3BPYmogPSAhIWVyci5qc29ud3A7XG4gICAgaWYgKGhhc0pzb253cE9iaikge1xuICAgICAgcmV0dXJuICEhZXJyLmpzb253cC5zdGF0dXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWU7XG59XG5cbi8vIHJldHJpZXZlIGFuIGVycm9yIHdpdGggdGhlIGNvZGUgYW5kIG1lc3NhZ2VcbmZ1bmN0aW9uIGVycm9yRnJvbUNvZGUgKGNvZGUsIG1lc3NhZ2UpIHtcbiAgaWYgKGNvZGUgIT09IDEzICYmIGVycm9yQ29kZU1hcFtjb2RlXSkge1xuICAgIHJldHVybiBuZXcgZXJyb3JDb2RlTWFwW2NvZGVdKG1lc3NhZ2UpO1xuICB9XG4gIHJldHVybiBuZXcgVW5rbm93bkVycm9yKG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgeyBNSlNPTldQRXJyb3IsIGVycm9ycywgaXNFcnJvclR5cGUsIGVycm9yRnJvbUNvZGUgfTtcbiJdfQ==