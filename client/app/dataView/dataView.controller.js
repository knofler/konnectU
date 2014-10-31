'use strict';

angular.module('webrtcAppApp')
  .controller('DataviewCtrl', function ($scope) {

d3.json('assets/dataDir/data.json',function(err,pics){

		//capture data ina avariable		
		var data = pics.data.children;

		var display = d3.select('#display');

		//table container
		var tdiv = display.append("div").classed("table",true);

		var table = d3.chart.table();
		//set Data to table
		table.data(data);
		//render table
		table(tdiv);
		
	 });	

if (!d3.chart) d3.chart = {};
d3.chart.table = function(){ 
	var data;
	var width;
	//reusable chart pattern
	function chart (container){

		//initialization code
		var table = container.append("table");

		//apend rows with class .row on table element
		var rows = table.append("tr").data(data);
		// //create dynamic rows binded with data and define class
		var rowsEnter = rows.enter()
		.append("tr").classed("row",true);

		// //Create columns with cell data in each row
		rowsEnter.append("td")
		.text(function(d){return d.data.score });

		rowsEnter.append("td")
		.append("a")
		.attr({
		 href:function(d){return d.data.url }
		 })
		.append("img")
		.attr({
		  src: function(d){return d.data.thumbnail }
		 });

		rowsEnter.append("td")
		.append("a")
		.attr({
		 href:function(d){return d.data.url }
		 })
		.text(function(d){return d.data.title });
		
		
		rowsEnter.append("td")
		.text(function(d){return d.data.ups });

		rowsEnter.append("td")
		.text(function(d){return d.data.downs });	

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
	chart.width = function(value){
	  if(!arguments.length) return width;
	 	width = value;
	 	return chart;
	 };
	return chart;
   };
  	
});
