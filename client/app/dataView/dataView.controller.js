'use strict';

angular.module('webrtcAppApp')
  .controller('DataviewCtrl', function ($scope) {

  	var display = d3.select('#display');

	d3.json('assets/dataDir/data.json',function(err,pics){
		
		var links = pics.data.children;
		
		links.forEach(function(d){
			d.data.created *=1000;
			console.log(d.data.created);
		});

		var table =  display.append('table');

		var rows = table.append('tr.row')
						.data(links);		

		var rowsEnter = rows.enter()
		.append("tr").classed('row',true);

		rowsEnter.append('td')
		.text(function(d){return d.data.score;});

		rowsEnter.append("td")
		.append("a")
		.attr({
			href:function(d){return d.data.url}
		}).text(function(d){return d.data.title})
		.append("img")
		.attr({
			src:function(d){return d.data.thumbnail}
		});

		rowsEnter.append("td")
		.text(function(d){return d.data.ups});

		rowsEnter.append("td")
		.text(function(d){return d.data.downs});

	});	
  				

  });
