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

  // map of error class name to error class
  return BadParametersError;
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
  NoSuchFrameError: NoSuchFrameError };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tanNvbndwL2Vycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQXFCLFdBQVc7Ozs7c0JBQ2xCLFFBQVE7Ozs7OztJQUloQixZQUFZO1lBQVosWUFBWTs7QUFDSixXQURSLFlBQVksQ0FDSCxHQUFHLEVBQUUsVUFBVSxFQUFFOzBCQUQxQixZQUFZOztBQUVkLCtCQUZFLFlBQVksNkNBRVIsR0FBRyxFQUFFO0FBQ1gsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7R0FDOUI7O1NBSkcsWUFBWTs7O0lBT1osaUJBQWlCO1lBQWpCLGlCQUFpQjs7ZUFBakIsaUJBQWlCOztXQUNULGdCQUFHO0FBQ2IsYUFBTyxDQUFDLENBQUM7S0FDVjs7O0FBQ1csV0FKUixpQkFBaUIsQ0FJUixHQUFHLEVBQUU7MEJBSmQsaUJBQWlCOztBQUtuQiwrQkFMRSxpQkFBaUIsNkNBS2IsR0FBRyxJQUFJLCtDQUErQyxFQUFFLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFFO0dBQ3pGOztTQU5HLGlCQUFpQjtHQUFTLFlBQVk7O0lBU3RDLGtCQUFrQjtZQUFsQixrQkFBa0I7O2VBQWxCLGtCQUFrQjs7V0FDVixnQkFBRztBQUNiLGFBQU8sQ0FBQyxDQUFDO0tBQ1Y7OztBQUNXLFdBSlIsa0JBQWtCLENBSVQsR0FBRyxFQUFFOzBCQUpkLGtCQUFrQjs7QUFLcEIsK0JBTEUsa0JBQWtCLDZDQUtkLEdBQUcsSUFBSSw4REFBOEQsR0FDckUsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUU7R0FDeEQ7O1NBUEcsa0JBQWtCO0dBQVMsWUFBWTs7SUFVdkMsZ0JBQWdCO1lBQWhCLGdCQUFnQjs7ZUFBaEIsZ0JBQWdCOztXQUNSLGdCQUFHO0FBQ2IsYUFBTyxDQUFDLENBQUM7S0FDVjs7O0FBQ1csV0FKUixnQkFBZ0IsQ0FJUCxHQUFHLEVBQUU7MEJBSmQsZ0JBQWdCOztBQUtsQiwrQkFMRSxnQkFBZ0IsNkNB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RyxFQUFFLENBQUM7Ozs7OztBQUN4QixvQ0FBdUIsb0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyw0R0FBRTtRQUFoQyxVQUFVOztBQUNqQixRQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDbkIsa0JBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7S0FDOUM7R0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELFNBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0FBRS9CLE1BQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxFQUFFOztBQUVuQyxXQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0dBQ3pCO0FBQ0QsU0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0NBQzNDOzs7QUFHRCxTQUFTLGFBQWEsQ0FBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3JDLE1BQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckMsV0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUN4QztBQUNELFNBQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDbEM7O1FBRVEsWUFBWSxHQUFaLFlBQVk7UUFBRSxNQUFNLEdBQU4sTUFBTTtRQUFFLFdBQVcsR0FBWCxXQUFXO1FBQUUsYUFBYSxHQUFiLGFBQWEiLCJmaWxlIjoibGliL21qc29ud3AvZXJyb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVTNkVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbi8vIGJhc2UgZXJyb3IgY2xhc3MgZm9yIGFsbCBvZiBvdXIgZXJyb3JzXG5jbGFzcyBNSlNPTldQRXJyb3IgZXh0ZW5kcyBFUzZFcnJvciB7XG4gIGNvbnN0cnVjdG9yIChtc2csIGpzb253cENvZGUpIHtcbiAgICBzdXBlcihtc2cpO1xuICAgIHRoaXMuanNvbndwQ29kZSA9IGpzb253cENvZGU7XG4gIH1cbn1cblxuY2xhc3MgTm9TdWNoRHJpdmVyRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDY7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJywgTm9TdWNoRHJpdmVyRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hFbGVtZW50RXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb3VsZCBub3QgYmUgbG9jYXRlZCBvbiB0aGUgcGFnZSB1c2luZyB0aGUgZ2l2ZW4gJyArXG4gICAgICAgICAgJ3NlYXJjaCBwYXJhbWV0ZXJzLicsIE5vU3VjaEVsZW1lbnRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaEZyYW1lRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDg7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGZyYW1lIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQgYmVjYXVzZSAnICtcbiAgICAgICAgICAndGhlIGZyYW1lIGNvdWxkIG5vdCBiZSBmb3VuZC4nLCBOb1N1Y2hGcmFtZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5rbm93bkNvbW1hbmRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gOTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgcmVxdWVzdGVkIHJlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZCwgb3IgYSByZXF1ZXN0IHdhcyAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgdXNpbmcgYW4gSFRUUCBtZXRob2QgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBtYXBwZWQgJyArXG4gICAgICAgICAgJ3Jlc291cmNlLicsIFVua25vd25Db21tYW5kRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTA7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGZhaWxlZCBiZWNhdXNlIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgbm8gJyArXG4gICAgICAgICAgJ2xvbmdlciBhdHRhY2hlZCB0byB0aGUgRE9NLicsIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudE5vdFZpc2libGVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTE7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSB0aGUgZWxlbWVudCBpcyAnICtcbiAgICAgICAgICAnbm90IHZpc2libGUgb24gdGhlIHBhZ2UuJywgRWxlbWVudE5vdFZpc2libGVFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRFbGVtZW50U3RhdGVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTI7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgYmVjYXVzZSB0aGUgZWxlbWVudCBpcyAnICtcbiAgICAgICAgICAnaW4gYW4gaW52YWxpZCBzdGF0ZSAoZS5nLiBhdHRlbXB0aW5nIHRvIGNsaWNrIGEgZGlzYWJsZWQgZWxlbWVudCkuJyxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEzO1xuICB9XG4gIGNvbnN0cnVjdG9yIChvcmlnaW5hbEVycm9yKSB7XG4gICAgbGV0IG9yaWdNZXNzYWdlID0gb3JpZ2luYWxFcnJvcjtcbiAgICBpZiAob3JpZ2luYWxFcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBvcmlnTWVzc2FnZSA9IG9yaWdpbmFsRXJyb3IubWVzc2FnZTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2UgPSAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLic7XG4gICAgaWYgKG9yaWdpbmFsRXJyb3IpIHtcbiAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlfSBPcmlnaW5hbCBlcnJvcjogJHtvcmlnTWVzc2FnZX1gO1xuICAgIH1cblxuICAgIHN1cGVyKG1lc3NhZ2UsIFVua25vd25FcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTU7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBzZWxlY3QgYW4gZWxlbWVudCB0aGF0IGNhbm5vdCBiZSBzZWxlY3RlZC4nLFxuICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEphdmFTY3JpcHRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZXhlY3V0aW5nIHVzZXIgc3VwcGxpZWQgSmF2YVNjcmlwdC4nLFxuICAgICAgICAgIEphdmFTY3JpcHRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFhQYXRoTG9va3VwRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE5O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNlYXJjaGluZyBmb3IgYW4gZWxlbWVudCBieSBYUGF0aC4nLFxuICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDIxO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIG9wZXJhdGlvbiBkaWQgbm90IGNvbXBsZXRlIGJlZm9yZSBpdHMgdGltZW91dCBleHBpcmVkLicsXG4gICAgICAgICAgVGltZW91dEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9TdWNoV2luZG93RXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDIzO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0EgcmVxdWVzdCB0byBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgd2luZG93IGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQgJyArXG4gICAgICAgICAgJ2JlY2F1c2UgdGhlIHdpbmRvdyBjb3VsZCBub3QgYmUgZm91bmQuJywgTm9TdWNoV2luZG93RXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkQ29va2llRG9tYWluRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI0O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGlsbGVnYWwgYXR0ZW1wdCB3YXMgbWFkZSB0byBzZXQgYSBjb29raWUgdW5kZXIgYSBkaWZmZXJlbnQgJyArXG4gICAgICAgICAgJ2RvbWFpbiB0aGFuIHRoZSBjdXJyZW50IHBhZ2UuJywgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5hYmxlVG9TZXRDb29raWVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjU7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHNldCBhIGNvb2tpZVxcJ3MgdmFsdWUgY291bGQgbm90IGJlIHNhdGlzZmllZC4nLFxuICAgICAgICAgIFVuYWJsZVRvU2V0Q29va2llRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmV4cGVjdGVkQWxlcnRPcGVuRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI2O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0EgbW9kYWwgZGlhbG9nIHdhcyBvcGVuLCBibG9ja2luZyB0aGlzIG9wZXJhdGlvbicsXG4gICAgICAgICAgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9BbGVydE9wZW5FcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBvcGVyYXRlIG9uIGEgbW9kYWwgZGlhbG9nIHdoZW4gb25lICcgK1xuICAgICAgICAgICd3YXMgbm90IG9wZW4uJywgTm9BbGVydE9wZW5FcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFNjcmlwdFRpbWVvdXRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjg7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBzY3JpcHQgZGlkIG5vdCBjb21wbGV0ZSBiZWZvcmUgaXRzIHRpbWVvdXQgZXhwaXJlZC4nLFxuICAgICAgICAgIFNjcmlwdFRpbWVvdXRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjk7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhlIGNvb3JkaW5hdGVzIHByb3ZpZGVkIHRvIGFuIGludGVyYWN0aW9ucyBvcGVyYXRpb24gYXJlIGludmFsaWQuJyxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJTUVOb3RBdmFpbGFibGVFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzA7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnSU1FIHdhcyBub3QgYXZhaWxhYmxlLicsIElNRU5vdEF2YWlsYWJsZUVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBJTUUgZW5naW5lIGNvdWxkIG5vdCBiZSBzdGFydGVkLicsXG4gICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZFNlbGVjdG9yRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDMyO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FyZ3VtZW50IHdhcyBhbiBpbnZhbGlkIHNlbGVjdG9yIChlLmcuIFhQYXRoL0NTUykuJyxcbiAgICAgICAgICBJbnZhbGlkU2VsZWN0b3JFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDMzO1xuICB9XG4gIGNvbnN0cnVjdG9yIChkZXRhaWxzKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnQSBuZXcgc2Vzc2lvbiBjb3VsZCBub3QgYmUgY3JlYXRlZC4nO1xuICAgIGlmIChkZXRhaWxzKSB7XG4gICAgICBtZXNzYWdlICs9IGAgRGV0YWlsczogJHtkZXRhaWxzfWA7XG4gICAgfVxuXG4gICAgc3VwZXIobWVzc2FnZSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzNDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUYXJnZXQgcHJvdmlkZWQgZm9yIGEgbW92ZSBhY3Rpb24gaXMgb3V0IG9mIGJvdW5kcy4nLFxuICAgICAgICAgIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9TdWNoQ29udGV4dEVycm9yIGV4dGVuZHMgTUpTT05XUEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzNTtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdObyBzdWNoIGNvbnRleHQgZm91bmQuJywgTm9TdWNoQ29udGV4dEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZENvbnRleHRFcnJvciBleHRlbmRzIE1KU09OV1BFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzY7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhhdCBjb21tYW5kIGNvdWxkIG5vdCBiZSBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBjb250ZXh0LicsXG4gICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vdFlldEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEzO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ01ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkJywgTm90WWV0SW1wbGVtZW50ZWRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vdEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBNSlNPTldQRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEzO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ01ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQnLCBOb3RJbXBsZW1lbnRlZEVycm9yLmNvZGUoKSk7XG4gIH1cbn1cblxuY2xhc3MgQmFkUGFyYW1ldGVyc0Vycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBjb25zdHJ1Y3RvciAocmVxdWlyZWRQYXJhbXMsIGFjdHVhbFBhcmFtcykge1xuICAgIHN1cGVyKGBQYXJhbWV0ZXJzIHdlcmUgaW5jb3JyZWN0LiBXZSB3YW50ZWQgYCArXG4gICAgICAgICAgYCR7SlNPTi5zdHJpbmdpZnkocmVxdWlyZWRQYXJhbXMpfSBhbmQgeW91IGAgK1xuICAgICAgICAgIGBzZW50ICR7SlNPTi5zdHJpbmdpZnkoYWN0dWFsUGFyYW1zKX1gKTtcbiAgfVxufVxuXG4vLyBtYXAgb2YgZXJyb3IgY2xhc3MgbmFtZSB0byBlcnJvciBjbGFzc1xuY29uc3QgZXJyb3JzID0ge05vdFlldEltcGxlbWVudGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTm90SW1wbGVtZW50ZWRFcnJvcixcbiAgICAgICAgICAgICAgICBCYWRQYXJhbWV0ZXJzRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRHJpdmVyRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLFxuICAgICAgICAgICAgICAgIFVua25vd25Db21tYW5kRXJyb3IsXG4gICAgICAgICAgICAgICAgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IsXG4gICAgICAgICAgICAgICAgRWxlbWVudE5vdFZpc2libGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBKYXZhU2NyaXB0RXJyb3IsXG4gICAgICAgICAgICAgICAgWFBhdGhMb29rdXBFcnJvcixcbiAgICAgICAgICAgICAgICBUaW1lb3V0RXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoV2luZG93RXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLFxuICAgICAgICAgICAgICAgIFVuYWJsZVRvU2V0Q29va2llRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLFxuICAgICAgICAgICAgICAgIE5vQWxlcnRPcGVuRXJyb3IsXG4gICAgICAgICAgICAgICAgU2NyaXB0VGltZW91dEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvcixcbiAgICAgICAgICAgICAgICBJTUVOb3RBdmFpbGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZFNlbGVjdG9yRXJyb3IsXG4gICAgICAgICAgICAgICAgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvcixcbiAgICAgICAgICAgICAgICBNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hDb250ZXh0RXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hGcmFtZUVycm9yfTtcblxuLy8gbWFwIG9mIGVycm9yIGNvZGUgdG8gZXJyb3IgY2xhc3NcbmNvbnN0IGVycm9yQ29kZU1hcCA9IHt9O1xuZm9yIChsZXQgRXJyb3JDbGFzcyBvZiBfLnZhbHVlcyhlcnJvcnMpKSB7XG4gIGlmIChFcnJvckNsYXNzLmNvZGUpIHtcbiAgICBlcnJvckNvZGVNYXBbRXJyb3JDbGFzcy5jb2RlKCldID0gRXJyb3JDbGFzcztcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0Vycm9yVHlwZSAoZXJyLCB0eXBlKSB7XG4gIC8vIGBuYW1lYCBwcm9wZXJ0eSBpcyB0aGUgY29uc3RydWN0b3IgbmFtZVxuICBpZiAodHlwZS5uYW1lID09PSBNSlNPTldQRXJyb3IubmFtZSkge1xuICAgIC8vIGBqc29ud3BDb2RlYCBpcyBgMGAgb24gc3VjY2Vzc1xuICAgIHJldHVybiAhIWVyci5qc29ud3BDb2RlO1xuICB9XG4gIHJldHVybiBlcnIuY29uc3RydWN0b3IubmFtZSA9PT0gdHlwZS5uYW1lO1xufVxuXG4vLyByZXRyaWV2ZSBhbiBlcnJvciB3aXRoIHRoZSBjb2RlIGFuZCBtZXNzYWdlXG5mdW5jdGlvbiBlcnJvckZyb21Db2RlIChjb2RlLCBtZXNzYWdlKSB7XG4gIGlmIChjb2RlICE9PSAxMyAmJiBlcnJvckNvZGVNYXBbY29kZV0pIHtcbiAgICByZXR1cm4gbmV3IGVycm9yQ29kZU1hcFtjb2RlXShtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gbmV3IFVua25vd25FcnJvcihtZXNzYWdlKTtcbn1cblxuZXhwb3J0IHsgTUpTT05XUEVycm9yLCBlcnJvcnMsIGlzRXJyb3JUeXBlLCBlcnJvckZyb21Db2RlIH07XG4iXX0=