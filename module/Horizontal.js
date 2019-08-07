import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Ad from './GooglePublisherTag';
import Format from './constants/Format';
export default function Horizontal(props) {
  const {
    mobile
  } = props;
  const format = mobile ? Format.MOBILE_HORIZONTAL : Format.HORIZONTAL;
  return React.createElement(Ad, _extends({}, props, {
    format: format
  }));
}
//# sourceMappingURL=Horizontal.js.map