var quantize = d3.scale.quantize()
    .domain([0, 3])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
    
var quantizePercentages = d3.scale.quantize()
        .domain([0, 100])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

function Waste(){
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
        .attr("class", function(d) { return quantize(d.properties.waste); });
    })
}

function WPC(){
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
        .attr("class", function(d) { return quantize(d.properties.wpc); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.organic); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.paper); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.plastic); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.glass); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.metal); });
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
        .attr("class", function(d) { return quantizePercentages(d.properties.other); });
    })
}