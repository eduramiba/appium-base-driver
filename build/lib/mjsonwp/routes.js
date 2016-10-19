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
  '/wd/hub/session/:sessionId/rotation': {
    GET: { command: 'getRotation' },
    POST: { command: 'setRotation', payloadParams: { required: ['x', 'y', 'z'] } }
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
  '/wd/hub/session/:sessionId/appium/device/finger_print': {
    POST: { command: 'fingerprint', payloadParams: { required: ['fingerprintId'] } }
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
  },
  // https://w3c.github.io/webdriver/webdriver-spec.html#get-element-rect
  '/wd/hub/session/:sessionId/element/:elementId/rect': {
    GET: { command: 'getElementRect' }
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
//# sourceMappingURL=data:application/json;base64,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LElBQU0sc0JBQXNCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDOztRQUVwRSxVQUFVLEdBQVYsVUFBVTtRQUFFLFlBQVksR0FBWixZQUFZO1FBQUUsc0JBQXNCLEdBQXRCLHNCQUFzQiIsImZpbGUiOiJsaWIvbWpzb253cC9yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbi8vIGRlZmluZSB0aGUgcm91dGVzLCBtYXBwaW5nIG9mIEhUVFAgbWV0aG9kcyB0byBwYXJ0aWN1bGFyIGRyaXZlciBjb21tYW5kcyxcbi8vIGFuZCBhbnkgcGFyYW1ldGVycyB0aGF0IGFyZSBleHBlY3RlZCBpbiBhIHJlcXVlc3Rcbi8vIHBhcmFtZXRlcnMgY2FuIGJlIGByZXF1aXJlZGAgb3IgYG9wdGlvbmFsYFxuY29uc3QgTUVUSE9EX01BUCA9IHtcbiAgJy93ZC9odWIvc3RhdHVzJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRTdGF0dXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY3JlYXRlU2Vzc2lvbicsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydkZXNpcmVkQ2FwYWJpbGl0aWVzJ10sIG9wdGlvbmFsOiBbJ3JlcXVpcmVkQ2FwYWJpbGl0aWVzJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9ucyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0U2Vzc2lvbnMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFNlc3Npb24nfSxcbiAgICBERUxFVEU6IHtjb21tYW5kOiAnZGVsZXRlU2Vzc2lvbid9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90aW1lb3V0cyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RpbWVvdXRzJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3R5cGUnLCAnbXMnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90aW1lb3V0cy9hc3luY19zY3JpcHQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdhc3luY1NjcmlwdFRpbWVvdXQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnbXMnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90aW1lb3V0cy9pbXBsaWNpdF93YWl0Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaW1wbGljaXRXYWl0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ21zJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvd2luZG93X2hhbmRsZSc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0V2luZG93SGFuZGxlJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3dpbmRvd19oYW5kbGVzJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRXaW5kb3dIYW5kbGVzJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3VybCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0VXJsJ30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRVcmwnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndXJsJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZm9yd2FyZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2ZvcndhcmQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYmFjayc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2JhY2snfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvcmVmcmVzaCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3JlZnJlc2gnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZXhlY3V0ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2V4ZWN1dGUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnc2NyaXB0JywgJ2FyZ3MnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9leGVjdXRlX2FzeW5jJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZXhlY3V0ZUFzeW5jJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3NjcmlwdCcsICdhcmdzJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvc2NyZWVuc2hvdCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0U2NyZWVuc2hvdCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9pbWUvYXZhaWxhYmxlX2VuZ2luZXMnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2F2YWlsYWJsZUlNRUVuZ2luZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvaW1lL2FjdGl2ZV9lbmdpbmUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEFjdGl2ZUlNRUVuZ2luZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9pbWUvYWN0aXZhdGVkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdpc0lNRUFjdGl2YXRlZCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9pbWUvZGVhY3RpdmF0ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2RlYWN0aXZhdGVJTUVFbmdpbmUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvaW1lL2FjdGl2YXRlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnYWN0aXZhdGVJTUVFbmdpbmUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnZW5naW5lJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZnJhbWUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRGcmFtZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydpZCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2ZyYW1lL3BhcmVudCc6IHtcbiAgICBQT1NUOiB7fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvd2luZG93Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0V2luZG93JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ25hbWUnXX19LFxuICAgIERFTEVURToge2NvbW1hbmQ6ICdjbG9zZVdpbmRvdyd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC93aW5kb3cvOndpbmRvd2hhbmRsZS9zaXplJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRXaW5kb3dTaXplJ30sXG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3dpbmRvdy86d2luZG93aGFuZGxlL3Bvc2l0aW9uJzoge1xuICAgIFBPU1Q6IHt9LFxuICAgIEdFVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3dpbmRvdy86d2luZG93aGFuZGxlL21heGltaXplJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnbWF4aW1pemVXaW5kb3cnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvY29va2llJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRDb29raWVzJ30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRDb29raWUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnY29va2llJ119fSxcbiAgICBERUxFVEU6IHtjb21tYW5kOiAnZGVsZXRlQ29va2llcyd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9jb29raWUvOm5hbWUnOiB7XG4gICAgREVMRVRFOiB7Y29tbWFuZDogJ2RlbGV0ZUNvb2tpZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zb3VyY2UnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFBhZ2VTb3VyY2UnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdGl0bGUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ3RpdGxlJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdmaW5kRWxlbWVudCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd1c2luZycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnRzJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZmluZEVsZW1lbnRzJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3VzaW5nJywgJ3ZhbHVlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC9hY3RpdmUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdhY3RpdmUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkJzoge1xuICAgIEdFVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9lbGVtZW50Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZmluZEVsZW1lbnRGcm9tRWxlbWVudCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd1c2luZycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9lbGVtZW50cyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2ZpbmRFbGVtZW50c0Zyb21FbGVtZW50JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3VzaW5nJywgJ3ZhbHVlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2NsaWNrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xpY2snfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3N1Ym1pdCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3N1Ym1pdCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvdGV4dCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0VGV4dCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvdmFsdWUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRWYWx1ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2tleXMnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdrZXlzJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3ZhbHVlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL25hbWUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldE5hbWUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2NsZWFyJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xlYXInfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3NlbGVjdGVkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdlbGVtZW50U2VsZWN0ZWQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2VuYWJsZWQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2VsZW1lbnRFbmFibGVkJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9hdHRyaWJ1dGUvOm5hbWUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEF0dHJpYnV0ZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvZXF1YWxzLzpvdGhlcklkJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdlcXVhbHNFbGVtZW50J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9kaXNwbGF5ZWQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2VsZW1lbnREaXNwbGF5ZWQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2xvY2F0aW9uJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRMb2NhdGlvbid9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9lbGVtZW50LzplbGVtZW50SWQvbG9jYXRpb25faW5fdmlldyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TG9jYXRpb25JblZpZXcnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3NpemUnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFNpemUnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL2Nzcy86cHJvcGVydHlOYW1lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRDc3NQcm9wZXJ0eSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9vcmllbnRhdGlvbic6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0T3JpZW50YXRpb24nfSxcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldE9yaWVudGF0aW9uJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ29yaWVudGF0aW9uJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvcm90YXRpb24nOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldFJvdGF0aW9uJ30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRSb3RhdGlvbicsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd4JywgJ3knLCAneiddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL21vdmV0byc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ21vdmVUbycsIHBheWxvYWRQYXJhbXM6IHtvcHRpb25hbDogWydlbGVtZW50JywgJ3hvZmZzZXQnLCAneW9mZnNldCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2NsaWNrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xpY2tDdXJyZW50JywgcGF5bG9hZFBhcmFtczoge29wdGlvbmFsOiBbJ2J1dHRvbiddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2J1dHRvbmRvd24nOiB7XG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2J1dHRvbnVwJzoge1xuICAgIFBPU1Q6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9kb3VibGVjbGljayc6IHtcbiAgICBQT1NUOiB7fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvY2xpY2snOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdjbGljaycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydlbGVtZW50J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvZG93bic6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoRG93bicsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd4JywgJ3knXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC91cCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoVXAnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsneCcsICd5J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvbW92ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoTW92ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd4JywgJ3knXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9zY3JvbGwnOiB7XG4gICAgUE9TVDoge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3RvdWNoL2RvdWJsZWNsaWNrJzoge1xuICAgIFBPU1Q6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9sb25nY2xpY2snOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICd0b3VjaExvbmdDbGljaycsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydlbGVtZW50cyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL3RvdWNoL2ZsaWNrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnZmxpY2snLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnZWxlbWVudCcsICd4c3BlZWQnLCAneXNwZWVkJywgJ3hvZmZzZXQnLCAneW9mZnNldCcsICdzcGVlZCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvY2F0aW9uJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRHZW9Mb2NhdGlvbid9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0R2VvTG9jYXRpb24nLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnbG9jYXRpb24nXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9sb2NhbF9zdG9yYWdlJzoge1xuICAgIEdFVDoge30sXG4gICAgUE9TVDoge30sXG4gICAgREVMRVRFOiB7fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvbG9jYWxfc3RvcmFnZS9rZXkvOmtleSc6IHtcbiAgICBHRVQ6IHt9LFxuICAgIERFTEVURToge31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvY2FsX3N0b3JhZ2Uvc2l6ZSc6IHtcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2UnOiB7XG4gICAgR0VUOiB7fSxcbiAgICBQT1NUOiB7fSxcbiAgICBERUxFVEU6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2Uva2V5LzprZXknOiB7XG4gICAgR0VUOiB7fSxcbiAgICBERUxFVEU6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9zZXNzaW9uX3N0b3JhZ2Uvc2l6ZSc6IHtcbiAgICBHRVQ6IHt9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9sb2cnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdnZXRMb2cnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsndHlwZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2xvZy90eXBlcyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TG9nVHlwZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwbGljYXRpb25fY2FjaGUvc3RhdHVzJzoge1xuICAgIEdFVDoge31cbiAgfSxcblxuICAvL1xuICAvLyBtanNvbndpcmVcbiAgLy9cbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2NvbnRleHQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEN1cnJlbnRDb250ZXh0J30sXG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRDb250ZXh0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ25hbWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9jb250ZXh0cyc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0Q29udGV4dHMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZWxlbWVudC86ZWxlbWVudElkL3BhZ2VJbmRleCc6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0UGFnZUluZGV4J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL25ldHdvcmtfY29ubmVjdGlvbic6IHtcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0TmV0d29ya0Nvbm5lY3Rpb24nfSxcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldE5ldHdvcmtDb25uZWN0aW9uJywgcGF5bG9hZFBhcmFtczoge3Vud3JhcDogJ3BhcmFtZXRlcnMnLCByZXF1aXJlZDogWyd0eXBlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvdG91Y2gvcGVyZm9ybSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3BlcmZvcm1Ub3VjaCcsIHBheWxvYWRQYXJhbXM6IHt3cmFwOiAnYWN0aW9ucycsIHJlcXVpcmVkOiBbJ2FjdGlvbnMnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC90b3VjaC9tdWx0aS9wZXJmb3JtJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncGVyZm9ybU11bHRpQWN0aW9uJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2FjdGlvbnMnXSwgb3B0aW9uYWw6IFsnZWxlbWVudElkJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvcmVjZWl2ZV9hc3luY19yZXNwb25zZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3JlY2VpdmVBc3luY1Jlc3BvbnNlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3N0YXR1cycsICd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2Uvc2hha2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdtb2JpbGVTaGFrZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3N5c3RlbV90aW1lJzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXREZXZpY2VUaW1lJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvbG9jayc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2xvY2snLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnc2Vjb25kcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvdW5sb2NrJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndW5sb2NrJ31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvaXNfbG9ja2VkJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaXNMb2NrZWQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9wcmVzc19rZXljb2RlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncHJlc3NLZXlDb2RlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9sb25nX3ByZXNzX2tleWNvZGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdsb25nUHJlc3NLZXlDb2RlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9maW5nZXJfcHJpbnQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdmaW5nZXJwcmludCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydmaW5nZXJwcmludElkJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9rZXlldmVudCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2tleWV2ZW50JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2tleWNvZGUnXSwgb3B0aW9uYWw6IFsnbWV0YXN0YXRlJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9yb3RhdGUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdtb2JpbGVSb3RhdGlvbicsIHBheWxvYWRQYXJhbXM6IHtcbiAgICAgIHJlcXVpcmVkOiBbJ3gnLCAneScsICdyYWRpdXMnLCAncm90YXRpb24nLCAndG91Y2hDb3VudCcsICdkdXJhdGlvbiddLFxuICAgICAgb3B0aW9uYWw6IFsnZWxlbWVudCddIH19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL2N1cnJlbnRfYWN0aXZpdHknOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEN1cnJlbnRBY3Rpdml0eSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL2luc3RhbGxfYXBwJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaW5zdGFsbEFwcCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydhcHBQYXRoJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncmVtb3ZlQXBwJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbWydhcHBJZCddLCBbJ2J1bmRsZUlkJ11dfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvYXBwX2luc3RhbGxlZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2lzQXBwSW5zdGFsbGVkJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ2J1bmRsZUlkJ119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9oaWRlX2tleWJvYXJkJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnaGlkZUtleWJvYXJkJywgcGF5bG9hZFBhcmFtczoge29wdGlvbmFsOiBbJ3N0cmF0ZWd5JywgJ2tleScsICdrZXlDb2RlJywgJ2tleU5hbWUnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3B1c2hfZmlsZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3B1c2hGaWxlJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3BhdGgnLCAnZGF0YSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvcHVsbF9maWxlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncHVsbEZpbGUnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsncGF0aCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9kZXZpY2UvcHVsbF9mb2xkZXInOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwdWxsRm9sZGVyJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3BhdGgnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9haXJwbGFuZV9tb2RlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlRmxpZ2h0TW9kZSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9kYXRhJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlRGF0YSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV93aWZpJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAndG9nZ2xlV2lGaSd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3RvZ2dsZV9sb2NhdGlvbl9zZXJ2aWNlcyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvZ2dsZUxvY2F0aW9uU2VydmljZXMnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2RldmljZS9vcGVuX25vdGlmaWNhdGlvbnMnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdvcGVuTm90aWZpY2F0aW9ucyd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vZGV2aWNlL3N0YXJ0X2FjdGl2aXR5Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnc3RhcnRBY3Rpdml0eScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydhcHBQYWNrYWdlJywgJ2FwcEFjdGl2aXR5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbJ2FwcFdhaXRQYWNrYWdlJywgJ2FwcFdhaXRBY3Rpdml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVudEFjdGlvbicsICdpbnRlbnRDYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVudEZsYWdzJywgJ29wdGlvbmFsSW50ZW50QXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZG9udFN0b3BBcHBPblJlc2V0J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL3NpbXVsYXRvci90b3VjaF9pZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3RvdWNoSWQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnbWF0Y2gnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vYXBwL2xhdW5jaCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2xhdW5jaEFwcCd9XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hcHBpdW0vYXBwL2Nsb3NlJzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAnY2xvc2VBcHAnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL2FwcC9yZXNldCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3Jlc2V0J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvYmFja2dyb3VuZCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2JhY2tncm91bmQnLCBwYXlsb2FkUGFyYW1zOiB7cmVxdWlyZWQ6IFsnc2Vjb25kcyddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvZW5kX3Rlc3RfY292ZXJhZ2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdlbmRDb3ZlcmFnZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydpbnRlbnQnLCAncGF0aCddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9hcHAvc3RyaW5ncyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ2dldFN0cmluZ3MnLCBwYXlsb2FkUGFyYW1zOiB7b3B0aW9uYWw6IFsnbGFuZ3VhZ2UnLCAnc3RyaW5nRmlsZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9lbGVtZW50LzplbGVtZW50SWQvdmFsdWUnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdzZXRWYWx1ZUltbWVkaWF0ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9lbGVtZW50LzplbGVtZW50SWQvcmVwbGFjZV92YWx1ZSc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3JlcGxhY2VWYWx1ZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd2YWx1ZSddfX1cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FwcGl1bS9zZXR0aW5ncyc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3VwZGF0ZVNldHRpbmdzJywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3NldHRpbmdzJ119fSxcbiAgICBHRVQ6IHtjb21tYW5kOiAnZ2V0U2V0dGluZ3MnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYXBwaXVtL3JlY2VpdmVfYXN5bmNfcmVzcG9uc2UnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdyZWNlaXZlQXN5bmNSZXNwb25zZScsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWydyZXNwb25zZSddfX1cbiAgfSxcblxuXG4gIC8qXG4gICAqIFRoZSBXM0Mgc3BlYyBoYXMgc29tZSBjaGFuZ2VzIHRvIHRoZSB3aXJlIHByb3RvY29sLlxuICAgKiBodHRwczovL3czYy5naXRodWIuaW8vd2ViZHJpdmVyL3dlYmRyaXZlci1zcGVjLmh0bWxcbiAgICogQmVnaW4gdG8gYWRkIHRob3NlIGNoYW5nZXMgaGVyZSwga2VlcGluZyB0aGUgb2xkIHZlcnNpb25cbiAgICogc2luY2UgY2xpZW50cyBzdGlsbCBpbXBsZW1lbnQgdGhlbS5cbiAgICovXG4gIC8vIG9sZCBhbGVydHNcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FsZXJ0X3RleHQnOiB7XG4gICAgR0VUOiB7Y29tbWFuZDogJ2dldEFsZXJ0VGV4dCd9LFxuICAgIFBPU1Q6IHtjb21tYW5kOiAnc2V0QWxlcnRUZXh0JywgcGF5bG9hZFBhcmFtczoge3JlcXVpcmVkOiBbJ3RleHQnXX19XG4gIH0sXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hY2NlcHRfYWxlcnQnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwb3N0QWNjZXB0QWxlcnQnfVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvZGlzbWlzc19hbGVydCc6IHtcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3Bvc3REaXNtaXNzQWxlcnQnfVxuICB9LFxuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2ViZHJpdmVyL3dlYmRyaXZlci1zcGVjLmh0bWwjdXNlci1wcm9tcHRzXG4gICcvd2QvaHViL3Nlc3Npb24vOnNlc3Npb25JZC9hbGVydC90ZXh0Jzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRBbGVydFRleHQnfSxcbiAgICBQT1NUOiB7Y29tbWFuZDogJ3NldEFsZXJ0VGV4dCcsIHBheWxvYWRQYXJhbXM6IHtyZXF1aXJlZDogWyd0ZXh0J119fVxuICB9LFxuICAnL3dkL2h1Yi9zZXNzaW9uLzpzZXNzaW9uSWQvYWxlcnQvYWNjZXB0Jzoge1xuICAgIFBPU1Q6IHtjb21tYW5kOiAncG9zdEFjY2VwdEFsZXJ0J31cbiAgfSxcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2FsZXJ0L2Rpc21pc3MnOiB7XG4gICAgUE9TVDoge2NvbW1hbmQ6ICdwb3N0RGlzbWlzc0FsZXJ0J31cbiAgfSxcbiAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmRyaXZlci93ZWJkcml2ZXItc3BlYy5odG1sI2dldC1lbGVtZW50LXJlY3RcbiAgJy93ZC9odWIvc2Vzc2lvbi86c2Vzc2lvbklkL2VsZW1lbnQvOmVsZW1lbnRJZC9yZWN0Jzoge1xuICAgIEdFVDoge2NvbW1hbmQ6ICdnZXRFbGVtZW50UmVjdCd9XG4gIH0sXG59O1xuXG4vLyBkcml2ZXIgY29tbWFuZCBuYW1lc1xubGV0IEFMTF9DT01NQU5EUyA9IFtdO1xuZm9yIChsZXQgdiBvZiBfLnZhbHVlcyhNRVRIT0RfTUFQKSkge1xuICBmb3IgKGxldCBtIG9mIF8udmFsdWVzKHYpKSB7XG4gICAgaWYgKG0uY29tbWFuZCkge1xuICAgICAgQUxMX0NPTU1BTkRTLnB1c2gobS5jb21tYW5kKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gZHJpdmVyIGNvbW1hbmRzIHRoYXQgZG8gbm90IHJlcXVpcmUgYSBzZXNzaW9uIHRvIGFscmVhZHkgZXhpc3RcbmNvbnN0IE5PX1NFU1NJT05fSURfQ09NTUFORFMgPSBbJ2NyZWF0ZVNlc3Npb24nLCAnZ2V0U3RhdHVzJywgJ2dldFNlc3Npb25zJ107XG5cbmV4cG9ydCB7IE1FVEhPRF9NQVAsIEFMTF9DT01NQU5EUywgTk9fU0VTU0lPTl9JRF9DT01NQU5EUyB9O1xuIl19