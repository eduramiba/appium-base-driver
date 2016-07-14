'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var ZIP_EXTS = ['.zip', '.ipa'];

function configureApp(app, appExt) {
  var newApp, shouldUnzipApp;
  return _regeneratorRuntime.async(function configureApp$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(_lodash2['default'].isNull(app) || _lodash2['default'].isUndefined(app))) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return');

      case 2:
        newApp = null;
        shouldUnzipApp = _lodash2['default'].includes(ZIP_EXTS, _path2['default'].extname(app));

        if (!((app || '').substring(0, 4).toLowerCase() === 'http')) {
          context$1$0.next = 12;
          break;
        }

        _logger2['default'].info('Using downloadable app \'' + app + '\'');
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(downloadApp(app, shouldUnzipApp ? '.zip' : appExt));

      case 8:
        newApp = context$1$0.sent;

        _logger2['default'].info('Downloaded app to \'' + newApp + '\'');
        context$1$0.next = 18;
        break;

      case 12:
        _logger2['default'].info('Using local app \'' + app + '\'');
        newApp = app;

        if (!shouldUnzipApp) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(copyLocalZip(app));

      case 17:
        newApp = context$1$0.sent;

      case 18:
        if (!shouldUnzipApp) {
          context$1$0.next = 23;
          break;
        }

        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(unzipApp(newApp, appExt));

      case 21:
        newApp = context$1$0.sent;

        _logger2['default'].info('Unzipped local app to \'' + newApp + '\'');

      case 23:
        if (!(_path2['default'].extname(newApp) !== appExt)) {
          context$1$0.next = 25;
          break;
        }

        throw new Error('New app path ' + newApp + ' did not have extension ' + appExt);

      case 25:
        return context$1$0.abrupt('return', newApp);

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function downloadApp(app, appExt) {
  var appUrl, appPath;
  return _regeneratorRuntime.async(function downloadApp$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        appUrl = undefined;
        context$1$0.prev = 1;

        appUrl = _url2['default'].parse(app);
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](1);
        throw new Error('Invalid App URL (' + app + ')');

      case 8:
        appPath = undefined;
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(downloadFile(_url2['default'].format(appUrl), appExt));

      case 12:
        appPath = context$1$0.sent;
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t1 = context$1$0['catch'](9);
        throw new Error('Problem downloading app from url ' + app + ': ' + context$1$0.t1);

      case 18:
        return context$1$0.abrupt('return', appPath);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 5], [9, 15]]);
}

