function addToGraph(graphObj, artist, nodeObj, linkObj) {
    nodeObj.id = artist.name;
    linkObj.target = artist.name;
    graphObj.nodes.push(nodeObj);
    graphObj.links.push(linkObj);

    return graphObj;
}

function buildGraph(originalArtist, artists, existingGraph) {
    var graphObj = existingGraph || {
        nodes: [{id: originalArtist.name, uri: originalArtist.uri}],
        links: []
    };
    graphObj = artists.reduce(function(accum, artist) {
        var nodeObj = {id: artist.name, uri: artist.uri};
        var linkObj = {source: originalArtist.name};
        return addToGraph(graphObj, artist, nodeObj, linkObj);
    }, graphObj);

    return graphObj;
}

function getRelatedArtists(artistId) {
    return $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artistId + '/related-artists'
    });
}

function getArtist(query) {
    return $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist'
        }
    });
}

function drawGraph(graph){
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-80))
        .force("center", d3.forceCenter(width / 2, height / 2));
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.source.id + " --- " + d.target.id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 8)
        .attr("fill", "#12121")
        .on("mouseover", function(d) {
            d3.select(this).transition().duration(200).attr("r", 14)
            div.transition()
                .duration(200)
                .style("opacity", .9)
            div.html(d.id)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(200).attr("r", 8)
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on('click', function(d, i) {
            $('#query').val(d.id);
            div.transition()
                .duration(500)
                .style("opacity", 0);
            chain()
            window.location.href = d.uri;
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked)


    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
function chain(){
    $("svg").empty();
    $("h3").text($('#query').val());
    getArtist($('#query').val())
        .then(function(response) {
            var artist = response.artists.items[0];
            return $.when(artist, getRelatedArtists(artist.id).then(function(response) { return response.artists; }));
        })
        .then(function(originalArtist, firstDegreeArtists) {
            return $.when(buildGraph(originalArtist, firstDegreeArtists), firstDegreeArtists);
        })
        .then(function(firstDegreeGraph, firstDegreeArtists) {
            var deferreds = [$.when(firstDegreeGraph)];
            firstDegreeArtists.forEach(function(firstDegreeArtist) {
                var artistDeferred = $.Deferred();
                deferreds.push(artistDeferred);

                getRelatedArtists(firstDegreeArtist.id)
                    .then(function(response) {
                        var firstDegreeArtistItem = {};
                        firstDegreeArtistItem[firstDegreeArtist.name] = response.artists;
                        artistDeferred.resolve(firstDegreeArtistItem);
                    })
            });

            return $.when.apply(null, deferreds);
        })
        .then(function(firstDegreeGraph) {
            var updatedGraph = firstDegreeGraph;
            var firstDegreeArtistsMap = Array.prototype.slice.call(arguments, 1);

            firstDegreeArtistsMap.forEach(function(secondDegreeArtists, i) {
                updatedGraph = buildGraph({ name: Object.keys(secondDegreeArtists)[0] }, secondDegreeArtists[Object.keys(secondDegreeArtists)[0]], firstDegreeGraph);
            });

            return updatedGraph;
        })
        .then(function(graph) {
            graph.nodes = _.uniqBy(graph.nodes, 'id');
            drawGraph(graph);

        });
}

$("#submit").on('click', function(e) {
    e.preventDefault();
    chain()
});
