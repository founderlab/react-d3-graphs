const d3 = require('d3')
import React from 'react'
import ReactFauxDOM from 'react-faux-dom'

export default class D3LineGraph extends React.Component {
  render() {
    const data = this.props.data

    if (data.length === 0 ) {
      return null
    }
    else {
      //return d3 graph
      const margin = {top: 20, right: 20, bottom: 30, left: 50}
      const width = 960 - margin.left - margin.right
      const height = 500 - margin.top - margin.bottom

      // parse the date / time
      // const parseTime = d3.timeParse('%d-%b-%y')

      // set the ranges
      const x = d3.scaleTime().range([0, width])
      const y = d3.scaleLinear().range([height, 0])

      // define the area
      const area = d3.area()
        .x(function(d) { return x(d.date) })
        .y0(height)
        .y1(function(d) { return y(d.count) })

      // define the line
      const valueline = d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.count) })

      const node = ReactFauxDOM.createElement('svg')
      const svg = d3.select(node)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // format the data
      data.forEach(function(d) {
        //d.date = parseTime(d.date)
        d.date = +d.date
        d.count = +d.count
      })

      // scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date }))
      y.domain([0, d3.max(data, function(d) { return d.count })])

      if (this.props.area) {
        // add the area
        svg.append('path')
          .data([data])
          .attr('class', 'area')
          .attr('d', area)
      }

      // add the valueline path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline)

      // add the X Axis
      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))

      // add the Y Axis
      svg.append('g')
        .call(d3.axisLeft(y))

      return node.toReact()
    }
  }
}

D3LineGraph.propTypes = {
  data: React.PropTypes.array,
  area: React.PropTypes.bool,
}
