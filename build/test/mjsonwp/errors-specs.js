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
  it('ProxyRequestError should have message and jsonwp', function () {
    new _2.errors.ProxyRequestError().should.have.property('jsonwp');
    new _2.errors.ProxyRequestError().should.have.property('message');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9lcnJvcnMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2lCQUFzQyxPQUFPOztvQkFDNUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7QUFFdEIsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7OztBQUl6QixJQUFJLFVBQVUsR0FBRyxDQUNmLEVBQUMsU0FBUyxFQUFFLG1CQUFtQjtBQUM5QixVQUFRLEVBQUUsK0NBQStDO0FBQ3pELFdBQVMsRUFBRSxDQUFDLEVBQUMsRUFDZCxFQUFDLFNBQVMsRUFBRSxvQkFBb0I7QUFDL0IsVUFBUSxFQUFFLHdEQUF3RCxHQUN4RCwwQkFBMEI7QUFDcEMsV0FBUyxFQUFFLENBQUMsRUFBQyxFQUNkLEVBQUMsU0FBUyxFQUFFLGtCQUFrQjtBQUM3QixVQUFRLEVBQUUsd0RBQXdELEdBQ3hELHVDQUF1QztBQUNqRCxXQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQ2QsRUFBQyxTQUFTLEVBQUUscUJBQXFCO0FBQ2hDLFVBQVEsRUFBRSwwREFBMEQsR0FDMUQsNkRBQTZELEdBQzdELHNCQUFzQjtBQUNoQyxXQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQ2QsRUFBQyxTQUFTLEVBQUUsNEJBQTRCO0FBQ3ZDLFVBQVEsRUFBRSw4REFBOEQsR0FDOUQsZ0NBQWdDO0FBQzFDLFdBQVMsRUFBRSxFQUFFLEVBQUMsRUFDZixFQUFDLFNBQVMsRUFBRSx3QkFBd0I7QUFDbkMsVUFBUSxFQUFFLHdEQUF3RCxHQUN4RCxxQ0FBcUM7QUFDL0MsV0FBUyxFQUFFLEVBQUUsRUFBQyxFQUNmLEVBQUMsU0FBUyxFQUFFLDBCQUEwQjtBQUNyQyxVQUFRLEVBQUUsZ0VBQWdFLEdBQ2hFLDhEQUE4RCxHQUM5RCxXQUFXO0FBQ3JCLFdBQVMsRUFBRSxFQUFFLEVBQUMsRUFDZixFQUFDLFNBQVMsRUFBRSxjQUFjO0FBQ3pCLFVBQVEsRUFBRSw2REFBNkQsR0FDN0QsVUFBVTtBQUNwQixXQUFT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QUFRLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2RCxrQ0FBYyxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7V0FDNUM7U0FDRixDQUFDLENBQUM7T0FDSjs7O0FBZEgsdUNBQWtCLFVBQVUsaUhBQUU7O0tBZTdCOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsSUFBRSxDQUFDLDZDQUE2QyxFQUFFLFlBQU07QUFDdEQsMEJBQWMsRUFBRSxDQUFDLENBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLDBCQUFjLEVBQUUsQ0FBQyxDQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSx3Q0FBd0MsR0FDeEMsK0JBQStCLENBQUMsQ0FBQztHQUNyRSxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9tanNvbndwL2Vycm9ycy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ycywgZXJyb3JGcm9tQ29kZSB9IGZyb20gJy4uLy4uJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG4vLyBFcnJvciBjb2RlcyBhbmQgbWVzc2FnZXMgaGF2ZSBiZWVuIGFkZGVkIGFjY29yZGluZyB0byBKc29uV2lyZVByb3RvY29sIHNlZVxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9zZWxlbml1bS93aWtpL0pzb25XaXJlUHJvdG9jb2wjUmVzcG9uc2VfU3RhdHVzX0NvZGVzXG5sZXQgZXJyb3JzTGlzdCA9IFtcbiAge2Vycm9yTmFtZTogJ05vU3VjaERyaXZlckVycm9yJyxcbiAgIGVycm9yTXNnOiAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJyxcbiAgIGVycm9yQ29kZTogNn0sXG4gIHtlcnJvck5hbWU6ICdOb1N1Y2hFbGVtZW50RXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvdWxkIG5vdCBiZSBsb2NhdGVkIG9uIHRoZSBwYWdlIHVzaW5nIHRoZSAnICtcbiAgICAgICAgICAgICAnZ2l2ZW4gc2VhcmNoIHBhcmFtZXRlcnMuJyxcbiAgIGVycm9yQ29kZTogN30sXG4gIHtlcnJvck5hbWU6ICdOb1N1Y2hGcmFtZUVycm9yJyxcbiAgIGVycm9yTXNnOiAnQSByZXF1ZXN0IHRvIHN3aXRjaCB0byBhIGZyYW1lIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQgJyArXG4gICAgICAgICAgICAgJ2JlY2F1c2UgdGhlIGZyYW1lIGNvdWxkIG5vdCBiZSBmb3VuZC4nLFxuICAgZXJyb3JDb2RlOiA4fSxcbiAge2Vycm9yTmFtZTogJ1Vua25vd25Db21tYW5kRXJyb3InLFxuICAgZXJyb3JNc2c6ICdUaGUgcmVxdWVzdGVkIHJlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZCwgb3IgYSByZXF1ZXN0ICcgK1xuICAgICAgICAgICAgICd3YXMgcmVjZWl2ZWQgdXNpbmcgYW4gSFRUUCBtZXRob2QgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5ICcgK1xuICAgICAgICAgICAgICd0aGUgbWFwcGVkIHJlc291cmNlLicsXG4gICBlcnJvckNvZGU6IDl9LFxuICB7ZXJyb3JOYW1lOiAnU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBlbGVtZW50IGNvbW1hbmQgZmFpbGVkIGJlY2F1c2UgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyAnICtcbiAgICAgICAgICAgICAnbm8gbG9uZ2VyIGF0dGFjaGVkIHRvIHRoZSBET00uJyxcbiAgIGVycm9yQ29kZTogMTB9LFxuICB7ZXJyb3JOYW1lOiAnRWxlbWVudE5vdFZpc2libGVFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGVsZW1lbnQgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlICcgK1xuICAgICAgICAgICAgICdlbGVtZW50IGlzIG5vdCB2aXNpYmxlIG9uIHRoZSBwYWdlLicsXG4gICBlcnJvckNvZGU6IDExfSxcbiAge2Vycm9yTmFtZTogJ0ludmFsaWRFbGVtZW50U3RhdGVFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGVsZW1lbnQgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgJyArXG4gICAgICAgICAgICAgJ2lzIGluIGFuIGludmFsaWQgc3RhdGUgKGUuZy4gYXR0ZW1wdGluZyB0byBjbGljayBhIGRpc2FibGVkICcgK1xuICAgICAgICAgICAgICdlbGVtZW50KS4nLFxuICAgZXJyb3JDb2RlOiAxMn0sXG4gIHtlcnJvck5hbWU6ICdVbmtub3duRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgdGhlICcgK1xuICAgICAgICAgICAgICdjb21tYW5kLicsXG4gICBlcnJvckNvZGU6IDEzfSxcbiAge2Vycm9yTmFtZTogJ0VsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGF0dGVtcHQgd2FzIG1hZGUgdG8gc2VsZWN0IGFuIGVsZW1lbnQgdGhhdCBjYW5ub3QgJyArXG4gICAgICAgICAgICAgJ2JlIHNlbGVjdGVkLicsXG4gICBlcnJvckNvZGU6IDE1fSxcbiAge2Vycm9yTmFtZTogJ0phdmFTY3JpcHRFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGV4ZWN1dGluZyB1c2VyIHN1cHBsaWVkIEphdmFTY3JpcHQuJyxcbiAgIGVycm9yQ29kZTogMTd9LFxuICB7ZXJyb3JOYW1lOiAnWFBhdGhMb29rdXBFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNlYXJjaGluZyBmb3IgYW4gZWxlbWVudCBieSBYUGF0aC4nLFxuICAgZXJyb3JDb2RlOiAxOX0sXG4gIHtlcnJvck5hbWU6ICdUaW1lb3V0RXJyb3InLFxuICAgZXJyb3JNc2c6ICdBbiBvcGVyYXRpb24gZGlkIG5vdCBjb21wbGV0ZSBiZWZvcmUgaXRzIHRpbWVvdXQgZXhwaXJlZC4nLFxuICAgZXJyb3JDb2RlOiAyMX0sXG4gIHtlcnJvck5hbWU6ICdOb1N1Y2hXaW5kb3dFcnJvcicsXG4gICBlcnJvck1zZzogJ0EgcmVxdWVzdCB0byBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgd2luZG93IGNvdWxkIG5vdCBiZSAnICtcbiAgICAgICAgICAgICAnc2F0aXNmaWVkIGJlY2F1c2UgdGhlIHdpbmRvdyBjb3VsZCBub3QgYmUgZm91bmQuJyxcbiAgIGVycm9yQ29kZTogMjN9LFxuICB7ZXJyb3JOYW1lOiAnSW52YWxpZENvb2tpZURvbWFpbkVycm9yJyxcbiAgIGVycm9yTXNnOiAnQW4gaWxsZWdhbCBhdHRlbXB0IHdhcyBtYWRlIHRvIHNldCBhIGNvb2tpZSB1bmRlciBhIGRpZmZlcmVudCAnICtcbiAgICAgICAgICAgICAnZG9tYWluIHRoYW4gdGhlIGN1cnJlbnQgcGFnZS4nLFxuICAgZXJyb3JDb2RlOiAyNH0sXG4gIHtlcnJvck5hbWU6ICdVbmFibGVUb1NldENvb2tpZUVycm9yJyxcbiAgIGVycm9yTXNnOiBgQSByZXF1ZXN0IHRvIHNldCBhIGNvb2tpZSdzIHZhbHVlIGNvdWxkIG5vdCBiZSBzYXRpc2ZpZWQuYCxcbiAgIGVycm9yQ29kZTogMjV9LFxuICB7ZXJyb3JOYW1lOiAnVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yJyxcbiAgIGVycm9yTXNnOiAnQSBtb2RhbCBkaWFsb2cgd2FzIG9wZW4sIGJsb2NraW5nIHRoaXMgb3BlcmF0aW9uJyxcbiAgIGVycm9yQ29kZTogMjZ9LFxuICB7ZXJyb3JOYW1lOiAnTm9BbGVydE9wZW5FcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIGF0dGVtcHQgd2FzIG1hZGUgdG8gb3BlcmF0ZSBvbiBhIG1vZGFsIGRpYWxvZyB3aGVuIG9uZSB3YXMgJyArXG4gICAgICAgICAgICAgJ25vdCBvcGVuLicsXG4gICBlcnJvckNvZGU6IDI3fSxcbiAge2Vycm9yTmFtZTogJ1NjcmlwdFRpbWVvdXRFcnJvcicsXG4gICBlcnJvck1zZzogJ0Egc2NyaXB0IGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgIGVycm9yQ29kZTogMjh9LFxuICB7ZXJyb3JOYW1lOiAnSW52YWxpZEVsZW1lbnRDb29yZGluYXRlc0Vycm9yJyxcbiAgIGVycm9yTXNnOiAnVGhlIGNvb3JkaW5hdGVzIHByb3ZpZGVkIHRvIGFuIGludGVyYWN0aW9ucyBvcGVyYXRpb24gYXJlICcgK1xuICAgICAgICAgICAgICdpbnZhbGlkLicsXG4gICBlcnJvckNvZGU6IDI5fSxcbiAge2Vycm9yTmFtZTogJ0lNRU5vdEF2YWlsYWJsZUVycm9yJyxcbiAgIGVycm9yTXNnOiAnSU1FIHdhcyBub3QgYXZhaWxhYmxlLicsXG4gICBlcnJvckNvZGU6IDMwfSxcbiAge2Vycm9yTmFtZTogJ0lNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvcicsXG4gICBlcnJvck1zZzogJ0FuIElNRSBlbmdpbmUgY291bGQgbm90IGJlIHN0YXJ0ZWQuJyxcbiAgIGVycm9yQ29kZTogMzF9LFxuICB7ZXJyb3JOYW1lOiAnSW52YWxpZFNlbGVjdG9yRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBcmd1bWVudCB3YXMgYW4gaW52YWxpZCBzZWxlY3RvciAoZS5nLiBYUGF0aC9DU1MpLicsXG4gICBlcnJvckNvZGU6IDMyfSxcbiAge2Vycm9yTmFtZTogJ1Nlc3Npb25Ob3RDcmVhdGVkRXJyb3InLFxuICAgZXJyb3JNc2c6ICdBIG5ldyBzZXNzaW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkLicsXG4gICBlcnJvckNvZGU6IDMzfSxcbiAge2Vycm9yTmFtZTogJ01vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yJyxcbiAgIGVycm9yTXNnOiAnVGFyZ2V0IHByb3ZpZGVkIGZvciBhIG1vdmUgYWN0aW9uIGlzIG91dCBvZiBib3VuZHMuJyxcbiAgIGVycm9yQ29kZTogMzR9LFxuICB7ZXJyb3JOYW1lOiAnTm90WWV0SW1wbGVtZW50ZWRFcnJvcicsXG4gICBlcnJvck1zZzogJ01ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkJyxcbiAgIGVycm9yQ29kZTogMTN9XG5dO1xuXG5kZXNjcmliZSgnZXJyb3JzJywgKCkgPT4ge1xuICBmb3IgKGxldCBlcnJvciBvZiBlcnJvcnNMaXN0KSB7XG4gICAgaXQoZXJyb3IuZXJyb3JOYW1lICsgJyBzaG91bGQgaGF2ZSBjb3JyZWN0IGNvZGUgYW5kIG1lc3NnJywgKCkgPT4ge1xuICAgICAgbmV3IGVycm9yc1tlcnJvci5lcnJvck5hbWVdKClcbiAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJywgZXJyb3IuZXJyb3JDb2RlKTtcbiAgICAgIG5ldyBlcnJvcnNbZXJyb3IuZXJyb3JOYW1lXSgpXG4gICAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScsIGVycm9yLmVycm9yTXNnKTtcbiAgICB9KTtcbiAgfVxuICBpdCgnQmFkUGFyYW1ldGVyc0Vycm9yIHNob3VsZCBub3QgaGF2ZSBjb2RlIGFuZCBzaG91bGQgaGF2ZSBtZXNzZycsICgpID0+IHtcbiAgICBuZXcgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcigpXG4gICAgICAuc2hvdWxkLm5vdC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJyk7XG4gICAgbmV3IGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IoKVxuICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdtZXNzYWdlJyk7XG4gIH0pO1xuICBpdCgnUHJveHlSZXF1ZXN0RXJyb3Igc2hvdWxkIGhhdmUgbWVzc2FnZSBhbmQganNvbndwJywgKCkgPT4ge1xuICAgIG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoKVxuICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cCcpO1xuICAgIG5ldyBlcnJvcnMuUHJveHlSZXF1ZXN0RXJyb3IoKVxuICAgICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ21lc3NhZ2UnKTtcbiAgfSk7XG59KTtcbmRlc2NyaWJlKCdlcnJvckZyb21Db2RlJywgKCkgPT4ge1xuICBmb3IgKGxldCBlcnJvciBvZiBlcnJvcnNMaXN0KSB7XG4gICAgaWYgKGVycm9yLmVycm9yTmFtZSAhPT0gJ05vdFlldEltcGxlbWVudGVkRXJyb3InKSB7XG4gICAgICBpdChlcnJvci5lcnJvckNvZGUgKyAnIHNob3VsZCByZXR1cm4gY29ycmVjdCBlcnJvcicsICgpID0+IHtcbiAgICAgICAgZXJyb3JGcm9tQ29kZShlcnJvci5lcnJvckNvZGUpXG4gICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJywgZXJyb3IuZXJyb3JDb2RlKTtcbiAgICAgICAgZXJyb3JGcm9tQ29kZShlcnJvci5lcnJvckNvZGUpXG4gICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdtZXNzYWdlJywgZXJyb3IuZXJyb3JNc2cpO1xuICAgICAgICBpZiAoIV8uaW5jbHVkZXMoWzEzLCAzM10sIGVycm9yLmVycm9yQ29kZSkpIHtcbiAgICAgICAgICBlcnJvckZyb21Db2RlKGVycm9yLmVycm9yQ29kZSwgJ2FiY2QnKVxuICAgICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdqc29ud3BDb2RlJywgZXJyb3IuZXJyb3JDb2RlKTtcbiAgICAgICAgICBlcnJvckZyb21Db2RlKGVycm9yLmVycm9yQ29kZSwgJ2FiY2QnKVxuICAgICAgICAgICAgLnNob3VsZC5oYXZlLnByb3BlcnR5KCdtZXNzYWdlJywgJ2FiY2QnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGl0KCdzaG91bGQgdGhyb3cgdW5rbm93biBlcnJvciBmb3IgdW5rbm93biBjb2RlJywgKCkgPT4ge1xuICAgIGVycm9yRnJvbUNvZGUoOTkpXG4gICAgICAuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2pzb253cENvZGUnLCAxMyk7XG4gICAgZXJyb3JGcm9tQ29kZSg5OSlcbiAgICAgIC5zaG91bGQuaGF2ZS5wcm9wZXJ0eSgnbWVzc2FnZScsICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3doaWxlIHByb2Nlc3NpbmcgdGhlIGNvbW1hbmQuJyk7XG4gIH0pO1xufSk7XG4iXX0=