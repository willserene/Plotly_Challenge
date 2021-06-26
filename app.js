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
        var sampledata = data.metadata;
        var sampleArray = sampledata.filter(sampleSelection => sampleSelection.id == sample);
        var sampleResult = sampleArray[0];
        var table = d3.select("#sample-metadata");

        // clear html table data 
        table.html("");
       
        Object.entries(sampleResult).forEach(([key, value]) => {
        table.append("p").text(`${key.toUpperCase()}: ${value}`);
        });

    });
    }
  
  
    // Build functions for all the plots
    function buildPlots(sample) {
    d3.json("./data/samples.json").then((data) => {
        var sampleData = data.samples;
        var resultSamples = sampleData.filter((sampleSelection => sampleSelection.id == sample));
        var selectionResult = resultSamples[0];
         

        var otu_ids = selectionResult.otu_ids;
        var otu_labels = selectionResult.otu_labels;
        var sample_values = selectionResult.sample_values;

        var yticks = otu_ids.slice(0,10).map(x => `OTU ID ${x}`).reverse();
        var xticks = sample_values.slice(0,10).reverse();
        var text_labels = otu_labels.slice(0,10).reverse();

        // 
        var trace1 = {
        x: xticks,
        y: yticks,
        text: text_labels,
        type: "bar",
        orientation: "h"
        };  

        var barData = [trace1];
        
        var barLayout = {
        title: "Top 10 Bacteria Cultures Found in Sample",
        xaxis: {title: "Total Found"},
        };
        // 
        Plotly.newPlot("bar", barData, barLayout);

    

 // Build remaining plots
    
        });
    }

    // Build function to populate dashboard when dropdown selection changed
    function selectionChanged(newSample) {
        buildTable(newSample);
        buildPlots(newSample);
        };


// Call init() function to populate dashboard
init();
