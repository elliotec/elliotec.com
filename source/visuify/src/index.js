function addToGraph(graphObj, artist, nodeObj, linkObj) {
    nodeObj.id = artist.name;
    linkObj.target = artist.name;
    graphObj.nodes.push(nodeObj);
    graphObj.links.push(linkObj);

    return graphObj;
}

function buildGraph(originalArtist, artists, existingGraph) {
    let graphObj = existingGraph || {
        nodes: [{id: originalArtist.name, uri: originalArtist.uri}],
        links: []
    };
    graphObj = artists.reduce((accum, artist) => {
        const nodeObj = {id: artist.name, uri: artist.uri};
        const linkObj = {source: originalArtist.name};
        return addToGraph(graphObj, artist, nodeObj, linkObj);
    }, graphObj);

    return graphObj;
}

function getArtist(query) {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
    return fetch(url).then(function(response) { return response.json()})
    .then(function(json){ console.log(json); return json});
}

function getRelatedArtists(artistId) {
    return $.ajax({
        url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`
    });
}

function getFirstDegreeArtists(response) {
    if (!response.artists.items.length){
        $("#message").text("¯\\_(ツ)_/¯ Can't find that artist - try again.");
    }
    const artist = response.artists.items[0];
    console.log(artist)
    $("#uri").attr("href", artist.uri).text($("#query").val());
    return $.when(artist, getRelatedArtists(artist.id)
        .then(response => response.artists));
}

function getSecondDegreeArtists(firstDegreeGraph, firstDegreeArtists) {
    const deferreds = [$.when(firstDegreeGraph)];
    firstDegreeArtists.forEach(firstDegreeArtist => {
        const artistDeferred = $.Deferred();
        deferreds.push(artistDeferred);

        getRelatedArtists(firstDegreeArtist.id)
            .then(response => {
                const firstDegreeArtistItem = {};
                firstDegreeArtistItem[firstDegreeArtist.name] = response.artists;
                artistDeferred.resolve(firstDegreeArtistItem);
            })
    });

    return $.when.apply(null, deferreds);
}

function buildFirstGraph(originalArtist, firstDegreeArtists) {
    return $.when(buildGraph(originalArtist, firstDegreeArtists), firstDegreeArtists);
}

function buildUpdatedGraph(firstDegreeGraph) {
    let updatedGraph = firstDegreeGraph;
    const firstDegreeArtistsMap = Array.prototype.slice.call(arguments, 1);

    firstDegreeArtistsMap.forEach((secondDegreeArtists, i) => {
        updatedGraph = buildGraph(
            { name: Object.keys(secondDegreeArtists)[0] },
            secondDegreeArtists[Object.keys(secondDegreeArtists)[0]],
            firstDegreeGraph
        );
    });

    return updatedGraph;
}

function drawGraph(graph){
    graph.nodes = _.uniqBy(graph.nodes, "id");
    const svg = d3.select("svg");
    const width = parseInt(d3.select("#chart").style("width"));
    const height = parseInt(d3.select("#chart").style("height"));

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2.5));

    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .on("mouseover", d => {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(`${d.source.id} --- ${d.target.id}`)
                .style("left", `${d3.event.pageX}px`)
                .style("top", `${d3.event.pageY - 28}px`);
        })
        .on("mouseout", d => {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    const node = svg.append("g")
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
                .style("left", `${d3.event.pageX}px`)
                .style("top", `${d3.event.pageY - 28}px`);
        })
        .on("mouseout", function(d) {
            d3.select(this).transition().duration(200).attr("r", 8)
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on("click", d => {
            $("#query").val(d.id);
            div.transition()
                .duration(500)
                .style("opacity", 0);
            visuify()
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
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
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

function visuify(){
    $("svg").empty();
    $("#message").empty();
    $("#uri").empty();
    getArtist($("#query").val())
        .then(getFirstDegreeArtists)
        .then(buildFirstGraph)
        .then(getSecondDegreeArtists)
        .then(buildUpdatedGraph)
        .then(drawGraph);
}

$("#submit").on("click", e => {
    e.preventDefault();
    visuify();
});
