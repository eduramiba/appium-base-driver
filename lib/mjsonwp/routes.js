import _ from 'lodash';


// define the routes, mapping of HTTP methods to particular driver commands,
// and any parameters that are expected in a request
// parameters can be `required` or `optional`
const METHOD_MAP = {
  '/wd/hub/status': {
    GET: {command: 'getStatus'}
  },
  '/wd/hub/session': {
    POST: {command: 'createSession', payloadParams: {required: ['desiredCapabilities'], optional: ['requiredCapabilities']}}
  },
  '/wd/hub/sessions': {
    GET: {command: 'getSessions'}
  },
  '/wd/hub/session/:sessionId': {
    GET: {command: 'getSession'},
    DELETE: {command: 'deleteSession'}
  },
  '/wd/hub/session/:sessionId/timeouts': {
    POST: {command: 'timeouts', payloadParams: {required: ['type', 'ms']}}
  },
  '/wd/hub/session/:sessionId/timeouts/async_script': {
    POST: {command: 'asyncScriptTimeout', payloadParams: {required: ['ms']}}
  },
  '/wd/hub/session/:sessionId/timeouts/implicit_wait': {
    POST: {command: 'implicitWait', payloadParams: {required: ['ms']}}
  },
  '/wd/hub/session/:sessionId/window_handle': {
    GET: {command: 'getWindowHandle'}
  },
  '/wd/hub/session/:sessionId/window_handles': {
    GET: {command: 'getWindowHandles'}
  },
  '/wd/hub/session/:sessionId/url': {
    GET: {command: 'getUrl'},
    POST: {command: 'setUrl', payloadParams: {required: ['url']}}
  },
  '/wd/hub/session/:sessionId/forward': {
    POST: {command: 'forward'}
  },
  '/wd/hub/session/:sessionId/back': {
    POST: {command: 'back'}
  },
  '/wd/hub/session/:sessionId/refresh': {
    POST: {command: 'refresh'}
  },
  '/wd/hub/session/:sessionId/execute': {
    POST: {command: 'execute', payloadParams: {required: ['script', 'args']}}
  },
  '/wd/hub/session/:sessionId/execute_async': {
    POST: {command: 'executeAsync', payloadParams: {required: ['script', 'args']}}
  },
  '/wd/hub/session/:sessionId/screenshot': {
    GET: {command: 'getScreenshot'}
  },
  '/wd/hub/session/:sessionId/ime/available_engines': {
    GET: {command: 'availableIMEEngines'}
  },
  '/wd/hub/session/:sessionId/ime/active_engine': {
    GET: {command: 'getActiveIMEEngine'}
  },
  '/wd/hub/session/:sessionId/ime/activated': {
    GET: {command: 'isIMEActivated'}
  },
  '/wd/hub/session/:sessionId/ime/deactivate': {
    POST: {command: 'deactivateIMEEngine'}
  },
  '/wd/hub/session/:sessionId/ime/activate': {
    POST: {command: 'activateIMEEngine', payloadParams: {required: ['engine']}}
  },
  '/wd/hub/session/:sessionId/frame': {
    POST: {command: 'setFrame', payloadParams: {required: ['id']}}
  },
  '/wd/hub/session/:sessionId/frame/parent': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/window': {
    POST: {command: 'setWindow', payloadParams: {required: ['name']}},
    DELETE: {command: 'closeWindow'}
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/size': {
    GET: {command: 'getWindowSize'},
    POST: {}
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/position': {
    POST: {},
    GET: {}
  },
  '/wd/hub/session/:sessionId/window/:windowhandle/maximize': {
    POST: {command: 'maximizeWindow'}
  },
  '/wd/hub/session/:sessionId/cookie': {
    GET: {command: 'getCookies'},
    POST: {command: 'setCookie', payloadParams: {required: ['cookie']}},
    DELETE: {command: 'deleteCookies'}
  },
  '/wd/hub/session/:sessionId/cookie/:name': {
    DELETE: {command: 'deleteCookie'}
  },
  '/wd/hub/session/:sessionId/source': {
    GET: {command: 'getPageSource'}
  },
  '/wd/hub/session/:sessionId/title': {
    GET: {command: 'title'}
  },
  '/wd/hub/session/:sessionId/element': {
    POST: {command: 'findElement', payloadParams: {required: ['using', 'value']}}
  },
  '/wd/hub/session/:sessionId/elements': {
    POST: {command: 'findElements', payloadParams: {required: ['using', 'value']}}
  },
  '/wd/hub/session/:sessionId/element/active': {
    POST: {command: 'active'}
  },
  '/wd/hub/session/:sessionId/element/:elementId': {
    GET: {}
  },
  '/wd/hub/session/:sessionId/element/:elementId/element': {
    POST: {command: 'findElementFromElement', payloadParams: {required: ['using', 'value']}}
  },
  '/wd/hub/session/:sessionId/element/:elementId/elements': {
    POST: {command: 'findElementsFromElement', payloadParams: {required: ['using', 'value']}}
  },
  '/wd/hub/session/:sessionId/element/:elementId/click': {
    POST: {command: 'click'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/submit': {
    POST: {command: 'submit'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/text': {
    GET: {command: 'getText'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/value': {
    POST: {command: 'setValue', payloadParams: {required: ['value']}}
  },
  '/wd/hub/session/:sessionId/keys': {
    POST: {command: 'keys', payloadParams: {required: ['value']}}
  },
  '/wd/hub/session/:sessionId/element/:elementId/name': {
    GET: {command: 'getName'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/clear': {
    POST: {command: 'clear'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/selected': {
    GET: {command: 'elementSelected'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/enabled': {
    GET: {command: 'elementEnabled'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/attribute/:name': {
    GET: {command: 'getAttribute'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/equals/:otherId': {
    GET: {command: 'equalsElement'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/displayed': {
    GET: {command: 'elementDisplayed'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/location': {
    GET: {command: 'getLocation'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/location_in_view': {
    GET: {command: 'getLocationInView'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/size': {
    GET: {command: 'getSize'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/css/:propertyName': {
    GET: {command: 'getCssProperty'}
  },
  '/wd/hub/session/:sessionId/orientation': {
    GET: {command: 'getOrientation'},
    POST: {command: 'setOrientation', payloadParams: {required: ['orientation']}}
  },
  '/wd/hub/session/:sessionId/moveto': {
    POST: {command: 'moveTo', payloadParams: {optional: ['element', 'xoffset', 'yoffset']}}
  },
  '/wd/hub/session/:sessionId/click': {
    POST: {command: 'clickCurrent', payloadParams: {optional: ['button']}}
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
    POST: {command: 'click', payloadParams: {required: ['element']}}
  },
  '/wd/hub/session/:sessionId/touch/down': {
    POST: {command: 'touchDown', payloadParams: {required: ['x', 'y']}}
  },
  '/wd/hub/session/:sessionId/touch/up': {
    POST: {command: 'touchUp', payloadParams: {required: ['x', 'y']}}
  },
  '/wd/hub/session/:sessionId/touch/move': {
    POST: {command: 'touchMove', payloadParams: {required: ['x', 'y']}}
  },
  '/wd/hub/session/:sessionId/touch/scroll': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/touch/doubleclick': {
    POST: {}
  },
  '/wd/hub/session/:sessionId/touch/longclick': {
    POST: {command: 'touchLongClick', payloadParams: {required: ['elements']}}
  },
  '/wd/hub/session/:sessionId/touch/flick': {
    POST: {command: 'flick', payloadParams: {optional: ['element', 'xspeed', 'yspeed', 'xoffset', 'yoffset', 'speed']}}
  },
  '/wd/hub/session/:sessionId/location': {
    GET: {command: 'getGeoLocation'},
    POST: {command: 'setGeoLocation', payloadParams: {required: ['location']}}
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
    POST: {command: 'getLog', payloadParams: {required: ['type']}}
  },
  '/wd/hub/session/:sessionId/log/types': {
    GET: {command: 'getLogTypes'}
  },
  '/wd/hub/session/:sessionId/application_cache/status': {
    GET: {}
  },

  //
  // mjsonwire
  //
  '/wd/hub/session/:sessionId/context': {
    GET: {command: 'getCurrentContext'},
    POST: {command: 'setContext', payloadParams: {required: ['name']}}
  },
  '/wd/hub/session/:sessionId/contexts': {
    GET: {command: 'getContexts'}
  },
  '/wd/hub/session/:sessionId/element/:elementId/pageIndex': {
    GET: {command: 'getPageIndex'}
  },
  '/wd/hub/session/:sessionId/network_connection': {
    GET: {command: 'getNetworkConnection'},
    POST: {command: 'setNetworkConnection', payloadParams: {unwrap: 'parameters', required: ['type']}}
  },
  '/wd/hub/session/:sessionId/touch/perform': {
    POST: {command: 'performTouch', payloadParams: {wrap: 'actions', required: ['actions']}}
  },
  '/wd/hub/session/:sessionId/touch/multi/perform': {
    POST: {command: 'performMultiAction', payloadParams: {required: ['actions'], optional: ['elementId']}}
  },
  '/wd/hub/session/:sessionId/receive_async_response': {
    POST: {command: 'receiveAsyncResponse', payloadParams: {required: ['status', 'value']}}
  },
  '/wd/hub/session/:sessionId/appium/device/shake': {
    POST: {command: 'mobileShake'}
  },
  '/wd/hub/session/:sessionId/appium/device/system_time': {
    GET: {command: 'getDeviceTime'}
  },
  '/wd/hub/session/:sessionId/appium/device/lock': {
    POST: {command: 'lock', payloadParams: {optional: ['seconds']}}
  },
  '/wd/hub/session/:sessionId/appium/device/unlock': {
    POST: {command: 'unlock'}
  },
  '/wd/hub/session/:sessionId/appium/device/is_locked': {
    POST: {command: 'isLocked'}
  },
  '/wd/hub/session/:sessionId/appium/device/press_keycode': {
    POST: {command: 'pressKeyCode', payloadParams: {required: ['keycode'], optional: ['metastate']}}
  },
  '/wd/hub/session/:sessionId/appium/device/long_press_keycode': {
    POST: {command: 'longPressKeyCode', payloadParams: {required: ['keycode'], optional: ['metastate']}}
  },
  '/wd/hub/session/:sessionId/appium/device/keyevent': {
    POST: {command: 'keyevent', payloadParams: {required: ['keycode'], optional: ['metastate']}}
  },
  '/wd/hub/session/:sessionId/appium/device/rotate': {
    POST: {command: 'mobileRotation', payloadParams: {
      required: ['x', 'y', 'radius', 'rotation', 'touchCount', 'duration'],
      optional: ['element'] }}
  },
  '/wd/hub/session/:sessionId/appium/device/current_activity': {
    GET: {command: 'getCurrentActivity'}
  },
  '/wd/hub/session/:sessionId/appium/device/install_app': {
    POST: {command: 'installApp', payloadParams: {required: ['appPath']}}
  },
  '/wd/hub/session/:sessionId/appium/device/remove_app': {
    POST: {command: 'removeApp', payloadParams: {required: [['appId'], ['bundleId']]}}
  },
  '/wd/hub/session/:sessionId/appium/device/app_installed': {
    POST: {command: 'isAppInstalled', payloadParams: {required: ['bundleId']}}
  },
  '/wd/hub/session/:sessionId/appium/device/hide_keyboard': {
    POST: {command: 'hideKeyboard', payloadParams: {optional: ['strategy', 'key', 'keyCode', 'keyName']}}
  },
  '/wd/hub/session/:sessionId/appium/device/push_file': {
    POST: {command: 'pushFile', payloadParams: {required: ['path', 'data']}}
  },
  '/wd/hub/session/:sessionId/appium/device/pull_file': {
    POST: {command: 'pullFile', payloadParams: {required: ['path']}}
  },
  '/wd/hub/session/:sessionId/appium/device/pull_folder': {
    POST: {command: 'pullFolder', payloadParams: {required: ['path']}}
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_airplane_mode': {
    POST: {command: 'toggleFlightMode'}
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_data': {
    POST: {command: 'toggleData'}
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_wifi': {
    POST: {command: 'toggleWiFi'}
  },
  '/wd/hub/session/:sessionId/appium/device/toggle_location_services': {
    POST: {command: 'toggleLocationServices'}
  },
  '/wd/hub/session/:sessionId/appium/device/open_notifications': {
    POST: {command: 'openNotifications'}
  },
  '/wd/hub/session/:sessionId/appium/device/start_activity': {
    POST: {command: 'startActivity', payloadParams: {required: ['appPackage', 'appActivity'],
                                                     optional: ['appWaitPackage', 'appWaitActivity',
                                                                'intentAction', 'intentCategory',
                                                                'intentFlags', 'optionalIntentArguments',
                                                                'dontStopAppOnReset']}}
  },
  '/wd/hub/session/:sessionId/appium/simulator/touch_id': {
    POST: {command: 'touchId', payloadParams: {required: ['match']}}
  },
  '/wd/hub/session/:sessionId/appium/app/launch': {
    POST: {command: 'launchApp'}
  },
  '/wd/hub/session/:sessionId/appium/app/close': {
    POST: {command: 'closeApp'}
  },
  '/wd/hub/session/:sessionId/appium/app/reset': {
    POST: {command: 'reset'}
  },
  '/wd/hub/session/:sessionId/appium/app/background': {
    POST: {command: 'background', payloadParams: {required: ['seconds']}}
  },
  '/wd/hub/session/:sessionId/appium/app/end_test_coverage': {
    POST: {command: 'endCoverage', payloadParams: {required: ['intent', 'path']}}
  },
  '/wd/hub/session/:sessionId/appium/app/strings': {
    POST: {command: 'getStrings', payloadParams: {optional: ['language', 'stringFile']}}
  },
  '/wd/hub/session/:sessionId/appium/element/:elementId/value': {
    POST: {command: 'setValueImmediate', payloadParams: {required: ['value']}}
  },
  '/wd/hub/session/:sessionId/appium/element/:elementId/replace_value': {
    POST: {command: 'replaceValue', payloadParams: {required: ['value']}}
  },
  '/wd/hub/session/:sessionId/appium/settings': {
    POST: {command: 'updateSettings', payloadParams: {required: ['settings']}},
    GET: {command: 'getSettings'}
  },
  '/wd/hub/session/:sessionId/appium/receive_async_response': {
    POST: {command: 'receiveAsyncResponse', payloadParams: {required: ['response']}}
  },


  /*
   * The W3C spec has some changes to the wire protocol.
   * https://w3c.github.io/webdriver/webdriver-spec.html
   * Begin to add those changes here, keeping the old version
   * since clients still implement them.
   */
  // old alerts
  '/wd/hub/session/:sessionId/alert_text': {
    GET: {command: 'getAlertText'},
    POST: {command: 'setAlertText', payloadParams: {required: ['text']}}
  },
  '/wd/hub/session/:sessionId/accept_alert': {
    POST: {command: 'postAcceptAlert'}
  },
  '/wd/hub/session/:sessionId/dismiss_alert': {
    POST: {command: 'postDismissAlert'}
  },
  // https://w3c.github.io/webdriver/webdriver-spec.html#user-prompts
  '/wd/hub/session/:sessionId/alert/text': {
    GET: {command: 'getAlertText'},
    POST: {command: 'setAlertText', payloadParams: {required: ['text']}}
  },
  '/wd/hub/session/:sessionId/alert/accept': {
    POST: {command: 'postAcceptAlert'}
  },
  '/wd/hub/session/:sessionId/alert/dismiss': {
    POST: {command: 'postDismissAlert'}
  },
};

// driver command names
let ALL_COMMANDS = [];
for (let v of _.values(METHOD_MAP)) {
  for (let m of _.values(v)) {
    if (m.command) {
      ALL_COMMANDS.push(m.command);
    }
  }
}

// driver commands that do not require a session to already exist
const NO_SESSION_ID_COMMANDS = ['createSession', 'getStatus', 'getSessions'];

export { METHOD_MAP, ALL_COMMANDS, NO_SESSION_ID_COMMANDS };
