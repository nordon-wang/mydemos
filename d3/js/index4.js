let data = [1,3,4,8,5,8,9,12]
let bar_width = 50
let bar_padding = 10
let svg_height = 500
let svg_width = (bar_width + bar_padding) * data.length


let svg = d3.select('#container')
.append('svg')
.attr('width',svg_width)
.attr('height',svg_height)

var scale_x = d3.scaleLinear()     // v4修改方法
    .domain([0, d3.max(data)])
    .range([svg_height, 0])


let bar = svg.selectAll('g')
.data(data)
.enter()
.append('g')
.attr('transform',function(d,i){
    return 'translate('+ (bar_width + bar_padding) * i +',0)'
})


bar.append('rect').attr('y',function(d){
    return scale_x(d)
})
.attr('width',bar_width)
.attr('height',function(d){
    return svg_height -  scale_x(d)
})

d3.selectAll('g').style('fill', 'red')

bar.append('text')
.text(function(d){
    return d;
})
.attr("y",function(d){
        return scale_x(d)
    })
.attr("x",bar_width / 2)
.attr("dy",15)
.attr('text-anchor',"middle")
.style('fill','black')