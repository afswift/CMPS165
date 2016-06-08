var quantizeWaste = d3.scale.quantize()
    .domain([0, 180000])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizeWPC = d3.scale.quantize()
    .domain([0, 3])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
    
var quantizeOrganic = d3.scale.quantize()
        .domain([0, 81])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizePaper = d3.scale.quantize()
        .domain([0, 63])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizePlastic = d3.scale.quantize()
        .domain([0, 18])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizeGlass = d3.scale.quantize()
        .domain([0, 12])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizeMetal = d3.scale.quantize()
        .domain([0, 9])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var quantizeOther = d3.scale.quantize()
        .domain([0, 54])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

function Waste(){
    d3.select("body").transition();
    
    // legend FOR WASTE
    var color_domain = [22500, 22500*2, 22500*3, 22500*4, 22500*5, 22500*6, 22500*7, 22500*8] // to corrolate with the 
    var ext_color_domain = [0, 22500, 22500*2, 22500*3, 22500*4, 22500*5, 22500*6, 22500*7, 22500*8]
    var legend_labels = ["0-22499", "22500-44999", "45000-67499", "67500-89999", "90000-112499", "112500-134999", "135000-157499", "157500-179999", ">180000"];    

    var color = d3.scale.threshold()
        .domain(color_domain)
        .range(["#F7FBFF","#DEEBF7","#C6DBEF", "#9ECAE1", "#6BAED6", "#4292C6", "#2171B5", "#08519C", "#08306B"]); //colors to show on legend

    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");

    var ls_w = 20,
        ls_h = 20;

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
        g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeWaste(d.properties.waste); });
    })
}

function WPC(){
    d3.select("body").transition();
        
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
        g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeWPC(d.properties.wpc); });
    })
}

function Organic(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeOrganic(d.properties.organic); });
    })
}

function Paper(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizePaper(d.properties.paper); });
    })
}

function Plastic(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizePlastic(d.properties.plastic); });
    })
}

function Glass(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeGlass(d.properties.glass); });
    })
}

function Metal(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeMetal(d.properties.metal); });
    })
}

function Other(){
    var svg = d3.select("body").transition();
    
    d3.json("final.json", function(error, world) {
    var countries = topojson.feature(world, world.objects.countries).features;
    g.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
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
        .attr("class", function(d) { return quantizeOther(d.properties.other); });
    })
}