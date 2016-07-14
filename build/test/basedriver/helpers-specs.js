'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libBasedriverHelpers = require('../../lib/basedriver/helpers');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('helpers', function () {
  describe('#isPackageOrBundle', function () {
    it('should accept packages and bundles', function () {
      (0, _libBasedriverHelpers.isPackageOrBundle)('io.appium.testapp').should.be['true'];
    });
    it('should not accept non-packages or non-bundles', function () {
      (0, _libBasedriverHelpers.isPackageOrBundle)('foo').should.be['false'];
      (0, _libBasedriverHelpers.isPackageOrBundle)('/path/to/an.app').should.be['false'];
      (0, _libBasedriverHelpers.isPackageOrBundle)('/path/to/an.apk').should.be['false'];
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9oZWxwZXJzLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7b0NBQWtDLDhCQUE4Qjs7b0JBQy9DLE1BQU07Ozs7QUFDdkIsa0JBQUssTUFBTSxFQUFFLENBQUM7O0FBRWQsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQ3hCLFVBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFNO0FBQ25DLE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRSxZQUFNO0FBQzdDLG1EQUFrQixtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztLQUN2RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0NBQStDLEVBQUUsWUFBTTtBQUN4RCxtREFBa0IsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDO0FBQ3pDLG1EQUFrQixpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQU0sQ0FBQztBQUNyRCxtREFBa0IsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7S0FDdEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvYmFzZWRyaXZlci9oZWxwZXJzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQYWNrYWdlT3JCdW5kbGUgfSBmcm9tICcuLi8uLi9saWIvYmFzZWRyaXZlci9oZWxwZXJzJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuY2hhaS5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ2hlbHBlcnMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCcjaXNQYWNrYWdlT3JCdW5kbGUnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBhY2NlcHQgcGFja2FnZXMgYW5kIGJ1bmRsZXMnLCAoKSA9PiB7XG4gICAgICBpc1BhY2thZ2VPckJ1bmRsZSgnaW8uYXBwaXVtLnRlc3RhcHAnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBhY2NlcHQgbm9uLXBhY2thZ2VzIG9yIG5vbi1idW5kbGVzJywgKCkgPT4ge1xuICAgICAgaXNQYWNrYWdlT3JCdW5kbGUoJ2ZvbycpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIGlzUGFja2FnZU9yQnVuZGxlKCcvcGF0aC90by9hbi5hcHAnKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICBpc1BhY2thZ2VPckJ1bmRsZSgnL3BhdGgvdG8vYW4uYXBrJykuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19