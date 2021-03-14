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

import resolvePathname from 'resolve-pathname';
import valueEqual from 'value-equal';
import { parsePath } from './PathUtils';
import querystring from 'query-string';


const getQuery = search => {
  let query = search ? querystring.parse(search) : {};
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
    // Do not return empty objects
    if(Object.keys(otherQuery).length !== 0){
      return querystring.stringify({
        _: JSON.stringify(otherQuery)
      });
    }
  }
  return '';
};

export var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);

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
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

export var locationsAreEqual = function locationsAreEqual(a, b) {
  return (
    a.pathname === b.pathname &&
    a.search === b.search &&
    a.hash === b.hash &&
    a.key === b.key &&
    valueEqual(a.state, b.state)
  );
};
