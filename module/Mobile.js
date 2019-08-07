import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import Ad from './GooglePublisherTag';
import Format from './constants/Format';
export default function Mobile(props) {
  const {
    small
  } = props,
        rest = _objectWithoutProperties(props, ["small"]);

  return React.createElement(Ad, _extends({
    format: small ? Format.MOBILE : Format.MOBILE_BIG
  }, rest));
}
Mobile.defaultProps = {
  small: false
};
//# sourceMappingURL=Mobile.js.map