function downloadFile(sourceUrl, suffix) {
  var targetPath;
  return _regeneratorRuntime.async(function downloadFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.path({ prefix: 'appium-app', suffix: suffix }));

      case 2:
        targetPath = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function (resolve, reject) {
          (0, _request2['default'])(sourceUrl).on('error', reject) // handle real errors, like connection errors
          .on('response', function (res) {
            // handle responses that fail, like 404s
            if (res.statusCode >= 400) {
              reject('Error downloading file: ' + res.statusCode);
            }
          }).pipe(_fs3['default'].createWriteStream(targetPath)).on('error', reject).on('close', resolve);
        }));

      case 5:
        _logger2['default'].debug(sourceUrl + ' downloaded to ' + targetPath);
        return context$1$0.abrupt('return', targetPath);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function copyLocalZip(localZipPath) {
  var fileInfo, infile, outfile;
  return _regeneratorRuntime.async(function copyLocalZip$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Copying local zip to tmp dir');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localZipPath));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        throw new Error('Local zip did not exist');

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.open({ prefix: 'appium-app', suffix: '.zip' }));

      case 7:
        fileInfo = context$1$0.sent;
        infile = _fs3['default'].createReadStream(localZipPath);
        outfile = _fs3['default'].createWriteStream(fileInfo.path);
        return context$1$0.abrupt('return', new _bluebird2['default'](function (resolve, reject) {
          infile.pipe(outfile).on('close', function () {
            resolve(fileInfo.path);
          }).on('error', function (err) {
            reject(err);
          });
        }));

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function unzipApp(zipPath, appExt) {
  var _ref,
  // first delete any existing apps that might be in our tmp dir
  stdout, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, output, relaxedRegStr, strictReg, relaxedReg, strictMatch, relaxedMatch, getAppPath;

  return _regeneratorRuntime.async(function unzipApp$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('find', [_path2['default'].dirname(zipPath), '-type', 'd', '-name', '*' + appExt]));

      case 2:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _getIterator(stdout.trim().split('\n').filter(Boolean));

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 16;
          break;
        }

        line = _step.value;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(line));

      case 13:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 16:
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 22:
        context$1$0.prev = 22;
        context$1$0.prev = 23;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 25:
        context$1$0.prev = 25;

        if (!_didIteratorError) {
          context$1$0.next = 28;
          break;
        }

        throw _iteratorError;

      case 28:
        return context$1$0.finish(25);

      case 29:
        return context$1$0.finish(22);

      case 30:
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(_path2['default'].resolve(_path2['default'].dirname(zipPath), 'Payload*')));

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(unzipFile(zipPath));

      case 34:
        output = context$1$0.sent;
        relaxedRegStr = '(?:creating|inflating|extracting): (.+' + appExt + ')/?';
        strictReg = new RegExp(relaxedRegStr + '$', 'm');
        relaxedReg = new RegExp(relaxedRegStr, 'm');
        strictMatch = strictReg.exec(output);
        relaxedMatch = relaxedReg.exec(output);

        getAppPath = function getAppPath(match) {
          return _path2['default'].resolve(_path2['default'].dirname(zipPath), match[1]);
        };

        if (!strictMatch) {
          context$1$0.next = 43;
          break;
        }

        return context$1$0.abrupt('return', getAppPath(strictMatch));

      case 43:
        if (!relaxedMatch) {
          context$1$0.next = 46;
          break;
        }

        _logger2['default'].debug('Got a relaxed match for app in zip, be careful for app match errors');
        return context$1$0.abrupt('return', getAppPath(relaxedMatch));

      case 46:
        throw new Error('App zip unzipped OK, but we could not find a ' + appExt + ' bundle ' + ('in it. Make sure your archive contains the ' + appExt + ' package ') + 'and nothing else');

      case 47:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 18, 22, 30], [23,, 25, 29]]);
}

function unzipFile(zipPath) {
  var valid, zip, execEnv, execOpts, _ref2, stdout;

  return _regeneratorRuntime.async(function unzipFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Unzipping ' + zipPath);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(testZipArchive(zipPath));

      case 3:
        valid = context$1$0.sent;

        if (valid) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Zip archive ' + zipPath + ' did not test valid');

      case 6:
        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 11;
          break;
        }

        zip = new _admZip2['default'](zipPath);

        zip.extractAllTo(_path2['default'].dirname(zipPath), true);
        _logger2['default'].debug('Unzip successful');
        return context$1$0.abrupt('return');

      case 11:
        execEnv = _lodash2['default'].clone(process.env);

        delete execEnv.UNZIP;
        execOpts = { cwd: _path2['default'].dirname(zipPath), env: execEnv };
        context$1$0.prev = 14;
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-o', zipPath], execOpts));

      case 17:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        return context$1$0.abrupt('return', stdout);

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](14);

        _logger2['default'].error('Unzip threw error ' + context$1$0.t0);
        _logger2['default'].error('Stderr: ' + context$1$0.t0.stderr);
        _logger2['default'].error('Stdout: ' + context$1$0.t0.stdout);
        throw new Error('Archive could not be unzipped, check appium logs.');

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[14, 22]]);
}

