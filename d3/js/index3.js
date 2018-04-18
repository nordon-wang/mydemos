let data = [1,3,4,8,5,8,9,12]
let bar_height = 50
let bar_padding = 10
let svg_width = 500
let svg_height = (bar_height + bar_padding) * data.length


let svg = d3.select('#container')
.append('svg')
.attr('width',svg_width)
.attr('height',svg_height)

var scale_x = d3.scaleLinear()     // v4修改方法
    .domain([0, d3.max(data)])
    .range([0, svg_width])


let bar = svg.selectAll('g')
.data(data)
.enter()
.append('g')
.attr('transform',function(d,i){
    return 'translate(0,'+ (bar_height + bar_padding) * i +')'
})


// bar.append('rect')
// .attr({
//     "width":function(d){
//         return d
//     },
//     "height":bar_height
// })

bar.append('rect').attr('width',function(d){
    return scale_x(d)
}).attr('height',bar_height)

d3.selectAll('g').style('fill', 'red')

bar.append('text')
.text(function(d){
    return d;
})
.attr("x",function(d){
        return scale_x(d)
    })
.attr("y",bar_height / 2)
.attr('text-anchor',"end")
.style('fill','white')