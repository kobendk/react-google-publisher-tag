"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Format = _interopRequireDefault(require("./Format"));

var _default = {
  [_Format.default.FLUID]: ['fluid'],
  [_Format.default.HORIZONTAL]: [[970, 90], [728, 90], [468, 60], [234, 60]],
  [_Format.default.RECTANGLE]: [[336, 280], [300, 250], [250, 250], [200, 200], [180, 150], [125, 125]],
  [_Format.default.VERTICAL]: [[300, 600], [160, 600], [120, 600], [120, 240]],
  [_Format.default.MOBILE]: [[320, 50]],
  [_Format.default.MOBILE_BIG]: [[320, 100], [320, 50]],
  [_Format.default.MOBILE_HORIZONTAL]: [[970, 90], [728, 90], [468, 60], [320, 100], [320, 50], [234, 60]],
  [_Format.default.PORTRET]: [[300, 1050]],
  [_Format.default.BILBORD]: [[970, 250]],
  '300x600': [[300, 600], [160, 600]],
  '336x280': [[336, 280], [300, 250]],
  '728x90': [[728, 90], [468, 60]],
  '970x90': [[970, 90], [728, 90], [468, 60]]
};
exports.default = _default;
//# sourceMappingURL=Dimensions.js.map