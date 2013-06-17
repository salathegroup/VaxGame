function metric(node) {
    node.degree = degree(node);
    var sizeByMetric = 8;
    if (sizeByBC == true && sizeByDegree == false) sizeByMetric = (node.bcScore / 0.025) + 6;
    if (sizeByBC == false && sizeByDegree == true) sizeByMetric = (node.degree + 2) * 2;
    if (sizeByBC == true && sizeByDegree == true) sizeByMetric = ((node.bcScore / 0.01) + 1) + ((node.degree + 2) * 2) / 2;
    return sizeByMetric;
}

function toggleBC() {
    console.log(sizeByBC)
    if (sizeByBC) sizeByBC=false;
    else(sizeByBC=true);
    console.log(sizeByBC)

}

function toggleDegree() {
    console.log(sizeByDegree)
    if (sizeByDegree) sizeByDegree=false;
    else(sizeByDegree=true);
    console.log(sizeByDegree)

}

function redraw() {
    svg.attr("transform",
        "translate(" + d3.event.translate + ")"
            + " scale(" + d3.event.scale + ")");
}

// tick function, which does the physics for each individual node & link.
function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

        texts.attr("transform", function(d) {
        return "translate(" + (d.x-9) + "," + (d.y+5) + ")";
    });
}

// color function
function color(d) {
    var color = null;
    if (d.status == "S") color = "#37FDFC";
    if (d.status == "V") color = "#000000";
    if (d.status == "E") color = "#ffe600";
    if (d.status == "I") color = "#ff0000";
    if (d.status == "R") color = "#9400D3";
    return color;
}


function clickPrevent(node) {
    if (node.status == "V") node.status = "S";
    else node.status = "V";

    combinedUpdate();
}






function updateNodeAttributes() {
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    // Update the nodes…
    node = svg.selectAll("circle.node")
        .data(graph.nodes, function(d) { return d.id; })
        .attr("r", metric)
        .style("fill", color);
}



