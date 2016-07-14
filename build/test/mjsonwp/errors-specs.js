'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _2 = require('../..');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].use(_chaiAsPromised2['default']);

// Error codes and messages have been added according to JsonWireProtocol see
// https://code.google.com/p/selenium/wiki/JsonWireProtocol#Response_Status_Codes
var errorsList = [{ errorName: 'NoSuchDriverError',
  errorMsg: 'A session is either terminated or not started',
  errorCode: 6 }, { errorName: 'NoSuchElementError',
  errorMsg: 'An element could not be located on the page using the ' + 'given search parameters.',
  errorCode: 7 }, { errorName: 'NoSuchFrameError',
  errorMsg: 'A request to switch to a frame could not be satisfied ' + 'because the frame could not be found.',
  errorCode: 8 }, { errorName: 'UnknownCommandError',
  errorMsg: 'The requested resource could not be found, or a request ' + 'was received using an HTTP method that is not supported by ' + 'the mapped resource.',
  errorCode: 9 }, { errorName: 'StaleElementReferenceError',
  errorMsg: 'An element command failed because the referenced element is ' + 'no longer attached to the DOM.',
  errorCode: 10 }, { errorName: 'ElementNotVisibleError',
  errorMsg: 'An element command could not be completed because the ' + 'element is not visible on the page.',
  errorCode: 11 }, { errorName: 'InvalidElementStateError',
  errorMsg: 'An element command could not be completed because the element ' + 'is in an invalid state (e.g. attempting to click a disabled ' + 'element).',
  errorCode: 12 }, { errorName: 'UnknownError',
  errorMsg: 'An unknown server-side error occurred while processing the ' + 'command.',
  errorCode: 13 }, { errorName: 'ElementIsNotSelectableError',
  errorMsg: 'An attempt was made to select an element that cannot ' + 'be selected.',
  errorCode: 15 }, { errorName: 'JavaScriptError',
  errorMsg: 'An error occurred while executing user supplied JavaScript.',
  errorCode: 17 }, { errorName: 'XPathLookupError',
  errorMsg: 'An error occurred while searching for an element by XPath.',
  errorCode: 19 }, { errorName: 'TimeoutError',
  errorMsg: 'An operation did not complete before its timeout expired.',
  errorCode: 21 }, { errorName: 'NoSuchWindowError',
  errorMsg: 'A request to switch to a different window could not be ' + 'satisfied because the window could not be found.',
  errorCode: 23 }, { errorName: 'InvalidCookieDomainError',
  errorMsg: 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.',
  errorCode: 24 }, { errorName: 'UnableToSetCookieError',
  errorMsg: 'A request to set a cookie\'s value could not be satisfied.',
  errorCode: 25 }, { errorName: 'UnexpectedAlertOpenError',
  errorMsg: 'A modal dialog was open, blocking this operation',
  errorCode: 26 }, { errorName: 'NoAlertOpenError',
  errorMsg: 'An attempt was made to operate on a modal dialog when one was ' + 'not open.',
  errorCode: 27 }, { errorName: 'ScriptTimeoutError',
  errorMsg: 'A script did not complete before its timeout expired.',
  errorCode: 28 }, { errorName: 'InvalidElementCoordinatesError',
  errorMsg: 'The coordinates provided to an interactions operation are ' + 'invalid.',
  errorCode: 29 }, { errorName: 'IMENotAvailableError',
  errorMsg: 'IME was not available.',
  errorCode: 30 }, { errorName: 'IMEEngineActivationFailedError',
  errorMsg: 'An IME engine could not be started.',
  errorCode: 31 }, { errorName: 'InvalidSelectorError',
  errorMsg: 'Argument was an invalid selector (e.g. XPath/CSS).',
  errorCode: 32 }, { errorName: 'SessionNotCreatedError',
  errorMsg: 'A new session could not be created.',
  errorCode: 33 }, { errorName: 'MoveTargetOutOfBoundsError',
  errorMsg: 'Target provided for a move action is out of bounds.',
  errorCode: 34 }, { errorName: 'NotYetImplementedError',
  errorMsg: 'Method has not yet been implemented',
  errorCode: 13 }];

