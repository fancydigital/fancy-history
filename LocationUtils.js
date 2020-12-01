'use strict';

exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _resolvePathname = require('resolve-pathname');

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = require('value-equal');

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = require('./PathUtils');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const getQuery = search => {
  let query = search ? _queryString2.default.parse(search) : {};
  let _ = {};
  try {
    _ = JSON.parse(query['_']);
  } catch (e) {
  } finally {
    delete query['_'];
  }

  return _extends(_, query);
};

const getSearch = query => {
  if (query) {
    let otherQuery = query;
    if (query['_']) {
      otherQuery = _extends({}, query['_'], otherQuery);
      delete query['_'];
    }
    return _queryString2.default.stringify({
      _: JSON.stringify(otherQuery)
    });
  }
  return '';
};
var createLocation = (exports.createLocation = function createLocation(
  path,
  state,
  key,
  currentLocation
) {
  var location = void 0;
  console.log(path);
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.query = getQuery(location.search);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') {
        location.search = '?' + location.search;
      }
      location.query = getQuery(location.search);
    } else {
      location.search = getSearch(location.query);
      location.query = location.query || {};
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError(
        'Pathname "' +
          location.pathname +
          '" could not be decoded. ' +
          'This is likely caused by an invalid percent-encoding.'
      );
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(
        location.pathname,
        currentLocation.pathname
      );
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
});

var locationsAreEqual = (exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return (
    a.pathname === b.pathname &&
    a.search === b.search &&
    a.hash === b.hash &&
    a.key === b.key &&
    (0, _valueEqual2.default)(a.state, b.state)
  );
});
