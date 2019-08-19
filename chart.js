var graphData, allValues
var drow = (data_, linetype) => {
    var data = data_
    graphData = data_
    d3.select("svg").remove();
    var width = screen.width - 100;
    var height = screen.height - 200;
    var margin = 80;
    
    var lineOpacity = "0.7";
    
    
    allValues = data.reduce(( fullArr, d) => fullArr.concat(d.values), [])
   /* Scale */
    var xScale = d3.scaleTime()
        .domain([new Date(2015,0,1),new Date(2019,9,11)])
        .range([0, (width-margin) - 300]);

    var yScale = d3.scaleLinear()
        .domain([ d3.max(allValues), d3.min(allValues)])
        .range([0, height-margin]);
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    /* Add SVG */
    var svg = d3.select("#chart").append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        .append('g')
        .attr("transform", `translate(${150}, ${margin})`);
    
        // /* Add sieverts into SVG */
        
        var line = d3.line()
            .x((d, i) => { 
                // console.log(d,i)
                let date = new Date(2015, 0, 1);
                date.setMonth(date.getMonth() +  i);
                return xScale(date)
            })
            .y((d, i) => yScale(d));
        
    
    
    let lines = svg.append('g').attr('class', 'lines');
    let regionColor = {
        'Tbilisi': '#16a085',
        'Kvemo Kartli': '#c0392b',
        'Shida Kartli': '#2980b9',
        'Mtskheta-Mtianeti': '#8e44ad',
        'Kakheti': '#2c3e50',
        'Samtskhe-Javakheti': '#f39c12',
        'Imereti Racha-Lechkhumi Kvemo Svaneti': '#d35400',
        'Samegrelo-Zemo Svaneti': '#c0392b',
        'Guria': '#4d05e8',
        'Adjara': '#192a56',
    }
    lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')  
        .append('path')
            .attr('class', 'line')  
            .attr('d', d => line(d.values))
            .style('stroke', (d, i) => regionColor[d.Region])
            // .style('stroke', (d, i) => console.log(regionColor[d.Region], d))
            // .style('opacity', lineOpacity)
            // .style('stroke-width', 1.5)
            // .style('stroke-linecap', "round")
            // .style('fill', "none")
    
    // return
    // let linesHov = svg.append('g').attr('class', 'lines-hov');

    // linesHov.selectAll('.line-hov-group')
    //     .data(data).enter()
    //     .append('g')
    //     .attr('class', 'line-group')  
    //     .append('path')
    //         .attr('class', 'line-hov')  
    //         .attr('d', d => line(d.sieverts))
    //         .style('opacity', 0)
    //         .style('stroke-width', 6)
    //         .style('fill', "none")
    //         .style('stroke', (d, i) => color(i))
            // .on("mouseover", (d) => hover(d))
            // .on("mouseout", (d) => out(d));

    // let labels = svg.append('g').attr('class', 'labels');

    // labels.selectAll('.labels')
    //     .data(data).enter()
    //     .append('g')    
    //         .append("text")
    //         .attr("class", "label-text")
    //         .attr("height", 30)
    //         .attr("width", 200)
    //         .style("fill", (d, i) => color(i))        
    //         .text(d => d.name)
    //         // .attr("text-anchor", "middle")
    //         .attr("y", (d, i) => 30 * i )
    //         .attr("x", width - 180)
            // .on("mouseover", (d) => hover(d))
            // .on("mouseout", (d) => out(d));
        
    let circles = svg.append('g')
            .attr('class', 'circles');
            circleRadius = 4;
            circleOpacity = .7


//             Cleared
// Orders
    /* Add circles in the line */
    circles.selectAll("circles")
        .data(data.filter(d => d.Type == 'Registred')).enter()
        .append("g")
        .attr("class", "circle")
        .style("fill", (d, i) => regionColor[d.Region])
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .append("circle")
        .attr("cx", (d, i) => { 
            // console.log(d,i)
            let date = new Date(2015, 0, 1);
            date.setMonth(date.getMonth() +  i);
            return xScale(date)
        })
        .attr("cy", d => yScale(d))
        .attr("r", circleRadius)
        .attr('sievert-name', d => d.name)
        .style('opacity', circleOpacity)


    let rects = svg.append('g')
        .attr('class', 'rects');
    rects.selectAll("rects")
        .data(data.filter(d => d.Type == 'Cleared')).enter()
        .append("g")
        .attr("class", "circle")
        .style("fill", (d, i) => regionColor[d.Region])
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .append("rect")
        .attr("x", (d, i) => { 
            // console.log(d,i)
            let date = new Date(2015, 0, 1);
            date.setMonth(date.getMonth() +  i);
            date.setDate(date.getDate() - 5);
            return xScale(date)
        })
        .attr("y", d => yScale(d)-(8/2))
        .attr("width", 8)
        .attr("height", 8)
        .style('opacity', circleOpacity)
    
    
    let tri = svg.append('g')
        .attr('class', 'tri');
        
    var triangle = d3.symbol()
            .type(d3.symbolTriangle)
            .size(50)

    tri.selectAll("tri")
        .data(data.filter(d => d.Type == 'Order')).enter()
        .append("g")
        .attr("class", "circle")
        .style("fill", (d, i) => regionColor[d.Region])
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .append("path")
        .attr('d', triangle)
        .attr("transform", (d,i) => { 
            let date = new Date(2015, 0, 1);
            date.setMonth(date.getMonth() +  i);
            date.setDate(date.getDate());
            return "translate(" + xScale(date) + "," + ( yScale(d) ) + ")"; })
        .style('opacity', circleOpacity)
        

    let cross = svg.append('g')
        .attr('class', 'cross');
        
    var crossSymbol = d3.symbol()
            .type(d3.symbolDiamond)
            .size(50)

    cross.selectAll("cross")
        .data(data.filter(d => d.Type == 'Call')).enter()
        .append("g")
        .attr("class", "circle")
        .style("fill", (d, i) => regionColor[d.Region])
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .append("path")
        .attr('d', crossSymbol)
        .attr("transform", (d,i) => { 
            let date = new Date(2015, 0, 1);
            date.setMonth(date.getMonth() +  i);
            date.setDate(date.getDate());
            return "translate(" + xScale(date) + "," + ( yScale(d) ) + ")"; })
        .style('opacity', circleOpacity)

    
    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(xAxis)
        .selectAll('text')
            .attr("transform", "translate(-10,10)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", 20)
            .style("fill", "rgb(76, 77, 77)");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
            .style("font-size", 20)
            .style("fill", "rgb(76, 77, 77)");
        
}


     
var hover = (d) => {
    d3.selectAll('.line').filter(line => line.name != d.name)
                    .style('opacity', .1);
    d3.selectAll('.label-text').filter(line => line.name != d.name)
                .style('opacity', .1);
    d3.selectAll('.circle').filter(line => line.name != d.name)
                .style('opacity', .1);
}
var out = (d) => {
    d3.selectAll(".line").style('opacity', .9);
    d3.selectAll(".label-text").style('opacity', .9);
    d3.selectAll(".circle").style('opacity', .9);
}