describe('errors', function () {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function () {
      var error = _step.value;

      it(error.errorName + ' should have correct code and messg', function () {
        new _2.errors[error.errorName]().should.have.property('jsonwpCode', error.errorCode);
        new _2.errors[error.errorName]().should.have.property('message', error.errorMsg);
      });
    };

    for (var _iterator = _getIterator(errorsList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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

  it('BadParametersError should not have code and should have messg', function () {
    new _2.errors.BadParametersError().should.not.have.property('jsonwpCode');
    new _2.errors.BadParametersError().should.have.property('message');
  });
});
describe('errorFromCode', function () {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function () {
      var error = _step2.value;

      if (error.errorName !== 'NotYetImplementedError') {
        it(error.errorCode + ' should return correct error', function () {
          (0, _2.errorFromCode)(error.errorCode).should.have.property('jsonwpCode', error.errorCode);
          (0, _2.errorFromCode)(error.errorCode).should.have.property('message', error.errorMsg);
          if (!_lodash2['default'].includes([13, 33], error.errorCode)) {
            (0, _2.errorFromCode)(error.errorCode, 'abcd').should.have.property('jsonwpCode', error.errorCode);
            (0, _2.errorFromCode)(error.errorCode, 'abcd').should.have.property('message', 'abcd');
          }
        });
      }
    };

    for (var _iterator2 = _getIterator(errorsList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
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

  it('should throw unknown error for unknown code', function () {
    (0, _2.errorFromCode)(99).should.have.property('jsonwpCode', 13);
    (0, _2.errorFromCode)(99).should.have.property('message', 'An unknown server-side error occurred ' + 'while processing the command.');
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9lcnJvcnMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2lCQUFzQyxPQUFPOztvQkFDNUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7QUFFdEIsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7OztBQUl6QixJQUFJLFVBQVUsR0FBRyxDQUNmLEVBQUMsU0FBUyxFQUFFLG1CQUFtQjtBQUM5QixVQUFRLEVBQUUsK0NBQStDO0FBQ3pELFdBQVMsRUFBRSxDQUFDLEVBQUMsRUFDZCxFQUFDLFNBQVMsRUFBRSxvQkFBb0I7QUFDL0IsVUFBUSxFQUFFLHdEQUF3RCxHQUN4RCwwQkFBMEI7QUFDcEMsV0FBUyxFQUFFLENBQUMsRUFBQyxFQUNkLEVBQUMsU0FBUyxFQUFFLGtCQUFrQjtBQUM3QixVQUFRLEVBQUUsd0RBQXdELEdBQ3hELHVDQUF1QztBQUNqRCxXQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQ2QsRUFBQyxTQUFTLEVBQUUscUJBQXFCO0FBQ2hDLFVBQVEsRUFBRSwwREFBMEQsR0FDMUQsNkRBQTZELEdBQzdELHNCQUFzQjtBQUNoQyxXQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQ2QsRUFBQyxTQUFTLEVBQUUsNEJBQTRCO0FBQ3ZDLFVBQVEsRUFBRSw4REFBOEQsR0FDOUQsZ0NBQWdDO0FBQzFDLFdBQVMsRUFBRSxFQUFFLEVBQUMsRUFDZixFQUFDLFNBQVMsRUFBRSx3QkFBd0I7QUFDbkMsVUFBUSxFQUFFLHdEQUF3RCxHQUN4RCxxQ0FBcUM7QUFDL0MsV0FBUyxFQUFFLEVBQUUsRUFBQyxFQUNmLEVBQUMsU0FBUyxFQUFFLDBCQUEwQjtBQUNyQyxVQUFRLEVBQUUsZ0VBQWdFLEdBQ2hFLDhEQUE4RCxHQUM5RCxXQUFXO0FBQ3JCLFdBQVMsRUFBRSxFQUFFLEVBQUMsRUFDZixFQUFDLFNBQVMsRUFBRSxjQUFjO0FBQ3pCLFVBQVEsRUFBRSw2REFBNkQsR0FDN0QsVUFBVTtBQUNwQixXQUFT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Ozs7Ozs7Ozs7Ozs7OztBQUNELElBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxZQUFNO0FBQ3RELDBCQUFjLEVBQUUsQ0FBQyxDQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQywwQkFBYyxFQUFFLENBQUMsQ0FDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsd0NBQXdDLEdBQ3hDLCtCQUErQixDQUFDLENBQUM7R0FDckUsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvbWpzb253cC9lcnJvcnMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvcnMsIGVycm9yRnJvbUNvZGUgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuLy8gRXJyb3IgY29kZXMgYW5kIG1lc3NhZ2VzIGhhdmUgYmVlbiBhZGRlZCBhY2NvcmRpbmcgdG8gSnNvbldpcmVQcm90b2NvbCBzZWVcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avc2VsZW5pdW0vd2lraS9Kc29uV2lyZVByb3RvY29sI1Jlc3BvbnNlX1N0YXR1c19Db2Rlc1xubGV0IGVycm9yc0xpc3QgPSBbXG4gIHtlcnJvck5hbWU6ICdOb1N1Y2hEcml2ZXJFcnJvcicsXG4gICBlcnJvck1zZzogJ0Egc2Vzc2lvbiBpcyBlaXRoZXIgdGVybWluYXRlZCBvciBub3Qgc3RhcnRlZCcsXG4gICBlcnJvckNvZGU6IDZ9LFxuICB7ZXJyb3JOYW1lOiAnTm9TdWNoRWxlbWVudEVycm9yJyxcbiAgIGVycm9yTXNnOiAnQW4gZWxlbWVudCBjb3VsZCBub3QgYmUgbG9jYXRlZCBvbiB0aGUgcGFnZSB1c2luZyB0aGUgJyArXG4gICAgICAgICAgICAgJ2dpdmVuIHNlYXJjaCBwYXJhbWV0ZXJzLicsXG4gICBlcnJvckNvZGU6IDd9LFxuICB7ZXJyb3JOYW1lOiAnTm9TdWNoRnJhbWVFcnJvcicsXG4gICBlcnJvck1zZzogJ0EgcmVxdWVzdCB0byBzd2l0Y2ggdG8gYSBmcmFtZSBjb3VsZCBub3QgYmUgc2F0aXNmaWVkICcgK1xuICAgICAgICAgICAgICdiZWNhdXNlIHRoZSBmcmFtZSBjb3VsZCBub3QgYmUgZm91bmQuJyxcbiAgIGVycm9yQ29kZTogOH0sXG4gIHtlcnJvck5hbWU6ICdVbmtub3duQ29tbWFuZEVycm9yJyxcbiAgIGVycm9yTXNnOiAnVGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQsIG9yIGEgcmVxdWVzdCAnICtcbiAgICAgICAgICAgICAnd2FzIHJlY2VpdmVkIHVzaW5nIGFuIEhUVFAgbWV0aG9kIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSAnICtcbiAgICAgICAgICAgICAndGhlIG1hcHBlZCByZXNvdXJjZS4nLFxuICAgZXJyb3JDb2RlOiA5fSxcbiAge2Vycm9yTmFtZTogJ1N0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yJyxcbiAgIGVycm9yTXNnOiAnQW4gZWxlbWVudCBjb21tYW5kIGZhaWxlZCBiZWNhdXNlIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgJyArXG4gICAgICAgICAgICAgJ25vIGxvbmdlciBhdHRhY2hlZCB0byB0aGUgRE9NLicsXG4gICBlcnJvckNvZGU6IDEwfSxcbiAge2Vycm9yTmFtZTogJ0VsZW1lbnROb3RWaXNpYmxlRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSAnICtcbiAgICAgICAgICAgICAnZWxlbWVudCBpcyBub3QgdmlzaWJsZSBvbiB0aGUgcGFnZS4nLFxuICAgZXJyb3JDb2RlOiAxMX0sXG4gIHtlcnJvck5hbWU6ICdJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50ICcgK1xuICAgICAgICAgICAgICdpcyBpbiBhbiBpbnZhbGlkIHN0YXRlIChlLmcuIGF0dGVtcHRpbmcgdG8gY2xpY2sgYSBkaXNhYmxlZCAnICtcbiAgICAgICAgICAgICAnZWxlbWVudCkuJyxcbiAgIGVycm9yQ29kZTogMTJ9LFxuICB7ZXJyb3JOYW1lOiAnVW5rbm93bkVycm9yJyxcbiAgIGVycm9yTXNnOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nIHRoZSAnICtcbiAgICAgICAgICAgICAnY29tbWFuZC4nLFxuICAgZXJyb3JDb2RlOiAxM30sXG4gIHtlcnJvck5hbWU6ICdFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIHNlbGVjdCBhbiBlbGVtZW50IHRoYXQgY2Fubm90ICcgK1xuICAgICAgICAgICAgICdiZSBzZWxlY3RlZC4nLFxuICAgZXJyb3JDb2RlOiAxNX0sXG4gIHtlcnJvck5hbWU6ICdKYXZhU2NyaXB0RXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBleGVjdXRpbmcgdXNlciBzdXBwbGllZCBKYXZhU2NyaXB0LicsXG4gICBlcnJvckNvZGU6IDE3fSxcbiAge2Vycm9yTmFtZTogJ1hQYXRoTG9va3VwRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzZWFyY2hpbmcgZm9yIGFuIGVsZW1lbnQgYnkgWFBhdGguJyxcbiAgIGVycm9yQ29kZTogMTl9LFxuICB7ZXJyb3JOYW1lOiAnVGltZW91dEVycm9yJyxcbiAgIGVycm9yTXNnOiAnQW4gb3BlcmF0aW9uIGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgIGVycm9yQ29kZTogMjF9LFxuICB7ZXJyb3JOYW1lOiAnTm9TdWNoV2luZG93RXJyb3InLFxuICAgZXJyb3JNc2c6ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZGlmZmVyZW50IHdpbmRvdyBjb3VsZCBub3QgYmUgJyArXG4gICAgICAgICAgICAgJ3NhdGlzZmllZCBiZWNhdXNlIHRoZSB3aW5kb3cgY291bGQgbm90IGJlIGZvdW5kLicsXG4gICBlcnJvckNvZGU6IDIzfSxcbiAge2Vycm9yTmFtZTogJ0ludmFsaWRDb29raWVEb21haW5FcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGlsbGVnYWwgYXR0ZW1wdCB3YXMgbWFkZSB0byBzZXQgYSBjb29raWUgdW5kZXIgYSBkaWZmZXJlbnQgJyArXG4gICAgICAgICAgICAgJ2RvbWFpbiB0aGFuIHRoZSBjdXJyZW50IHBhZ2UuJyxcbiAgIGVycm9yQ29kZTogMjR9LFxuICB7ZXJyb3JOYW1lOiAnVW5hYmxlVG9TZXRDb29raWVFcnJvcicsXG4gICBlcnJvck1zZzogYEEgcmVxdWVzdCB0byBzZXQgYSBjb29raWUncyB2YWx1ZSBjb3VsZCBub3QgYmUgc2F0aXNmaWVkLmAsXG4gICBlcnJvckNvZGU6IDI1fSxcbiAge2Vycm9yTmFtZTogJ1VuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcicsXG4gICBlcnJvck1zZzogJ0EgbW9kYWwgZGlhbG9nIHdhcyBvcGVuLCBibG9ja2luZyB0aGlzIG9wZXJhdGlvbicsXG4gICBlcnJvckNvZGU6IDI2fSxcbiAge2Vycm9yTmFtZTogJ05vQWxlcnRPcGVuRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIG9wZXJhdGUgb24gYSBtb2RhbCBkaWFsb2cgd2hlbiBvbmUgd2FzICcgK1xuICAgICAgICAgICAgICdub3Qgb3Blbi4nLFxuICAgZXJyb3JDb2RlOiAyN30sXG4gIHtlcnJvck5hbWU6ICdTY3JpcHRUaW1lb3V0RXJyb3InLFxuICAgZXJyb3JNc2c6ICdBIHNjcmlwdCBkaWQgbm90IGNvbXBsZXRlIGJlZm9yZSBpdHMgdGltZW91dCBleHBpcmVkLicsXG4gICBlcnJvckNvZGU6IDI4fSxcbiAge2Vycm9yTmFtZTogJ0ludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvcicsXG4gICBlcnJvck1zZzogJ1RoZSBjb29yZGluYXRlcyBwcm92aWRlZCB0byBhbiBpbnRlcmFjdGlvbnMgb3BlcmF0aW9uIGFyZSAnICtcbiAgICAgICAgICAgICAnaW52YWxpZC4nLFxuICAgZXJyb3JDb2RlOiAyOX0sXG4gIHtlcnJvck5hbWU6ICdJTUVOb3RBdmFpbGFibGVFcnJvcicsXG4gICBlcnJvck1zZzogJ0lNRSB3YXMgbm90IGF2YWlsYWJsZS4nLFxuICAgZXJyb3JDb2RlOiAzMH0sXG4gIHtlcnJvck5hbWU6ICdJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBJTUUgZW5naW5lIGNvdWxkIG5vdCBiZSBzdGFydGVkLicsXG4gICBlcnJvckNvZGU6IDMxfSxcbiAge2Vycm9yTmFtZTogJ0ludmFsaWRTZWxlY3RvckVycm9yJyxcbiAgIGVycm9yTXNnOiAnQXJndW1lbnQgd2FzIGFuIGludmFsaWQgc2VsZWN0b3IgKGUuZy4gWFBhdGgvQ1NTKS4nLFxuICAgZXJyb3JDb2RlOiAzMn0sXG4gIHtlcnJvck5hbWU6ICdTZXNzaW9uTm90Q3JlYXRlZEVycm9yJyxcbiAgIGVycm9yTXNnOiAnQSBuZXcgc2Vzc2lvbiBjb3VsZCBub3QgYmUgY3JlYXRlZC4nLFxuICAgZXJyb3JDb2RlOiAzM30sXG4gIHtlcnJvck5hbWU6ICdNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvcicsXG4gICBlcnJvck1zZzogJ1RhcmdldCBwcm92aWRlZCBmb3IgYSBtb3ZlIGFjdGlvbiBpcyBvdXQgb2YgYm91bmRzLicsXG4gICBlcnJvckNvZGU6IDM0fSxcbiAge2Vycm9yTmFtZTogJ05vdFlldEltcGxlbWVudGVkRXJyb3InLFxuICAgZXJyb3JNc2c6ICdNZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZCcsXG4gICBlcnJvckNvZGU6IDEzfVxuXTtcblxuZGVzY3JpYmUoJ2Vycm9ycycsICgpID0+IHtcbiAgZm9yIChsZXQgZXJyb3Igb2YgZXJyb3JzTGlzdCkge1xuICAgIGl0KGVycm9yLmVycm9yTmFtZSArICcgc2hvdWxkIGhhdmUgY29ycmVjdCBjb2RlIGFuZCBtZXNzZycsICgpID0+IHtcbiAgICAgIG5ldyBlcnJvcnNbZXJyb3IuZXJyb3JOYW1lXSgpXG4gICAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnanNvbndwQ29kZScsIGVycm9yLmVycm9yQ29kZSk7XG4gICAgICBuZXcgZXJyb3JzW2Vycm9yLmVycm9yTmFtZV0oKVxuICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnLCBlcnJvci5lcnJvck1zZyk7XG4gICAgfSk7XG4gIH1cbiAgaXQoJ0JhZFBhcmFtZXRlcnNFcnJvciBzaG91bGQgbm90IGhhdmUgY29kZSBhbmQgc2hvdWxkIGhhdmUgbWVzc2cnLCAoKSA9PiB7XG4gICAgbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IoKVxuICAgICAgLnNob3VsZC5ub3QuaGF2ZS5wcm9wZXJ0eSgnanNvbndwQ29kZScpO1xuICAgIG5ldyBlcnJvcnMuQmFkUGFyYW1ldGVyc0Vycm9yKClcbiAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScpO1xuICB9KTtcbn0pO1xuZGVzY3JpYmUoJ2Vycm9yRnJvbUNvZGUnLCAoKSA9PiB7XG4gIGZvciAobGV0IGVycm9yIG9mIGVycm9yc0xpc3QpIHtcbiAgICBpZiAoZXJyb3IuZXJyb3JOYW1lICE9PSAnTm90WWV0SW1wbGVtZW50ZWRFcnJvcicpIHtcbiAgICAgIGl0KGVycm9yLmVycm9yQ29kZSArICcgc2hvdWxkIHJldHVybiBjb3JyZWN0IGVycm9yJywgKCkgPT4ge1xuICAgICAgICBlcnJvckZyb21Db2RlKGVycm9yLmVycm9yQ29kZSlcbiAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCBlcnJvci5lcnJvckNvZGUpO1xuICAgICAgICBlcnJvckZyb21Db2RlKGVycm9yLmVycm9yQ29kZSlcbiAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnLCBlcnJvci5lcnJvck1zZyk7XG4gICAgICAgIGlmICghXy5pbmNsdWRlcyhbMTMsIDMzXSwgZXJyb3IuZXJyb3JDb2RlKSkge1xuICAgICAgICAgIGVycm9yRnJvbUNvZGUoZXJyb3IuZXJyb3JDb2RlLCAnYWJjZCcpXG4gICAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCBlcnJvci5lcnJvckNvZGUpO1xuICAgICAgICAgIGVycm9yRnJvbUNvZGUoZXJyb3IuZXJyb3JDb2RlLCAnYWJjZCcpXG4gICAgICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnLCAnYWJjZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaXQoJ3Nob3VsZCB0aHJvdyB1bmtub3duIGVycm9yIGZvciB1bmtub3duIGNvZGUnLCAoKSA9PiB7XG4gICAgZXJyb3JGcm9tQ29kZSg5OSlcbiAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnanNvbndwQ29kZScsIDEzKTtcbiAgICBlcnJvckZyb21Db2RlKDk5KVxuICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdtZXNzYWdlJywgJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2hpbGUgcHJvY2Vzc2luZyB0aGUgY29tbWFuZC4nKTtcbiAgfSk7XG59KTtcbiJdfQ==