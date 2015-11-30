// var dataset = [
//   [5, 7, 3], [3, 6, 3], [3, 3, 4], [6, 9, 5], [1, 2, 6],
//   [4, 1, 5], [4, 4, 4], [2, 7, 3], [8, 1, 3], [2, 8, 4]
// ];

var dataset = [
  {"x": 5, "y": 7, "r": 3, "unit":"economics", "level": "department", "status":"ongoing"},
  {"x": 3, "y": 6, "r": 3, "unit":"law", "level": "department", "status":"complete"},
  {"x": 3, "y": 3, "r": 4, "unit":"science", "level": "department", "status":"ongoing"},
]

units = ["economics", "science", "law", "arts", "finance", "engineering", "psychology"]
levels = ["department", "school", "faculty"]

// Set the size of the graph
var w = 500;
var h = 500;
var padding = 30;

function hypot_length(x, y) {
  return Math.sqrt((x * x) + (y * y))
}

// Where the graph will be attached
var svg = d3.select("#main-content")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Set the scales
var xScale = d3.scale.linear()
  .domain([0, 9])
  .range([padding, w - padding]);

var yScale = d3.scale.linear()
  .domain([0, 9])
  .range([h - padding, padding]);

var zScale = d3.scale.linear()
  .domain([0, 9])
  // .range([padding, hypot_length(w-(2*padding), h-(2*padding))]);
  .range([padding, hypot_length(xScale(9), yScale(0))]);

var unitScale = d3.scale.category20()
  .domain(units);

// Create the axes
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickPadding(-3)
  .innerTickSize(0)
  .outerTickSize(0);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .tickPadding(-3)
  .innerTickSize(0)
  .outerTickSize(0);

var zAxis = d3.svg.axis()
  .scale(zScale)
  .orient("bottom")
  .tickPadding(-3)
  .innerTickSize(0)
  .outerTickSize(0);

// Attach the data
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
      return xScale(d.x);
   })
   .attr("cy", function(d) {
      return yScale(d.y);
   })
   .attr("r", function(d) {
      return d.r;
   })
   .attr("fill", function(d){
      return unitScale(d.unit);
   });

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - yScale(4.5)) + ")")
  .call(xAxis)
  .selectAll("text")
  .attr("transform", "rotate(90)");

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + xScale(4.5) + ",0)")
  .call(yAxis)
  .selectAll("text")
  .attr("transform", "rotate(45)");

svg.append("g")
  .attr("class", "axis")
  // .attr("transform", "translate(0," + (h - yScale(9)) + ") rotate(-45, " + w/2 + ", " + 0 + ")")
  // .attr("transform", "translate(0, 500) rotate(-45)")
  .attr("transform", "translate(0," + (h - xScale(0)) + ") rotate(-45 30 0)")
  .call(zAxis)
  .selectAll("text")
  .attr("transform", "rotate(0)");

svg.attr("transform", "rotate(-45, " + w/2 + ", " + h/2 + ")")
