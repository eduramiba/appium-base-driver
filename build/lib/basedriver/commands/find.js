"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
var commands = {},
    helpers = {},
    extensions = {};

// Override the following function for your own driver, and the rest is taken
// care of!

//helpers.findElOrEls = async function (strategy, selector, mult, context) {}
// strategy: locator strategy
// selector: the actual selector for finding an element
// mult: multiple elements or just one?
// context: finding an element from the root context? or starting from another element
//
// Returns an object which adheres to the way the JSON Wire Protocol represents elements:
// { ELEMENT: # }    eg: { ELEMENT: 3 }  or { ELEMENT: 1.023 }

commands.findElement = function callee$0$0(strategy, selector) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.validateLocatorStrategy(strategy);
        return context$1$0.abrupt("return", this.findElOrEls(strategy, selector, false));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElements = function callee$0$0(strategy, selector) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.validateLocatorStrategy(strategy);
        return context$1$0.abrupt("return", this.findElOrEls(strategy, selector, true));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElementFromElement = function callee$0$0(strategy, selector, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.validateLocatorStrategy(strategy);
        return context$1$0.abrupt("return", this.findElOrEls(strategy, selector, false, elementId));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElementsFromElement = function callee$0$0(strategy, selector, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.validateLocatorStrategy(strategy);
        return context$1$0.abrupt("return", this.findElOrEls(strategy, selector, true, elementId));

      case 2:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports["default"] = extensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2ZpbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFjakQsUUFBUSxDQUFDLFdBQVcsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVE7Ozs7QUFDdkQsWUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDOzs7Ozs7O0NBQ25ELENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVE7Ozs7QUFDeEQsWUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDOzs7Ozs7O0NBQ2xELENBQUM7O0FBRUYsUUFBUSxDQUFDLHNCQUFzQixHQUFHLG9CQUFnQixRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVM7Ozs7QUFDN0UsWUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQzs7Ozs7OztDQUM5RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTOzs7O0FBQzlFLFlBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0Q0FDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Q0FDN0QsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2ZpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbi8vIE92ZXJyaWRlIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb24gZm9yIHlvdXIgb3duIGRyaXZlciwgYW5kIHRoZSByZXN0IGlzIHRha2VuXG4vLyBjYXJlIG9mIVxuXG4vL2hlbHBlcnMuZmluZEVsT3JFbHMgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0KSB7fVxuLy8gc3RyYXRlZ3k6IGxvY2F0b3Igc3RyYXRlZ3lcbi8vIHNlbGVjdG9yOiB0aGUgYWN0dWFsIHNlbGVjdG9yIGZvciBmaW5kaW5nIGFuIGVsZW1lbnRcbi8vIG11bHQ6IG11bHRpcGxlIGVsZW1lbnRzIG9yIGp1c3Qgb25lP1xuLy8gY29udGV4dDogZmluZGluZyBhbiBlbGVtZW50IGZyb20gdGhlIHJvb3QgY29udGV4dD8gb3Igc3RhcnRpbmcgZnJvbSBhbm90aGVyIGVsZW1lbnRcbi8vXG4vLyBSZXR1cm5zIGFuIG9iamVjdCB3aGljaCBhZGhlcmVzIHRvIHRoZSB3YXkgdGhlIEpTT04gV2lyZSBQcm90b2NvbCByZXByZXNlbnRzIGVsZW1lbnRzOlxuLy8geyBFTEVNRU5UOiAjIH0gICAgZWc6IHsgRUxFTUVOVDogMyB9ICBvciB7IEVMRU1FTlQ6IDEuMDIzIH1cblxuY29tbWFuZHMuZmluZEVsZW1lbnQgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yKSB7XG4gIHRoaXMudmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3koc3RyYXRlZ3kpO1xuICByZXR1cm4gdGhpcy5maW5kRWxPckVscyhzdHJhdGVneSwgc2VsZWN0b3IsIGZhbHNlKTtcbn07XG5cbmNvbW1hbmRzLmZpbmRFbGVtZW50cyA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IpIHtcbiAgdGhpcy52YWxpZGF0ZUxvY2F0b3JTdHJhdGVneShzdHJhdGVneSk7XG4gIHJldHVybiB0aGlzLmZpbmRFbE9yRWxzKHN0cmF0ZWd5LCBzZWxlY3RvciwgdHJ1ZSk7XG59O1xuXG5jb21tYW5kcy5maW5kRWxlbWVudEZyb21FbGVtZW50ID0gYXN5bmMgZnVuY3Rpb24gKHN0cmF0ZWd5LCBzZWxlY3RvciwgZWxlbWVudElkKSB7XG4gIHRoaXMudmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3koc3RyYXRlZ3kpO1xuICByZXR1cm4gdGhpcy5maW5kRWxPckVscyhzdHJhdGVneSwgc2VsZWN0b3IsIGZhbHNlLCBlbGVtZW50SWQpO1xufTtcblxuY29tbWFuZHMuZmluZEVsZW1lbnRzRnJvbUVsZW1lbnQgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBlbGVtZW50SWQpIHtcbiAgdGhpcy52YWxpZGF0ZUxvY2F0b3JTdHJhdGVneShzdHJhdGVneSk7XG4gIHJldHVybiB0aGlzLmZpbmRFbE9yRWxzKHN0cmF0ZWd5LCBzZWxlY3RvciwgdHJ1ZSwgZWxlbWVudElkKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnN9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==