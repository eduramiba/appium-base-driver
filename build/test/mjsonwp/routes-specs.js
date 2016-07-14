require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _lodash = require('lodash');

var _libMjsonwpRoutes = require('../../lib/mjsonwp/routes');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('MJSONWP', function () {

  // TODO test against an explicit protocol rather than a hash of a previous
  // protocol

  describe('ensure protocol consistency', function () {
    it('should not change protocol between patch versions', function callee$2$0() {
      var shasum, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, url, urlMapping, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, method, methodMapping, allParams, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, param, hash;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            shasum = _crypto2['default'].createHash('sha1');
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 4;
            _iterator = _getIterator(_lodash._.toPairs(_libMjsonwpRoutes.METHOD_MAP));

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$3$0.next = 65;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2);
            url = _step$value[0];
            urlMapping = _step$value[1];

            shasum.update(url);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$3$0.prev = 14;
            _iterator2 = _getIterator(_lodash._.toPairs(urlMapping));

          case 16:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$3$0.next = 48;
              break;
            }

            _step2$value = _slicedToArray(_step2.value, 2);
            method = _step2$value[0];
            methodMapping = _step2$value[1];

            shasum.update(method);
            if (methodMapping.command) shasum.update(methodMapping.command);

            if (!methodMapping.payloadParams) {
              context$3$0.next = 45;
              break;
            }

            allParams = _lodash._.flatten(methodMapping.payloadParams.required);

            if (methodMapping.payloadParams.optional) {
              allParams = allParams.concat(_lodash._.flatten(methodMapping.payloadParams.optional));
            }
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$3$0.prev = 28;
            for (_iterator3 = _getIterator(allParams); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              param = _step3.value;

              shasum.update(param);
            }
            context$3$0.next = 36;
            break;

          case 32:
            context$3$0.prev = 32;
            context$3$0.t0 = context$3$0['catch'](28);
            _didIteratorError3 = true;
            _iteratorError3 = context$3$0.t0;

          case 36:
            context$3$0.prev = 36;
            context$3$0.prev = 37;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 39:
            context$3$0.prev = 39;

            if (!_didIteratorError3) {
              context$3$0.next = 42;
              break;
            }

            throw _iteratorError3;

          case 42:
            return context$3$0.finish(39);

          case 43:
            return context$3$0.finish(36);

          case 44:
            if (methodMapping.payloadParams.wrap) {
              shasum.update('skip');
              shasum.update(methodMapping.payloadParams.wrap);
            }

          case 45:
            _iteratorNormalCompletion2 = true;
            context$3$0.next = 16;
            break;

          case 48:
            context$3$0.next = 54;
            break;

          case 50:
            context$3$0.prev = 50;
            context$3$0.t1 = context$3$0['catch'](14);
            _didIteratorError2 = true;
            _iteratorError2 = context$3$0.t1;

          case 54:
            context$3$0.prev = 54;
            context$3$0.prev = 55;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 57:
            context$3$0.prev = 57;

            if (!_didIteratorError2) {
              context$3$0.next = 60;
              break;
            }

            throw _iteratorError2;

          case 60:
            return context$3$0.finish(57);

          case 61:
            return context$3$0.finish(54);

          case 62:
            _iteratorNormalCompletion = true;
            context$3$0.next = 6;
            break;

          case 65:
            context$3$0.next = 71;
            break;

          case 67:
            context$3$0.prev = 67;
            context$3$0.t2 = context$3$0['catch'](4);
            _didIteratorError = true;
            _iteratorError = context$3$0.t2;

          case 71:
            context$3$0.prev = 71;
            context$3$0.prev = 72;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 74:
            context$3$0.prev = 74;

            if (!_didIteratorError) {
              context$3$0.next = 77;
              break;
            }

            throw _iteratorError;

          case 77:
            return context$3$0.finish(74);

          case 78:
            return context$3$0.finish(71);

          case 79:
            hash = shasum.digest('hex').substring(0, 8);

            // Modify the hash whenever the protocol has intentionally been modified.
            hash.should.equal('78590b48');

          case 81:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[4, 67, 71, 79], [14, 50, 54, 62], [28, 32, 36, 44], [37,, 39, 43], [55,, 57, 61], [72,, 74, 78]]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvbWpzb253cC9yb3V0ZXMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBRWtCLFFBQVE7O2dDQUNDLDBCQUEwQjs7c0JBQ2xDLFFBQVE7Ozs7b0JBQ1YsTUFBTTs7OztBQUd2QixrQkFBSyxNQUFNLEVBQUUsQ0FBQzs7QUFFZCxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07Ozs7O0FBS3hCLFVBQVEsQ0FBQyw2QkFBNkIsRUFBRSxZQUFNO0FBQzVDLE1BQUUsQ0FBQyxtREFBbUQsRUFBRTtVQUNsRCxNQUFNLCtGQUNBLEdBQUcsRUFBRSxVQUFVLHFHQUViLE1BQU0sRUFBRSxhQUFhLEVBSXZCLFNBQVMsdUZBSUosS0FBSyxFQVVoQixJQUFJOzs7OztBQXJCSixrQkFBTSxHQUFHLG9CQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7Ozs7O3FDQUNSLFVBQUUsT0FBTyw4QkFBWTs7Ozs7Ozs7O0FBQXpDLGVBQUc7QUFBRSxzQkFBVTs7QUFDdkIsa0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O3NDQUNpQixVQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7OztBQUEvQyxrQkFBTTtBQUFFLHlCQUFhOztBQUM3QixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QixnQkFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztpQkFDNUQsYUFBYSxDQUFDLGFBQWE7Ozs7O0FBQ3pCLHFCQUFTLEdBQUcsVUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O0FBQy9ELGdCQUFJLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQ3hDLHVCQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDL0U7Ozs7O0FBQ0QsMkNBQWtCLFNBQVMseUdBQUU7QUFBcEIsbUJBQUs7O0FBQ1osb0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsZ0JBQUksYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7QUFDcEMsb0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsb0JBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUgsZ0JBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7QUFFL0MsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7O0tBQy9CLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L21qc29ud3Avcm91dGVzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IF8gfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgTUVUSE9EX01BUCB9IGZyb20gJy4uLy4uL2xpYi9tanNvbndwL3JvdXRlcyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcblxuXG5jaGFpLnNob3VsZCgpO1xuXG5kZXNjcmliZSgnTUpTT05XUCcsICgpID0+IHtcblxuICAvLyBUT0RPIHRlc3QgYWdhaW5zdCBhbiBleHBsaWNpdCBwcm90b2NvbCByYXRoZXIgdGhhbiBhIGhhc2ggb2YgYSBwcmV2aW91c1xuICAvLyBwcm90b2NvbFxuXG4gIGRlc2NyaWJlKCdlbnN1cmUgcHJvdG9jb2wgY29uc2lzdGVuY3knLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBub3QgY2hhbmdlIHByb3RvY29sIGJldHdlZW4gcGF0Y2ggdmVyc2lvbnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICB2YXIgc2hhc3VtID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTEnKTtcbiAgICAgIGZvciAobGV0IFt1cmwsIHVybE1hcHBpbmddIG9mIF8udG9QYWlycyhNRVRIT0RfTUFQKSkge1xuICAgICAgICBzaGFzdW0udXBkYXRlKHVybCk7XG4gICAgICAgIGZvciAobGV0IFttZXRob2QsIG1ldGhvZE1hcHBpbmddIG9mIF8udG9QYWlycyh1cmxNYXBwaW5nKSkge1xuICAgICAgICAgIHNoYXN1bS51cGRhdGUobWV0aG9kKTtcbiAgICAgICAgICBpZiAobWV0aG9kTWFwcGluZy5jb21tYW5kKSBzaGFzdW0udXBkYXRlKG1ldGhvZE1hcHBpbmcuY29tbWFuZCk7XG4gICAgICAgICAgaWYgKG1ldGhvZE1hcHBpbmcucGF5bG9hZFBhcmFtcykge1xuICAgICAgICAgICAgbGV0IGFsbFBhcmFtcyA9IF8uZmxhdHRlbihtZXRob2RNYXBwaW5nLnBheWxvYWRQYXJhbXMucmVxdWlyZWQpO1xuICAgICAgICAgICAgaWYgKG1ldGhvZE1hcHBpbmcucGF5bG9hZFBhcmFtcy5vcHRpb25hbCkge1xuICAgICAgICAgICAgICBhbGxQYXJhbXMgPSBhbGxQYXJhbXMuY29uY2F0KF8uZmxhdHRlbihtZXRob2RNYXBwaW5nLnBheWxvYWRQYXJhbXMub3B0aW9uYWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHBhcmFtIG9mIGFsbFBhcmFtcykge1xuICAgICAgICAgICAgICBzaGFzdW0udXBkYXRlKHBhcmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZXRob2RNYXBwaW5nLnBheWxvYWRQYXJhbXMud3JhcCkge1xuICAgICAgICAgICAgICBzaGFzdW0udXBkYXRlKCdza2lwJyk7XG4gICAgICAgICAgICAgIHNoYXN1bS51cGRhdGUobWV0aG9kTWFwcGluZy5wYXlsb2FkUGFyYW1zLndyYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGhhc2ggPSBzaGFzdW0uZGlnZXN0KCdoZXgnKS5zdWJzdHJpbmcoMCwgOCk7XG4gICAgICAvLyBNb2RpZnkgdGhlIGhhc2ggd2hlbmV2ZXIgdGhlIHByb3RvY29sIGhhcyBpbnRlbnRpb25hbGx5IGJlZW4gbW9kaWZpZWQuXG4gICAgICBoYXNoLnNob3VsZC5lcXVhbCgnNzg1OTBiNDgnKTtcbiAgICB9KTtcbiAgfSk7XG5cbn0pO1xuIl19