'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var d3 = require('d3');

var D3LineGraph = (function (_React$Component) {
  _inherits(D3LineGraph, _React$Component);

  function D3LineGraph() {
    _classCallCheck(this, D3LineGraph);

    _React$Component.apply(this, arguments);
  }

  D3LineGraph.prototype.render = function render() {
    var _this = this;

    var data = this.props.data;

    if (data.length === 0) {
      return null;
    } else {
      var _ret = (function () {
        //return d3 graph
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        // parse the date / time
        // const parseTime = d3.timeParse('%d-%b-%y')

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the area
        var area = d3.area().x(function (d) {
          return x(d.date);
        }).y0(height).y1(function (d) {
          return y(d.count);
        });

        // define the line
        var valueline = d3.line().x(function (d) {
          return x(d.date);
        }).y(function (d) {
          return y(d.count);
        });

        var node = _reactFauxDom2['default'].createElement('svg');
        var svg = d3.select(node).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // format the data
        data.forEach(function (d) {
          //d.date = parseTime(d.date)
          d.date = +d.date;
          d.count = +d.count;
        });

        // scale the range of the data
        x.domain(d3.extent(data, function (d) {
          return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
          return d.count;
        })]);

        if (_this.props.area) {
          // add the area
          svg.append('path').data([data]).attr('class', 'area').attr('d', area);
        }

        // add the valueline path.
        svg.append('path').data([data]).attr('class', 'line').attr('d', valueline);

        // add the X Axis
        svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));

        // add the Y Axis
        svg.append('g').call(d3.axisLeft(y));

        return {
          v: node.toReact()
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  };

  return D3LineGraph;
})(_react2['default'].Component);

exports['default'] = D3LineGraph;

D3LineGraph.propTypes = {
  data: _react2['default'].PropTypes.array,
  area: _react2['default'].PropTypes.bool
};
module.exports = exports['default'];