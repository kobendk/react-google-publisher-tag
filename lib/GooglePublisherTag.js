"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactMeasure = _interopRequireDefault(require("react-measure"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _Format = _interopRequireDefault(require("./constants/Format"));

var _Dimensions = _interopRequireDefault(require("./constants/Dimensions"));

/**
 * https://developers.google.com/doubleclick-gpt/reference
*/
var nextId = 1;

function getNextId() {
  nextId += 1;
  return "rgpt-" + nextId;
}

function prepareDimensions(dimensions, format, canBeLower) {
  if (format === void 0) {
    format = _Format.default.HORIZONTAL;
  }

  if (canBeLower === void 0) {
    canBeLower = true;
  }

  if (!dimensions || !dimensions.length) {
    return _Dimensions.default[format] || [];
  }

  if (dimensions.length === 1 && canBeLower) {
    var dimension = dimensions[0];
    var key = dimension[0] + "x" + dimension[1];

    if (_Dimensions.default[key]) {
      return _Dimensions.default[key] || [];
    }
  }

  return dimensions;
}

function loadScript() {
  console.log("load script");
  var js = document.createElement('script');
  js.async = true;
  js.defer = true;
  js.src = 'https://www.googletagservices.com/tag/js/gpt.js';
  document.body.appendChild(js);
}

function initGooglePublisherTag(options, onInit) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      path = _options.path,
      onImpressionViewable = _options.onImpressionViewable,
      onSlotRenderEnded = _options.onSlotRenderEnded,
      onSlotVisibilityChanged = _options.onSlotVisibilityChanged;
  var firstTime = !window.googletag;
  var googletag = window.googletag = window.googletag || {};
  googletag.cmd = googletag.cmd || [];
  console.log("firstTime", firstTime);

  if (firstTime) {
    googletag.cmd.push(function () {
      if (options.enableSingleRequest) {
        // Infinite scroll requires SRA
        googletag.pubads().enableSingleRequest();
      } // collapse div without ad
      // googletag.pubads().collapseEmptyDivs();
      // load ad with slot refresh


      googletag.pubads().disableInitialLoad(); // enable google publisher tag

      googletag.enableServices();
    });
    loadScript();
  } // Execute callback when the slot is visible in DOM (thrown before 'impressionViewable' )


  if (onSlotRenderEnded) {
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('slotRenderEnded', function (event) {
        // check if the current slot is the one the callback was added to
        // (as addEventListener is global)
        if (event.slot.getAdUnitPath() === path) {
          onSlotRenderEnded(event);
        }
      });
    });
  } // Execute callback when ad is completely visible in DOM


  if (onImpressionViewable) {
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('impressionViewable', function (event) {
        if (event.slot.getAdUnitPath() === path) {
          onImpressionViewable(event);
        }
      });
    });
  } // Execute callback whenever the on-screen percentage of an ad slot's area changes


  if (onSlotVisibilityChanged) {
    googletag.cmd.push(function () {
      googletag.pubads().addEventListener('slotVisibilityChanged', function (event) {
        if (event.slot.getAdUnitPath() === path) {
          onSlotVisibilityChanged(event);
        }
      });
    });
  }

  if (onInit) {
    googletag.cmd.push(function () {
      onInit(googletag);
    });
  }
}

