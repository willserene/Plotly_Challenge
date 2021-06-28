// Build function to initialize dashboard
function init() {
    var selector = d3.select("#selDataset");
    
    // Use the D3 library to read in data from samples.json
    d3.json("./data/samples.json").then(data => {
    var names = data.names
        names.forEach((sample) => {selector
        .append("option").text(sample).property("value", sample);
        });

    // Populate dashboard with first sample data
    var sampleOne = names[0];
        buildPlots(sampleOne);
        buildTable(sampleOne);
    });
}

    // Build function for Demographics info
    function buildTable(sample) {
    d3.json("./data/samples.json").then((data) => {
        // Variables created to hold metadata array, filter it for selected ID, 
        // and hold selected data.
        var sampledata = data.metadata;
        var sampleArray = sampledata.filter(sampleSelection => sampleSelection.id == sample);
        var sampleResult = sampleArray[0];
        var table = d3.select("#sample-metadata");
        // clear html table data 
        table.html("");
        // Iterate through metadata and add key value pair to demographics table,
        // with formatting to capitalize each demographic key.
        Object.entries(sampleResult).forEach(([key, value]) => {
        table.append("p").text(`${key.toUpperCase()}: ${value}`);
        });

    });
    }
  
  
    // Build functions for all the plots
    function buildPlots(sample) {
    d3.json("./data/samples.json").then((data) => {
        // Variables created to hold samples array, filter for selected ID,
        // and hold selected data.
        var sampleData = data.samples;
        var resultSamples = sampleData.filter((sampleSelection => sampleSelection.id == sample));
        var selectionResult = resultSamples[0];
        
        var selectionMetadata = data.metadata.filter((metadataSelection) => metadataSelection.id == sample);
        var metadaResult = selectionMetadata[0];
        var washingFreq = parseFloat(metadaResult.wfreq);
        
        // Variables created to hold otu ids, labels, and sample values for selected ID.
        var otu_ids = selectionResult.otu_ids;
        var otu_labels = selectionResult.otu_labels;
        var sample_values = selectionResult.sample_values;
        // Slice and reverse arrays to get top ten otu ids, labels, and sample values.
        var yticks = otu_ids.slice(0,10).map(x => `OTU ID ${x}`).reverse();
        var xticks = sample_values.slice(0,10).reverse();
        var text_labels = otu_labels.slice(0,10).reverse();

        // bar plot trace, data, and layout
        var bartrace = {
        x: xticks,
        y: yticks,
        text: text_labels,
        type: "bar",
        orientation: "h"
        };  
        var barData = [bartrace];
        var barLayout = {
        title: "<b>Top 10 Bacteria Cultures in Sample</b>",
        xaxis: {title: "Total Found"},
        margin:{t:30,l:110},
        height: 500,
        width: 800,
        };
        Plotly.newPlot("bar", barData, barLayout);

        // bubble plot trace, data, and layout
        var bubbletrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          colorscale: "Portland", 
          size: sample_values}
        };
        var bubbleData = [bubbletrace];
        var bubbleLayout = {
        title: "<b>Bacteria Cultures in Sample</b>",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"},
        hovermode: "closest"
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // gauge plot trace, data, and layout
        var gaugetrace = {
        domain: {x:[0,1], y:[0,1]},
        type: "indicator",
        mode: "gauge+number",
        value: washingFreq,
        title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        gauge:{
            axis: {range: [null, 10]},
            bar: {color: "black"},
            steps: [{range:[0,2], color: "red"}, 
                {range:[2,4], color: "orange"}, 
                {range:[4,6], color: "yellow"}, 
                {range:[6,8], color: "yellowgreen"}, 
                {range:[8,10], color: "green"}]} 
        };
        var gaugeData = [gaugetrace];
        var gaugeLayout = { 
        width: 450,
        height: 360,
        margin: {}
        };
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
        });
    }

    // Build function to populate dashboard when dropdown selection changed
    function selectionChanged(newSample) {
        buildTable(newSample);
        buildPlots(newSample);
        };


// Call init() function to populate dashboard
init();