function testZipArchive(zipPath) {
  var execEnv, execOpts, output;
  return _regeneratorRuntime.async(function testZipArchive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Testing zip archive: ' + zipPath);

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(zipPath));

      case 4:
        if (!context$1$0.sent) {
          context$1$0.next = 9;
          break;
        }

        _logger2['default'].debug('Zip archive tested clean');
        return context$1$0.abrupt('return', true);

      case 9:
        _logger2['default'].debug('Zip archive not found');
        return context$1$0.abrupt('return', false);

      case 11:
        execEnv = _lodash2['default'].clone(process.env);

        delete execEnv.UNZIP;
        execOpts = { cwd: _path2['default'].dirname(zipPath), env: execEnv };
        output = undefined;
        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-tq', zipPath], execOpts));

      case 18:
        output = context$1$0.sent;

        if (!/No errors detected/.exec(output.stdout)) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 21:
        _logger2['default'].error('Zip file ' + zipPath + ' was not valid');
        _logger2['default'].error('Stderr: ' + output.stderr);
        _logger2['default'].error('Stdout: ' + output.stdout);
        _logger2['default'].error('Zip archive did not test successfully, check appium server ' + 'logs for output');
        return context$1$0.abrupt('return', false);

      case 28:
        context$1$0.prev = 28;
        context$1$0.t0 = context$1$0['catch'](15);

        _logger2['default'].error('Test zip archive threw error ' + context$1$0.t0);
        _logger2['default'].error('Stderr: ' + context$1$0.t0.stderr);
        _logger2['default'].error('Stdout: ' + context$1$0.t0.stdout);
        throw new Error('Error testing zip archive, are you sure this is a zip file?');

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[15, 28]]);
}

