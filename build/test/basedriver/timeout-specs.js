'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('timeout', function () {
  var driver = new _2['default']();
  var implicitWaitSpy = undefined,
      newCommandTimeoutSpy = undefined;
  before(function () {
    implicitWaitSpy = _sinon2['default'].spy(driver, 'setImplicitWait');
    newCommandTimeoutSpy = _sinon2['default'].spy(driver, 'setNewCommandTimeout');
  });
  beforeEach(function () {
    driver.implicitWaitMs = 0;
  });
  afterEach(function () {
    implicitWaitSpy.reset();
    newCommandTimeoutSpy.reset();
  });
  describe('timeouts', function () {
    describe('errors', function () {
      it('should throw an error if something random is sent', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts('random timeout', 'howdy').should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an error if timeout is negative', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts('random timeout', -42).should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should throw an errors if timeout type is unknown', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts('random timeout', 42).should.eventually.be.rejected);

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
    describe('implicit wait', function () {
      it('should call setImplicitWait when given an integer', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts('implicit', 42));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call setImplicitWait when given a string', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.timeouts('implicit', '42'));

            case 2:
              implicitWaitSpy.calledOnce.should.be['true'];
              implicitWaitSpy.firstCall.args[0].should.equal(42);
              driver.implicitWaitMs.should.eql(42);

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });
  describe('implicitWait', function () {
    it('should call setImplicitWait when given an integer', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.implicitWait(42);
            implicitWaitSpy.calledOnce.should.be['true'];
            implicitWaitSpy.firstCall.args[0].should.equal(42);
            driver.implicitWaitMs.should.eql(42);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setImplicitWait when given a string', function () {
      driver.implicitWait('42');
      implicitWaitSpy.calledOnce.should.be['true'];
      implicitWaitSpy.firstCall.args[0].should.equal(42);
      driver.implicitWaitMs.should.eql(42);
    });
    it('should throw an error if something random is sent', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait('howdy').should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if timeout is negative', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(-42).should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('set implicit wait', function () {
    it('should set the implicit wait with an integer', function () {
      driver.setImplicitWait(42);
      driver.implicitWaitMs.should.eql(42);
    });
    describe('with managed driver', function () {
      var managedDriver1 = new _2['default']();
      var managedDriver2 = new _2['default']();
      before(function () {
        driver.addManagedDriver(managedDriver1);
        driver.addManagedDriver(managedDriver2);
      });
      after(function () {
        driver.managedDrivers = [];
      });
      it('should set the implicit wait on managed drivers', function () {
        driver.setImplicitWait(42);
        driver.implicitWaitMs.should.eql(42);
        managedDriver1.implicitWaitMs.should.eql(42);
        managedDriver2.implicitWaitMs.should.eql(42);
      });
    });
  });
  describe('set new command timeout', function () {
    it('should set the new command timeout with an integer', function () {
      driver.setNewCommandTimeout(42);
      driver.newCommandTimeoutMs.should.eql(42);
    });
    describe('with managed driver', function () {
      var managedDriver1 = new _2['default']();
      var managedDriver2 = new _2['default']();
      before(function () {
        driver.addManagedDriver(managedDriver1);
        driver.addManagedDriver(managedDriver2);
      });
      after(function () {
        driver.managedDrivers = [];
      });
      it('should set the new command timeout on managed drivers', function () {
        driver.setNewCommandTimeout(42);
        driver.newCommandTimeoutMs.should.eql(42);
        managedDriver1.newCommandTimeoutMs.should.eql(42);
        managedDriver2.newCommandTimeoutMs.should.eql(42);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci90aW1lb3V0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDdEIsT0FBTzs7OztxQkFDWixPQUFPOzs7O0FBR3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFHekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLE1BQUksTUFBTSxHQUFHLG1CQUFnQixDQUFDO0FBQzlCLE1BQUksZUFBZSxZQUFBO01BQUUsb0JBQW9CLFlBQUEsQ0FBQztBQUMxQyxRQUFNLENBQUMsWUFBTTtBQUNYLG1CQUFlLEdBQUcsbUJBQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZELHdCQUFvQixHQUFHLG1CQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztHQUNsRSxDQUFDLENBQUM7QUFDSCxZQUFVLENBQUMsWUFBTTtBQUNmLFVBQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0dBQzNCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsbUJBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4Qix3QkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsVUFBVSxFQUFFLFlBQU07QUFDekIsWUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQ3ZCLFFBQUUsQ0FBQyxtREFBbUQsRUFBRTs7Ozs7K0NBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztPQUMvRSxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OytDQUMzQyxNQUFNLENBQUMsUUFBUSxD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QUNoQyxZQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQyxDQUFDLENBQUM7QUFDSCxZQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBTTtBQUNwQyxVQUFJLGNBQWMsR0FBRyxtQkFBZ0IsQ0FBQztBQUN0QyxVQUFJLGNBQWMsR0FBRyxtQkFBZ0IsQ0FBQztBQUN0QyxZQUFNLENBQUMsWUFBTTtBQUNYLGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN4QyxjQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7T0FDekMsQ0FBQyxDQUFDO0FBQ0gsV0FBSyxDQUFDLFlBQU07QUFDVixjQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztPQUM1QixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsdURBQXVELEVBQUUsWUFBTTtBQUNoRSxjQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsY0FBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUMsc0JBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELHNCQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNuRCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9iYXNlZHJpdmVyL3RpbWVvdXQtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBCYXNlRHJpdmVyIGZyb20gJy4uLy4uJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuXG5kZXNjcmliZSgndGltZW91dCcsICgpID0+IHtcbiAgbGV0IGRyaXZlciA9IG5ldyBCYXNlRHJpdmVyKCk7XG4gIGxldCBpbXBsaWNpdFdhaXRTcHksIG5ld0NvbW1hbmRUaW1lb3V0U3B5O1xuICBiZWZvcmUoKCkgPT4ge1xuICAgIGltcGxpY2l0V2FpdFNweSA9IHNpbm9uLnNweShkcml2ZXIsICdzZXRJbXBsaWNpdFdhaXQnKTtcbiAgICBuZXdDb21tYW5kVGltZW91dFNweSA9IHNpbm9uLnNweShkcml2ZXIsICdzZXROZXdDb21tYW5kVGltZW91dCcpO1xuICB9KTtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zID0gMDtcbiAgfSk7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgaW1wbGljaXRXYWl0U3B5LnJlc2V0KCk7XG4gICAgbmV3Q29tbWFuZFRpbWVvdXRTcHkucmVzZXQoKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0aW1lb3V0cycsICgpID0+IHtcbiAgICBkZXNjcmliZSgnZXJyb3JzJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzb21ldGhpbmcgcmFuZG9tIGlzIHNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci50aW1lb3V0cygncmFuZG9tIHRpbWVvdXQnLCAnaG93ZHknKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiB0aW1lb3V0IGlzIG5lZ2F0aXZlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoJ3JhbmRvbSB0aW1lb3V0JywgLTQyKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvcnMgaWYgdGltZW91dCB0eXBlIGlzIHVua25vd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci50aW1lb3V0cygncmFuZG9tIHRpbWVvdXQnLCA0Mikuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzZXRJbXBsaWNpdFdhaXQgd2hlbiBnaXZlbiBhbiBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoJ2ltcGxpY2l0JywgNDIpO1xuICAgICAgICBpbXBsaWNpdFdhaXRTcHkuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgICAgaW1wbGljaXRXYWl0U3B5LmZpcnN0Q2FsbC5hcmdzWzBdLnNob3VsZC5lcXVhbCg0Mik7XG4gICAgICAgIGRyaXZlci5pbXBsaWNpdFdhaXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNldEltcGxpY2l0V2FpdCB3aGVuIGdpdmVuIGEgc3RyaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIudGltZW91dHMoJ2ltcGxpY2l0JywgJzQyJyk7XG4gICAgICAgIGltcGxpY2l0V2FpdFNweS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBpbXBsaWNpdFdhaXRTcHkuZmlyc3RDYWxsLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDQyKTtcbiAgICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnaW1wbGljaXRXYWl0JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBzZXRJbXBsaWNpdFdhaXQgd2hlbiBnaXZlbiBhbiBpbnRlZ2VyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdCg0Mik7XG4gICAgICBpbXBsaWNpdFdhaXRTcHkuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGltcGxpY2l0V2FpdFNweS5maXJzdENhbGwuYXJnc1swXS5zaG91bGQuZXF1YWwoNDIpO1xuICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2FsbCBzZXRJbXBsaWNpdFdhaXQgd2hlbiBnaXZlbiBhIHN0cmluZycsICgpID0+IHtcbiAgICAgIGRyaXZlci5pbXBsaWNpdFdhaXQoJzQyJyk7XG4gICAgICBpbXBsaWNpdFdhaXRTcHkuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGltcGxpY2l0V2FpdFNweS5maXJzdENhbGwuYXJnc1swXS5zaG91bGQuZXF1YWwoNDIpO1xuICAgICAgZHJpdmVyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgc29tZXRoaW5nIHJhbmRvbSBpcyBzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmltcGxpY2l0V2FpdCgnaG93ZHknKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHRpbWVvdXQgaXMgbmVnYXRpdmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuaW1wbGljaXRXYWl0KC00Mikuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXQgaW1wbGljaXQgd2FpdCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgaW1wbGljaXQgd2FpdCB3aXRoIGFuIGludGVnZXInLCAoKSA9PiB7XG4gICAgICBkcml2ZXIuc2V0SW1wbGljaXRXYWl0KDQyKTtcbiAgICAgIGRyaXZlci5pbXBsaWNpdFdhaXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnd2l0aCBtYW5hZ2VkIGRyaXZlcicsICgpID0+IHtcbiAgICAgIGxldCBtYW5hZ2VkRHJpdmVyMSA9IG5ldyBCYXNlRHJpdmVyKCk7XG4gICAgICBsZXQgbWFuYWdlZERyaXZlcjIgPSBuZXcgQmFzZURyaXZlcigpO1xuICAgICAgYmVmb3JlKCgpID0+IHtcbiAgICAgICAgZHJpdmVyLmFkZE1hbmFnZWREcml2ZXIobWFuYWdlZERyaXZlcjEpO1xuICAgICAgICBkcml2ZXIuYWRkTWFuYWdlZERyaXZlcihtYW5hZ2VkRHJpdmVyMik7XG4gICAgICB9KTtcbiAgICAgIGFmdGVyKCgpID0+IHtcbiAgICAgICAgZHJpdmVyLm1hbmFnZWREcml2ZXJzID0gW107XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBpbXBsaWNpdCB3YWl0IG9uIG1hbmFnZWQgZHJpdmVycycsICgpID0+IHtcbiAgICAgICAgZHJpdmVyLnNldEltcGxpY2l0V2FpdCg0Mik7XG4gICAgICAgIGRyaXZlci5pbXBsaWNpdFdhaXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgICAgbWFuYWdlZERyaXZlcjEuaW1wbGljaXRXYWl0TXMuc2hvdWxkLmVxbCg0Mik7XG4gICAgICAgIG1hbmFnZWREcml2ZXIyLmltcGxpY2l0V2FpdE1zLnNob3VsZC5lcWwoNDIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc2V0IG5ldyBjb21tYW5kIHRpbWVvdXQnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIG5ldyBjb21tYW5kIHRpbWVvdXQgd2l0aCBhbiBpbnRlZ2VyJywgKCkgPT4ge1xuICAgICAgZHJpdmVyLnNldE5ld0NvbW1hbmRUaW1lb3V0KDQyKTtcbiAgICAgIGRyaXZlci5uZXdDb21tYW5kVGltZW91dE1zLnNob3VsZC5lcWwoNDIpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCd3aXRoIG1hbmFnZWQgZHJpdmVyJywgKCkgPT4ge1xuICAgICAgbGV0IG1hbmFnZWREcml2ZXIxID0gbmV3IEJhc2VEcml2ZXIoKTtcbiAgICAgIGxldCBtYW5hZ2VkRHJpdmVyMiA9IG5ldyBCYXNlRHJpdmVyKCk7XG4gICAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgICBkcml2ZXIuYWRkTWFuYWdlZERyaXZlcihtYW5hZ2VkRHJpdmVyMSk7XG4gICAgICAgIGRyaXZlci5hZGRNYW5hZ2VkRHJpdmVyKG1hbmFnZWREcml2ZXIyKTtcbiAgICAgIH0pO1xuICAgICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgICBkcml2ZXIubWFuYWdlZERyaXZlcnMgPSBbXTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIG5ldyBjb21tYW5kIHRpbWVvdXQgb24gbWFuYWdlZCBkcml2ZXJzJywgKCkgPT4ge1xuICAgICAgICBkcml2ZXIuc2V0TmV3Q29tbWFuZFRpbWVvdXQoNDIpO1xuICAgICAgICBkcml2ZXIubmV3Q29tbWFuZFRpbWVvdXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgICAgbWFuYWdlZERyaXZlcjEubmV3Q29tbWFuZFRpbWVvdXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgICAgbWFuYWdlZERyaXZlcjIubmV3Q29tbWFuZFRpbWVvdXRNcy5zaG91bGQuZXFsKDQyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19