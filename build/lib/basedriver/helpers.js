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
  var mountRoot = arguments.length <= 2 || arguments[2] === undefined ? "Volumes" : arguments[2];
  var windowsShareUserName = arguments.length <= 3 || arguments[3] === undefined ? "" : arguments[3];
  var windowsSharePassword = arguments.length <= 4 || arguments[4] === undefined ? "" : arguments[4];
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

        if (!_lodash2['default'].startsWith(app, "\\")) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(copyFromWindowsNetworkShare(app, appExt, mountRoot, windowsShareUserName, windowsSharePassword));

      case 7:
        app = context$1$0.sent;

      case 8:
        if (!((app || '').substring(0, 4).toLowerCase() === 'http')) {
          context$1$0.next = 16;
          break;
        }

        _logger2['default'].info('Using downloadable app \'' + app + '\'');
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(downloadApp(app, shouldUnzipApp ? '.zip' : appExt));

      case 12:
        newApp = context$1$0.sent;

        _logger2['default'].info('Downloaded app to \'' + newApp + '\'');
        context$1$0.next = 22;
        break;

      case 16:
        _logger2['default'].info('Using local app \'' + app + '\'');
        newApp = app;

        if (!shouldUnzipApp) {
          context$1$0.next = 22;
          break;
        }

        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(copyLocalZip(app));

      case 21:
        newApp = context$1$0.sent;

      case 22:
        if (!shouldUnzipApp) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(unzipApp(newApp, appExt));

      case 25:
        newApp = context$1$0.sent;

        _logger2['default'].info('Unzipped local app to \'' + newApp + '\'');

      case 27:
        if (!(_path2['default'].extname(newApp) !== appExt)) {
          context$1$0.next = 29;
          break;
        }

        throw new Error('New app path ' + newApp + ' did not have extension ' + appExt);

      case 29:
        return context$1$0.abrupt('return', newApp);

      case 30:
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

function copyFromWindowsNetworkShare(app, appExt, mountRoot, windowsUserName, windowsPassword) {
  return _regeneratorRuntime.async(function copyFromWindowsNetworkShare$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(copyLocallyFromWindowsShare(app, appExt));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(mountWindowsShareOnMac(app, mountRoot, windowsUserName, windowsPassword));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function mountWindowsShareOnMac(app, mountRoot, windowsUserName, windowsPassword) {
  var pathSplit, networkShare, rootFolder, mountPath, mountNetworkShare, umountArgs;
  return _regeneratorRuntime.async(function mountWindowsShareOnMac$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pathSplit = app.split("\\");
        networkShare = pathSplit[2];
        rootFolder = pathSplit[3];

        app = app.replace(/\\/g, "/");
        app = app.replace('/' + networkShare, mountRoot);
        mountPath = '/' + mountRoot + '/' + rootFolder;

        mountNetworkShare = function mountNetworkShare() {
          var mountArgs;
          return _regeneratorRuntime.async(function mountNetworkShare$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.mkdir(mountPath));

              case 2:
                mountArgs = ['-t', 'smbfs', windowsUserName + ':' + windowsPassword + '@' + networkShare + '/' + rootFolder, mountPath];
                context$2$0.prev = 3;
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('mount', mountArgs));

              case 6:
                context$2$0.next = 11;
                break;

              case 8:
                context$2$0.prev = 8;
                context$2$0.t0 = context$2$0['catch'](3);

                _logger2['default'].errorAndThrow('Error mounting: ' + context$2$0.t0.message);

              case 11:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this, [[3, 8]]);
        };

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(mountPath));

      case 9:
        if (!context$1$0.sent) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(app));

      case 12:
        if (!context$1$0.sent) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return', app);

      case 14:
        umountArgs = [mountPath];
        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('umount', umountArgs));

      case 18:
        context$1$0.next = 23;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t0 = context$1$0['catch'](15);

        _logger2['default'].error('Error Unmounting :' + context$1$0.t0.message);

      case 23:
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(mountRoot));

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(mountNetworkShare());

      case 27:
        return context$1$0.abrupt('return', app);

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[15, 20]]);
}

