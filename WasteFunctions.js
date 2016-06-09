var ls_w = 20,
    ls_h = 20;

var quantizeWaste = d3.scale.quantize()
    .domain([0, 180000])
    .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));

var quantizeWPC = d3.scale.quantize()
    .domain([0, 3.2])
    .range(d3.range(9).map(function(i) { return "r" + i + "-9"; }));
    
var quantizeOrganic = d3.scale.quantize()
        .domain([0, 80])
        .range(d3.range(9).map(function(i) { return "o" + i + "-9"; }));

var quantizePaper = d3.scale.quantize()
        .domain([0, 64])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizePlastic = d3.scale.quantize()
        .domain([0, 18])
        .range(d3.range(9).map(function(i) { return "p" + i + "-9"; }));

var quantizeGlass = d3.scale.quantize()
        .domain([0, 12])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizeMetal = d3.scale.quantize()
        .domain([0, 8])
        .range(d3.range(9).map(function(i) { return "m" + i + "-9"; }));

var quantizeOther = d3.scale.quantize()
        .domain([0, 56])
        .range(d3.range(9).map(function(i) { return "b" + i + "-9"; }));

function Waste(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("svg").transition().duration(750);
    
    // legend
    var color_domain = [22500, 45000, 67500, 90000, 112500, 135000, 157500, 180000] // to corrolate with the 
    var ext_color_domain = [0, 22500, 45000, 67500, 90000, 112500, 135000, 157500, 180000]
    var legend_labels = ["<22499", "22500-44999", "45000-67499", "67500-89999", "90000-112499", "112500-134999", "135000-157499", "157500-179999", ">180000"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#fff7ec","#fee8c8","#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("Tonnes/Day");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
        g.selectAll("country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
		.attr("stroke-width", 0.2)
		.attr("stroke", "black")
		.style()
        .on("click", clicked)
        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Organic: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.organic  + "%" + "</div>" + "<br/>" + 
                    "<div style=\"float: left\">" + "Paper: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.paper  + "%" + "</div>" + "<br/>" + 
                    "<div style=\"float: left\">" + "Plastic: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.plastic  + "%" + "</div>" + "<br/>" + 
                    "<div style=\"float: left\">" + "Glass: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.glass  + "%" + "</div>" + "<br/>" + 
                    "<div style=\"float: left\">" + "Metal: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.metal  + "%" + "</div>" + "<br/>" + 
                    "<div style=\"float: left\">" + "Other: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.other  + "%" + "</div>" + "<br/>"  
             )  
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.waste == undefined || d.properties.waste == null) { return "grey" }
            return quantizeWaste(d.properties.waste); });
    })
}

function WPC(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("svg").transition().duration(750);
    
    // legend FOR WASTE
    var color_domain = [.4, .8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2]
    var ext_color_domain = [0, .4, .8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2]
    var legend_labels = ["<.39", ".40-.79", ".80-1.19", "1.20-1.59", "1.6-1.99", "2.00-2.39", "2.4-2.79", "2.8-3.19", ">3.2"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#fff7ec","#fee8c8","#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("Kg/Capita/Day");
        
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
        g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
	    .attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +
                    "<div style=\"float: left\">" + "WPC: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.wpc   +" Kg/Capita/Day"+  "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.wpc == undefined || d.properties.wpc == null) { return "grey"; }
            return quantizeWPC(d.properties.wpc); });
    })
}

function Organic(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    // legend
    var color_domain = [10, 20, 30, 40, 50, 60, 70, 80]
    var ext_color_domain = [0, 10, 20, 30, 40, 50, 60, 70, 80]
    var legend_labels = ["<9.9", "10.0-19.0", "20.0-29.9", "30.0-39.9", "40.0-49.9", "50.0-59.9", "60.0-69.9", "70.0-79.9", ">80.0"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#f7fcf5","#e5f5e0","#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");

    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +	 
                    "<div style=\"float: left\">" +"Organic: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.organic  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.organic == undefined || d.properties.organic == null) { return "grey" }
            return quantizeOrganic(d.properties.organic); });
    })
}

function Paper(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    var color_domain = [8, 16, 24, 32, 40, 48, 56, 64]
    var ext_color_domain = [ 0,  8, 16, 24, 32, 40, 48, 56, 64]
    var legend_labels = ["<7.9", "8.0-15.9", "16.0-23.9", "24.0-31.9", "32.0-39.9", "40.0-47.9", "48.0-55.9", "56.0-63.9", ">64"];
    
     var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#F7FBFF","#DEEBF7","#C6DBEF", "#9ECAE1", "#6BAED6", "#4292C6", "#2171B5", "#08519C", "#08306B"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +	 
                    "<div style=\"float: left\">" +"Paper: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.paper  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) { 
            if (d.properties.paper == undefined || d.properties.paper == null) { return "grey" }
            return quantizePaper(d.properties.paper); });
    })
}

