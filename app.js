// Build function to initialize dashboard
function init() {
    var selector = d3.select('#selDataset');
    
    // Using the D3 library to read in data from samples.json
    d3.json('./data/samples.json').then(data => {
    var names = data.names
    console.log(data);
    
    names.forEach((sample) => {selector
        .append('option').text(sample).property('value', sample)
    });

    // Build plots with first sample data
    var sampleone = names[0]
    buildplots(sampleone)
    buildmetadata(sampleone)
    });
}

init();

// Build plot functions
    // Build variables for traces, data, and layouts

// Build function for selection change



