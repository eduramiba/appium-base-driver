require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this3 = this;

var _2 = require('../..');

var _fakeDriver = require('./fake-driver');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('MJSONWP', function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:

        //TODO: more tests!:
        // Unknown commands should return 404

        describe('direct to driver', function () {
          var d = new _fakeDriver.FakeDriver();
          it('should return response values directly from the driver', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(d.setUrl("http://google.com"));

                case 2:
                  context$3$0.sent.should.contain("google");

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
        });

        describe('via express router', function () {
          var mjsonwpServer = undefined;
          var driver = undefined;

          before(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _fakeDriver.FakeDriver();
                  driver.sessionId = 'foo';
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 4:
                  mjsonwpServer = context$3$0.sent;

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          after(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should proxy to driver and return valid jsonwp response', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should respond to x-www-form-urlencoded as well as json requests', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    form: { url: 'http://google.com' }
                  }));

                case 2:
                  res = context$3$0.sent;

                  JSON.parse(res).should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should include url request parameters for methods to use - sessionid', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/back',
                    method: 'POST',
                    json: {},
                    simple: false,
                    resolveWithFullResponse: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.body.should.eql({
                    status: 0,
                    value: "foo",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should include url request parameters for methods to use - elementid', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/click',
                    method: 'POST',
                    json: {}
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.status.should.equal(0);
                  res.value.should.eql(["bar", "foo"]);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should include url req params in the order: custom, element, session', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/attribute/baz',
                    method: 'GET',
                    json: {}
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.status.should.equal(0);
                  res.value.should.eql(["baz", "bar", "foo"]);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should respond with 400 Bad Request if parameters missing', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: {},
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(400);
                  res.body.should.contain("url");

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should reject requests with a badly formatted body and not crash', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: "oh hello"
                  }).should.eventually.be.rejected);

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: "foo"
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should get 404 for bad routes', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/blargimarg',
                    method: 'GET'
                  }).should.eventually.be.rejectedWith("404"));

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          // TODO pass this test
          // https://github.com/appium/node-mobile-json-wire-protocol/issues/3
          it('4xx responses should have content-type of text/plain', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/blargimargarita',
                    method: 'GET',
                    resolveWithFullResponse: true,
                    simple: false // 404 errors fulfill the promise, rather than rejecting
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.headers['content-type'].should.include('text/plain');

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should throw not yet implemented for unfilledout commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/location',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(501);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'Method has not yet been implemented'
                    },
                    sessionId: 'foo'
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should throw not implemented for ignored commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/buttonup',
                    method: 'POST',
                    json: {},
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(501);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'Method is not implemented'
                    },
                    sessionId: 'foo'
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should get 400 for bad parameters', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/url',
                    method: 'POST',
                    json: {}
                  }).should.eventually.be.rejectedWith("400"));

                case 2:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should ignore special extra payload params in the right contexts', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                    method: 'POST',
                    json: { id: 'baz', sessionId: 'lol', value: ['a'] }
                  }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/value',
                    method: 'POST',
                    json: { id: 'baz' }
                  }).should.eventually.be.rejectedWith("400"));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/frame',
                    method: 'POST',
                    json: { id: 'baz' }
                  }));

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should return the correct error even if driver does not throw', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/appium/receive_async_response',
                    method: 'POST',
                    json: { response: 'baz' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Mishandled Driver Error'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          describe('multiple sets of arguments', function () {
            describe('optional', function () {
              it('should allow moveto with element', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/moveto',
                        method: 'POST',
                        json: { element: '3' }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(['3', null, null]);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this);
              });
              it('should allow moveto with xoffset/yoffset', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/moveto',
                        method: 'POST',
                        json: { xoffset: 42, yoffset: 17 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql([null, 42, 17]);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this);
              });
            });
            describe('required', function () {
              it('should allow removeApp with appId', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/appium/device/remove_app',
                        method: 'POST',
                        json: { appId: 42 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(42);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this);
              });
              it('should allow removeApp with bundleId', function callee$4$0() {
                var res;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                        url: 'http://localhost:8181/wd/hub/session/foo/appium/device/remove_app',
                        method: 'POST',
                        json: { bundleId: 42 }
                      }));

                    case 2:
                      res = context$5$0.sent;

                      res.status.should.equal(0);
                      res.value.should.eql(42);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, _this);
              });
            });
          });

          describe('default param wrap', function () {

            it('should wrap', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/touch/perform',
                      method: 'POST',
                      json: [{ "action": "tap", "options": { "element": "3" } }]
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.value.should.deep.equal([[{ "action": "tap", "options": { "element": "3" } }], 'foo']);

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this);
            });

            it('should not wrap twice', function callee$3$0() {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                      url: 'http://localhost:8181/wd/hub/session/foo/touch/perform',
                      method: 'POST',
                      json: { actions: [{ "action": "tap", "options": { "element": "3" } }] }
                    }));

                  case 2:
                    res = context$4$0.sent;

                    res.value.should.deep.equal([[{ "action": "tap", "options": { "element": "3" } }], 'foo']);

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this);
            });
          });

          describe('optional sets of arguments', function callee$2$0() {
            var desiredCapabilities, requiredCapabilities;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              var _this2 = this;

              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  desiredCapabilities = { a: 'b' };
                  requiredCapabilities = { c: 'd' };

                  it('should allow create session with desired caps', function callee$3$0() {
                    var res;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session',
                            method: 'POST',
                            json: { desiredCapabilities: desiredCapabilities }
                          }));

                        case 2:
                          res = context$4$0.sent;

                          res.status.should.equal(0);
                          res.value.should.eql(desiredCapabilities);

                        case 5:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  });
                  it('should allow create session with desired and required caps', function callee$3$0() {
                    var res;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session',
                            method: 'POST',
                            json: {
                              desiredCapabilities: desiredCapabilities,
                              requiredCapabilities: requiredCapabilities
                            }
                          }));

                        case 2:
                          res = context$4$0.sent;

                          res.status.should.equal(0);
                          res.value.should.eql(_lodash2['default'].extend({}, desiredCapabilities, requiredCapabilities));

                        case 5:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  });
                  it('should fail to create session without desired caps', function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session',
                            method: 'POST',
                            json: {}
                          }).should.eventually.be.rejectedWith('400'));

                        case 2:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  });
                  it('should fail to create session with desired caps and random other stuff', function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session',
                            method: 'POST',
                            json: {
                              desiredCapabilities: desiredCapabilities,
                              randomCapabilitied: { z: '-a' }
                            }
                          }).should.eventually.be.rejectedWith('400'));

                        case 2:
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

          it('should handle commands with no response values', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/forward',
                    method: 'POST',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: null,
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should allow empty string response values', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/element/bar/text',
                    method: 'GET',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.should.eql({
                    status: 0,
                    value: "",
                    sessionId: "foo"
                  });

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should send 500 response and an Unknown object for rejected commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo/refresh',
                    method: 'POST',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Too Fresh!'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should not throw UnknownError when known', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/foo',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 2:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.should.eql({
                    status: 6,
                    value: {
                      message: 'A session is either terminated or not started'
                    },
                    sessionId: "foo"
                  });

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
        });

        describe('session Ids', function () {
          var driver = new _fakeDriver.FakeDriver();
          var mjsonwpServer = undefined;

          before(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 2:
                  mjsonwpServer = context$3$0.sent;

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          after(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          afterEach(function () {
            driver.sessionId = null;
          });

          it('returns null SessionId for commands without sessionIds', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/status',
                    method: 'GET',
                    json: true
                  }));

                case 2:
                  res = context$3$0.sent;

                  should.equal(res.sessionId, null);

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('responds with the same session ID in the request', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = sessionId;

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' }
                  }));

                case 4:
                  res = context$3$0.sent;

                  should.exist(res.sessionId);
                  res.sessionId.should.eql(sessionId);

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('yells if no session exists', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.status.should.equal(6);
                  res.body.value.message.should.contain('session');

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('yells if invalid session is sent', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = 'recession';

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(404);
                  res.body.status.should.equal(6);
                  res.body.value.message.should.contain('session');

                case 8:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should have session IDs in error responses', function callee$2$0() {
            var sessionId, res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  sessionId = 'Vader Sessions';

                  driver.sessionId = sessionId;

                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/refresh',
                    method: 'POST',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Too Fresh!'
                    },
                    sessionId: sessionId
                  });

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should return a new session ID on create', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session',
                    method: 'POST',
                    json: { desiredCapabilities: { greeting: 'hello' }, requiredCapabilities: { valediction: 'bye' } }
                  }));

                case 2:
                  res = context$3$0.sent;

                  should.exist(res.sessionId);
                  res.sessionId.should.equal('1234');
                  res.value.should.eql({ greeting: 'hello', valediction: 'bye' });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
        });

        describe('via drivers jsonwp proxy', function () {
          var driver = undefined;
          var sessionId = 'foo';
          var mjsonwpServer = undefined;

          beforeEach(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _fakeDriver.FakeDriver();
                  driver.sessionId = sessionId;
                  driver.proxyActive = function () {
                    return true;
                  };
                  driver.canProxy = function () {
                    return true;
                  };

                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap((0, _2.server)((0, _2.routeConfiguringFunction)(driver), 8181));

                case 6:
                  mjsonwpServer = context$3$0.sent;

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          afterEach(function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  mjsonwpServer.close();

                case 1:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should give a nice error if proxying is set but no proxy function exists', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.canProxy = function () {
                    return false;
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Trying to proxy to a JSONWP ' + 'server but driver is unable to proxy'
                    },
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should pass on any errors in proxying', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0() {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          throw new Error("foo");

                        case 1:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(500);
                  res.body.should.eql({
                    status: 13,
                    value: {
                      message: 'An unknown server-side error occurred while processing ' + 'the command. Original error: Could not proxy. Proxy ' + 'error: foo'
                    },
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should let the proxy handle req/res', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0(req, res) {
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          res.status(200).json({ custom: 'data' });

                        case 1:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({ custom: 'data' });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should avoid jsonwp proxying when path matches avoidance list', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('^/session/[^/]+/url$')]];
                  };
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                    method: 'POST',
                    json: { url: 'http://google.com' },
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({
                    status: 0,
                    value: "Navigated to: http://google.com",
                    sessionId: sessionId
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should fail if avoid proxy list is malformed in some way', function callee$2$0() {
            var badProxyAvoidanceList, lists, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, list;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  badProxyAvoidanceList = function badProxyAvoidanceList(list) {
                    var res;
                    return _regeneratorRuntime.async(function badProxyAvoidanceList$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          driver.getProxyAvoidList = function () {
                            return list;
                          };
                          context$4$0.next = 3;
                          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                            url: 'http://localhost:8181/wd/hub/session/' + sessionId + '/url',
                            method: 'POST',
                            json: { url: 'http://google.com' },
                            resolveWithFullResponse: true,
                            simple: false
                          }));

                        case 3:
                          res = context$4$0.sent;

                          res.statusCode.should.equal(500);
                          res.body.status.should.equal(13);
                          res.body.value.message.should.contain("roxy");

                        case 7:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  };

                  lists = ['foo', [['foo']], [['BAR', /lol/]], [['GET', 'foo']]];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 5;
                  _iterator = _getIterator(lists);

                case 7:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 14;
                    break;
                  }

                  list = _step.value;
                  context$3$0.next = 11;
                  return _regeneratorRuntime.awrap(badProxyAvoidanceList(list));

                case 11:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 7;
                  break;

                case 14:
                  context$3$0.next = 20;
                  break;

                case 16:
                  context$3$0.prev = 16;
                  context$3$0.t0 = context$3$0['catch'](5);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t0;

                case 20:
                  context$3$0.prev = 20;
                  context$3$0.prev = 21;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 23:
                  context$3$0.prev = 23;

                  if (!_didIteratorError) {
                    context$3$0.next = 26;
                    break;
                  }

                  throw _iteratorError;

                case 26:
                  return context$3$0.finish(23);

                case 27:
                  return context$3$0.finish(20);

                case 28:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this, [[5, 16, 20, 28], [21,, 23, 27]]);
          });

          it('should avoid proxying non-session commands even if not in the list', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('')]];
                  };

                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/status',
                    method: 'GET',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 3:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  res.body.should.eql({
                    status: 0,
                    value: "I'm fine",
                    sessionId: null
                  });

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });

          it('should avoid proxying deleteSession commands', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.getProxyAvoidList = function () {
                    return [['POST', new RegExp('')]];
                  };

                  driver.sessionId.should.equal(sessionId);
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
                    url: 'http://localhost:8181/wd/hub/session/' + sessionId,
                    method: 'DELETE',
                    json: true,
                    resolveWithFullResponse: true,
                    simple: false
                  }));

                case 4:
                  res = context$3$0.sent;

                  res.statusCode.should.equal(200);
                  should.not.exist(driver.sessionId);
                  driver.jwpProxyActive.should.be['false'];

                case 8:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          });
        });

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this3);
});

