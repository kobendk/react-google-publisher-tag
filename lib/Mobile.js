"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = Mobile;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _GooglePublisherTag = _interopRequireDefault(require("./GooglePublisherTag"));

var _Format = _interopRequireDefault(require("./constants/Format"));

function Mobile(props) {
  var small = props.small,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["small"]);
  return _react.default.createElement(_GooglePublisherTag.default, (0, _extends2.default)({
    format: small ? _Format.default.MOBILE : _Format.default.MOBILE_BIG
  }, rest));
}

Mobile.defaultProps = {
  small: false
};
//# sourceMappingURL=Mobile.js.map