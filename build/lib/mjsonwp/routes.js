'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// define the routes, mapping of HTTP methods to particular driver commands,
// and any parameters that are expected in a request
// parameters can be `required` or `optional`
var METHOD_MAP = {
  '/wd/hub/status': {
    GET: { command: 'getStatus' }
  },
  '/wd/hub/session': {
    POST: { command: 'createSession', payloadParams: { required: ['desiredCapabilities'], optional: ['requiredCapabilities'] } }
  },
  '/wd/hub/sessions': {
    GET: { command: 'getSessions' }
  },
  '/wd/hub/session/:sessionId': {
    GET: { command: 'getSession' },
    DELETE: { command: 'deleteSession' }
  },
  '/wd/hub/session/:sessionId/timeouts': {
    POST: { command: 'timeouts', payloadParams: { required: ['type', 'ms'] } }
  },
  '/wd/hub/session/:sessionId/timeouts/async_script': {
    POST: { command: 'asyncScriptTimeout', payloadParams: { required: ['ms'] } }
  },
  '/wd/hub/session/:sessionId/timeouts/implicit_wait': {
    POST: { command: 'implicitWait', payloadParams: { required: ['ms'] } }
  },
  '/wd/hub/session/:sessionId/window_handle': {
    GET: { command: 'getWindowHandle' }
  },
  '/wd/hub/session/:sessionId/window_handles': {
    GET: { command: 'getWindowHandles' }
  },
  '/wd/hub/session/:sessionId/url': {
    GET: { command: 'getUrl' },
    POST: { command: 'setUrl', payloadParams: { required: ['url'] } }
  },
  '/wd/hub/session/:sessionId/forward': {
    POST: { command: 'forward' }
  },
  '/wd/hub/session/:sessionId/back': {
    POST: { command: 'back' }
  },
  '/wd/hub/session/:sessionId/refresh': {
    POST: { command: 'refresh' }
  },
  '/wd/hub/session/:sessionId/execute': {
    POST: { command: 'execute', payloadParams: { required: ['script', 'args'] } }
  },
  '/wd/hub/session/:sessionId/execute_async': {
    POST: { command: 'executeAsync', payloadParams: { required: ['script', 'args'] } }
  },
  '/wd/hub/session/:sessionId/screenshot': {
    GET: { command: 'getScreenshot' }
  },
  '/wd/hub/session/:sessionId/ime/available_engines': {
    GET: { command: 'availableIMEEngines' }
  },
  '/wd/hub/session/:sessionId/ime/active_engine': {
    GET: { command: 'getActiveIMEEngine' }
  },
  '/wd/hub/session/:sessionId/ime/activated': {
    GET: { command: 'isIMEActivated' }
  },
  '/wd/hub/session/:sessionId/ime/deactivate': {
    POST: { command: 'deactivateIMEEngine' }
  },
  '/wd/hub/session/:sessionId/ime/activate': {
    POST: { command: 'activateIMEEngine', payloadParams: { required: ['engine'] } }
  },
  '/wd/hub/session/:sessionId/frame': {
    POST: { command: 'setFrame', payloadParams: { required: ['id'] } }
  },
  '/wd/hub/session/:sessionId/frame/parent': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/window': {
    POST: { command: 'setWindow', payloadParams: { required: ['name'] } },
    DELETE: { command: 'closeWindow' }
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/size': {
    GET: { command: 'getWindowSize' },
    POST: {}
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/position': {
    POST: {},
    GET: {}
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/maximize': {
    POST: { command: 'maximizeWindow' }
  },
  '/wd/hub/session/:sessionId/cookie': {
    GET: { command: 'getCookies' },
    POST: { command: 'setCookie', payloadParams: { required: ['cookie'] } },
    DELETE: { command: 'deleteCookies' }
  },
  '/wd/hub/session/:sessionId/cookie/:name': {
    DELETE: { command: 'deleteCookie' }
  },
  '/wd/hub/session/:sessionId/source': {
    GET: { command: 'getPageSource' }
  },
  '/wd/hub/session/:sessionId/title': {
    GET: { command: 'title' }
  },
  '/wd/hub/session/:sessionId/element': {
    POST: { command: 'findElement', payloadParams: { required: ['using', 'value'] } }
  },
  '/wd/hub/session/:sessionId/elements': {
    POST: { command: 'findElements', payloadParams: { required: ['using', 'value'] } }
  },
  '/wd/hub/session/:sessionId/element/active': {
    POST: { command: 'active' }
  },
  '/wd/hub/session/:sessionId/element/:elementId': {
    GET: {}
  },
  '/wd/hub/session/:sessionId/element/:elementId/element': {
    POST: { command: 'findElementFromElement', payloadParams: { required: ['using', 'value'] } }
  },
  '/wd/hub/session/:sessionId/element/:elementId/elements': {
    POST: { command: 'findElementsFromElement', payloadParams: { required: ['using', 'value'] } }
  },
  '/wd/hub/session/:sessionId/element/:elementId/click': {
    POST: { command: 'click' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/submit': {
    POST: { command: 'submit' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/text': {
    GET: { command: 'getText' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/value': {
    POST: { command: 'setValue', payloadParams: { required: ['value'] } }
  },
  '/wd/hub/session/:sessionId/keys': {
    POST: { command: 'keys', payloadParams: { required: ['value'] } }
  },
  '/wd/hub/session/:sessionId/element/:elementId/name': {
    GET: { command: 'getName' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/clear': {
    POST: { command: 'clear' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/selected': {
    GET: { command: 'elementSelected' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/enabled': {
    GET: { command: 'elementEnabled' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/attribute/:name': {
    GET: { command: 'getAttribute' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/equals/:otherId': {
    GET: { command: 'equalsElement' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/displayed': {
    GET: { command: 'elementDisplayed' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/location': {
    GET: { command: 'getLocation' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/location_in_view': {
    GET: { command: 'getLocationInView' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/size': {
    GET: { command: 'getSize' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/css/:propertyName': {
    GET: { command: 'getCssProperty' }
  },
  '/wd/hub/session/:sessionId/orientation': {
    GET: { command: 'getOrientation' },
    POST: { command: 'setOrientation', payloadParams: { required: ['orientation'] } }
  },
  '/wd/hub/session/:sessionId/moveto': {
    POST: { command: 'moveTo', payloadParams: { optional: ['element', 'xoffset', 'yoffset'] } }
  },
  '/wd/hub/session/:sessionId/click': {
    POST: { command: 'clickCurrent', payloadParams: { optional: ['button'] } }
  },
  '/wd/hub/session/:sessionId/buttondown': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/buttonup': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/doubleclick': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/touch/click': {
    POST: { command: 'click', payloadParams: { required: ['element'] } }
  },
  '/wd/hub/session/:sessionId/touch/down': {
    POST: { command: 'touchDown', payloadParams: { required: ['x', 'y'] } }
  },
  '/wd/hub/session/:sessionId/touch/up': {
    POST: { command: 'touchUp', payloadParams: { required: ['x', 'y'] } }
  },
  '/wd/hub/session/:sessionId/touch/move': {
    POST: { command: 'touchMove', payloadParams: { required: ['x', 'y'] } }
  },
  '/wd/hub/session/:sessionId/touch/scroll': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/touch/doubleclick': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/touch/longclick': {
    POST: { command: 'touchLongClick', payloadParams: { required: ['elements'] } }
  },
  '/wd/hub/session/:sessionId/touch/flick': {
    POST: { command: 'flick', payloadParams: { optional: ['element', 'xspeed', 'yspeed', 'xoffset', 'yoffset', 'speed'] } }
  },
  '/wd/hub/session/:sessionId/location': {
    GET: { command: 'getGeoLocation' },
    POST: { command: 'setGeoLocation', payloadParams: { required: ['location'] } }
  },
  '/wd/hub/session/:sessionId/local_storage': {
    GET: {},
    POST: {},
    DELETE: {}
  },
  '/wd/hub/session/:sessionId/local_storage/key/:key': {
    GET: {},
    DELETE: {}
  },
  '/wd/hub/session/:sessionId/local_storage/size': {
    GET: {}
  },
  '/wd/hub/session/:sessionId/session_storage': {
    GET: {},
    POST: {},
    DELETE: {}
  },
  '/wd/hub/session/:sessionId/session_storage/key/:key': {
    GET: {},
    DELETE: {}
  },
  '/wd/hub/session/:sessionId/session_storage/size': {
    GET: {}
  },
  '/wd/hub/session/:sessionId/log': {
    POST: { command: 'getLog', payloadParams: { required: ['type'] } }
  },
  '/wd/hub/session/:sessionId/log/types': {
    GET: { command: 'getLogTypes' }
  },
  '/wd/hub/session/:sessionId/application_cache/status': {
    GET: {}
  },

  //
  // mjsonwire
  //
  '/wd/hub/session/:sessionId/context': {
    GET: { command: 'getCurrentContext' },
    POST: { command: 'setContext', payloadParams: { required: ['name'] } }
  },
  '/wd/hub/session/:sessionId/contexts': {
    GET: { command: 'getContexts' }
  },
  '/wd/hub/session/:sessionId/element/:elementId/pageIndex': {
    GET: { command: 'getPageIndex' }
  },
  '/wd/hub/session/:sessionId/network_connection': {
    GET: { command: 'getNetworkConnection' },
    POST: { command: 'setNetworkConnection', payloadParams: { unwrap: 'parameters', required: ['type'] } }
  },
  '/wd/hub/session/:sessionId/touch/perform': {
    POST: { command: 'performTouch', payloadParams: { wrap: 'actions', required: ['actions'] } }
  },
  '/wd/hub/session/:sessionId/touch/multi/perform': {
    POST: { command: 'performMultiAction', payloadParams: { required: ['actions'], optional: ['elementId'] } }
  },
  '/wd/hub/session/:sessionId/receive_async_response': {
    POST: { command: 'receiveAsyncResponse', payloadParams: { required: ['status', 'value'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/shake': {
    POST: { command: 'mobileShake' }
  },
  '/wd/hub/session/:sessionId/appium/device/system_time': {
    GET: { command: 'getDeviceTime' }
  },
  '/wd/hub/session/:sessionId/appium/device/lock': {
    POST: { command: 'lock', payloadParams: { optional: ['seconds'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/unlock': {
    POST: { command: 'unlock' }
  },
  '/wd/hub/session/:sessionId/appium/device/is_locked': {
    POST: { command: 'isLocked' }
  },
  '/wd/hub/session/:sessionId/appium/device/press_keycode': {
    POST: { command: 'pressKeyCode', payloadParams: { required: ['keycode'], optional: ['metastate'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/long_press_keycode': {
    POST: { command: 'longPressKeyCode', payloadParams: { required: ['keycode'], optional: ['metastate'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/keyevent': {
    POST: { command: 'keyevent', payloadParams: { required: ['keycode'], optional: ['metastate'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/rotate': {
    POST: { command: 'mobileRotation', payloadParams: {
        required: ['x', 'y', 'radius', 'rotation', 'touchCount', 'duration'],
        optional: ['element'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/current_activity': {
    GET: { command: 'getCurrentActivity' }
  },
  '/wd/hub/session/:sessionId/appium/device/install_app': {
    POST: { command: 'installApp', payloadParams: { required: ['appPath'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/remove_app': {
    POST: { command: 'removeApp', payloadParams: { required: [['appId'], ['bundleId']] } }
  },
  '/wd/hub/session/:sessionId/appium/device/app_installed': {
    POST: { command: 'isAppInstalled', payloadParams: { required: ['bundleId'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/hide_keyboard': {
    POST: { command: 'hideKeyboard', payloadParams: { optional: ['strategy', 'key', 'keyCode', 'keyName'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/push_file': {
    POST: { command: 'pushFile', payloadParams: { required: ['path', 'data'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/pull_file': {
    POST: { command: 'pullFile', payloadParams: { required: ['path'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/pull_folder': {
    POST: { command: 'pullFolder', payloadParams: { required: ['path'] } }
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_airplane_mode': {
    POST: { command: 'toggleFlightMode' }
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_data': {
    POST: { command: 'toggleData' }
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_wifi': {
    POST: { command: 'toggleWiFi' }
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_location_services': {
    POST: { command: 'toggleLocationServices' }
  },
  '/wd/hub/session/:sessionId/appium/device/open_notifications': {
    POST: { command: 'openNotifications' }
  },
  '/wd/hub/session/:sessionId/appium/device/start_activity': {
    POST: { command: 'startActivity', payloadParams: { required: ['appPackage', 'appActivity'],
        optional: ['appWaitPackage', 'appWaitActivity', 'intentAction', 'intentCategory', 'intentFlags', 'optionalIntentArguments', 'dontStopAppOnReset'] } }
  },
  '/wd/hub/session/:sessionId/appium/simulator/touch_id': {
    POST: { command: 'touchId', payloadParams: { required: ['match'] } }
  },
  '/wd/hub/session/:sessionId/appium/app/launch': {
    POST: { command: 'launchApp' }
  },
  '/wd/hub/session/:sessionId/appium/app/close': {
    POST: { command: 'closeApp' }
  },
  '/wd/hub/session/:sessionId/appium/app/reset': {
    POST: { command: 'reset' }
  },
  '/wd/hub/session/:sessionId/appium/app/background': {
    POST: { command: 'background', payloadParams: { required: ['seconds'] } }
  },
  '/wd/hub/session/:sessionId/appium/app/end_test_coverage': {
    POST: { command: 'endCoverage', payloadParams: { required: ['intent', 'path'] } }
  },
  '/wd/hub/session/:sessionId/appium/app/strings': {
    POST: { command: 'getStrings', payloadParams: { optional: ['language', 'stringFile'] } }
  },
  '/wd/hub/session/:sessionId/appium/element/:elementId/value': {
    POST: { command: 'setValueImmediate', payloadParams: { required: ['value'] } }
  },
  '/wd/hub/session/:sessionId/appium/element/:elementId/replace_value': {
    POST: { command: 'replaceValue', payloadParams: { required: ['value'] } }
  },
  '/wd/hub/session/:sessionId/appium/settings': {
    POST: { command: 'updateSettings', payloadParams: { required: ['settings'] } },
    GET: { command: 'getSettings' }
  },
  '/wd/hub/session/:sessionId/appium/receive_async_response': {
    POST: { command: 'receiveAsyncResponse', payloadParams: { required: ['response'] } }
  },

  /*
   * The W3C spec has some changes to the wire protocol.
   * https://w3c.github.io/webdriver/webdriver-spec.html
   * Begin to add those changes here, keeping the old version
   * since clients still implement them.
   */
  // old alerts
  '/wd/hub/session/:sessionId/alert_text': {
    GET: { command: 'getAlertText' },
    POST: { command: 'setAlertText', payloadParams: { required: ['text'] } }
  },
  '/wd/hub/session/:sessionId/accept_alert': {
    POST: { command: 'postAcceptAlert' }
  },
  '/wd/hub/session/:sessionId/dismiss_alert': {
    POST: { command: 'postDismissAlert' }
  },
  // https://w3c.github.io/webdriver/webdriver-spec.html#user-prompts
  '/wd/hub/session/:sessionId/alert/text': {
    GET: { command: 'getAlertText' },
    POST: { command: 'setAlertText', payloadParams: { required: ['text'] } }
  },
  '/wd/hub/session/:sessionId/alert/accept': {
    POST: { command: 'postAcceptAlert' }
  },
  '/wd/hub/session/:sessionId/alert/dismiss': {
    POST: { command: 'postDismissAlert' }
  }
};

// driver command names
var ALL_COMMANDS = [];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(_lodash2['default'].values(METHOD_MAP)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var v = _step.value;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(_lodash2['default'].values(v)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var m = _step2.value;

        if (m.command) {
          ALL_COMMANDS.push(m.command);
        }
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
  }

  // driver commands that do not require a session to already exist
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

var NO_SESSION_ID_COMMANDS = ['createSession', 'getStatus', 'getSessions'];

exports.METHOD_MAP = METHOD_MAP;
exports.ALL_COMMANDS = ALL_COMMANDS;
exports.NO_SESSION_ID_COMMANDS = NO_SESSION_ID_COMMANDS;
//# sourceMappingURL=data:application/json;base64,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LE9BQU8sRUFBRSxjQUFjLEVBQUM7QUFDOUIsUUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQyxFQUFDO0dBQ3JFO0FBQ0QsMkNBQXlDLEVBQUU7QUFDekMsUUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFDO0dBQ25DO0FBQ0QsNENBQTBDLEVBQUU7QUFDMUMsUUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFDO0dBQ3BDO0NBQ0YsQ0FBQzs7O0FBR0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDdEIsb0NBQWMsb0JBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyw0R0FBRTtRQUEzQixDQUFDOzs7Ozs7QUFDUix5Q0FBYyxvQkFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlIQUFFO1lBQWxCLENBQUM7O0FBQ1IsWUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0FBQ2Isc0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO09BQ0Y7Ozs7Ozs7Ozs7Ozs7OztHQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxJQUFNLHNCQUFzQixHQUFHLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQzs7UUFFcEUsVUFBVSxHQUFWLFVBQVU7UUFBRSxZQUFZLEdBQVosWUFBWTtRQUFFLHNCQUFzQixHQUF0QixzQkFBc0IiLCJmaWxlIjoibGliL21qc29ud3Avcm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG4vLyBkZWZpbmUgdGhlIHJvdXRlcywgbWFwcGluZyBvZiBIVFRQIG1ldGhvZHMgdG8gcGFydGljdWxhciBkcml2ZXIgY29tbWFuZHMsXG4vLyBhbmQgYW55IHBhcmFtZXRlcnMgdGhhdCBhcmUgZXhwZWN0ZWQgaW4gYSByZXF1ZXN0XG4vLyBwYXJhbWV0ZXJzIGNhbiBiZSBgcmVxdWlyZWRgIG9yIGBvcHRpb25hbGBcbmNvbnN0IE1FVEhPRF9NQVAgPSB7XG4gICcvd2QvaHViL3N0YXR1cyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0U3RhdHVzJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbic6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2NyZWF0ZVNlc3Npb24nLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnZGVzaXJlZENhcGFiaWxpdGllcyddLCBvcHRpb25hbDogWydyZXF1aXJlZENhcGFiaWxpdGllcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbnMnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFNlc3Npb25zJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRTZXNzaW9uJ30sXG4gICAgREVMRVRFOiB7Y29tbWFuZDogJ2RlbGV0ZVNlc3Npb24nfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdGltZW91dHMnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICd0aW1lb3V0cycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd0eXBlJywgJ21zJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdGltZW91dHMvYXN5bmNfc2NyaXB0Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnYXN5bmNTY3JpcHRUaW1lb3V0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ21zJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdGltZW91dHMvaW1wbGljaXRfd2FpdCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2ltcGxpY2l0V2FpdCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydtcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3dpbmRvd19oYW5kbGUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFdpbmRvd0hhbmRsZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC93aW5kb3dfaGFuZGxlcyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0V2luZG93SGFuZGxlcyd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC91cmwnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFVybCd9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0VXJsJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3VybCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2ZvcndhcmQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdmb3J3YXJkJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2JhY2snOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdiYWNrJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3JlZnJlc2gnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdyZWZyZXNoJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2V4ZWN1dGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdleGVjdXRlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3NjcmlwdCcsICdhcmdzJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZXhlY3V0ZV9hc3luYyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2V4ZWN1dGVBc3luYycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydzY3JpcHQnLCAnYXJncyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3NjcmVlbnNob3QnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFNjcmVlbnNob3QnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvaW1lL2F2YWlsYWJsZV9lbmdpbmVzJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdhdmFpbGFibGVJTUVFbmdpbmVzJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2ltZS9hY3RpdmVfZW5naW5lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRBY3RpdmVJTUVFbmdpbmUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvaW1lL2FjdGl2YXRlZCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnaXNJTUVBY3RpdmF0ZWQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvaW1lL2RlYWN0aXZhdGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdkZWFjdGl2YXRlSU1FRW5naW5lJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2ltZS9hY3RpdmF0ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2FjdGl2YXRlSU1FRW5naW5lJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2VuZ2luZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2ZyYW1lJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0RnJhbWUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnaWQnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9mcmFtZS9wYXJlbnQnOiB7XG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3dpbmRvdyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldFdpbmRvdycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyduYW1lJ119fSxcbiAgICBERUxFVEU6IHtjb21tYW5kOiAnY2xvc2VXaW5kb3cnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvd2luZG93Lzp3aW5kb3doYW5kbGUvc2l6ZSc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0V2luZG93U2l6ZSd9LFxuICAgIFBPU1Q6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC93aW5kb3cvOndpbmRvd2hhbmRsZS9wb3NpdGlvbic6IHtcbiAgICBQT1NUOiB7fSxcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC93aW5kb3cvOndpbmRvd2hhbmRsZS9tYXhpbWl6ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ21heGltaXplV2luZG93J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2Nvb2tpZSc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0Q29va2llcyd9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0Q29va2llJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2Nvb2tpZSddfX0sXG4gICAgREVMRVRFOiB7Y29tbWFuZDogJ2RlbGV0ZUNvb2tpZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvY29va2llLzpuYW1lJzoge1xuICAgIERFTEVURToge2NvbW1hbmQ6ICdkZWxldGVDb29raWUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvc291cmNlJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRQYWdlU291cmNlJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3RpdGxlJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICd0aXRsZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZmluZEVsZW1lbnQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndXNpbmcnLCAndmFsdWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50cyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2ZpbmRFbGVtZW50cycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd1c2luZycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvYWN0aXZlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnYWN0aXZlJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZCc6IHtcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvZWxlbWVudCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2ZpbmRFbGVtZW50RnJvbUVsZW1lbnQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndXNpbmcnLCAndmFsdWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvZWxlbWVudHMnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdmaW5kRWxlbWVudHNGcm9tRWxlbWVudCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd1c2luZycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9jbGljayc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2NsaWNrJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9zdWJtaXQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzdWJtaXQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3RleHQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFRleHQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3ZhbHVlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0VmFsdWUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndmFsdWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9rZXlzJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAna2V5cycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9uYW1lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXROYW1lJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9jbGVhcic6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2NsZWFyJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9zZWxlY3RlZCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZWxlbWVudFNlbGVjdGVkJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9lbmFibGVkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdlbGVtZW50RW5hYmxlZCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvYXR0cmlidXRlLzpuYW1lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRBdHRyaWJ1dGUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2VxdWFscy86b3RoZXJJZCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZXF1YWxzRWxlbWVudCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvZGlzcGxheWVkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdlbGVtZW50RGlzcGxheWVkJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9sb2NhdGlvbic6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TG9jYXRpb24nfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2xvY2F0aW9uX2luX3ZpZXcnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldExvY2F0aW9uSW5WaWV3J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9zaXplJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRTaXplJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9jc3MvOnByb3BlcnR5TmFtZSc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0Q3NzUHJvcGVydHknfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvb3JpZW50YXRpb24nOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldE9yaWVudGF0aW9uJ30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRPcmllbnRhdGlvbicsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydvcmllbnRhdGlvbiddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL21vdmV0byc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ21vdmVUbycsIHBheWxvYWRQYXJhbXM6IHtvcHRpb25hbDogWydlbGVtZW50JywgJ3hvZmZzZXQnLCAneW9mZnNldCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2NsaWNrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xpY2tDdXJyZW50JywgcGF5bG9hZFBhcmFtczoge29wdGlvbmFsOiBbJ2J1dHRvbiddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2J1dHRvbmRvd24nOiB7XG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2J1dHRvbnVwJzoge1xuICAgIFBPU1Q6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9kb3VibGVjbGljayc6IHtcbiAgICBQT1NUOiB7fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvY2xpY2snOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdjbGljaycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydlbGVtZW50J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvZG93bic6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoRG93bicsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd4JywgJ3knXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC91cCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoVXAnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsneCcsICd5J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvbW92ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoTW92ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd4JywgJ3knXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9zY3JvbGwnOiB7XG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3RvdWNoL2RvdWJsZWNsaWNrJzoge1xuICAgIFBPU1Q6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9sb25nY2xpY2snOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICd0b3VjaExvbmdDbGljaycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydlbGVtZW50cyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3RvdWNoL2ZsaWNrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZmxpY2snLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnZWxlbWVudCcsICd4c3BlZWQnLCAneXNwZWVkJywgJ3hvZmZzZXQnLCAneW9mZnNldCcsICdzcGVlZCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvY2F0aW9uJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRHZW9Mb2NhdGlvbid9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0R2VvTG9jYXRpb24nLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnbG9jYXRpb24nXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9sb2NhbF9zdG9yYWdlJzoge1xuICAgIEdFVDoge30sXG4gICAgUE9TVDoge30sXG4gICAgREVMRVRFOiB7fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvbG9jYWxfc3RvcmFnZS9rZXkvOmtleSc6IHtcbiAgICBHRVQ6IHt9LFxuICAgIERFTEVURToge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvY2FsX3N0b3JhZ2Uvc2l6ZSc6IHtcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2UnOiB7XG4gICAgR0VUOiB7fSxcbiAgICBQT1NUOiB7fSxcbiAgICBERUxFVEU6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2Uva2V5LzprZXknOiB7XG4gICAgR0VUOiB7fSxcbiAgICBERUxFVEU6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2Uvc2l6ZSc6IHtcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9sb2cnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdnZXRMb2cnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndHlwZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvZy90eXBlcyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TG9nVHlwZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwbGljYXRpb25fY2FjaGUvc3RhdHVzJzoge1xuICAgIEdFVDoge31cbiAgfSxcblxuICAvL1xuICAvLyBtanNvbndpcmVcbiAgLy9cbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2NvbnRleHQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEN1cnJlbnRDb250ZXh0J30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRDb250ZXh0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ25hbWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9jb250ZXh0cyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0Q29udGV4dHMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3BhZ2VJbmRleCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0UGFnZUluZGV4J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL25ldHdvcmtfY29ubmVjdGlvbic6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TmV0d29ya0Nvbm5lY3Rpb24nfSxcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldE5ldHdvcmtDb25uZWN0aW9uJywgcGF5bG9hZFBhcmFtczoge3Vud3JhcDogJ3BhcmFtZXRlcnMnLCByZXF1aXJlZDogWyd0eXBlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvcGVyZm9ybSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3BlcmZvcm1Ub3VjaCcsIHBheWxvYWRQYXJhbXM6IHt3cmFwOiAnYWN0aW9ucycsIHJlcXVpcmVkOiBbJ2FjdGlvbnMnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9tdWx0aS9wZXJmb3JtJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncGVyZm9ybU11bHRpQWN0aW9uJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2FjdGlvbnMnXSwgb3B0aW9uYWw6IFsnZWxlbWVudElkJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvcmVjZWl2ZV9hc3luY19yZXNwb25zZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3JlY2VpdmVBc3luY1Jlc3BvbnNlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3N0YXR1cycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2Uvc2hha2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdtb2JpbGVTaGFrZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3N5c3RlbV90aW1lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXREZXZpY2VUaW1lJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvbG9jayc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2xvY2snLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnc2Vjb25kcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvdW5sb2NrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndW5sb2NrJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvaXNfbG9ja2VkJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaXNMb2NrZWQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9wcmVzc19rZXljb2RlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncHJlc3NLZXlDb2RlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9sb25nX3ByZXNzX2tleWNvZGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdsb25nUHJlc3NLZXlDb2RlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9rZXlldmVudCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2tleWV2ZW50JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9yb3RhdGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdtb2JpbGVSb3RhdGlvbicsIHBheWxvYWRQYXJhbXM6IHtcbiAgICAgIHJlcXVpcmVkOiBbJ3gnLCAneScsICdyYWRpdXMnLCAncm90YXRpb24nLCAndG91Y2hDb3VudCcsICdkdXJhdGlvbiddLFxuICAgICAgb3B0aW9uYWw6IFsnZWxlbWVudCddIH19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL2N1cnJlbnRfYWN0aXZpdHknOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEN1cnJlbnRBY3Rpdml0eSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL2luc3RhbGxfYXBwJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaW5zdGFsbEFwcCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydhcHBQYXRoJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncmVtb3ZlQXBwJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbWydhcHBJZCddLCBbJ2J1bmRsZUlkJ11dfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvYXBwX2luc3RhbGxlZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2lzQXBwSW5zdGFsbGVkJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2J1bmRsZUlkJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9oaWRlX2tleWJvYXJkJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaGlkZUtleWJvYXJkJywgcGF5bG9hZFBhcmFtczoge29wdGlvbmFsOiBbJ3N0cmF0ZWd5JywgJ2tleScsICdrZXlDb2RlJywgJ2tleU5hbWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3B1c2hfZmlsZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3B1c2hGaWxlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3BhdGgnLCAnZGF0YSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvcHVsbF9maWxlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncHVsbEZpbGUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsncGF0aCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvcHVsbF9mb2xkZXInOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwdWxsRm9sZGVyJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3BhdGgnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9haXJwbGFuZV9tb2RlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlRmxpZ2h0TW9kZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9kYXRhJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlRGF0YSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV93aWZpJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlV2lGaSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9sb2NhdGlvbl9zZXJ2aWNlcyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvZ2dsZUxvY2F0aW9uU2VydmljZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9vcGVuX25vdGlmaWNhdGlvbnMnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdvcGVuTm90aWZpY2F0aW9ucyd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3N0YXJ0X2FjdGl2aXR5Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnc3RhcnRBY3Rpdml0eScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydhcHBQYWNrYWdlJywgJ2FwcEFjdGl2aXR5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbJ2FwcFdhaXRQYWNrYWdlJywgJ2FwcFdhaXRBY3Rpdml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVudEFjdGlvbicsICdpbnRlbnRDYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVudEZsYWdzJywgJ29wdGlvbmFsSW50ZW50QXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZG9udFN0b3BBcHBPblJlc2V0J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL3NpbXVsYXRvci90b3VjaF9pZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoSWQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnbWF0Y2gnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vYXBwL2xhdW5jaCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2xhdW5jaEFwcCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vYXBwL2Nsb3NlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xvc2VBcHAnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2FwcC9yZXNldCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3Jlc2V0J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvYmFja2dyb3VuZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2JhY2tncm91bmQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnc2Vjb25kcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvZW5kX3Rlc3RfY292ZXJhZ2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdlbmRDb3ZlcmFnZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydpbnRlbnQnLCAncGF0aCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvc3RyaW5ncyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2dldFN0cmluZ3MnLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnbGFuZ3VhZ2UnLCAnc3RyaW5nRmlsZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9lbGVtZW50LzplbGVtZW50SWQvdmFsdWUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRWYWx1ZUltbWVkaWF0ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9lbGVtZW50LzplbGVtZW50SWQvcmVwbGFjZV92YWx1ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3JlcGxhY2VWYWx1ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9zZXR0aW5ncyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3VwZGF0ZVNldHRpbmdzJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3NldHRpbmdzJ119fSxcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0U2V0dGluZ3MnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL3JlY2VpdmVfYXN5bmNfcmVzcG9uc2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdyZWNlaXZlQXN5bmNSZXNwb25zZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydyZXNwb25zZSddfX1cbiAgfSxcblxuXG4gIC8qXG4gICAqIFRoZSBXM0Mgc3BlYyBoYXMgc29tZSBjaGFuZ2VzIHRvIHRoZSB3aXJlIHByb3RvY29sLlxuICAgKiBodHRwczovL3czYy5naXRodWIuaW8vd2ViZHJpdmVyL3dlYmRyaXZlci1zcGVjLmh0bWxcbiAgICogQmVnaW4gdG8gYWRkIHRob3NlIGNoYW5nZXMgaGVyZSwga2VlcGluZyB0aGUgb2xkIHZlcnNpb25cbiAgICogc2luY2UgY2xpZW50cyBzdGlsbCBpbXBsZW1lbnQgdGhlbS5cbiAgICovXG4gIC8vIG9sZCBhbGVydHNcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FsZXJ0X3RleHQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEFsZXJ0VGV4dCd9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0QWxlcnRUZXh0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3RleHQnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hY2NlcHRfYWxlcnQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwb3N0QWNjZXB0QWxlcnQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZGlzbWlzc19hbGVydCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3Bvc3REaXNtaXNzQWxlcnQnfVxuICB9LFxuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2ViZHJpdmVyL3dlYmRyaXZlci1zcGVjLmh0bWwjdXNlci1wcm9tcHRzXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hbGVydC90ZXh0Jzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRBbGVydFRleHQnfSxcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldEFsZXJ0VGV4dCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd0ZXh0J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYWxlcnQvYWNjZXB0Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncG9zdEFjY2VwdEFsZXJ0J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FsZXJ0L2Rpc21pc3MnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwb3N0RGlzbWlzc0FsZXJ0J31cbiAgfSxcbn07XG5cbi8vIGRyaXZlciBjb21tYW5kIG5hbWVzXG5sZXQgQUxMX0NPTU1BTkRTID0gW107XG5mb3IgKGxldCB2IG9mIF8udmFsdWVzKE1FVEhPRF9NQVApKSB7XG4gIGZvciAobGV0IG0gb2YgXy52YWx1ZXModikpIHtcbiAgICBpZiAobS5jb21tYW5kKSB7XG4gICAgICBBTExfQ09NTUFORFMucHVzaChtLmNvbW1hbmQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBkcml2ZXIgY29tbWFuZHMgdGhhdCBkbyBub3QgcmVxdWlyZSBhIHNlc3Npb24gdG8gYWxyZWFkeSBleGlzdFxuY29uc3QgTk9fU0VTU0lPTl9JRF9DT01NQU5EUyA9IFsnY3JlYXRlU2Vzc2lvbicsICdnZXRTdGF0dXMnLCAnZ2V0U2Vzc2lvbnMnXTtcblxuZXhwb3J0IHsgTUVUSE9EX01BUCwgQUxMX0NPTU1BTkRTLCBOT19TRVNTSU9OX0lEX0NPTU1BTkRTIH07XG4iXX0=