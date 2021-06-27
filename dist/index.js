"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GoogleTrends = void 0;

var _react = _interopRequireDefault(require("react"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactChartjs = require("react-chartjs-2");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GoogleTrends =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GoogleTrends, _React$Component);

  function GoogleTrends(props) {
    var _this;

    _classCallCheck(this, GoogleTrends);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleTrends).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(GoogleTrends, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$prop = _this$props.prop,
          prop = _this$props$prop === void 0 ? 'google_trends' : _this$props$prop,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'google_trends_img' : _this$props$imgProp,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'light' : _this$props$theme,
          _this$props$count = _this$props.count,
          count = _this$props$count === void 0 ? 60 : _this$props$count;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile[imgProp] && profile[imgProp].url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " google trends"),
          src: profile[imgProp].url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile[imgProp].url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      var initialData = _lodash["default"].get(profile, "".concat(prop, ".data"), []).slice(-1 * count);

      var keyword = _lodash["default"].get(profile, "".concat(prop, ".keyword")) || profile.keyword;
      var dataColor = theme === 'light' ? 'rgba(66, 133, 244, 0.5)' : 'rgba(0, 192, 255, 0.5)';
      var gridColor = theme === 'light' ? 'rgba(80, 80, 80, 0.1)' : 'rgba(255, 255, 255, 0.2)';
      var data = {
        labels: initialData.map(function (d) {
          return _dayjs["default"].unix(d.time).format('YYYYMM');
        }),
        datasets: [{
          fill: true,
          lineTension: 0.5,
          backgroundColor: dataColor,
          borderColor: '#1974D2',
          borderCapStyle: 'butt',
          borderWidth: 1,
          pointRadius: 3,
          pointHoverRadius: 2,
          pointBorderWidth: 1,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointHitRadius: 2,
          data: initialData.map(function (d) {
            return d.value;
          })
        }]
      };
      var fontColor = theme === 'light' ? '#222222' : '#dddddd';
      var options = {
        legend: {
          display: false,
          label: {
            fontColor: fontColor,
            fontSize: 12
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: gridColor
            },
            ticks: {
              fontColor: fontColor,
              fontSize: 12
            }
          }],
          yAxes: [{
            gridLines: {
              color: gridColor
            },
            ticks: {
              fontColor: fontColor,
              fontSize: 12
            }
          }]
        }
      };
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 12
        },
        className: "theme-black-".concat(theme)
      }, _react["default"].createElement("div", {
        className: "theme-darkred-".concat(theme),
        style: {
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name, "\xA0", _react["default"].createElement("span", {
        className: "theme-green-".concat(theme)
      }, "Google 5-year Trends Analysis")), keyword ? _react["default"].createElement("span", {
        style: {
          fontSize: 12
        }
      }, "Keyword: ", _react["default"].createElement("b", {
        className: "theme-red-".concat(theme)
      }, keyword)) : null, _react["default"].createElement(_reactChartjs.Line, {
        data: data,
        height: 160,
        options: options
      }), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          padding: 5,
          paddingTop: 2
        }
      }, "Generated by ", _react["default"].createElement("a", {
        href: "https://twitter.com/earningsfly",
        target: "_blank",
        className: "theme-darkred-".concat(theme)
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\u2764\uFE0F")));
    }
  }]);

  return GoogleTrends;
}(_react["default"].Component);

exports.GoogleTrends = GoogleTrends;
var _default = GoogleTrends;
exports["default"] = _default;