function copyLocallyFromWindowsShare(app, appExt) {
  var fileInfo;
  return _regeneratorRuntime.async(function copyLocallyFromWindowsShare$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.open({ prefix: 'appium-app', suffix: appExt }));

      case 2:
        fileInfo = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.copyFile(app, fileInfo.path));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
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
  getCoordDefault: getCoordDefault, getSwipeTouchDuration: getSwipeTouchDuration, copyFromWindowsNetworkShare: copyFromWindowsNetworkShare };
module.exports = exports['default'];

// immediately shortcircuit if not given an app

// check if we're copying from a windows network share

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory

// don't use request-promise here, we need streams

// now delete any existing zip payload

// in the strict regex, we check for an entry which ends with the
// extension

// otherwise, we allow an entry which contains the extension, but we
// need to be careful, because it might be a false positive
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7OzttQkFDUCxLQUFLOzs7O3NCQUNGLFVBQVU7Ozs7bUJBQ2IsSUFBSTs7Ozt3QkFDTixVQUFVOzs7OzZCQUNrQixnQkFBZ0I7OzRCQUNyQyxjQUFjOztzQkFDaEIsU0FBUzs7Ozt1QkFDUixTQUFTOzs7O0FBRzdCLElBQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUVsQyxTQUFlLFlBQVksQ0FBRSxHQUFHLEVBQUUsTUFBTTtNQUFFLFNBQVMseURBQUMsU0FBUztNQUFFLG9CQUFvQix5REFBQyxFQUFFO01BQUUsb0JBQW9CLHlEQUFDLEVBQUU7TUFNekcsTUFBTSxFQUNOLGNBQWM7Ozs7Y0FOZCxvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksb0JBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzs7Ozs7OztBQUtuQyxjQUFNLEdBQUcsSUFBSTtBQUNiLHNCQUFjLEdBQUcsb0JBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxrQkFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O2FBR3hELG9CQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7Ozs7eUNBQ2IsMkJBQTJCLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUM7OztBQUEzRyxXQUFHOzs7Y0FHRCxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUEsQ0FBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQTs7Ozs7QUFDdEQsNEJBQU8sSUFBSSwrQkFBNEIsR0FBRyxRQUFJLENBQUM7O3lDQUNoQyxXQUFXLENBQUMsR0FBRyxFQUFFLGNBQWMsR0FBRyxNQUFNLEdBQUcsTUFB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QUcsRUFBRTs7OztBQUk3QixTQUFPLG9CQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ3ZDOztBQUVELFNBQVMscUJBQXFCLENBQUUsV0FBVyxFQUFFOzs7QUFHM0MsTUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQUksT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDM0UsWUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN6QyxRQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7OztBQUdsQixjQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ2hCO0dBQ0Y7QUFDRCxTQUFPLFFBQVEsQ0FBQztDQUNqQjs7cUJBR2MsRUFBRSxZQUFZLEVBQVosWUFBWSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsWUFBWSxFQUFaLFlBQVksRUFBRSxZQUFZLEVBQVosWUFBWTtBQUNyRCxVQUFRLEVBQVIsUUFBUSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsY0FBYyxFQUFkLGNBQWMsRUFBRSxpQkFBaUIsRUFBakIsaUJBQWlCO0FBQ3RELGlCQUFlLEVBQWYsZUFBZSxFQUFFLHFCQUFxQixFQUFyQixxQkFBcUIsRUFBRSwyQkFBMkIsRUFBM0IsMkJBQTJCLEVBQUUiLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IF9mcyBmcm9tICdmcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB0ZW1wRGlyLCBzeXN0ZW0sIGZzLCB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgQWRtWmlwIGZyb20gJ2FkbS16aXAnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5cblxuY29uc3QgWklQX0VYVFMgPSBbJy56aXAnLCAnLmlwYSddO1xuXG5hc3luYyBmdW5jdGlvbiBjb25maWd1cmVBcHAgKGFwcCwgYXBwRXh0LCBtb3VudFJvb3Q9XCJWb2x1bWVzXCIsIHdpbmRvd3NTaGFyZVVzZXJOYW1lPVwiXCIsIHdpbmRvd3NTaGFyZVBhc3N3b3JkPVwiXCIpIHtcbiAgaWYgKF8uaXNOdWxsKGFwcCkgfHwgXy5pc1VuZGVmaW5lZChhcHApKSB7XG4gICAgLy8gaW1tZWRpYXRlbHkgc2hvcnRjaXJjdWl0IGlmIG5vdCBnaXZlbiBhbiBhcHBcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgbmV3QXBwID0gbnVsbDtcbiAgbGV0IHNob3VsZFVuemlwQXBwID0gXy5pbmNsdWRlcyhaSVBfRVhUUywgcGF0aC5leHRuYW1lKGFwcCkpO1xuXG4gIC8vIGNoZWNrIGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHdpbmRvd3MgbmV0d29yayBzaGFyZVxuICBpZiAoXy5zdGFydHNXaXRoKGFwcCwgXCJcXFxcXCIpKSB7XG4gICAgYXBwID0gYXdhaXQgY29weUZyb21XaW5kb3dzTmV0d29ya1NoYXJlKGFwcCwgYXBwRXh0LCBtb3VudFJvb3QsIHdpbmRvd3NTaGFyZVVzZXJOYW1lLCB3aW5kb3dzU2hhcmVQYXNzd29yZCk7XG4gIH1cblxuICBpZiAoKGFwcCB8fCAnJykuc3Vic3RyaW5nKDAsIDQpLnRvTG93ZXJDYXNlKCkgPT09ICdodHRwJykge1xuICAgIGxvZ2dlci5pbmZvKGBVc2luZyBkb3dubG9hZGFibGUgYXBwICcke2FwcH0nYCk7XG4gICAgbmV3QXBwID0gYXdhaXQgZG93bmxvYWRBcHAoYXBwLCBzaG91bGRVbnppcEFwcCA/ICcuemlwJyA6IGFwcEV4dCk7XG4gICAgbG9nZ2VyLmluZm8oYERvd25sb2FkZWQgYXBwIHRvICcke25ld0FwcH0nYCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmluZm8oYFVzaW5nIGxvY2FsIGFwcCAnJHthcHB9J2ApO1xuICAgIG5ld0FwcCA9IGFwcDtcbiAgICBpZiAoc2hvdWxkVW56aXBBcHApIHtcbiAgICAgIG5ld0FwcCA9IGF3YWl0IGNvcHlMb2NhbFppcChhcHApO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKHNob3VsZFVuemlwQXBwKSB7XG4gICAgbmV3QXBwID0gYXdhaXQgdW56aXBBcHAobmV3QXBwLCBhcHBFeHQpO1xuICAgIGxvZ2dlci5pbmZvKGBVbnppcHBlZCBsb2NhbCBhcHAgdG8gJyR7bmV3QXBwfSdgKTtcbiAgfVxuXG4gIGlmIChwYXRoLmV4dG5hbWUobmV3QXBwKSAhPT0gYXBwRXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOZXcgYXBwIHBhdGggJHtuZXdBcHB9IGRpZCBub3QgaGF2ZSBleHRlbnNpb24gJHthcHBFeHR9YCk7XG4gIH1cblxuICByZXR1cm4gbmV3QXBwO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb3dubG9hZEFwcCAoYXBwLCBhcHBFeHQpIHtcbiAgbGV0IGFwcFVybDtcbiAgdHJ5IHtcbiAgICBhcHBVcmwgPSB1cmwucGFyc2UoYXBwKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEFwcCBVUkwgKCR7YXBwfSlgKTtcbiAgfVxuXG4gIGxldCBhcHBQYXRoO1xuICB0cnkge1xuICAgIGFwcFBhdGggPSBhd2FpdCBkb3dubG9hZEZpbGUodXJsLmZvcm1hdChhcHBVcmwpLCBhcHBFeHQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByb2JsZW0gZG93bmxvYWRpbmcgYXBwIGZyb20gdXJsICR7YXBwfTogJHtlcnJ9YCk7XG4gIH1cblxuICByZXR1cm4gYXBwUGF0aDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRGaWxlIChzb3VyY2VVcmwsIHN1ZmZpeCkge1xuICAvLyBXZSB3aWxsIGJlIGRvd25sb2FkaW5nIHRoZSBmaWxlcyB0byBhIGRpcmVjdG9yeSwgc28gbWFrZSBzdXJlIGl0J3MgdGhlcmVcbiAgLy8gVGhpcyBzdGVwIGlzIG5vdCByZXF1aXJlZCBpZiB5b3UgaGF2ZSBtYW51YWxseSBjcmVhdGVkIHRoZSBkaXJlY3RvcnlcbiAgbGV0IHRhcmdldFBhdGggPSBhd2FpdCB0ZW1wRGlyLnBhdGgoe3ByZWZpeDogJ2FwcGl1bS1hcHAnLCBzdWZmaXh9KTtcblxuICAvLyBkb24ndCB1c2UgcmVxdWVzdC1wcm9taXNlIGhlcmUsIHdlIG5lZWQgc3RyZWFtc1xuICBhd2FpdCBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdChzb3VyY2VVcmwpXG4gICAgICAub24oJ2Vycm9yJywgcmVqZWN0KSAvLyBoYW5kbGUgcmVhbCBlcnJvcnMsIGxpa2UgY29ubmVjdGlvbiBlcnJvcnNcbiAgICAgIC5vbigncmVzcG9uc2UnLCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIC8vIGhhbmRsZSByZXNwb25zZXMgdGhhdCBmYWlsLCBsaWtlIDQwNHNcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xuICAgICAgICAgIHJlamVjdChgRXJyb3IgZG93bmxvYWRpbmcgZmlsZTogJHtyZXMuc3RhdHVzQ29kZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5waXBlKF9mcy5jcmVhdGVXcml0ZVN0cmVhbSh0YXJnZXRQYXRoKSlcbiAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAub24oJ2Nsb3NlJywgcmVzb2x2ZSk7XG4gIH0pO1xuICBsb2dnZXIuZGVidWcoYCR7c291cmNlVXJsfSBkb3dubG9hZGVkIHRvICR7dGFyZ2V0UGF0aH1gKTtcbiAgcmV0dXJuIHRhcmdldFBhdGg7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvcHlMb2NhbFppcCAobG9jYWxaaXBQYXRoKSB7XG4gIGxvZ2dlci5kZWJ1ZygnQ29weWluZyBsb2NhbCB6aXAgdG8gdG1wIGRpcicpO1xuICBpZiAoIShhd2FpdCBmcy5leGlzdHMobG9jYWxaaXBQYXRoKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2FsIHppcCBkaWQgbm90IGV4aXN0Jyk7XG4gIH1cbiAgbGV0IGZpbGVJbmZvID0gYXdhaXQgdGVtcERpci5vcGVuKHtwcmVmaXg6ICdhcHBpdW0tYXBwJywgc3VmZml4OiAnLnppcCd9KTtcbiAgbGV0IGluZmlsZSA9IF9mcy5jcmVhdGVSZWFkU3RyZWFtKGxvY2FsWmlwUGF0aCk7XG4gIGxldCBvdXRmaWxlID0gX2ZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGVJbmZvLnBhdGgpO1xuICByZXR1cm4gbmV3IEIoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGluZmlsZS5waXBlKG91dGZpbGUpLm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgIHJlc29sdmUoZmlsZUluZm8ucGF0aCk7XG4gICAgfSkub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1bnppcEFwcCAoemlwUGF0aCwgYXBwRXh0KSB7XG4gIC8vIGZpcnN0IGRlbGV0ZSBhbnkgZXhpc3RpbmcgYXBwcyB0aGF0IG1pZ2h0IGJlIGluIG91ciB0bXAgZGlyXG4gIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoJ2ZpbmQnLCBbcGF0aC5kaXJuYW1lKHppcFBhdGgpLCAnLXR5cGUnLCAnZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1uYW1lJywgYCoke2FwcEV4dH1gXSk7XG4gIGZvciAobGV0IGxpbmUgb2Ygc3Rkb3V0LnRyaW0oKS5zcGxpdCgnXFxuJykuZmlsdGVyKEJvb2xlYW4pKSB7XG4gICAgYXdhaXQgZnMucmltcmFmKGxpbmUpO1xuICB9XG4gIC8vIG5vdyBkZWxldGUgYW55IGV4aXN0aW5nIHppcCBwYXlsb2FkXG4gIGF3YWl0IGZzLnJpbXJhZihwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKHppcFBhdGgpLCAnUGF5bG9hZConKSk7XG4gIGxldCBvdXRwdXQgPSBhd2FpdCB1bnppcEZpbGUoemlwUGF0aCk7XG4gIGxldCByZWxheGVkUmVnU3RyID0gYCg/OmNyZWF0aW5nfGluZmxhdGluZ3xleHRyYWN0aW5nKTogKC4rJHthcHBFeHR9KS8/YDtcbiAgLy8gaW4gdGhlIHN0cmljdCByZWdleCwgd2UgY2hlY2sgZm9yIGFuIGVudHJ5IHdoaWNoIGVuZHMgd2l0aCB0aGVcbiAgLy8gZXh0ZW5zaW9uXG4gIGxldCBzdHJpY3RSZWcgPSBuZXcgUmVnRXhwKGAke3JlbGF4ZWRSZWdTdHJ9JGAsICdtJyk7XG4gIC8vIG90aGVyd2lzZSwgd2UgYWxsb3cgYW4gZW50cnkgd2hpY2ggY29udGFpbnMgdGhlIGV4dGVuc2lvbiwgYnV0IHdlXG4gIC8vIG5lZWQgdG8gYmUgY2FyZWZ1bCwgYmVjYXVzZSBpdCBtaWdodCBiZSBhIGZhbHNlIHBvc2l0aXZlXG4gIGxldCByZWxheGVkUmVnID0gbmV3IFJlZ0V4cChyZWxheGVkUmVnU3RyLCAnbScpO1xuICBsZXQgc3RyaWN0TWF0Y2ggPSBzdHJpY3RSZWcuZXhlYyhvdXRwdXQpO1xuICBsZXQgcmVsYXhlZE1hdGNoID0gcmVsYXhlZFJlZy5leGVjKG91dHB1dCk7XG4gIGxldCBnZXRBcHBQYXRoID0gZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoemlwUGF0aCksIG1hdGNoWzFdKTtcbiAgfTtcblxuICBpZiAoc3RyaWN0TWF0Y2gpIHtcbiAgICByZXR1cm4gZ2V0QXBwUGF0aChzdHJpY3RNYXRjaCk7XG4gIH1cblxuICBpZiAocmVsYXhlZE1hdGNoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdHb3QgYSByZWxheGVkIG1hdGNoIGZvciBhcHAgaW4gemlwLCBiZSBjYXJlZnVsIGZvciBhcHAgbWF0Y2ggZXJyb3JzJyk7XG4gICAgcmV0dXJuIGdldEFwcFBhdGgocmVsYXhlZE1hdGNoKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgQXBwIHppcCB1bnppcHBlZCBPSywgYnV0IHdlIGNvdWxkIG5vdCBmaW5kIGEgJHthcHBFeHR9IGJ1bmRsZSBgICtcbiAgICAgICAgICAgICAgICAgIGBpbiBpdC4gTWFrZSBzdXJlIHlvdXIgYXJjaGl2ZSBjb250YWlucyB0aGUgJHthcHBFeHR9IHBhY2thZ2UgYCArXG4gICAgICAgICAgICAgICAgICBgYW5kIG5vdGhpbmcgZWxzZWApO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1bnppcEZpbGUgKHppcFBhdGgpIHtcbiAgbG9nZ2VyLmRlYnVnKGBVbnppcHBpbmcgJHt6aXBQYXRofWApO1xuICBsZXQgdmFsaWQgPSBhd2FpdCB0ZXN0WmlwQXJjaGl2ZSh6aXBQYXRoKTtcbiAgaWYgKCF2YWxpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgWmlwIGFyY2hpdmUgJHt6aXBQYXRofSBkaWQgbm90IHRlc3QgdmFsaWRgKTtcbiAgfVxuXG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcbiAgICBsZXQgemlwID0gbmV3IEFkbVppcCh6aXBQYXRoKTtcbiAgICB6aXAuZXh0cmFjdEFsbFRvKHBhdGguZGlybmFtZSh6aXBQYXRoKSwgdHJ1ZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdVbnppcCBzdWNjZXNzZnVsJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGV4ZWNFbnYgPSBfLmNsb25lKHByb2Nlc3MuZW52KTtcbiAgZGVsZXRlIGV4ZWNFbnYuVU5aSVA7XG4gIGxldCBleGVjT3B0cyA9IHtjd2Q6IHBhdGguZGlybmFtZSh6aXBQYXRoKSwgZW52OiBleGVjRW52fTtcbiAgdHJ5IHtcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKCd1bnppcCcsIFsnLW8nLCB6aXBQYXRoXSwgZXhlY09wdHMpO1xuICAgIHJldHVybiBzdGRvdXQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihgVW56aXAgdGhyZXcgZXJyb3IgJHtlcnJ9YCk7XG4gICAgbG9nZ2VyLmVycm9yKGBTdGRlcnI6ICR7ZXJyLnN0ZGVycn1gKTtcbiAgICBsb2dnZXIuZXJyb3IoYFN0ZG91dDogJHtlcnIuc3Rkb3V0fWApO1xuICAgIHRocm93IG5ldyBFcnJvcignQXJjaGl2ZSBjb3VsZCBub3QgYmUgdW56aXBwZWQsIGNoZWNrIGFwcGl1bSBsb2dzLicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RaaXBBcmNoaXZlICh6aXBQYXRoKSB7XG4gIGxvZ2dlci5kZWJ1ZyhgVGVzdGluZyB6aXAgYXJjaGl2ZTogJHt6aXBQYXRofWApO1xuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyh6aXBQYXRoKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKCdaaXAgYXJjaGl2ZSB0ZXN0ZWQgY2xlYW4nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ1ppcCBhcmNoaXZlIG5vdCBmb3VuZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGxldCBleGVjRW52ID0gXy5jbG9uZShwcm9jZXNzLmVudik7XG4gIGRlbGV0ZSBleGVjRW52LlVOWklQO1xuICBsZXQgZXhlY09wdHMgPSB7Y3dkOiBwYXRoLmRpcm5hbWUoemlwUGF0aCksIGVudjogZXhlY0Vudn07XG4gIGxldCBvdXRwdXQ7XG4gIHRyeSB7XG4gICAgb3V0cHV0ID0gYXdhaXQgZXhlYygndW56aXAnLCBbJy10cScsIHppcFBhdGhdLCBleGVjT3B0cyk7XG4gICAgaWYgKC9ObyBlcnJvcnMgZGV0ZWN0ZWQvLmV4ZWMob3V0cHV0LnN0ZG91dCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsb2dnZXIuZXJyb3IoYFppcCBmaWxlICR7emlwUGF0aH0gd2FzIG5vdCB2YWxpZGApO1xuICAgIGxvZ2dlci5lcnJvcihgU3RkZXJyOiAke291dHB1dC5zdGRlcnJ9YCk7XG4gICAgbG9nZ2VyLmVycm9yKGBTdGRvdXQ6ICR7b3V0cHV0LnN0ZG91dH1gKTtcbiAgICBsb2dnZXIuZXJyb3IoJ1ppcCBhcmNoaXZlIGRpZCBub3QgdGVzdCBzdWNjZXNzZnVsbHksIGNoZWNrIGFwcGl1bSBzZXJ2ZXIgJyArXG4gICAgICAgICAgICAgICAgICdsb2dzIGZvciBvdXRwdXQnKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihgVGVzdCB6aXAgYXJjaGl2ZSB0aHJldyBlcnJvciAke2Vycn1gKTtcbiAgICBsb2dnZXIuZXJyb3IoYFN0ZGVycjogJHtlcnIuc3RkZXJyfWApO1xuICAgIGxvZ2dlci5lcnJvcihgU3Rkb3V0OiAke2Vyci5zdGRvdXR9YCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciB0ZXN0aW5nIHppcCBhcmNoaXZlLCBhcmUgeW91IHN1cmUgdGhpcyBpcyBhIHppcCBmaWxlPycpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvcHlGcm9tV2luZG93c05ldHdvcmtTaGFyZSAoYXBwLCBhcHBFeHQsIG1vdW50Um9vdCwgd2luZG93c1VzZXJOYW1lLCB3aW5kb3dzUGFzc3dvcmQpIHtcbiAgaWYgKHN5c3RlbS5pc1dpbmRvd3MoKSkge1xuICAgIHJldHVybiBhd2FpdCBjb3B5TG9jYWxseUZyb21XaW5kb3dzU2hhcmUoYXBwLCBhcHBFeHQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhd2FpdCBtb3VudFdpbmRvd3NTaGFyZU9uTWFjKGFwcCwgbW91bnRSb290LCB3aW5kb3dzVXNlck5hbWUsIHdpbmRvd3NQYXNzd29yZCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbW91bnRXaW5kb3dzU2hhcmVPbk1hYyAoYXBwLCBtb3VudFJvb3QsIHdpbmRvd3NVc2VyTmFtZSwgd2luZG93c1Bhc3N3b3JkKSB7XG4gIGxldCBwYXRoU3BsaXQgPSBhcHAuc3BsaXQoXCJcXFxcXCIpO1xuICBsZXQgbmV0d29ya1NoYXJlID0gcGF0aFNwbGl0WzJdO1xuICBsZXQgcm9vdEZvbGRlciA9IHBhdGhTcGxpdFszXTtcbiAgYXBwID0gYXBwLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xuICBhcHAgPSBhcHAucmVwbGFjZShgLyR7bmV0d29ya1NoYXJlfWAsIG1vdW50Um9vdCk7XG4gIGxldCBtb3VudFBhdGggPSBgLyR7bW91bnRSb290fS8ke3Jvb3RGb2xkZXJ9YDtcblxuICBsZXQgbW91bnROZXR3b3JrU2hhcmUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZnMubWtkaXIobW91bnRQYXRoKTtcbiAgICBsZXQgbW91bnRBcmdzID0gW2AtdGAsIGBzbWJmc2AsIGAke3dpbmRvd3NVc2VyTmFtZX06JHt3aW5kb3dzUGFzc3dvcmR9QCR7bmV0d29ya1NoYXJlfS8ke3Jvb3RGb2xkZXJ9YCwgbW91bnRQYXRoXTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZXhlYygnbW91bnQnLCBtb3VudEFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coYEVycm9yIG1vdW50aW5nOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH1cbiAgfTtcblxuICBpZiAoYXdhaXQgZnMuZXhpc3RzKG1vdW50UGF0aCkpIHtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGFwcCkpIHtcbiAgICAgIHJldHVybiBhcHA7XG4gICAgfSBcbiAgICBsZXQgdW1vdW50QXJncyA9IFttb3VudFBhdGhdO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBleGVjKCd1bW91bnQnLCB1bW91bnRBcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgRXJyb3IgVW5tb3VudGluZyA6JHtlcnIubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgYXdhaXQgZnMucmltcmFmKG1vdW50Um9vdCk7XG4gIH0gXG4gIGF3YWl0IG1vdW50TmV0d29ya1NoYXJlKCk7XG4gIHJldHVybiBhcHA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvcHlMb2NhbGx5RnJvbVdpbmRvd3NTaGFyZSAoYXBwLCBhcHBFeHQpIHtcbiAgbGV0IGZpbGVJbmZvID0gYXdhaXQgdGVtcERpci5vcGVuKHtwcmVmaXg6ICdhcHBpdW0tYXBwJywgc3VmZml4OiBhcHBFeHR9KTtcbiAgcmV0dXJuIGF3YWl0IGZzLmNvcHlGaWxlKGFwcCwgZmlsZUluZm8ucGF0aCk7XHRcbn1cblxuZnVuY3Rpb24gaXNQYWNrYWdlT3JCdW5kbGUgKGFwcCkge1xuICByZXR1cm4gKC9eKFthLXpBLVowLTlcXC1fXStcXC5bYS16QS1aMC05XFwtX10rKSskLykudGVzdChhcHApO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZERlZmF1bHQgKHZhbCkge1xuICAvLyBnb2luZyB0aGUgbG9uZyB3YXkgYW5kIGNoZWNraW5nIGZvciB1bmRlZmluZWQgYW5kIG51bGwgc2luY2VcbiAgLy8gd2UgY2FuJ3QgYmUgYXNzdXJlZCBgZWxJZGAgaXMgYSBzdHJpbmcgYW5kIG5vdCBhbiBpbnQuIFNhbWVcbiAgLy8gdGhpbmcgd2l0aCBkZXN0RWxlbWVudCBiZWxvdy5cbiAgcmV0dXJuIHV0aWwuaGFzVmFsdWUodmFsKSA/IHZhbCA6IDAuNTtcbn1cblxuZnVuY3Rpb24gZ2V0U3dpcGVUb3VjaER1cmF0aW9uICh3YWl0R2VzdHVyZSkge1xuICAvLyB0aGUgdG91Y2ggYWN0aW9uIGFwaSB1c2VzIG1zLCB3ZSB3YW50IHNlY29uZHNcbiAgLy8gMC44IGlzIHRoZSBkZWZhdWx0IHRpbWUgZm9yIHRoZSBvcGVyYXRpb25cbiAgbGV0IGR1cmF0aW9uID0gMC44O1xuICBpZiAodHlwZW9mIHdhaXRHZXN0dXJlLm9wdGlvbnMubXMgIT09ICd1bmRlZmluZWQnICYmIHdhaXRHZXN0dXJlLm9wdGlvbnMubXMpIHtcbiAgICBkdXJhdGlvbiA9IHdhaXRHZXN0dXJlLm9wdGlvbnMubXMgLyAxMDAwO1xuICAgIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgICAgLy8gc2V0IHRvIGEgdmVyeSBsb3cgbnVtYmVyLCBzaW5jZSB0aGV5IHdhbnRlZCBpdCBmYXN0XG4gICAgICAvLyBidXQgYmVsb3cgMC4xIGJlY29tZXMgMCBzdGVwcywgd2hpY2ggY2F1c2VzIGVycm9yc1xuICAgICAgZHVyYXRpb24gPSAwLjE7XG4gICAgfVxuICB9XG4gIHJldHVybiBkdXJhdGlvbjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7IGNvbmZpZ3VyZUFwcCwgZG93bmxvYWRBcHAsIGRvd25sb2FkRmlsZSwgY29weUxvY2FsWmlwLFxuICAgICAgICAgICAgICAgICB1bnppcEFwcCwgdW56aXBGaWxlLCB0ZXN0WmlwQXJjaGl2ZSwgaXNQYWNrYWdlT3JCdW5kbGUsXG4gICAgICAgICAgICAgICAgIGdldENvb3JkRGVmYXVsdCwgZ2V0U3dpcGVUb3VjaER1cmF0aW9uLCBjb3B5RnJvbVdpbmRvd3NOZXR3b3JrU2hhcmUgfTtcbiJdfQ==