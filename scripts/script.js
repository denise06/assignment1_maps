let singapore = [ 1.29,103.85]; // #1 Singapore latlng
let map = L.map('map').setView(singapore, 12); // #2 Set the center point// .map (id of the map in html)
// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map); 




// Add map search box 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 
const geocoder = L.Control.geocoder({
    geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {countrycodes: 'SG'}
    }),
    defaultMarkGeocode: false,
}).addTo(map);
 
geocoder.on('markgeocode', function(e) {
    if (searchLocation) {
        map.removeLayer(searchLocation);
    }
    const latlng = e.geocode.center;
    // marker will mbe removed and placed in the new location
    searchLocation = L.marker(latlng).addTo(map);

    map.fitBounds(e.geocode.bbox);
  })
  .addTo(map);  

  
//   Read the URA parking lot 
window.addEventListener('DOMContentLoaded', async ()=>{
  let response = await axios.get("data/carpark-rates/ura_parking.geojson");
  let ura_layer = L.geoJson(response.data, {
      onEachFeature: function(feature, layer) {
        // console.log(feature.properties)
        // layer.bindPopup(feature.properties.Description);

    
    // display only the type and name of carpark

        let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let type = divElement.querySelector('td').innerHTML;
            let no_lot = divElement.querySelectorAll('td')[1].innerHTML;
            let location = divElement.querySelectorAll('td')[3].innerHTML;
            
            layer.bindPopup(`<div>
            <h2>${type}</h2>
            <h3>Availability: ${no_lot}</h3>
            <h3>Location: ${location}</h3>
            <div>`);
        
      }
  }).addTo(map);
  
//   style the URA parking layer
  ura_layer.setStyle({
    'color':'blue',
    // 'fillColor':'orange'
    })  

})