// make sure adding the optional 'id' doesn't clobber a route where we
// have an actual required 'id'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9tanNvbndwLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztpQkFFaUQsT0FBTzs7MEJBQzdCLGVBQWU7O3NCQUM1QixRQUFROzs7OzhCQUNGLGlCQUFpQjs7OztvQkFDcEIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7QUFHN0MsSUFBSSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDM0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRTs7Ozs7Ozs7OztBQUtsQixnQkFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsY0FBSSxDQUFDLEdBQUcsNEJBQWdCLENBQUM7QUFDekIsWUFBRSxDQUFDLHdEQUF3RCxFQUFFOzs7OzttREFDcEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7O21DQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUTs7Ozs7OztXQUM5RCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7O0FBRUgsZ0JBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFNO0FBQ25DLGNBQUksYUFBYSxZQUFBLENBQUM7QUFDbEIsY0FBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxnQkFBTSxDQUFDOzs7O0FBQ0wsd0JBQU0sR0FBRyw0QkFBZ0IsQ0FBQztBQUMxQix3QkFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O21EQUNILGVBQU8saUNBQXlCLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzs7O0FBQXBFLCtCQUFhOzs7Ozs7O1dBQ2QsQ0FBQyxDQUFDOztBQUVILGVBQUssQ0FBQzs7OztBQUNKLCtCQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7V0FDdkIsQ0FBQyxDQUFDOztBQUVILFlBQUUsQ0FBQyx5REFBeUQsRUFBRTtnQkFDeEQsR0FBRzs7Ozs7bURBQVMsaUNBQVE7QUFDdEIsdUJBQUcsRUFBRSw4Q0FBOEM7QUFD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QzttQkFBRSxDQUFDOztBQUV4RSx3QkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzttREFDekIsaUNBQVE7QUFDdEIsdUJBQUcsNENBQTBDLFNBQVMsQUFBRTtBQUN4RCwwQkFBTSxFQUFFLFFBQVE7QUFDaEIsd0JBQUksRUFBRSxJQUFJO0FBQ1YsMkNBQXVCLEVBQUUsSUFBSTtBQUM3QiwwQkFBTSxFQUFFLEtBQUs7bUJBQ2QsQ0FBQzs7O0FBTkUscUJBQUc7O0FBUVAscUJBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLHdCQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQU0sQ0FBQzs7Ozs7OztXQUN2QyxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7Ozs7Ozs7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9tanNvbndwL21qc29ud3Atc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IHsgc2VydmVyLCByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24gfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBGYWtlRHJpdmVyIH0gZnJvbSAnLi9mYWtlLWRyaXZlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuXG5cbmxldCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnTUpTT05XUCcsIGFzeW5jICgpID0+IHtcblxuICAvL1RPRE86IG1vcmUgdGVzdHMhOlxuICAvLyBVbmtub3duIGNvbW1hbmRzIHNob3VsZCByZXR1cm4gNDA0XG5cbiAgZGVzY3JpYmUoJ2RpcmVjdCB0byBkcml2ZXInLCAoKSA9PiB7XG4gICAgbGV0IGQgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlc3BvbnNlIHZhbHVlcyBkaXJlY3RseSBmcm9tIHRoZSBkcml2ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgZC5zZXRVcmwoXCJodHRwOi8vZ29vZ2xlLmNvbVwiKSkuc2hvdWxkLmNvbnRhaW4oXCJnb29nbGVcIik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2aWEgZXhwcmVzcyByb3V0ZXInLCAoKSA9PiB7XG4gICAgbGV0IG1qc29ud3BTZXJ2ZXI7XG4gICAgbGV0IGRyaXZlcjtcblxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9ICdmb28nO1xuICAgICAgbWpzb253cFNlcnZlciA9IGF3YWl0IHNlcnZlcihyb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZHJpdmVyKSwgODE4MSk7XG4gICAgfSk7XG5cbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBtanNvbndwU2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHByb3h5IHRvIGRyaXZlciBhbmQgcmV0dXJuIHZhbGlkIGpzb253cCByZXNwb25zZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby91cmwnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ31cbiAgICAgIH0pO1xuICAgICAgcmVzLnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcIk5hdmlnYXRlZCB0bzogaHR0cDovL2dvb2dsZS5jb21cIixcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVzcG9uZCB0byB4LXd3dy1mb3JtLXVybGVuY29kZWQgYXMgd2VsbCBhcyBqc29uIHJlcXVlc3RzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBmb3JtOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG4gICAgICBKU09OLnBhcnNlKHJlcykuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHVybCByZXF1ZXN0IHBhcmFtZXRlcnMgZm9yIG1ldGhvZHMgdG8gdXNlIC0gc2Vzc2lvbmlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2JhY2snLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge30sXG4gICAgICAgIHNpbXBsZTogZmFsc2UsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBcImZvb1wiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHVybCByZXF1ZXN0IHBhcmFtZXRlcnMgZm9yIG1ldGhvZHMgdG8gdXNlIC0gZWxlbWVudGlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2VsZW1lbnQvYmFyL2NsaWNrJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9XG4gICAgICB9KTtcbiAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoW1wiYmFyXCIsIFwiZm9vXCJdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW5jbHVkZSB1cmwgcmVxIHBhcmFtcyBpbiB0aGUgb3JkZXI6IGN1c3RvbSwgZWxlbWVudCwgc2Vzc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci9hdHRyaWJ1dGUvYmF6JyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAganNvbjoge31cbiAgICAgIH0pO1xuICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbXCJiYXpcIiwgXCJiYXJcIiwgXCJmb29cIl0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlc3BvbmQgd2l0aCA0MDAgQmFkIFJlcXVlc3QgaWYgcGFyYW1ldGVycyBtaXNzaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7fSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNDAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5jb250YWluKFwidXJsXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWplY3QgcmVxdWVzdHMgd2l0aCBhIGJhZGx5IGZvcm1hdHRlZCBib2R5IGFuZCBub3QgY3Jhc2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby91cmwnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjogXCJvaCBoZWxsb1wiXG4gICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG4gICAgICByZXMuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGdldCA0MDQgZm9yIGJhZCByb3V0ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9ibGFyZ2ltYXJnJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiNDA0XCIpO1xuICAgIH0pO1xuXG4gICAgLy8gVE9ETyBwYXNzIHRoaXMgdGVzdFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hcHBpdW0vbm9kZS1tb2JpbGUtanNvbi13aXJlLXByb3RvY29sL2lzc3Vlcy8zXG4gICAgaXQoJzR4eCByZXNwb25zZXMgc2hvdWxkIGhhdmUgY29udGVudC10eXBlIG9mIHRleHQvcGxhaW4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvYmxhcmdpbWFyZ2FyaXRhJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2UgLy8gNDA0IGVycm9ycyBmdWxmaWxsIHRoZSBwcm9taXNlLCByYXRoZXIgdGhhbiByZWplY3RpbmdcbiAgICAgIH0pO1xuXG4gICAgICByZXMuaGVhZGVyc1snY29udGVudC10eXBlJ10uc2hvdWxkLmluY2x1ZGUoJ3RleHQvcGxhaW4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgbm90IHlldCBpbXBsZW1lbnRlZCBmb3IgdW5maWxsZWRvdXQgY29tbWFuZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvbG9jYXRpb24nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDEpO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ01ldGhvZCBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkJ1xuICAgICAgICB9LFxuICAgICAgICBzZXNzaW9uSWQ6ICdmb28nXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgbm90IGltcGxlbWVudGVkIGZvciBpZ25vcmVkIGNvbW1hbmRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2J1dHRvbnVwJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDEpO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ01ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogJ2ZvbydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgNDAwIGZvciBiYWQgcGFyYW1ldGVycycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7fVxuICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiNDAwXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgc3BlY2lhbCBleHRyYSBwYXlsb2FkIHBhcmFtcyBpbiB0aGUgcmlnaHQgY29udGV4dHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci92YWx1ZScsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7aWQ6ICdiYXonLCBzZXNzaW9uSWQ6ICdsb2wnLCB2YWx1ZTogWydhJ119XG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdmFsdWUnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2lkOiAnYmF6J31cbiAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIjQwMFwiKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIGFkZGluZyB0aGUgb3B0aW9uYWwgJ2lkJyBkb2Vzbid0IGNsb2JiZXIgYSByb3V0ZSB3aGVyZSB3ZVxuICAgICAgLy8gaGF2ZSBhbiBhY3R1YWwgcmVxdWlyZWQgJ2lkJ1xuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZnJhbWUnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2lkOiAnYmF6J31cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgZXJyb3IgZXZlbiBpZiBkcml2ZXIgZG9lcyBub3QgdGhyb3cnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2FwcGl1bS9yZWNlaXZlX2FzeW5jX3Jlc3BvbnNlJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHtyZXNwb25zZTogJ2Jheid9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogTWlzaGFuZGxlZCBEcml2ZXIgRXJyb3InXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbXVsdGlwbGUgc2V0cyBvZiBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnb3B0aW9uYWwnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgbW92ZXRvIHdpdGggZWxlbWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL21vdmV0bycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGpzb246IHtlbGVtZW50OiAnMyd9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoWyczJywgbnVsbCwgbnVsbF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBtb3ZldG8gd2l0aCB4b2Zmc2V0L3lvZmZzZXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9tb3ZldG8nLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBqc29uOiB7eG9mZnNldDogNDIsIHlvZmZzZXQ6IDE3fVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKFtudWxsLCA0MiwgMTddKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdyZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyByZW1vdmVBcHAgd2l0aCBhcHBJZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2FwcGl1bS9kZXZpY2UvcmVtb3ZlX2FwcCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGpzb246IHthcHBJZDogNDJ9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoNDIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyByZW1vdmVBcHAgd2l0aCBidW5kbGVJZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2FwcGl1bS9kZXZpY2UvcmVtb3ZlX2FwcCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGpzb246IHtidW5kbGVJZDogNDJ9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoNDIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2RlZmF1bHQgcGFyYW0gd3JhcCcsICgpID0+IHtcblxuICAgICAgaXQoJ3Nob3VsZCB3cmFwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby90b3VjaC9wZXJmb3JtJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiBbe1wiYWN0aW9uXCI6XCJ0YXBcIiwgXCJvcHRpb25zXCI6e1wiZWxlbWVudFwiOlwiM1wifX1dXG4gICAgICAgIH0pO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmRlZXAuZXF1YWwoW1t7XCJhY3Rpb25cIjpcInRhcFwiLCBcIm9wdGlvbnNcIjp7XCJlbGVtZW50XCI6XCIzXCJ9fV0sICdmb28nXSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBub3Qgd3JhcCB0d2ljZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdG91Y2gvcGVyZm9ybScsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAganNvbjoge2FjdGlvbnM6IFt7XCJhY3Rpb25cIjpcInRhcFwiLCBcIm9wdGlvbnNcIjp7XCJlbGVtZW50XCI6XCIzXCJ9fV19XG4gICAgICAgIH0pO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmRlZXAuZXF1YWwoW1t7XCJhY3Rpb25cIjpcInRhcFwiLCBcIm9wdGlvbnNcIjp7XCJlbGVtZW50XCI6XCIzXCJ9fV0sICdmb28nXSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wdGlvbmFsIHNldHMgb2YgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGRlc2lyZWRDYXBhYmlsaXRpZXMgPSB7YTogJ2InfTtcbiAgICAgIGxldCByZXF1aXJlZENhcGFiaWxpdGllcyA9IHtjOiAnZCd9O1xuICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBjcmVhdGUgc2Vzc2lvbiB3aXRoIGRlc2lyZWQgY2FwcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbicsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAganNvbjoge2Rlc2lyZWRDYXBhYmlsaXRpZXN9XG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoZGVzaXJlZENhcGFiaWxpdGllcyk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYWxsb3cgY3JlYXRlIHNlc3Npb24gd2l0aCBkZXNpcmVkIGFuZCByZXF1aXJlZCBjYXBzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICBkZXNpcmVkQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgcmVxdWlyZWRDYXBhYmlsaXRpZXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoXy5leHRlbmQoe30sIGRlc2lyZWRDYXBhYmlsaXRpZXMsIHJlcXVpcmVkQ2FwYWJpbGl0aWVzKSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB0byBjcmVhdGUgc2Vzc2lvbiB3aXRob3V0IGRlc2lyZWQgY2FwcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7fVxuICAgICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJzQwMCcpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgdG8gY3JlYXRlIHNlc3Npb24gd2l0aCBkZXNpcmVkIGNhcHMgYW5kIHJhbmRvbSBvdGhlciBzdHVmZicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7XG4gICAgICAgICAgICBkZXNpcmVkQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgcmFuZG9tQ2FwYWJpbGl0aWVkOiB7ejogJy1hJ31cbiAgICAgICAgICB9XG4gICAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnNDAwJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGFuZGxlIGNvbW1hbmRzIHdpdGggbm8gcmVzcG9uc2UgdmFsdWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2ZvcndhcmQnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmVzLnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBlbXB0eSBzdHJpbmcgcmVzcG9uc2UgdmFsdWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2VsZW1lbnQvYmFyL3RleHQnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXMuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiXCIsXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNlbmQgNTAwIHJlc3BvbnNlIGFuZCBhbiBVbmtub3duIG9iamVjdCBmb3IgcmVqZWN0ZWQgY29tbWFuZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vcmVmcmVzaCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyAnICtcbiAgICAgICAgICAgICAgICAgICAndGhlIGNvbW1hbmQuIE9yaWdpbmFsIGVycm9yOiBUb28gRnJlc2ghJ1xuICAgICAgICB9LFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgVW5rbm93bkVycm9yIHdoZW4ga25vd24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28nLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogNixcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJ1xuICAgICAgICB9LFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2Vzc2lvbiBJZHMnLCAoKSA9PiB7XG4gICAgbGV0IGRyaXZlciA9IG5ldyBGYWtlRHJpdmVyKCk7XG4gICAgbGV0IG1qc29ud3BTZXJ2ZXI7XG5cbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgbWpzb253cFNlcnZlciA9IGF3YWl0IHNlcnZlcihyb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZHJpdmVyKSwgODE4MSk7XG4gICAgfSk7XG5cbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBtanNvbndwU2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goICgpID0+IHtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBTZXNzaW9uSWQgZm9yIGNvbW1hbmRzIHdpdGhvdXQgc2Vzc2lvbklkcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zdGF0dXMnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIHNob3VsZC5lcXVhbChyZXMuc2Vzc2lvbklkLCBudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNwb25kcyB3aXRoIHRoZSBzYW1lIHNlc3Npb24gSUQgaW4gdGhlIHJlcXVlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2Vzc2lvbklkID0gJ1ZhZGVyIFNlc3Npb25zJztcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ31cbiAgICAgIH0pO1xuXG4gICAgICBzaG91bGQuZXhpc3QocmVzLnNlc3Npb25JZCk7XG4gICAgICByZXMuc2Vzc2lvbklkLnNob3VsZC5lcWwoc2Vzc2lvbklkKTtcbiAgICB9KTtcblxuICAgIGl0KCd5ZWxscyBpZiBubyBzZXNzaW9uIGV4aXN0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3Nlc3Npb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCd5ZWxscyBpZiBpbnZhbGlkIHNlc3Npb24gaXMgc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9ICdyZWNlc3Npb24nO1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCg2KTtcbiAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oJ3Nlc3Npb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBzZXNzaW9uIElEcyBpbiBlcnJvciByZXNwb25zZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2Vzc2lvbklkID0gJ1ZhZGVyIFNlc3Npb25zJztcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS9yZWZyZXNoYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4gT3JpZ2luYWwgZXJyb3I6IFRvbyBGcmVzaCEnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIG5ldyBzZXNzaW9uIElEIG9uIGNyZWF0ZScsIGFzeW5jICgpID0+IHtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IHtncmVldGluZzogJ2hlbGxvJ30sIHJlcXVpcmVkQ2FwYWJpbGl0aWVzOiB7dmFsZWRpY3Rpb246ICdieWUnfX1cbiAgICAgIH0pO1xuXG4gICAgICBzaG91bGQuZXhpc3QocmVzLnNlc3Npb25JZCk7XG4gICAgICByZXMuc2Vzc2lvbklkLnNob3VsZC5lcXVhbCgnMTIzNCcpO1xuICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoe2dyZWV0aW5nOiAnaGVsbG8nLCB2YWxlZGljdGlvbjogJ2J5ZSd9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZpYSBkcml2ZXJzIGpzb253cCBwcm94eScsICgpID0+IHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGxldCBzZXNzaW9uSWQgPSAnZm9vJztcbiAgICBsZXQgbWpzb253cFNlcnZlcjtcblxuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEZha2VEcml2ZXIoKTtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG4gICAgICBkcml2ZXIucHJveHlBY3RpdmUgPSAoKSA9PiB7IHJldHVybiB0cnVlOyB9O1xuICAgICAgZHJpdmVyLmNhblByb3h5ID0gKCkgPT4geyByZXR1cm4gdHJ1ZTsgfTtcblxuICAgICAgbWpzb253cFNlcnZlciA9IGF3YWl0IHNlcnZlcihyb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24oZHJpdmVyKSwgODE4MSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgbWpzb253cFNlcnZlci5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnaXZlIGEgbmljZSBlcnJvciBpZiBwcm94eWluZyBpcyBzZXQgYnV0IG5vIHByb3h5IGZ1bmN0aW9uIGV4aXN0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5jYW5Qcm94eSA9ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogVHJ5aW5nIHRvIHByb3h5IHRvIGEgSlNPTldQICcgK1xuICAgICAgICAgICAgICAgICAgICdzZXJ2ZXIgYnV0IGRyaXZlciBpcyB1bmFibGUgdG8gcHJveHknXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHBhc3Mgb24gYW55IGVycm9ycyBpbiBwcm94eWluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5wcm94eVJlcVJlcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZm9vXCIpO1xuICAgICAgfTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4gT3JpZ2luYWwgZXJyb3I6IENvdWxkIG5vdCBwcm94eS4gUHJveHkgJyArXG4gICAgICAgICAgICAgICAgICAgJ2Vycm9yOiBmb28nXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxldCB0aGUgcHJveHkgaGFuZGxlIHJlcS9yZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIucHJveHlSZXFSZXMgPSBhc3luYyBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe2N1c3RvbTogJ2RhdGEnfSk7XG4gICAgICB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe2N1c3RvbTogJ2RhdGEnfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGF2b2lkIGpzb253cCBwcm94eWluZyB3aGVuIHBhdGggbWF0Y2hlcyBhdm9pZGFuY2UgbGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCA9ICgpID0+IHsgcmV0dXJuIFtbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdXJsJCcpXV07IH07XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWRcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGF2b2lkIHByb3h5IGxpc3QgaXMgbWFsZm9ybWVkIGluIHNvbWUgd2F5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXN5bmMgZnVuY3Rpb24gYmFkUHJveHlBdm9pZGFuY2VMaXN0IChsaXN0KSB7XG4gICAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCA9ICgpID0+IHsgcmV0dXJuIGxpc3Q7IH07XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCgxMyk7XG4gICAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oXCJyb3h5XCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdHMgPSBbXG4gICAgICAgICdmb28nLFxuICAgICAgICBbWydmb28nXV0sXG4gICAgICAgIFtbJ0JBUicsIC9sb2wvXV0sXG4gICAgICAgIFtbJ0dFVCcsICdmb28nXV1cbiAgICAgIF07XG4gICAgICBmb3IgKGxldCBsaXN0IG9mIGxpc3RzKSB7XG4gICAgICAgIGF3YWl0IGJhZFByb3h5QXZvaWRhbmNlTGlzdChsaXN0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYXZvaWQgcHJveHlpbmcgbm9uLXNlc3Npb24gY29tbWFuZHMgZXZlbiBpZiBub3QgaW4gdGhlIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QgPSAoKSA9PiB7IHJldHVybiBbWydQT1NUJywgbmV3IFJlZ0V4cCgnJyldXTsgfTtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3N0YXR1c2AsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDIwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogXCJJJ20gZmluZVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhdm9pZCBwcm94eWluZyBkZWxldGVTZXNzaW9uIGNvbW1hbmRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0ID0gKCkgPT4geyByZXR1cm4gW1snUE9TVCcsIG5ldyBSZWdFeHAoJycpXV07IH07XG5cbiAgICAgIGRyaXZlci5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKHNlc3Npb25JZCk7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH1gLFxuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChkcml2ZXIuc2Vzc2lvbklkKTtcbiAgICAgIGRyaXZlci5qd3BQcm94eUFjdGl2ZS5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=