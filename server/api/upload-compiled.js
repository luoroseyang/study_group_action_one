'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = api;

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _requireDir2.default)('./routes');

function api() {
  var router = new _koaRouter2.default({
    prefix: _configs2.default.app.baseApi
  });
  (0, _keys2.default)(routes).forEach(function (name) {
    return routes[name]['default'](router);
  });
  return _koaConvert2.default.compose([router.routes(), router.allowedMethods()]);
}

//# sourceMappingURL=upload-compiled.js.map