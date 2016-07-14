require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libMjsonwpValidators = require('../../lib/mjsonwp/validators');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('MJSONWP', function () {
  describe('direct to driver', function () {

    describe('setUrl', function () {
      it('should fail when no url passed', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl();
              }).should['throw'](/url/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given invalid url', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl('foo');
              }).should['throw'](/url/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given url starting with http', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl('http://appium.io');
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an android-like scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl('content://contacts/people/1');
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an about scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl('about:blank');
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given a data scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setUrl('data:text/html,<html></html>');
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('implicitWait', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.implicitWait();
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.implicitWait("five");
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.implicitWait(-1);
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.implicitWait(0);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.implicitWait(100);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('asyncScriptTimeout', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.asyncScriptTimeout();
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.asyncScriptTimeout("five");
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.asyncScriptTimeout(-1);
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.asyncScriptTimeout(0);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.asyncScriptTimeout(100);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('other timeouts', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('page load');
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('page load', "five");
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('page load', -1);
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('page load', 0);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('page load', 100);
              }).should.not['throw'];

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should not allow an invalid timeout type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.timeouts('foofoo', 100);
              }).should['throw'](/'foofoo'/);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('clickCurrent', function () {
      it('should fail when given an invalid button', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.clickCurrent(4);
              }).should['throw'](/0, 1, or 2/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given a valid button', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.clickCurrent(0);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.clickCurrent(1);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.clickCurrent(2);
              }).should.not['throw'];

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('setNetworkConnection', function () {
      it('should fail when given no type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection();
              }).should['throw'](/0, 1, 2, 4, 6/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should fail when given an invalid type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(8);
              }).should['throw'](/0, 1, 2, 4, 6/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should succeed when given a valid type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(0);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(1);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(2);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(4);
              }).should.not['throw'];
              (function () {
                _libMjsonwpValidators.validators.setNetworkConnection(6);
              }).should.not['throw'];

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC92YWxpZGF0b3Itc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQ0FFMkIsOEJBQThCOztvQkFDeEMsTUFBTTs7OztBQUd2QixrQkFBSyxNQUFNLEVBQUUsQ0FBQzs7QUFFZCxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsVUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07O0FBRWpDLFlBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUN2QixRQUFFLENBQUMsZ0NBQWdDLEVBQUU7Ozs7QUFDbkMsZUFBQyxZQUFNO0FBQUMsaURBQVcsTUFBTSxFQUFFLENBQUM7ZUFBQyxDQUFBLENBQUUsTUFBTSxTQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7T0FDckQsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7O0FBQ3ZDLGVBQUMsWUFBTTtBQUFDLGlEQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztPQUMxRCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsa0RBQWtELEVBQUU7Ozs7QUFDckQsZUFBQyxZQUFNO0FBQUMsaURBQVcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7ZUFBQyxDQUFBLENBQUUsTUFBTSxDQUFDLEdBQUcsU0FBTSxDQUFDOzs7Ozs7O09BQ25FLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxrREFBa0QsRUFBRTs7OztBQUNyRCxlQUFDLFlBQU07QUFBQyxpREFBVyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBRyxTQUFNLENBQUM7Ozs7Ozs7T0FDOUUsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDJDQUEyQyxFQUFFOzs7O0FBQzlDLGVBQUMsWUFBTTtBQUFDLGlEQUFXLE1BQU0sQ0FBQyxhQUFhLENB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QixDQUFDLENBQUM7Ozs7Ozs7T0FDOUUsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLHdDQUF3QyxFQUFFOzs7O0FBQzNDLGVBQUMsWUFBTTtBQUFDLGlEQUFXLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sQ0FBQztBQUMvRCxlQUFDLFlBQU07QUFBQyxpREFBVyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBRyxTQUFNLENBQUM7QUFDL0QsZUFBQyxZQUFNO0FBQUMsaURBQVcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7ZUFBQyxDQUFBLENBQUUsTUFBTSxDQUFDLEdBQUcsU0FBTSxDQUFDO0FBQy9ELGVBQUMsWUFBTTtBQUFDLGlEQUFXLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sQ0FBQztBQUMvRCxlQUFDLFlBQU07QUFBQyxpREFBVyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBRyxTQUFNLENBQUM7Ozs7Ozs7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvbWpzb253cC92YWxpZGF0b3Itc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IHsgdmFsaWRhdG9ycyB9IGZyb20gJy4uLy4uL2xpYi9tanNvbndwL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5cblxuY2hhaS5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ01KU09OV1AnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdkaXJlY3QgdG8gZHJpdmVyJywgKCkgPT4ge1xuXG4gICAgZGVzY3JpYmUoJ3NldFVybCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIG5vIHVybCBwYXNzZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoKTt9KS5zaG91bGQudGhyb3coL3VybC9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gaW52YWxpZCB1cmwnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoJ2ZvbycpO30pLnNob3VsZC50aHJvdygvdXJsL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiB1cmwgc3RhcnRpbmcgd2l0aCBodHRwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0VXJsKCdodHRwOi8vYXBwaXVtLmlvJyk7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gYW5kcm9pZC1saWtlIHNjaGVtZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldFVybCgnY29udGVudDovL2NvbnRhY3RzL3Blb3BsZS8xJyk7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gYWJvdXQgc2NoZW1lJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0VXJsKCdhYm91dDpibGFuaycpO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgZGF0YSBzY2hlbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoJ2RhdGE6dGV4dC9odG1sLDxodG1sPjwvaHRtbD4nKTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2ltcGxpY2l0V2FpdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIG5vIG1zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuaW1wbGljaXRXYWl0KCk7fSkuc2hvdWxkLnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gYSBub24tbnVtZXJpYyBtcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmltcGxpY2l0V2FpdChcImZpdmVcIik7fSkuc2hvdWxkLnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gYSBuZWdhdGl2ZSBtcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmltcGxpY2l0V2FpdCgtMSk7fSkuc2hvdWxkLnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gbXMgb2YgMCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmltcGxpY2l0V2FpdCgwKTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBtcyBncmVhdGVyIHRoYW4gMCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmltcGxpY2l0V2FpdCgxMDApO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnYXN5bmNTY3JpcHRUaW1lb3V0JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gbm8gbXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5hc3luY1NjcmlwdFRpbWVvdXQoKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIG1zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KFwiZml2ZVwiKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5lZ2F0aXZlIG1zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KC0xKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBtcyBvZiAwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KDApO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGFuIG1zIGdyZWF0ZXIgdGhhbiAwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KDEwMCk7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdvdGhlciB0aW1lb3V0cycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIG5vIG1zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoJ3BhZ2UgbG9hZCcpO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIGEgbm9uLW51bWVyaWMgbXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cygncGFnZSBsb2FkJywgXCJmaXZlXCIpO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIGEgbmVnYXRpdmUgbXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cygncGFnZSBsb2FkJywgLTEpO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGFuIG1zIG9mIDAnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cygncGFnZSBsb2FkJywgMCk7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gbXMgZ3JlYXRlciB0aGFuIDAnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cygncGFnZSBsb2FkJywgMTAwKTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBhbiBpbnZhbGlkIHRpbWVvdXQgdHlwZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKCdmb29mb28nLCAxMDApO30pLnNob3VsZC50aHJvdygvJ2Zvb2ZvbycvKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdjbGlja0N1cnJlbnQnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhbiBpbnZhbGlkIGJ1dHRvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmNsaWNrQ3VycmVudCg0KTt9KS5zaG91bGQudGhyb3coLzAsIDEsIG9yIDIvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgdmFsaWQgYnV0dG9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuY2xpY2tDdXJyZW50KDApO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5jbGlja0N1cnJlbnQoMSk7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmNsaWNrQ3VycmVudCgyKTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3NldE5ldHdvcmtDb25uZWN0aW9uJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gbm8gdHlwZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKCk7fSkuc2hvdWxkLnRocm93KC8wLCAxLCAyLCA0LCA2L2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhbiBpbnZhbGlkIHR5cGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXROZXR3b3JrQ29ubmVjdGlvbig4KTt9KS5zaG91bGQudGhyb3coLzAsIDEsIDIsIDQsIDYvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgdmFsaWQgdHlwZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDApO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXROZXR3b3JrQ29ubmVjdGlvbigxKTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0TmV0d29ya0Nvbm5lY3Rpb24oMik7fSkuc2hvdWxkLm5vdC50aHJvdztcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDQpO30pLnNob3VsZC5ub3QudGhyb3c7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXROZXR3b3JrQ29ubmVjdGlvbig2KTt9KS5zaG91bGQubm90LnRocm93O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=