let globalData
d3.csv('./combined.csv')
    .then(csv => {
        globalData = csv
        buildDropdowns()
        drow(csv.map(mapToChartData))
    })

var regions = ['Tbilisi','Kvemo Kartli','Shida Kartli','Mtskheta-Mtianeti','Kakheti','Samtskhe-Javakheti','Imereti Racha-Lechkhumi Kvemo Svaneti','Samegrelo-Zemo Svaneti','Guria','Adjara',]
var types = ['Registred', 'Cleared', 'Order', 'Call']

const buildDropdowns = () => {
    drowDropdown('Region', regions)
    drowDropdown('Type', types)
}
// pop X = 100 val 
// val x

const pop = {
    'Tbilisi': 1114000,
    'Kvemo Kartli': 423986,
    'Shida Kartli': 300382,
    'Mtskheta-Mtianeti': 94336,
    'Kakheti': 319144,
    'Samtskhe-Javakheti': 160262,
    'Imereti Racha-Lechkhumi Kvemo Svaneti': 567979,
    'Samegrelo-Zemo Svaneti': 331145,
    'Guria': 113000,
    'Adjara': 336077,
}



const mapToChartData = row => { 
    row.values = []
    for(var i = 1; i <= 54; i++){
        row.values.push(per1000 ? ((+row[i]))/  (pop[row.Region] / 1000) : (+row[i]))
    }
    return row//.values
}

var drowDropdowns = []

const drowDropdown = (col, options) => {
    drowDropdowns[col] = [] //JSON.parse(JSON.stringify(options))
}


const toggleRegion = value => {
    if(drowDropdowns['Region'].indexOf(value) === -1){
        drowDropdowns['Region'].push(value)
    } else {
        drowDropdowns['Region'] = drowDropdowns['Region'].filter(s => s !== value)
    }

    regions.forEach(f => {
        document.getElementsByClassName(f)[0].setAttribute('active', (drowDropdowns['Region'].length && drowDropdowns['Region'].indexOf(f) === -1 ? "false" : "true"))
    })
    
    filter()
}

const toggleType = value => {
    if(drowDropdowns['Type'].indexOf(value) === -1){
        drowDropdowns['Type'].push(value)
    } else {
        drowDropdowns['Type'] = drowDropdowns['Type'].filter(s => s !== value)
    }

    types.forEach(f => {
        document.getElementsByClassName(f)[0].setAttribute('active', (drowDropdowns['Type'].length && drowDropdowns['Type'].indexOf(f) === -1 ? "false" : "true"))
    })
    
    filter()
}

per1000 = true;

const togglePercentage = () => {
    per1000 = !per1000
    document.getElementsByClassName("Percentage")[0].setAttribute('active', per1000 ? "true" : "false")
    filter()
}


const filter = () => {
    drow(Object.keys(drowDropdowns)
        .reduce((globalDataReduced,drowDropdownName) => 
            globalDataReduced.filter(row => !drowDropdowns[drowDropdownName].length || drowDropdowns[drowDropdownName].indexOf(row[drowDropdownName]) !== -1)
        , globalData)
        .map(mapToChartData))
}





