import React, { Component } from "react";
import * as d3 from "d3";
class Child1 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.data1);
  }

  componentDidUpdate() {
    console.log(this.props.data1);

    var data = this.props.data1;

    var margin = { top: 50, right: 40, bottom: 40, left: 60 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map((item) => item.total_bill);
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, w]);
    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    var y_data = data.map((item) => item.tip);
    const y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.total_bill);
      })
      .attr("cy", function (d) {
        return y_scale(d.tip);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");

    d3.select(".child1_svg")
      .selectAll(".title")
      .data([0])
      .join("text")
      .attr("class", "title")
      .attr("x", w / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Total Bill vs Tips");

    d3.select(".child1_svg")
      .selectAll(".x_axis_label")
      .data([0])
      .join("text")
      .attr("class", "x_axis_label")
      .attr("x", w / 2 + margin.left)
      .attr("y", h + margin.top + 30)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Total Bill");

    d3.select(".child1_svg")
      .selectAll(".y_axis_label")
      .data([0])
      .join("text")
      .attr("class", "y_axis_label")
      .attr("x", -h / 2 - margin.top)
      .attr("y", margin.left + 20)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Tips");
  }
  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