var GooglePublisherTag =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(GooglePublisherTag, _PureComponent);

  function GooglePublisherTag() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(_args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleResize", function (contentRect) {
      _this.setState({
        bounds: contentRect.bounds
      }, function () {
        console.log("handleResize - do update"); //this.update(this.props);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", (0, _debounce.default)(function (props) {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          id = _assertThisInitialize.id,
          node = _assertThisInitialize.node,
          googletag = _assertThisInitialize.googletag,
          bounds = _assertThisInitialize.state.bounds;

      if (!googletag || !node || !bounds) {
        return;
      }

      var width = bounds.width;
      var dimensions = props.dimensions,
          format = props.format,
          canBeLower = props.canBeLower,
          targeting = props.targeting,
          collapseEmpty = props.collapseEmpty,
          fluid = props.fluid;
      var availableDimensions = prepareDimensions(dimensions, format, canBeLower).filter(function (dimension) {
        return dimension === 'fluid' || dimension[0] <= width;
      });

      if (fluid && !availableDimensions.find(function (dimension) {
        return dimension === 'fluid';
      })) {
        availableDimensions.push('fluid');
      } // do nothink


      if (JSON.stringify(targeting) === JSON.stringify(_this.currentTargeting) && JSON.stringify(availableDimensions) === JSON.stringify(_this.currentDimensions)) {
        return;
      }

      _this.currentTargeting = targeting;
      _this.currentDimensions = availableDimensions; // remove current slot because dimensions is changed and current slot is old

      _this.removeSlot(); // there is nothink to display


      if (!availableDimensions || !availableDimensions.length) {
        return;
      } // prepare new node content


      var adId = id || getNextId();
      node.innerHTML = "<div id=\"" + adId + "\"></div>"; // prepare new slot

      var slot = googletag.defineSlot(props.path, availableDimensions, adId);
      _this.slot = slot; // set targeting

      if (targeting) {
        Object.keys(targeting).forEach(function (key) {
          slot.setTargeting(key, targeting[key]);
        });
      } // set collapsing


      if (typeof collapseEmpty !== 'undefined') {
        var args = Array.isArray(collapseEmpty) ? collapseEmpty : [collapseEmpty];
        slot.setCollapseEmptyDiv.apply(slot, args);
      }

      slot.addService(googletag.pubads()); // display new slot

      googletag.display(adId);
      googletag.pubads().refresh([slot]);
    }, _this.props.resizeDebounce));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleNode", function (node) {
      _this.node = node;

      _this.update(_this.props);
    });
    return _this;
  }

  var _proto = GooglePublisherTag.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$props = this.props,
        path = _this$props.path,
        onImpressionViewable = _this$props.onImpressionViewable,
        onSlotRenderEnded = _this$props.onSlotRenderEnded,
        onSlotVisibilityChanged = _this$props.onSlotVisibilityChanged;
    var options = {
      path: path,
      onImpressionViewable: onImpressionViewable,
      onSlotRenderEnded: onSlotRenderEnded,
      onSlotVisibilityChanged: onSlotVisibilityChanged
    };
    initGooglePublisherTag(options, function (googletag) {
      _this2.googletag = googletag;

      _this2.update(_this2.props);
    });
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.update(props);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeSlot();
  };

  _proto.removeSlot = function removeSlot() {
    var slot = this.slot,
        googletag = this.googletag,
        node = this.node;

    if (slot && googletag) {
      googletag.destroySlots([slot]);
      this.slot = null;

      if (node) {
        node.innerHTML = null;
      }
    }
  };

  _proto.refreshSlot = function refreshSlot() {
    var slot = this.slot,
        googletag = this.googletag;

    if (slot && googletag) {
      googletag.pubads().refresh([slot]);
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    return _react.default.createElement(_reactMeasure.default, {
      onResize: this.handleResize,
      bounds: true
    }, function (_ref) {
      var measureRef = _ref.measureRef;
      return _react.default.createElement("div", {
        ref: measureRef
      }, _react.default.createElement("div", {
        ref: _this3.handleNode
      }));
    });
  };

  return GooglePublisherTag;
}(_react.PureComponent);

exports.default = GooglePublisherTag;
GooglePublisherTag.defaultProps = {
  id: undefined,
  format: _Format.default.MOBILE_HORIZONTAL,
  canBeLower: true,
  enableSingleRequest: false,
  dimensions: undefined,
  targeting: undefined,
  resizeDebounce: 100,
  onSlotRenderEnded: undefined,
  onSlotVisibilityChanged: undefined,
  onImpressionViewable: undefined,
  collapseEmpty: false,
  fluid: false
};
//# sourceMappingURL=GooglePublisherTag.js.map