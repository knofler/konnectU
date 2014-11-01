'use strict';

angular.module('webrtcAppApp')
  .controller('DataviewCtrl', function ($scope) {

  	//make json or api call to get the data and run reusable chart functions, in this ase table function for a table
	d3.json('assets/dataDir/data.json',function(err,pics){
		// capture data in a avariable		
		var data = pics.data.children;
		//parent Div where table will be inserted
		var display = d3.select('.col-md-12');

		//table container
		var tdiv = display.append("div").classed("table-responsive",true);
		//instantiate chart function
		var table = d3.chart.table();
		//set Data to table
		table.data(data);
		//render table
		table(tdiv);		
	 });	
	
	// Construction of reusable table function in d3 chart object
	if (!d3.chart) d3.chart = {};
	d3.chart.table = function(){ 
	
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
			console.log("data",data);
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

	// d3.json('/api/things/',function(err,thing){
	// 	//capture data in a avariable		
	// 	var data = thing;
	// 	//parent Div where table will be inserted
	// 	var display = d3.select('.col-md-12');

	// 	//table container
	// 	var tdiv = display.append("div").classed("table-responsive",true);
	// 	//instantiate chart function
	// 	var table = d3.chart.table();
	// 	//set Data to table
	// 	table.data(data);
	// 	//render table
	// 	table(tdiv);		
	//  });	

	// if (!d3.chart) d3.chart = {};
 //    d3.chart.table = function(){ 
	
	// 	var data;
	// 	var width;

	// 	//reusable chart pattern
	// 	function chart (container){
	// 		//initialization code

	// 		//append dynamic table with responsive bootstrap into container div 
	// 		var table = container.append("table").classed("table table-bordred table-striped",true);
	// 		//append thead to table
	// 		var thead = table.append('thead');
	// 		//append tbody to table
	// 		var tbody = table.append('tbody');
	// 		//selectAll rows with with data to tbody element, use selectAll as this are dynamic entries and non exisyent till now.
	// 		var rows = tbody.selectAll("tr").data(data);

	// 		//create all dynamic rows with enter() command
	// 		var rowsEnter = rows.enter()
	// 		.append("tr");

	// 		//Create columns with cell data in each row --column-1
	// 		rowsEnter.append("td")
	// 		 .text(function(d){return d.name });
	// 		// Column-2
	// 		rowsEnter.append("td")
	// 		.text(function(d){return d.info });	
	// 		//exit() method to adjust automatic row removal
	// 		rows.exit().remove();
	// 		// console.log("container",container);
	// 		console.log("data",data);
	// 		// console.log("width",width);
	// 	 };
	// 	//grab data
	// 	chart.data  = function(value){
	// 	 	if(!arguments.length) return data;
	// 	 	data = value;
	// 	 	return chart;
	// 	 };
	// 	//width function 
	// 	chart.width = function(value){
	// 	  if(!arguments.length) return width;
	// 	 	width = value;
	// 	 	return chart;
	// 	 };
	// 	 //return chart function as the condition of reusable chart pattern
		
	// 	return chart;
 //     }; 
  	
 });
