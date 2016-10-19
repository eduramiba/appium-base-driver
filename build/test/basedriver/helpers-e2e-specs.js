'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumSupport = require('appium-support');

var _libBasedriverHelpers = require('../../lib/basedriver/helpers');

var _libBasedriverHelpers2 = _interopRequireDefault(_libBasedriverHelpers);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _contentDisposition = require('content-disposition');

var _contentDisposition2 = _interopRequireDefault(_contentDisposition);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function getFixture(file) {
  return _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'basedriver', 'fixtures', file);
}

describe('app download and configuration', function () {
  describe('configureApp', function () {
    it('should get the path for a local .app', function callee$2$0() {
      var newAppPath, contents;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeIOSApp.app'), '.app'));

          case 2:
            newAppPath = context$3$0.sent;

            newAppPath.should.contain('FakeIOSApp.app');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(newAppPath, 'utf8'));

          case 6:
            contents = context$3$0.sent;

            contents.should.eql('this is not really an app\n');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the path for a local .apk', function callee$2$0() {
      var newAppPath, contents;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeAndroidApp.apk'), '.apk'));

          case 2:
            newAppPath = context$3$0.sent;

            newAppPath.should.contain('FakeAndroidApp.apk');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(newAppPath, 'utf8'));

          case 6:
            contents = context$3$0.sent;

            contents.should.eql('this is not really an apk\n');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unzip and get the path for a local .app.zip', function callee$2$0() {
      var newAppPath, contents;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeIOSApp.app.zip'), '.app'));

          case 2:
            newAppPath = context$3$0.sent;

            newAppPath.should.contain('FakeIOSApp.app');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(newAppPath, 'utf8'));

          case 6:
            contents = context$3$0.sent;

            contents.should.eql('this is not really an app\n');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should unzip and get the path for a local .ipa', function callee$2$0() {
      var newAppPath, contents;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeIOSApp.ipa'), '.app'));

          case 2:
            newAppPath = context$3$0.sent;

            newAppPath.should.contain('FakeIOSApp.app');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(newAppPath, 'utf8'));

          case 6:
            contents = context$3$0.sent;

            contents.should.eql('this is not really an app\n');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail for a bad zip file', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('BadZippedApp.zip'), '.app').should.be.rejectedWith('Error testing zip archive, are you sure this is a zip file?'));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if extensions do not match', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeIOSApp.app'), '.wrong').should.be.rejectedWith(/did not have extension .wrong/));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if zip file does not contain an app whose extension matches', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp(getFixture('FakeIOSApp.app.zip'), '.wrong').should.be.rejectedWith(/could not find a .wrong bundle in it/));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    describe('should download an app from the web', function callee$2$0() {
      var server;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            server = undefined;

            before(function () {
              var dir = _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'basedriver', 'fixtures');
              var serve = (0, _serveStatic2['default'])(dir, {
                index: false,
                setHeaders: function setHeaders(res, path) {
                  res.setHeader('Content-Disposition', (0, _contentDisposition2['default'])(path));
                }
              });

              server = _http2['default'].createServer(function (req, res) {
                if (req.url.indexOf('missing') !== -1) {
                  res.writeHead(404);
                  res.end();
                  return;
                }
                serve(req, res, (0, _finalhandler2['default'])(req, res));
              });
              server.listen(8000);
            });
            after(function () {
              server.close();
            });

            it('should download zip file', function callee$3$0() {
              var newAppPath, contents;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp('http://localhost:8000/FakeIOSApp.app.zip', '.app'));

                  case 2:
                    newAppPath = context$4$0.sent;

                    newAppPath.should.contain('FakeIOSApp.app');
                    context$4$0.next = 6;
                    return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(newAppPath, 'utf8'));

                  case 6:
                    contents = context$4$0.sent;

                    contents.should.eql('this is not really an app\n');

                  case 8:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
            it('should handle zip file that cannot be downloaded', function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp('http://localhost:8000/missing/FakeIOSApp.app.zip', '.app').should.be.rejectedWith(/Problem downloading app from url/));

                  case 2:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
            it('should handle server not available', function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    server.close();
                    context$4$0.next = 3;
                    return _regeneratorRuntime.awrap(_libBasedriverHelpers2['default'].configureApp('http://localhost:8000/FakeIOSApp.app.zip', '.app').should.be.rejectedWith(/ECONNREFUSED/));

                  case 3:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// use a local server so there is no dependency on the internet
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9oZWxwZXJzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7OztvQkFDTixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozs2QkFDMUIsZ0JBQWdCOztvQ0FDckIsOEJBQThCOzs7O29CQUMzQixNQUFNOzs7OzRCQUNFLGNBQWM7Ozs7MkJBQ2YsY0FBYzs7OztrQ0FDUCxxQkFBcUI7Ozs7QUFHcEQsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixTQUFTLFVBQVUsQ0FBRSxJQUFJLEVBQUU7QUFDekIsU0FBTyxrQkFBSyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQ2pELFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN2Qzs7QUFFRCxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsWUFBTTtBQUMvQyxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQU07QUFDN0IsTUFBRSxDQUFDLHNDQUFzQyxFQUFFO1VBQ3JDLFVBQVUsRUFFVixRQUFROzs7Ozs2Q0FGVyxrQ0FBRSxZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxDQUFDOzs7QUFBdkUsc0JBQVU7O0FBQ2Qsc0JBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7OzZDQUN2QixrQkFBRyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzs7O0FBQWhELG9CQUFROztBQUNaLG9CQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOzs7Ozs7O0tBQ3BELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxzQ0FBc0MsRUFBRTtVQUNyQyxVQUFVLEVBRVYsUUFBUTs7Ozs7NkNBRlcsa0NBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxv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QUMsQ0FDckUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDOzs7Ozs7O2FBQzFDLENBQUMsQ0FBQzs7Ozs7OztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Jhc2Vkcml2ZXIvaGVscGVycy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgaCBmcm9tICcuLi8uLi9saWIvYmFzZWRyaXZlci9oZWxwZXJzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGZpbmFsaGFuZGxlciBmcm9tICdmaW5hbGhhbmRsZXInO1xuaW1wb3J0IHNlcnZlU3RhdGljIGZyb20gJ3NlcnZlLXN0YXRpYyc7XG5pbXBvcnQgY29udGVudERpc3Bvc2l0aW9uIGZyb20gJ2NvbnRlbnQtZGlzcG9zaXRpb24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmZ1bmN0aW9uIGdldEZpeHR1cmUgKGZpbGUpIHtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICd0ZXN0JywgJ2Jhc2Vkcml2ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsIGZpbGUpO1xufVxuXG5kZXNjcmliZSgnYXBwIGRvd25sb2FkIGFuZCBjb25maWd1cmF0aW9uJywgKCkgPT4ge1xuICBkZXNjcmliZSgnY29uZmlndXJlQXBwJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBwYXRoIGZvciBhIGxvY2FsIC5hcHAnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGguY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuYXBwJyksICcuYXBwJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlSU9TQXBwLmFwcCcpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgcGF0aCBmb3IgYSBsb2NhbCAuYXBrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBoLmNvbmZpZ3VyZUFwcChnZXRGaXh0dXJlKCdGYWtlQW5kcm9pZEFwcC5hcGsnKSwgJy5hcGsnKTtcbiAgICAgIG5ld0FwcFBhdGguc2hvdWxkLmNvbnRhaW4oJ0Zha2VBbmRyb2lkQXBwLmFwaycpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcGtcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVuemlwIGFuZCBnZXQgdGhlIHBhdGggZm9yIGEgbG9jYWwgLmFwcC56aXAnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGguY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuYXBwLnppcCcpLCAnLmFwcCcpO1xuICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignRmFrZUlPU0FwcC5hcHAnKTtcbiAgICAgIGxldCBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKG5ld0FwcFBhdGgsICd1dGY4Jyk7XG4gICAgICBjb250ZW50cy5zaG91bGQuZXFsKCd0aGlzIGlzIG5vdCByZWFsbHkgYW4gYXBwXFxuJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB1bnppcCBhbmQgZ2V0IHRoZSBwYXRoIGZvciBhIGxvY2FsIC5pcGEnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGguY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuaXBhJyksICcuYXBwJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlSU9TQXBwLmFwcCcpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIGEgYmFkIHppcCBmaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgaC5jb25maWd1cmVBcHAoZ2V0Rml4dHVyZSgnQmFkWmlwcGVkQXBwLnppcCcpLCAnLmFwcCcpXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdFcnJvciB0ZXN0aW5nIHppcCBhcmNoaXZlLCBhcmUgeW91IHN1cmUgdGhpcyBpcyBhIHppcCBmaWxlPycpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZmFpbCBpZiBleHRlbnNpb25zIGRvIG5vdCBtYXRjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGguY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuYXBwJyksICcud3JvbmcnKVxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvZGlkIG5vdCBoYXZlIGV4dGVuc2lvbiAud3JvbmcvKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgemlwIGZpbGUgZG9lcyBub3QgY29udGFpbiBhbiBhcHAgd2hvc2UgZXh0ZW5zaW9uIG1hdGNoZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBoLmNvbmZpZ3VyZUFwcChnZXRGaXh0dXJlKCdGYWtlSU9TQXBwLmFwcC56aXAnKSwgJy53cm9uZycpXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgZmluZCBhIC53cm9uZyBidW5kbGUgaW4gaXQvKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnc2hvdWxkIGRvd25sb2FkIGFuIGFwcCBmcm9tIHRoZSB3ZWInLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyB1c2UgYSBsb2NhbCBzZXJ2ZXIgc28gdGhlcmUgaXMgbm8gZGVwZW5kZW5jeSBvbiB0aGUgaW50ZXJuZXRcbiAgICAgIGxldCBzZXJ2ZXI7XG4gICAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgICBsZXQgZGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJywgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiYXNlZHJpdmVyJywgJ2ZpeHR1cmVzJyk7XG4gICAgICAgIGxldCBzZXJ2ZSA9IHNlcnZlU3RhdGljKGRpciwge1xuICAgICAgICAgIGluZGV4OiBmYWxzZSxcbiAgICAgICAgICBzZXRIZWFkZXJzOiAocmVzLCBwYXRoKSA9PiB7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJywgY29udGVudERpc3Bvc2l0aW9uKHBhdGgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgICAgIGlmIChyZXEudXJsLmluZGV4T2YoJ21pc3NpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDA0KTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VydmUocmVxLCByZXMsIGZpbmFsaGFuZGxlcihyZXEsIHJlcykpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VydmVyLmxpc3Rlbig4MDAwKTtcbiAgICAgIH0pO1xuICAgICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGRvd25sb2FkIHppcCBmaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGguY29uZmlndXJlQXBwKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvRmFrZUlPU0FwcC5hcHAuemlwJywgJy5hcHAnKTtcbiAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignRmFrZUlPU0FwcC5hcHAnKTtcbiAgICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgY29udGVudHMuc2hvdWxkLmVxbCgndGhpcyBpcyBub3QgcmVhbGx5IGFuIGFwcFxcbicpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSB6aXAgZmlsZSB0aGF0IGNhbm5vdCBiZSBkb3dubG9hZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBoLmNvbmZpZ3VyZUFwcCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL21pc3NpbmcvRmFrZUlPU0FwcC5hcHAuemlwJywgJy5hcHAnKVxuICAgICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9Qcm9ibGVtIGRvd25sb2FkaW5nIGFwcCBmcm9tIHVybC8pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSBzZXJ2ZXIgbm90IGF2YWlsYWJsZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIGF3YWl0IGguY29uZmlndXJlQXBwKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvRmFrZUlPU0FwcC5hcHAuemlwJywgJy5hcHAnKVxuICAgICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9FQ09OTlJFRlVTRUQvKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19