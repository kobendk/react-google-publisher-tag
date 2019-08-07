"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Horizontal;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _GooglePublisherTag = _interopRequireDefault(require("./GooglePublisherTag"));

var _Format = _interopRequireDefault(require("./constants/Format"));

function Horizontal(props) {
  var mobile = props.mobile;
  var format = mobile ? _Format.default.MOBILE_HORIZONTAL : _Format.default.HORIZONTAL;
  return _react.default.createElement(_GooglePublisherTag.default, (0, _extends2.default)({}, props, {
    format: format
  }));
}
//# sourceMappingURL=Horizontal.js.map