function isPackageOrBundle(app) {
  return (/^([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)+$/.test(app)
  );
}

function getCoordDefault(val) {
  // going the long way and checking for undefined and null since
  // we can't be assured `elId` is a string and not an int. Same
  // thing with destElement below.
  return _appiumSupport.util.hasValue(val) ? val : 0.5;
}

function getSwipeTouchDuration(waitGesture) {
  // the touch action api uses ms, we want seconds
  // 0.8 is the default time for the operation
  var duration = 0.8;
  if (typeof waitGesture.options.ms !== 'undefined' && waitGesture.options.ms) {
    duration = waitGesture.options.ms / 1000;
    if (duration === 0) {
      // set to a very low number, since they wanted it fast
      // but below 0.1 becomes 0 steps, which causes errors
      duration = 0.1;
    }
  }
  return duration;
}

exports['default'] = { configureApp: configureApp, downloadApp: downloadApp, downloadFile: downloadFile, copyLocalZip: copyLocalZip,
  unzipApp: unzipApp, unzipFile: unzipFile, testZipArchive: testZipArchive, isPackageOrBundle: isPackageOrBundle,
  getCoordDefault: getCoordDefault, getSwipeTouchDuration: getSwipeTouchDuration };
module.exports = exports['default'];

// immediately shortcircuit if not given an app

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory

// don't use request-promise here, we need streams

// now delete any existing zip payload

// in the strict regex, we check for an entry which ends with the
// extension

// otherwise, we allow an entry which contains the extension, but we
// need to be careful, because it might be a false positive
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7OzttQkFDUCxLQUFLOzs7O3NCQUNGLFVBQVU7Ozs7bUJBQ2IsSUFBSTs7Ozt3QkFDTixVQUFVOzs7OzZCQUNrQixnQkFBZ0I7OzRCQUNyQyxjQUFjOztzQkFDaEIsU0FBUzs7Ozt1QkFDUixTQUFTOzs7O0FBRzdCLElBQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUVsQyxTQUFlLFlBQVksQ0FBRSxHQUFHLEVBQUUsTUFBTTtNQU1sQyxNQUFNLEVBQ04sY0FBYzs7OztjQU5kLG9CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxvQkFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Ozs7Ozs7O0FBS25DLGNBQU0sR0FBRyxJQUFJO0FBQ2Isc0JBQWMsR0FBRyxvQkFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLGtCQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Y0FDeEQsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFBLENBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUE7Ozs7O0FBQ3RELDRCQUFPLElBQUksK0JBQTRCLEdBQUcsUUFBSSxDQUFDOzt5Q0FDaEMsV0FBVyxDQUFDLEdBQUcsRUFBRSxjQUFjLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7O0FBQWpFLGNBQU07O0FBQ04sNEJBQU8sSUFBSSwwQkFBdUIsTUFBTSxRQUFJLENBQUM7Ozs7O0FBRTdDLDRCQUFPLElBQUksd0JBQXFCLEdBQUcsUUFBSSxDQUFDO0FBQ3hDLGNBQU0sR0FBRyxHQUFHLENBQUM7O2FBQ1QsY0FBYzs7Ozs7O3lDQUNELFlBQVksQ0FBQyxHQUFHLENBQUM7OztBQUFoQyxjQUFNOzs7YUFJTixjQUFjOzs7Ozs7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b20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IF9mcyBmcm9tICdmcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB0ZW1wRGlyLCBzeXN0ZW0sIGZzLCB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgQWRtWmlwIGZyb20gJ2FkbS16aXAnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5cblxuY29uc3QgWklQX0VYVFMgPSBbJy56aXAnLCAnLmlwYSddO1xuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmVBcHAgKGFwcCwgYXBwRXh0KSB7XG4gIGlmIChfLmlzTnVsbChhcHApIHx8IF8uaXNVbmRlZmluZWQoYXBwKSkge1xuICAgIC8vIGltbWVkaWF0ZWx5IHNob3J0Y2lyY3VpdCBpZiBub3QgZ2l2ZW4gYW4gYXBwXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IG5ld0FwcCA9IG51bGw7XG4gIGxldCBzaG91bGRVbnppcEFwcCA9IF8uaW5jbHVkZXMoWklQX0VYVFMsIHBhdGguZXh0bmFtZShhcHApKTtcbiAgaWYgKChhcHAgfHwgJycpLnN1YnN0cmluZygwLCA0KS50b0xvd2VyQ2FzZSgpID09PSAnaHR0cCcpIHtcbiAgICBsb2dnZXIuaW5mbyhgVXNpbmcgZG93bmxvYWRhYmxlIGFwcCAnJHthcHB9J2ApO1xuICAgIG5ld0FwcCA9IGF3YWl0IGRvd25sb2FkQXBwKGFwcCwgc2hvdWxkVW56aXBBcHAgPyAnLnppcCcgOiBhcHBFeHQpO1xuICAgIGxvZ2dlci5pbmZvKGBEb3dubG9hZGVkIGFwcCB0byAnJHtuZXdBcHB9J2ApO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5pbmZvKGBVc2luZyBsb2NhbCBhcHAgJyR7YXBwfSdgKTtcbiAgICBuZXdBcHAgPSBhcHA7XG4gICAgaWYgKHNob3VsZFVuemlwQXBwKSB7XG4gICAgICBuZXdBcHAgPSBhd2FpdCBjb3B5TG9jYWxaaXAoYXBwKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2hvdWxkVW56aXBBcHApIHtcbiAgICBuZXdBcHAgPSBhd2FpdCB1bnppcEFwcChuZXdBcHAsIGFwcEV4dCk7XG4gICAgbG9nZ2VyLmluZm8oYFVuemlwcGVkIGxvY2FsIGFwcCB0byAnJHtuZXdBcHB9J2ApO1xuICB9XG5cbiAgaWYgKHBhdGguZXh0bmFtZShuZXdBcHApICE9PSBhcHBFeHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldyBhcHAgcGF0aCAke25ld0FwcH0gZGlkIG5vdCBoYXZlIGV4dGVuc2lvbiAke2FwcEV4dH1gKTtcbiAgfVxuXG4gIHJldHVybiBuZXdBcHA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwIChhcHAsIGFwcEV4dCkge1xuICBsZXQgYXBwVXJsO1xuICB0cnkge1xuICAgIGFwcFVybCA9IHVybC5wYXJzZShhcHApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgQXBwIFVSTCAoJHthcHB9KWApO1xuICB9XG5cbiAgbGV0IGFwcFBhdGg7XG4gIHRyeSB7XG4gICAgYXBwUGF0aCA9IGF3YWl0IGRvd25sb2FkRmlsZSh1cmwuZm9ybWF0KGFwcFVybCksIGFwcEV4dCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihgUHJvYmxlbSBkb3dubG9hZGluZyBhcHAgZnJvbSB1cmwgJHthcHB9OiAke2Vycn1gKTtcbiAgfVxuXG4gIHJldHVybiBhcHBQYXRoO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZEZpbGUgKHNvdXJjZVVybCwgc3VmZml4KSB7XG4gIC8vIFdlIHdpbGwgYmUgZG93bmxvYWRpbmcgdGhlIGZpbGVzIHRvIGEgZGlyZWN0b3J5LCBzbyBtYWtlIHN1cmUgaXQncyB0aGVyZVxuICAvLyBUaGlzIHN0ZXAgaXMgbm90IHJlcXVpcmVkIGlmIHlvdSBoYXZlIG1hbnVhbGx5IGNyZWF0ZWQgdGhlIGRpcmVjdG9yeVxuICBsZXQgdGFyZ2V0UGF0aCA9IGF3YWl0IHRlbXBEaXIucGF0aCh7cHJlZml4OiAnYXBwaXVtLWFwcCcsIHN1ZmZpeH0pO1xuXG4gIC8vIGRvbid0IHVzZSByZXF1ZXN0LXByb21pc2UgaGVyZSwgd2UgbmVlZCBzdHJlYW1zXG4gIGF3YWl0IG5ldyBCKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KHNvdXJjZVVybClcbiAgICAgIC5vbignZXJyb3InLCByZWplY3QpIC8vIGhhbmRsZSByZWFsIGVycm9ycywgbGlrZSBjb25uZWN0aW9uIGVycm9yc1xuICAgICAgLm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgLy8gaGFuZGxlIHJlc3BvbnNlcyB0aGF0IGZhaWwsIGxpa2UgNDA0c1xuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgICAgcmVqZWN0KGBFcnJvciBkb3dubG9hZGluZyBmaWxlOiAke3Jlcy5zdGF0dXNDb2RlfWApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnBpcGUoX2ZzLmNyZWF0ZVdyaXRlU3RyZWFtKHRhcmdldFBhdGgpKVxuICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgIC5vbignY2xvc2UnLCByZXNvbHZlKTtcbiAgfSk7XG4gIGxvZ2dlci5kZWJ1ZyhgJHtzb3VyY2VVcmx9IGRvd25sb2FkZWQgdG8gJHt0YXJnZXRQYXRofWApO1xuICByZXR1cm4gdGFyZ2V0UGF0aDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29weUxvY2FsWmlwIChsb2NhbFppcFBhdGgpIHtcbiAgbG9nZ2VyLmRlYnVnKCdDb3B5aW5nIGxvY2FsIHppcCB0byB0bXAgZGlyJyk7XG4gIGlmICghKGF3YWl0IGZzLmV4aXN0cyhsb2NhbFppcFBhdGgpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9jYWwgemlwIGRpZCBub3QgZXhpc3QnKTtcbiAgfVxuICBsZXQgZmlsZUluZm8gPSBhd2FpdCB0ZW1wRGlyLm9wZW4oe3ByZWZpeDogJ2FwcGl1bS1hcHAnLCBzdWZmaXg6ICcuemlwJ30pO1xuICBsZXQgaW5maWxlID0gX2ZzLmNyZWF0ZVJlYWRTdHJlYW0obG9jYWxaaXBQYXRoKTtcbiAgbGV0IG91dGZpbGUgPSBfZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZUluZm8ucGF0aCk7XG4gIHJldHVybiBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaW5maWxlLnBpcGUob3V0ZmlsZSkub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgcmVzb2x2ZShmaWxlSW5mby5wYXRoKTtcbiAgICB9KS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVuemlwQXBwICh6aXBQYXRoLCBhcHBFeHQpIHtcbiAgLy8gZmlyc3QgZGVsZXRlIGFueSBleGlzdGluZyBhcHBzIHRoYXQgbWlnaHQgYmUgaW4gb3VyIHRtcCBkaXJcbiAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYygnZmluZCcsIFtwYXRoLmRpcm5hbWUoemlwUGF0aCksICctdHlwZScsICdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLW5hbWUnLCBgKiR7YXBwRXh0fWBdKTtcbiAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQudHJpbSgpLnNwbGl0KCdcXG4nKS5maWx0ZXIoQm9vbGVhbikpIHtcbiAgICBhd2FpdCBmcy5yaW1yYWYobGluZSk7XG4gIH1cbiAgLy8gbm93IGRlbGV0ZSBhbnkgZXhpc3RpbmcgemlwIHBheWxvYWRcbiAgYXdhaXQgZnMucmltcmFmKHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoemlwUGF0aCksICdQYXlsb2FkKicpKTtcbiAgbGV0IG91dHB1dCA9IGF3YWl0IHVuemlwRmlsZSh6aXBQYXRoKTtcbiAgbGV0IHJlbGF4ZWRSZWdTdHIgPSBgKD86Y3JlYXRpbmd8aW5mbGF0aW5nfGV4dHJhY3RpbmcpOiAoLiske2FwcEV4dH0pLz9gO1xuICAvLyBpbiB0aGUgc3RyaWN0IHJlZ2V4LCB3ZSBjaGVjayBmb3IgYW4gZW50cnkgd2hpY2ggZW5kcyB3aXRoIHRoZVxuICAvLyBleHRlbnNpb25cbiAgbGV0IHN0cmljdFJlZyA9IG5ldyBSZWdFeHAoYCR7cmVsYXhlZFJlZ1N0cn0kYCwgJ20nKTtcbiAgLy8gb3RoZXJ3aXNlLCB3ZSBhbGxvdyBhbiBlbnRyeSB3aGljaCBjb250YWlucyB0aGUgZXh0ZW5zaW9uLCBidXQgd2VcbiAgLy8gbmVlZCB0byBiZSBjYXJlZnVsLCBiZWNhdXNlIGl0IG1pZ2h0IGJlIGEgZmFsc2UgcG9zaXRpdmVcbiAgbGV0IHJlbGF4ZWRSZWcgPSBuZXcgUmVnRXhwKHJlbGF4ZWRSZWdTdHIsICdtJyk7XG4gIGxldCBzdHJpY3RNYXRjaCA9IHN0cmljdFJlZy5leGVjKG91dHB1dCk7XG4gIGxldCByZWxheGVkTWF0Y2ggPSByZWxheGVkUmVnLmV4ZWMob3V0cHV0KTtcbiAgbGV0IGdldEFwcFBhdGggPSBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZSh6aXBQYXRoKSwgbWF0Y2hbMV0pO1xuICB9O1xuXG4gIGlmIChzdHJpY3RNYXRjaCkge1xuICAgIHJldHVybiBnZXRBcHBQYXRoKHN0cmljdE1hdGNoKTtcbiAgfVxuXG4gIGlmIChyZWxheGVkTWF0Y2gpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0dvdCBhIHJlbGF4ZWQgbWF0Y2ggZm9yIGFwcCBpbiB6aXAsIGJlIGNhcmVmdWwgZm9yIGFwcCBtYXRjaCBlcnJvcnMnKTtcbiAgICByZXR1cm4gZ2V0QXBwUGF0aChyZWxheGVkTWF0Y2gpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBBcHAgemlwIHVuemlwcGVkIE9LLCBidXQgd2UgY291bGQgbm90IGZpbmQgYSAke2FwcEV4dH0gYnVuZGxlIGAgK1xuICAgICAgICAgICAgICAgICAgYGluIGl0LiBNYWtlIHN1cmUgeW91ciBhcmNoaXZlIGNvbnRhaW5zIHRoZSAke2FwcEV4dH0gcGFja2FnZSBgICtcbiAgICAgICAgICAgICAgICAgIGBhbmQgbm90aGluZyBlbHNlYCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVuemlwRmlsZSAoemlwUGF0aCkge1xuICBsb2dnZXIuZGVidWcoYFVuemlwcGluZyAke3ppcFBhdGh9YCk7XG4gIGxldCB2YWxpZCA9IGF3YWl0IHRlc3RaaXBBcmNoaXZlKHppcFBhdGgpO1xuICBpZiAoIXZhbGlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBaaXAgYXJjaGl2ZSAke3ppcFBhdGh9IGRpZCBub3QgdGVzdCB2YWxpZGApO1xuICB9XG5cbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIGxldCB6aXAgPSBuZXcgQWRtWmlwKHppcFBhdGgpO1xuICAgIHppcC5leHRyYWN0QWxsVG8ocGF0aC5kaXJuYW1lKHppcFBhdGgpLCB0cnVlKTtcbiAgICBsb2dnZXIuZGVidWcoJ1VuemlwIHN1Y2Nlc3NmdWwnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZXhlY0VudiA9IF8uY2xvbmUocHJvY2Vzcy5lbnYpO1xuICBkZWxldGUgZXhlY0Vudi5VTlpJUDtcbiAgbGV0IGV4ZWNPcHRzID0ge2N3ZDogcGF0aC5kaXJuYW1lKHppcFBhdGgpLCBlbnY6IGV4ZWNFbnZ9O1xuICB0cnkge1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoJ3VuemlwJywgWyctbycsIHppcFBhdGhdLCBleGVjT3B0cyk7XG4gICAgcmV0dXJuIHN0ZG91dDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBVbnppcCB0aHJldyBlcnJvciAke2Vycn1gKTtcbiAgICBsb2dnZXIuZXJyb3IoYFN0ZGVycjogJHtlcnIuc3RkZXJyfWApO1xuICAgIGxvZ2dlci5lcnJvcihgU3Rkb3V0OiAke2Vyci5zdGRvdXR9YCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBcmNoaXZlIGNvdWxkIG5vdCBiZSB1bnppcHBlZCwgY2hlY2sgYXBwaXVtIGxvZ3MuJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdGVzdFppcEFyY2hpdmUgKHppcFBhdGgpIHtcbiAgbG9nZ2VyLmRlYnVnKGBUZXN0aW5nIHppcCBhcmNoaXZlOiAke3ppcFBhdGh9YCk7XG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKHppcFBhdGgpKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ1ppcCBhcmNoaXZlIHRlc3RlZCBjbGVhbicpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZygnWmlwIGFyY2hpdmUgbm90IGZvdW5kJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbGV0IGV4ZWNFbnYgPSBfLmNsb25lKHByb2Nlc3MuZW52KTtcbiAgZGVsZXRlIGV4ZWNFbnYuVU5aSVA7XG4gIGxldCBleGVjT3B0cyA9IHtjd2Q6IHBhdGguZGlybmFtZSh6aXBQYXRoKSwgZW52OiBleGVjRW52fTtcbiAgbGV0IG91dHB1dDtcbiAgdHJ5IHtcbiAgICBvdXRwdXQgPSBhd2FpdCBleGVjKCd1bnppcCcsIFsnLXRxJywgemlwUGF0aF0sIGV4ZWNPcHRzKTtcbiAgICBpZiAoL05vIGVycm9ycyBkZXRlY3RlZC8uZXhlYyhvdXRwdXQuc3Rkb3V0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGxvZ2dlci5lcnJvcihgWmlwIGZpbGUgJHt6aXBQYXRofSB3YXMgbm90IHZhbGlkYCk7XG4gICAgbG9nZ2VyLmVycm9yKGBTdGRlcnI6ICR7b3V0cHV0LnN0ZGVycn1gKTtcbiAgICBsb2dnZXIuZXJyb3IoYFN0ZG91dDogJHtvdXRwdXQuc3Rkb3V0fWApO1xuICAgIGxvZ2dlci5lcnJvcignWmlwIGFyY2hpdmUgZGlkIG5vdCB0ZXN0IHN1Y2Nlc3NmdWxseSwgY2hlY2sgYXBwaXVtIHNlcnZlciAnICtcbiAgICAgICAgICAgICAgICAgJ2xvZ3MgZm9yIG91dHB1dCcpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBUZXN0IHppcCBhcmNoaXZlIHRocmV3IGVycm9yICR7ZXJyfWApO1xuICAgIGxvZ2dlci5lcnJvcihgU3RkZXJyOiAke2Vyci5zdGRlcnJ9YCk7XG4gICAgbG9nZ2VyLmVycm9yKGBTdGRvdXQ6ICR7ZXJyLnN0ZG91dH1gKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIHRlc3RpbmcgemlwIGFyY2hpdmUsIGFyZSB5b3Ugc3VyZSB0aGlzIGlzIGEgemlwIGZpbGU/Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQYWNrYWdlT3JCdW5kbGUgKGFwcCkge1xuICByZXR1cm4gKC9eKFthLXpBLVowLTlcXC1fXStcXC5bYS16QS1aMC05XFwtX10rKSskLykudGVzdChhcHApO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZERlZmF1bHQgKHZhbCkge1xuICAvLyBnb2luZyB0aGUgbG9uZyB3YXkgYW5kIGNoZWNraW5nIGZvciB1bmRlZmluZWQgYW5kIG51bGwgc2luY2VcbiAgLy8gd2UgY2FuJ3QgYmUgYXNzdXJlZCBgZWxJZGAgaXMgYSBzdHJpbmcgYW5kIG5vdCBhbiBpbnQuIFNhbWVcbiAgLy8gdGhpbmcgd2l0aCBkZXN0RWxlbWVudCBiZWxvdy5cbiAgcmV0dXJuIHV0aWwuaGFzVmFsdWUodmFsKSA/IHZhbCA6IDAuNTtcbn1cblxuZnVuY3Rpb24gZ2V0U3dpcGVUb3VjaER1cmF0aW9uICh3YWl0R2VzdHVyZSkge1xuICAvLyB0aGUgdG91Y2ggYWN0aW9uIGFwaSB1c2VzIG1zLCB3ZSB3YW50IHNlY29uZHNcbiAgLy8gMC44IGlzIHRoZSBkZWZhdWx0IHRpbWUgZm9yIHRoZSBvcGVyYXRpb25cbiAgbGV0IGR1cmF0aW9uID0gMC44O1xuICBpZiAodHlwZW9mIHdhaXRHZXN0dXJlLm9wdGlvbnMubXMgIT09ICd1bmRlZmluZWQnICYmIHdhaXRHZXN0dXJlLm9wdGlvbnMubXMpIHtcbiAgICBkdXJhdGlvbiA9IHdhaXRHZXN0dXJlLm9wdGlvbnMubXMgLyAxMDAwO1xuICAgIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgICAgLy8gc2V0IHRvIGEgdmVyeSBsb3cgbnVtYmVyLCBzaW5jZSB0aGV5IHdhbnRlZCBpdCBmYXN0XG4gICAgICAvLyBidXQgYmVsb3cgMC4xIGJlY29tZXMgMCBzdGVwcywgd2hpY2ggY2F1c2VzIGVycm9yc1xuICAgICAgZHVyYXRpb24gPSAwLjE7XG4gICAgfVxuICB9XG4gIHJldHVybiBkdXJhdGlvbjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7IGNvbmZpZ3VyZUFwcCwgZG93bmxvYWRBcHAsIGRvd25sb2FkRmlsZSwgY29weUxvY2FsWmlwLFxuICAgICAgICAgICAgICAgICB1bnppcEFwcCwgdW56aXBGaWxlLCB0ZXN0WmlwQXJjaGl2ZSwgaXNQYWNrYWdlT3JCdW5kbGUsXG4gICAgICAgICAgICAgICAgIGdldENvb3JkRGVmYXVsdCwgZ2V0U3dpcGVUb3VjaER1cmF0aW9uIH07XG4iXX0=