function Plastic(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    var color_domain = [  2.25,   4.5 ,   6.75,   9.  ,  11.25,  13.5 ,  15.75,  18.  ]
    var ext_color_domain = [0, 2.25,   4.5 ,   6.75,   9.  ,  11.25,  13.5 ,  15.75,  18.  ]
    var legend_labels = ["<2.24", "2.25-4.49", "4.5-6.74", "6.75-8.99", "9.00-11.24",  "11.25-13.49", "13.5-15.74", "15.75-17.99", ">18"];
    
     var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#fff7f3","#fde0dd","#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +	 
                    "<div style=\"float: left\">" +"Plastic: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.plastic  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) {
            if (d.properties.plastic == undefined || d.properties.plastic == null) { return "grey" }
            return quantizePlastic(d.properties.plastic); });
    })
}

function Glass(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    var color_domain = [1.5, 3.0, 4.5, 6.0, 7.5, 9., 10.5, 12]
    var ext_color_domain = [0, 1.5, 3.0, 4.5, 6.0, 7.5, 9., 10.5, 12]
    var legend_labels = ["<1.49", "1.50-2.99", "3.00-4.49", "4.50-5.99", "6.00-7.49", "7.50-8.99", "9.00-10.49", "10.50-1.99", ">12.00"];
    
     var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#F7FBFF","#DEEBF7","#C6DBEF", "#9ECAE1", "#6BAED6", "#4292C6", "#2171B5", "#08519C", "#08306B"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +	 
                    "<div style=\"float: left\">" +"Glass: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.glass  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) {
            if (d.properties.glass == undefined || d.properties.glass == null) { return "grey" }
            return quantizeGlass(d.properties.glass); });
    })
}

function Metal(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    // legend
    var color_domain = [1, 2, 3, 4, 5, 6, 7, 8]
    var ext_color_domain = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    var legend_labels = ["<0.9", "1.0-1.9", "2.0-2.9", "3.0-3.9", "4.0-4.9", "5.0-5.9", "6.0-6.9", "7.0-7.9", ">8.0"];     

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(['#fff7fb','#ece2f0','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016c59','#014636']);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +
                    "<div style=\"float: left\">" +"Metal: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.metal  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) {
            if (d.properties.metal == undefined || d.properties.metal == null) { return "grey" }
            return quantizeMetal(d.properties.metal); });
    })
}

function Other(){
    svg.selectAll("g.legend").remove();
    d3.selectAll("path").remove();
    d3.select("body").transition();
    
    // legend
    var color_domain = [7, 14, 21, 28, 35, 42, 49, 56]
    var ext_color_domain = [0, 7, 14, 21, 28, 35, 42, 49, 56]
    var legend_labels = ["<6.9", "7.0-13.9", "14.0-20.9", "21.0-27.9", "28.0-34.9", "35.0-41.9", "42.0-48.9", "49.0-55.9", ">56.0"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#ffffe5","#fff7bc","#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
          .attr("x", 20)
          .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
          .attr("width", ls_w)
          .attr("height", ls_h)
          .style("fill", function(d, i) { return color(d); })
        //.style("opacity", 0.8);

    legend.append("text")  
         .attr("x", 50)
         .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
         .text(function(d, i){ return legend_labels[i]; });
    
    legend.append("text")
         .attr("x", 19)
         .attr("y", 300)
         .text("% of total waste");
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
			.attr("stroke-width", 0.2)
		.attr("stroke", "black")
        .on("click", clicked)

        .on("mouseover", function(d, i, test) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);

            div .html(				
                    "<div style=\"text-align:center\">" +"<b>" +  d.id + "</b>" +  "</div>" +
                    "<div style=\"float: left\">" + "Population: " + "</div>" +  "<div style=\"float:right\">" + d.properties.population + "</div>" + "<br/>" +
                    "<div style=\"float: left\">" + "Waste: " + "</div>" +  "<div style=\"float:right\">" + d.properties.waste + " Tonnes/Day" +  "</div>" +"<br/>"  +
                    "<div style=\"float: left\">" +"Other: "+ "</div>" +  "<div style=\"float:right\">" + d.properties.other  + "%" + "</div>" +"<br/>"
                 )  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        })          
        .on("mouseout", function(d) {
            div .transition()		
                .duration(500)		
                .style("opacity", 0);	
        })     
        .attr("class", function(d) {
            if (d.properties.other == undefined || d.properties.other == null) { return "grey" }

            return quantizeOther(d.properties.other); });
    })
}