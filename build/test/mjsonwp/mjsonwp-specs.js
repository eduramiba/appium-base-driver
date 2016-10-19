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

          it('should able to throw ProxyRequestError in proxying', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver.proxyReqRes = function callee$3$0() {
                    var jsonwp;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          jsonwp = { status: 35, value: "No such context found.", sessionId: "foo" };
                          throw new _2.errors.ProxyRequestError('Could not proxy command to remote server. ', jsonwp);

                        case 2:
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
                    status: 35,
                    "value": { "message": "No such context found." },
                    sessionId: "foo"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9tanNvbndwLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztpQkFFeUQsT0FBTzs7MEJBQ3JDLGVBQWU7O3NCQUM1QixRQUFROzs7OzhCQUNGLGlCQUFpQjs7OztvQkFDcEIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7QUFFN0MsSUFBSSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDM0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRTs7Ozs7Ozs7OztBQUtsQixnQkFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsY0FBSSxDQUFDLEdBQUcsNEJBQWdCLENBQUM7QUFDekIsWUFBRSxDQUFDLHdEQUF3RCxFQUFFOzs7OzttREFDcEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7O21DQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUTs7Ozs7OztXQUM5RCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7O0FBRUgsZ0JBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFNO0FBQ25DLGNBQUksYUFBYSxZQUFBLENBQUM7QUFDbEIsY0FBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxnQkFBTSxDQUFDOzs7O0FBQ0wsd0JBQU0sR0FBRyw0QkFBZ0IsQ0FBQztBQUMxQix3QkFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O21EQUNILGVBQU8saUNBQXlCLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzs7O0FBQXBFLCtCQUFhOzs7Ozs7O1dBQ2QsQ0FBQyxDQUFDOztBQUVILGVBQUssQ0FBQzs7OztBQUNKLCtCQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7V0FDdkIsQ0FBQyxDQUFDOztBQUVILFlBQUUsQ0FBQyx5REFBeUQsRUFBRTtnQkFDeEQsR0FBRzs7Ozs7bURBQVMsaUNBQVE7QUFDdEIsdUJBQUcsRUFBRSw4Q0FBOEM7QUFD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QUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLHdCQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsd0JBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDOzs7Ozs7O1dBQ3ZDLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQzs7Ozs7OztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L21qc29ud3AvbWpzb253cC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBzZXJ2ZXIsIHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgZXJyb3JzIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgRmFrZURyaXZlciB9IGZyb20gJy4vZmFrZS1kcml2ZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcblxubGV0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdNSlNPTldQJywgYXN5bmMgKCkgPT4ge1xuXG4gIC8vVE9ETzogbW9yZSB0ZXN0cyE6XG4gIC8vIFVua25vd24gY29tbWFuZHMgc2hvdWxkIHJldHVybiA0MDRcblxuICBkZXNjcmliZSgnZGlyZWN0IHRvIGRyaXZlcicsICgpID0+IHtcbiAgICBsZXQgZCA9IG5ldyBGYWtlRHJpdmVyKCk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcmVzcG9uc2UgdmFsdWVzIGRpcmVjdGx5IGZyb20gdGhlIGRyaXZlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIChhd2FpdCBkLnNldFVybChcImh0dHA6Ly9nb29nbGUuY29tXCIpKS5zaG91bGQuY29udGFpbihcImdvb2dsZVwiKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ZpYSBleHByZXNzIHJvdXRlcicsICgpID0+IHtcbiAgICBsZXQgbWpzb253cFNlcnZlcjtcbiAgICBsZXQgZHJpdmVyO1xuXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBGYWtlRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuc2Vzc2lvbklkID0gJ2Zvbyc7XG4gICAgICBtanNvbndwU2VydmVyID0gYXdhaXQgc2VydmVyKHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkcml2ZXIpLCA4MTgxKTtcbiAgICB9KTtcblxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIG1qc29ud3BTZXJ2ZXIuY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcHJveHkgdG8gZHJpdmVyIGFuZCByZXR1cm4gdmFsaWQganNvbndwIHJlc3BvbnNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG4gICAgICByZXMuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IFwiZm9vXCJcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXNwb25kIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBhcyB3ZWxsIGFzIGpzb24gcmVxdWVzdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdXJsJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGZvcm06IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9XG4gICAgICB9KTtcbiAgICAgIEpTT04ucGFyc2UocmVzKS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogXCJOYXZpZ2F0ZWQgdG86IGh0dHA6Ly9nb29nbGUuY29tXCIsXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGluY2x1ZGUgdXJsIHJlcXVlc3QgcGFyYW1ldGVycyBmb3IgbWV0aG9kcyB0byB1c2UgLSBzZXNzaW9uaWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYmFjaycsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7fSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiZm9vXCIsXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGluY2x1ZGUgdXJsIHJlcXVlc3QgcGFyYW1ldGVycyBmb3IgbWV0aG9kcyB0byB1c2UgLSBlbGVtZW50aWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvY2xpY2snLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge31cbiAgICAgIH0pO1xuICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbXCJiYXJcIiwgXCJmb29cIl0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHVybCByZXEgcGFyYW1zIGluIHRoZSBvcmRlcjogY3VzdG9tLCBlbGVtZW50LCBzZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2VsZW1lbnQvYmFyL2F0dHJpYnV0ZS9iYXonLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBqc29uOiB7fVxuICAgICAgfSk7XG4gICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgIHJlcy52YWx1ZS5zaG91bGQuZXFsKFtcImJhelwiLCBcImJhclwiLCBcImZvb1wiXSk7XG5cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVzcG9uZCB3aXRoIDQwMCBCYWQgUmVxdWVzdCBpZiBwYXJhbWV0ZXJzIG1pc3NpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdXJsJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmNvbnRhaW4oXCJ1cmxcIik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlamVjdCByZXF1ZXN0cyB3aXRoIGEgYmFkbHkgZm9ybWF0dGVkIGJvZHkgYW5kIG5vdCBjcmFzaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3VybCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiBcIm9oIGhlbGxvXCJcbiAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdXJsJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9XG4gICAgICB9KTtcbiAgICAgIHJlcy5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogXCJOYXZpZ2F0ZWQgdG86IGh0dHA6Ly9nb29nbGUuY29tXCIsXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZ2V0IDQwNCBmb3IgYmFkIHJvdXRlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL2JsYXJnaW1hcmcnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCI0MDRcIik7XG4gICAgfSk7XG5cbiAgICAvLyBUT0RPIHBhc3MgdGhpcyB0ZXN0XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FwcGl1bS9ub2RlLW1vYmlsZS1qc29uLXdpcmUtcHJvdG9jb2wvaXNzdWVzLzNcbiAgICBpdCgnNHh4IHJlc3BvbnNlcyBzaG91bGQgaGF2ZSBjb250ZW50LXR5cGUgb2YgdGV4dC9wbGFpbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9ibGFyZ2ltYXJnYXJpdGEnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZSAvLyA0MDQgZXJyb3JzIGZ1bGZpbGwgdGhlIHByb21pc2UsIHJhdGhlciB0aGFuIHJlamVjdGluZ1xuICAgICAgfSk7XG5cbiAgICAgIHJlcy5oZWFkZXJzWydjb250ZW50LXR5cGUnXS5zaG91bGQuaW5jbHVkZSgndGV4dC9wbGFpbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBub3QgeWV0IGltcGxlbWVudGVkIGZvciB1bmZpbGxlZG91dCBjb21tYW5kcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci9sb2NhdGlvbicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMSk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnTWV0aG9kIGhhcyBub3QgeWV0IGJlZW4gaW1wbGVtZW50ZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogJ2ZvbydcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBub3QgaW1wbGVtZW50ZWQgZm9yIGlnbm9yZWQgY29tbWFuZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYnV0dG9udXAnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMSk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnTWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkOiAnZm9vJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGdldCA0MDAgZm9yIGJhZCBwYXJhbWV0ZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vdXJsJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt9XG4gICAgICB9KS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCI0MDBcIik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGlnbm9yZSBzcGVjaWFsIGV4dHJhIHBheWxvYWQgcGFyYW1zIGluIHRoZSByaWdodCBjb250ZXh0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL2VsZW1lbnQvYmFyL3ZhbHVlJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHtpZDogJ2JheicsIHNlc3Npb25JZDogJ2xvbCcsIHZhbHVlOiBbJ2EnXX1cbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9lbGVtZW50L2Jhci92YWx1ZScsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7aWQ6ICdiYXonfVxuICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiNDAwXCIpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgYWRkaW5nIHRoZSBvcHRpb25hbCAnaWQnIGRvZXNuJ3QgY2xvYmJlciBhIHJvdXRlIHdoZXJlIHdlXG4gICAgICAvLyBoYXZlIGFuIGFjdHVhbCByZXF1aXJlZCAnaWQnXG4gICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9mcmFtZScsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7aWQ6ICdiYXonfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgY29ycmVjdCBlcnJvciBldmVuIGlmIGRyaXZlciBkb2VzIG5vdCB0aHJvdycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSAgYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYXBwaXVtL3JlY2VpdmVfYXN5bmNfcmVzcG9uc2UnLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3Jlc3BvbnNlOiAnYmF6J30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyAnICtcbiAgICAgICAgICAgICAgICAgICAndGhlIGNvbW1hbmQuIE9yaWdpbmFsIGVycm9yOiBNaXNoYW5kbGVkIERyaXZlciBFcnJvcidcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtdWx0aXBsZSBzZXRzIG9mIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdvcHRpb25hbCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBtb3ZldG8gd2l0aCBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vbW92ZXRvJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2VsZW1lbnQ6ICczJ31cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChbJzMnLCBudWxsLCBudWxsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IG1vdmV0byB3aXRoIHhvZmZzZXQveW9mZnNldCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL21vdmV0bycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGpzb246IHt4b2Zmc2V0OiA0MiwgeW9mZnNldDogMTd9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLnN0YXR1cy5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAgICAgcmVzLnZhbHVlLnNob3VsZC5lcWwoW251bGwsIDQyLCAxN10pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ3JlcXVpcmVkJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IHJlbW92ZUFwcCB3aXRoIGFwcElkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2FwcElkOiA0Mn1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbCg0Mik7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IHJlbW92ZUFwcCB3aXRoIGJ1bmRsZUlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vYXBwaXVtL2RldmljZS9yZW1vdmVfYXBwJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAganNvbjoge2J1bmRsZUlkOiA0Mn1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXMuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcbiAgICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbCg0Mik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVmYXVsdCBwYXJhbSB3cmFwJywgKCkgPT4ge1xuXG4gICAgICBpdCgnc2hvdWxkIHdyYXAnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vZm9vL3RvdWNoL3BlcmZvcm0nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IFt7XCJhY3Rpb25cIjpcInRhcFwiLCBcIm9wdGlvbnNcIjp7XCJlbGVtZW50XCI6XCIzXCJ9fV1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZGVlcC5lcXVhbChbW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XSwgJ2ZvbyddKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCB3cmFwIHR3aWNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby90b3VjaC9wZXJmb3JtJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7YWN0aW9uczogW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XX1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy52YWx1ZS5zaG91bGQuZGVlcC5lcXVhbChbW3tcImFjdGlvblwiOlwidGFwXCIsIFwib3B0aW9uc1wiOntcImVsZW1lbnRcIjpcIjNcIn19XSwgJ2ZvbyddKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb3B0aW9uYWwgc2V0cyBvZiBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZGVzaXJlZENhcGFiaWxpdGllcyA9IHthOiAnYid9O1xuICAgICAgbGV0IHJlcXVpcmVkQ2FwYWJpbGl0aWVzID0ge2M6ICdkJ307XG4gICAgICBpdCgnc2hvdWxkIGFsbG93IGNyZWF0ZSBzZXNzaW9uIHdpdGggZGVzaXJlZCBjYXBzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uJyxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBqc29uOiB7ZGVzaXJlZENhcGFiaWxpdGllc31cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChkZXNpcmVkQ2FwYWJpbGl0aWVzKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBjcmVhdGUgc2Vzc2lvbiB3aXRoIGRlc2lyZWQgYW5kIHJlcXVpcmVkIGNhcHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgIGRlc2lyZWRDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICByZXF1aXJlZENhcGFiaWxpdGllc1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgICByZXMudmFsdWUuc2hvdWxkLmVxbChfLmV4dGVuZCh7fSwgZGVzaXJlZENhcGFiaWxpdGllcywgcmVxdWlyZWRDYXBhYmlsaXRpZXMpKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHRvIGNyZWF0ZSBzZXNzaW9uIHdpdGhvdXQgZGVzaXJlZCBjYXBzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHt9XG4gICAgICAgIH0pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnNDAwJyk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB0byBjcmVhdGUgc2Vzc2lvbiB3aXRoIGRlc2lyZWQgY2FwcyBhbmQgcmFuZG9tIG90aGVyIHN0dWZmJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24nLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGpzb246IHtcbiAgICAgICAgICAgIGRlc2lyZWRDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICByYW5kb21DYXBhYmlsaXRpZWQ6IHt6OiAnLWEnfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCc0MDAnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYW5kbGUgY29tbWFuZHMgd2l0aCBubyByZXNwb25zZSB2YWx1ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZm9yd2FyZCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXMuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFsbG93IGVtcHR5IHN0cmluZyByZXNwb25zZSB2YWx1ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi9mb28vZWxlbWVudC9iYXIvdGV4dCcsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJlcy5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgc2Vzc2lvbklkOiBcImZvb1wiXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2VuZCA1MDAgcmVzcG9uc2UgYW5kIGFuIFVua25vd24gb2JqZWN0IGZvciByZWplY3RlZCBjb21tYW5kcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2Zvby9yZWZyZXNoJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAxMyxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnQW4gdW5rbm93biBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBwcm9jZXNzaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICd0aGUgY29tbWFuZC4gT3JpZ2luYWwgZXJyb3I6IFRvbyBGcmVzaCEnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBVbmtub3duRXJyb3Igd2hlbiBrbm93bicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uL2ZvbycsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDQwNCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiA2LFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBIHNlc3Npb24gaXMgZWl0aGVyIHRlcm1pbmF0ZWQgb3Igbm90IHN0YXJ0ZWQnXG4gICAgICAgIH0sXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXNzaW9uIElkcycsICgpID0+IHtcbiAgICBsZXQgZHJpdmVyID0gbmV3IEZha2VEcml2ZXIoKTtcbiAgICBsZXQgbWpzb253cFNlcnZlcjtcblxuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBtanNvbndwU2VydmVyID0gYXdhaXQgc2VydmVyKHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkcml2ZXIpLCA4MTgxKTtcbiAgICB9KTtcblxuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIG1qc29ud3BTZXJ2ZXIuY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCggKCkgPT4ge1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBudWxsIFNlc3Npb25JZCBmb3IgY29tbWFuZHMgd2l0aG91dCBzZXNzaW9uSWRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3N0YXR1cycsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgc2hvdWxkLmVxdWFsKHJlcy5zZXNzaW9uSWQsIG51bGwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Jlc3BvbmRzIHdpdGggdGhlIHNhbWUgc2Vzc2lvbiBJRCBpbiB0aGUgcmVxdWVzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfVxuICAgICAgfSk7XG5cbiAgICAgIHNob3VsZC5leGlzdChyZXMuc2Vzc2lvbklkKTtcbiAgICAgIHJlcy5zZXNzaW9uSWQuc2hvdWxkLmVxbChzZXNzaW9uSWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3llbGxzIGlmIG5vIHNlc3Npb24gZXhpc3RzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHNlc3Npb25JZCA9ICdWYWRlciBTZXNzaW9ucyc7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDQwNCk7XG4gICAgICByZXMuYm9keS5zdGF0dXMuc2hvdWxkLmVxdWFsKDYpO1xuICAgICAgcmVzLmJvZHkudmFsdWUubWVzc2FnZS5zaG91bGQuY29udGFpbignc2Vzc2lvbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3llbGxzIGlmIGludmFsaWQgc2Vzc2lvbiBpcyBzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHNlc3Npb25JZCA9ICdWYWRlciBTZXNzaW9ucyc7XG4gICAgICBkcml2ZXIuc2Vzc2lvbklkID0gJ3JlY2Vzc2lvbic7XG5cbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDQwNCk7XG4gICAgICByZXMuYm9keS5zdGF0dXMuc2hvdWxkLmVxdWFsKDYpO1xuICAgICAgcmVzLmJvZHkudmFsdWUubWVzc2FnZS5zaG91bGQuY29udGFpbignc2Vzc2lvbicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHNlc3Npb24gSURzIGluIGVycm9yIHJlc3BvbnNlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSAnVmFkZXIgU2Vzc2lvbnMnO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3JlZnJlc2hgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogVG9vIEZyZXNoISdcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgbmV3IHNlc3Npb24gSUQgb24gY3JlYXRlJywgYXN5bmMgKCkgPT4ge1xuXG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbicsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7ZGVzaXJlZENhcGFiaWxpdGllczoge2dyZWV0aW5nOiAnaGVsbG8nfSwgcmVxdWlyZWRDYXBhYmlsaXRpZXM6IHt2YWxlZGljdGlvbjogJ2J5ZSd9fVxuICAgICAgfSk7XG5cbiAgICAgIHNob3VsZC5leGlzdChyZXMuc2Vzc2lvbklkKTtcbiAgICAgIHJlcy5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKCcxMjM0Jyk7XG4gICAgICByZXMudmFsdWUuc2hvdWxkLmVxbCh7Z3JlZXRpbmc6ICdoZWxsbycsIHZhbGVkaWN0aW9uOiAnYnllJ30pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgndmlhIGRyaXZlcnMganNvbndwIHByb3h5JywgKCkgPT4ge1xuICAgIGxldCBkcml2ZXI7XG4gICAgbGV0IHNlc3Npb25JZCA9ICdmb28nO1xuICAgIGxldCBtanNvbndwU2VydmVyO1xuXG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgICAgZHJpdmVyLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICAgIGRyaXZlci5wcm94eUFjdGl2ZSA9ICgpID0+IHsgcmV0dXJuIHRydWU7IH07XG4gICAgICBkcml2ZXIuY2FuUHJveHkgPSAoKSA9PiB7IHJldHVybiB0cnVlOyB9O1xuXG4gICAgICBtanNvbndwU2VydmVyID0gYXdhaXQgc2VydmVyKHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkcml2ZXIpLCA4MTgxKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBtanNvbndwU2VydmVyLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGdpdmUgYSBuaWNlIGVycm9yIGlmIHByb3h5aW5nIGlzIHNldCBidXQgbm8gcHJveHkgZnVuY3Rpb24gZXhpc3RzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLmNhblByb3h5ID0gKCkgPT4geyByZXR1cm4gZmFsc2U7IH07XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg1MDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMTMsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgbWVzc2FnZTogJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyAnICtcbiAgICAgICAgICAgICAgICAgICAndGhlIGNvbW1hbmQuIE9yaWdpbmFsIGVycm9yOiBUcnlpbmcgdG8gcHJveHkgdG8gYSBKU09OV1AgJyArXG4gICAgICAgICAgICAgICAgICAgJ3NlcnZlciBidXQgZHJpdmVyIGlzIHVuYWJsZSB0byBwcm94eSdcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcGFzcyBvbiBhbnkgZXJyb3JzIGluIHByb3h5aW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLnByb3h5UmVxUmVzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJmb29cIik7XG4gICAgICB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe1xuICAgICAgICBzdGF0dXM6IDEzLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdBbiB1bmtub3duIHNlcnZlci1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIHByb2Nlc3NpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgJ3RoZSBjb21tYW5kLiBPcmlnaW5hbCBlcnJvcjogQ291bGQgbm90IHByb3h5LiBQcm94eSAnICtcbiAgICAgICAgICAgICAgICAgICAnZXJyb3I6IGZvbydcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvbklkXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWJsZSB0byB0aHJvdyBQcm94eVJlcXVlc3RFcnJvciBpbiBwcm94eWluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5wcm94eVJlcVJlcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGpzb253cCA9IHtzdGF0dXM6IDM1LCB2YWx1ZTogXCJObyBzdWNoIGNvbnRleHQgZm91bmQuXCIsIHNlc3Npb25JZDogXCJmb29cIn07XG4gICAgICAgIHRocm93ICBuZXcgZXJyb3JzLlByb3h5UmVxdWVzdEVycm9yKGBDb3VsZCBub3QgcHJveHkgY29tbWFuZCB0byByZW1vdGUgc2VydmVyLiBgLCBqc29ud3ApO1xuICAgICAgfTtcbiAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MTgxL3dkL2h1Yi9zZXNzaW9uLyR7c2Vzc2lvbklkfS91cmxgLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAzNSxcbiAgICAgICAgXCJ2YWx1ZVwiOiB7IFwibWVzc2FnZVwiOiBcIk5vIHN1Y2ggY29udGV4dCBmb3VuZC5cIn0sXG4gICAgICAgIHNlc3Npb25JZDogXCJmb29cIlxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxldCB0aGUgcHJveHkgaGFuZGxlIHJlcS9yZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIucHJveHlSZXFSZXMgPSBhc3luYyBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe2N1c3RvbTogJ2RhdGEnfSk7XG4gICAgICB9O1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBqc29uOiB7dXJsOiAnaHR0cDovL2dvb2dsZS5jb20nfSxcbiAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgIHNpbXBsZTogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcbiAgICAgIHJlcy5ib2R5LnNob3VsZC5lcWwoe2N1c3RvbTogJ2RhdGEnfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGF2b2lkIGpzb253cCBwcm94eWluZyB3aGVuIHBhdGggbWF0Y2hlcyBhdm9pZGFuY2UgbGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCA9ICgpID0+IHsgcmV0dXJuIFtbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdXJsJCcpXV07IH07XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH0vdXJsYCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGpzb246IHt1cmw6ICdodHRwOi8vZ29vZ2xlLmNvbSd9LFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgcmVzLmJvZHkuc2hvdWxkLmVxbCh7XG4gICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgdmFsdWU6IFwiTmF2aWdhdGVkIHRvOiBodHRwOi8vZ29vZ2xlLmNvbVwiLFxuICAgICAgICBzZXNzaW9uSWRcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIGF2b2lkIHByb3h5IGxpc3QgaXMgbWFsZm9ybWVkIGluIHNvbWUgd2F5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXN5bmMgZnVuY3Rpb24gYmFkUHJveHlBdm9pZGFuY2VMaXN0IChsaXN0KSB7XG4gICAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCA9ICgpID0+IHsgcmV0dXJuIGxpc3Q7IH07XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3Nlc3Npb24vJHtzZXNzaW9uSWR9L3VybGAsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAganNvbjoge3VybDogJ2h0dHA6Ly9nb29nbGUuY29tJ30sXG4gICAgICAgICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUsXG4gICAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNTAwKTtcbiAgICAgICAgcmVzLmJvZHkuc3RhdHVzLnNob3VsZC5lcXVhbCgxMyk7XG4gICAgICAgIHJlcy5ib2R5LnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oXCJyb3h5XCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdHMgPSBbXG4gICAgICAgICdmb28nLFxuICAgICAgICBbWydmb28nXV0sXG4gICAgICAgIFtbJ0JBUicsIC9sb2wvXV0sXG4gICAgICAgIFtbJ0dFVCcsICdmb28nXV1cbiAgICAgIF07XG4gICAgICBmb3IgKGxldCBsaXN0IG9mIGxpc3RzKSB7XG4gICAgICAgIGF3YWl0IGJhZFByb3h5QXZvaWRhbmNlTGlzdChsaXN0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYXZvaWQgcHJveHlpbmcgbm9uLXNlc3Npb24gY29tbWFuZHMgZXZlbiBpZiBub3QgaW4gdGhlIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QgPSAoKSA9PiB7IHJldHVybiBbWydQT1NUJywgbmV3IFJlZ0V4cCgnJyldXTsgfTtcblxuICAgICAgbGV0IHJlcyA9IGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3N0YXR1c2AsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGpzb246IHRydWUsXG4gICAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlLFxuICAgICAgICBzaW1wbGU6IGZhbHNlXG4gICAgICB9KTtcblxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDIwMCk7XG4gICAgICByZXMuYm9keS5zaG91bGQuZXFsKHtcbiAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICB2YWx1ZTogXCJJJ20gZmluZVwiLFxuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhdm9pZCBwcm94eWluZyBkZWxldGVTZXNzaW9uIGNvbW1hbmRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0ID0gKCkgPT4geyByZXR1cm4gW1snUE9TVCcsIG5ldyBSZWdFeHAoJycpXV07IH07XG5cbiAgICAgIGRyaXZlci5zZXNzaW9uSWQuc2hvdWxkLmVxdWFsKHNlc3Npb25JZCk7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODE4MS93ZC9odWIvc2Vzc2lvbi8ke3Nlc3Npb25JZH1gLFxuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICByZXNvbHZlV2l0aEZ1bGxSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgc2ltcGxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgyMDApO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChkcml2ZXIuc2Vzc2lvbklkKTtcbiAgICAgIGRyaXZlci5qd3BQcm94eUFjdGl2ZS5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=