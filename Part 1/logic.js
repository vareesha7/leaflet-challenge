// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
    center: [-32.8, 117.9],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  
// Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
    d3.json(queryUrl).then(function(data){
   console.log("test")
    L.geoJSON(data,{
        onEachFeature: onEachFeature, 
        pointToLayer: function(feature,latlong){
            return L.circleMarker(latlong)
        },
        style:createstyle
    }).addTo(myMap)
    // Once we get a response, send the data.features object to the createFeatures function
    // createFeatures(data.features);
     var legend = L.control({position: 'bottomright'});

 legend.onAdd = function () {
 
     var div = L.DomUtil.create('div', 'info legend'),
     grades = [-10, 10, 30, 50, 70, 90],
     labels = ['#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A','#F06A6A'];

    //  div.innerHTML+='Magnitude<br><hr>'
 
     // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + labels[i] + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
 }
 
 return div;
 };
 legend.addTo(myMap)
  });

//   function createFeatures(earthquakeData) {
   function createstyle(feature){
    return{fillColor:color(feature.geometry.coordinates[2]),color:"black",weight:0.5,fillOpacity:0.7,opacity: 1, radius:feature.properties.mag*2}
   }
   //'#F06A6A', '#F0A76A', '#F3B94C', '#F3DB4C', '#E1F34C', '#B6F34C' starting from 90
//'#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A','#F06A6A' starting from 0

function color(depth){
    if (depth > 90) return "#F06A6A"
    else if(depth > 70) return "#F0A76A"
    else if(depth > 50) return "#F3B94C"
    else if(depth > 30) return "#F3DB4C"
    else if(depth > 10) return "#E1F34C"
    else return "#B6F34C"
}
    // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

 
//  return div;
//  };
// function displayLegend(){
//     var legendInfo = [{
//         limit: "Mag: 0-1",
//         color: "chartreuse"
//     },{
//         limit: "Mag: 1-2",
//         color: "greenyellow"
//     },{
//         limit:"Mag: 2-3",
//         color:"gold"
//     },{
//         limit:"Mag: 3-4",
//         color:"DarkOrange"
//     },{
//         limit:"Mag: 4-5",
//         color:"Peru"
//     },{
//         limit:"Mag: 5+",
//         color:"red"
//     }];

//     var header = "<h3>Magnitude</h3><hr>";

//     var strng = "";
   
//     for (i = 0; i < legendInfo.length; i++){
//         strng += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
//     }
    
//     return header+strng;

// }