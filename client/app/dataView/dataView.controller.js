'use strict';

angular.module('webrtcAppApp')
  .controller('DataviewCtrl', function ($scope) {

  	//make json or api call to get the data and run reusable chart functions, in this ase table function for a table
	
	// #### TABLE ######
	
	//Data Calling from static JSON
	d3.json('assets/dataDir/data.json',function(err,pics){
		// capture data in a avariable		
		var data = pics.data.children;
		//parent Div where table will be inserted
		var display = d3.select('.col-md-12');

		//table container
		var tdiv = display.append("div").classed("table-responsive",true);
		//instantiate chart function
		var table = d3.chart.tablejson();
		//set Data to table
		table.data(data);
		//render table
		table(tdiv);		
	 });	
	// Construction of reusable table function in d3 chart object
	if (!d3.chart) d3.chart = {};
	d3.chart.tablejson = function(){ 
	
		var data;
		var width;

		//reusable chart pattern
		function chart (container){
			//initialization code

			//append dynamic table with responsive bootstrap into container div 
			var table = container.append("table").classed("table table-bordred table-striped",true);
			//append thead to table
			var thead = table.append('thead');
			//append tbody to table
			var tbody = table.append('tbody');
			//selectAll rows with with data to tbody element, use selectAll as this are dynamic entries and non exisyent till now.
			var rows = tbody.selectAll("tr").data(data);

			//create all dynamic rows with enter() command
			var rowsEnter = rows.enter()
			.append("tr");

			//Create columns with cell data in each row --column-1
			rowsEnter.append("td")
			 .text(function(d){return d.data.score });
			// Column-2
			rowsEnter.append("td") 
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .append("img")
			 .attr({
			   src: function(d){return d.data.thumbnail }
			  });
			// Column-3
			rowsEnter.append("td")
			 .append("a")
			 .attr({
			   href:function(d){return d.data.url }
			  })
			 .text(function(d){return d.data.title });
			// Column-4
			rowsEnter.append("td")
			 .text(function(d){return d.data.ups });
			// Column-5
			rowsEnter.append("td")
			.text(function(d){return d.data.downs });	
			//exit() method to adjust automatic row removal
			rows.exit().remove();
			// console.log("container",container);
			// console.log("data",data);
			// console.log("width",width);
		 };
		//grab data
		chart.data  = function(value){
		 	if(!arguments.length) return data;
		 	data = value;
		 	return chart;
		 };
		//width function 
		chart.width = function(value){
		  if(!arguments.length) return width;
		 	width = value;
		 	return chart;
		 };
		 //return chart function as the condition of reusable chart pattern
		
		return chart;
     };

    //data calling from api 
	d3.json('/api/things/',function(err,thing){
		//capture data in a avariable		
		var data = thing;
		//parent Div where table will be inserted
		var display = d3.select('.col-md-12');

		//table container
		var tdiv = display.append("div").classed("table-responsive",true);
		//instantiate chart function
		var table = d3.chart.tableapi();
		//set Data to table
		table.data(data);
		//render table
		table(tdiv);		
	 });	
	// Construction of reusable table function in d3 chart object
	if (!d3.chart) d3.chart = {};
    d3.chart.tableapi = function(){ 
	
		var data;
		var width;

		//reusable chart pattern
		function chart (container){
			//initialization code

			//append dynamic table with responsive bootstrap into container div 
			var table = container.append("table").classed("table table-bordred table-striped",true);
			//append thead to table
			var thead = table.append('thead');
			//append tbody to table
			var tbody = table.append('tbody');
			//selectAll rows with with data to tbody element, use selectAll as this are dynamic entries and non exisyent till now.
			var rows = tbody.selectAll("tr").data(data);

			//create all dynamic rows with enter() command
			var rowsEnter = rows.enter()
			.append("tr");

			//Create columns with cell data in each row --column-1
			rowsEnter.append("td")
			 .text(function(d){return d.name });
			// Column-2
			rowsEnter.append("td")
			.text(function(d){return d.info });	
			//exit() method to adjust automatic row removal
			rows.exit().remove();
			// console.log("container",container);
			// console.log("data",data);
			// console.log("width",width);
		 };
		//grab data
		chart.data  = function(value){
		 	if(!arguments.length) return data;
		 	data = value;
		 	return chart;
		 };
		//width function 
		chart.width = function(value){
		  if(!arguments.length) return width;
		 	width = value;
		 	return chart;
		 };
		 //return chart function as the condition of reusable chart pattern
		
		return chart;
     }; 


    // #### HISTOGRAM ###### 
	
	//histogram layout with reddit data json
	d3.json('assets/dataDir/data.json',function(err,pics){
	 var data = pics.data.children; 
	 // var data 	= [10,22,33,11,44,55,33,30,11,66];
	 var histogram = d3.layout.histogram()
	 	.value(function(d){ return d.data.score ;})
	 	// .range([d3.min(data.data.score),d3.max(data.data.score)])
	 	.bins(20);

	 var layoutDy = histogram(data);

	 var svgTop = d3.select("#svg2");

	 svgTop.selectAll('div')
	 .data(layoutDy)
	 .enter().append("rect").classed("histBar", true)
	 .attr({
	 	x: function(d,i){
	 		return 150+i * 30;
	 	},
	 	y:50,
	 	width:20,
	 	height:function(d){
	 		return 20 * d.length;
	 	}
	 	})
	 .style({
			fill  : "steelblue"
		})

	 });	


	// #### BAR CHART ######

	//Bar chart with axis

	// *******Chart configuration***********	
	var margin = {top: 20, right: 50, bottom: 80, left: 50},
		width =	 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;
	//Define scale first
	var x = d3.scale.ordinal().rangeRoundBands([0,width], .1);	
	var y = d3.scale.linear().range([height,0]);
	//insert scales to appropriate axis 	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
	//create chart in any svg container		
	var chart = d3.select("#svg1")
		.attr("width",width + margin.left + margin.right)
		.attr("height",height + margin.top +margin.bottom)
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");  //This is used for creating the margin for axises
		
	function type(d) {
  	  d.value = +d.value; // coerce to number
  	  return d;
	 };	


	// load data from csv	
	d3.csv("assets/dataDir/data.csv",type,function(error,data){
		// console.log(data);

		//define domain with data range
		x.domain(data.map(function(d) { return d.name; }));
		y.domain([0, d3.max(data, function(d) { return d.value; })]);

		//append and call xAxis to display xAxis
	   	chart.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	    //append and call yAxis to display yAxis 
	   	chart.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform","rotate(-90)")
	      .attr("y",5)
	      .attr("dy",".71em")
	      .style("text-anchor","end")
	      .text("information");

	    // insert data and bind to virtual elements for bar charts  
	   	chart.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); })
	      .attr("width", x.rangeBand());
		});
	
	// load data from Static JSON	
	// d3.json('assets/dataDir/data.json',function(err,pics){
	//   var data = pics.data.children;

	//   	console.log(data); 

	//   //define domain with data range
	// 	x.domain(data.map(function(d) { return d.data.name; }));
	// 	y.domain([1900,3000]);

	// 	//append and call xAxis to display xAxis
	//    	chart.append("g")
	//       .attr("class", "x axis")
	//       .attr("transform", "translate(0," + height + ")")
	//       .call(xAxis);

	//     //append and call yAxis to display yAxis 
	//    	chart.append("g")
	//       .attr("class", "y axis")
	//       .call(yAxis)
	//       .append("text")
	//       .attr("transform","rotate(-90)")
	//       .attr("y",5)
	//       .attr("dy",".71em")
	//       .style("text-anchor","end")
	//       .text("information");

	//     // insert data and bind to virtual elements for bar charts  
	//    	chart.selectAll(".bar")
	//       .data(data)
	//     .enter().append("rect")
	//       .attr("class", "bar")
	//       .attr("x", function(d) { return x(d.data.name); })
	//       .attr("y", function(d) { return y(d.data.score); })
	//       .attr("height", function(d) { return height - y(d.data.score); })
	//       .attr("width", x.rangeBand());
	// 	});




 });
