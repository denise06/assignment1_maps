// define singapore lat & long
let singapore = [1.29, 103.85];
let orchard =[ 103.828414,1.3074326]

// setting up viewer's map POV
let map = L.map('map').setView(singapore, 12);

// setup the tile layers
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            "pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg"
    }
).addTo(map);

let group = L.layerGroup(); //Availability
let group2 = L.layerGroup(); // Car Park rates
let group3Attract = L.layerGroup(); // rates --Attractions
let group3Hotels = L.layerGroup();  //rates -- Hotels
let group3Orchard = L.layerGroup();

// Define functions to filter data based on categories 
function filterAttract(feature){
    if (feature.properties.category=="Singapore Attractions") return true
}

function filterHotel(feature){
    if (feature.properties.category=="Hotels") return true 
}

function filterOrchard(feature){
    if (feature.properties.category=="Orchard Area") return true
}



//   Read the URA available parking lot 
window.addEventListener('DOMContentLoaded', async () => {
    let response = await axios.get("data/carpark-rates/ura_parking.geojson");
    let ura_layer = L.geoJson(response.data, {
        onEachFeature: function (feature, layer) {
            // console.log(feature)

            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let type = divElement.querySelector('td').innerHTML;
            let no_lot = divElement.querySelectorAll('td')[1].innerHTML;
            let location = divElement.querySelectorAll('td')[3].innerHTML;

            layer.bindPopup(`<div>
            <h3>${type}</h2>
            <p><b>Availability:</b> ${no_lot}</p>
            <p><b>Location: </b>${location}</p>
            <div>`);
        }
    }).addTo(group);

    // Read the carpark rates geojson file
    let rates = await axios.get("data/carpark-rates/carpark-rates_LL.geojson")
    let rate_layer = L.geoJson(rates.data, {
        onEachFeature: function (feature, layer) {
            let carpark = feature.properties.carpark;
            let cat = feature.properties.category
            let wkDayRates = feature.properties.weekdays_rate_1;
            let satRates = feature.properties.saturday_rate;
            let sunRates = feature.properties.sunday_publicholiday_rate

            layer.bindPopup(`<div>
            <h3>${carpark}</h2>
            <p><b>Region: </b>${cat} </p>
            <p><b>Weekday Rates: </b>${wkDayRates}</p>
            <p><b>Saturday Rates: </b>${satRates}</p>
            <p><b>Sunday/PH Rates: </b>${sunRates}</p>
            <div>`);
        }
    }

    ).addTo(group2);
    
    // Filter by category (Attractions)....
    
    let AttractRate_layer = L.geoJson(rates.data, {
        filter: filterAttract,

        onEachFeature: function (feature, layer) {
            let carpark = feature.properties.carpark;
            let cat = feature.properties.category
            let wkDayRates = feature.properties.weekdays_rate_1;
            let satRates = feature.properties.saturday_rate;
            let sunRates = feature.properties.sunday_publicholiday_rate
            layer.bindPopup(`<div>
            <h3>${carpark}</h2>
            <p><b>Region: </b>${cat} </p>
            <p><b>Weekday Rates: </b>${wkDayRates}</p>
            <p><b>Saturday Rates: </b>${satRates}</p>
            <p><b>Sunday/PH Rates: </b>${sunRates}</p>
            <div>`);
        }
        
    }
    ).addTo(group3Attract);

    // Filter by category (hotel)....
    let HotelRate_layer = L.geoJson(rates.data, {
        filter: filterHotel,

        onEachFeature: function (feature, layer) {
            let carpark = feature.properties.carpark;
            let cat = feature.properties.category
            let wkDayRates = feature.properties.weekdays_rate_1;
            let satRates = feature.properties.saturday_rate;
            let sunRates = feature.properties.sunday_publicholiday_rate
            layer.bindPopup(`<div>
            <h3>${carpark}</h2>
            <p><b>Region: </b>${cat} </p>
            <p><b>Weekday Rates: </b>${wkDayRates}</p>
            <p><b>Saturday Rates: </b>${satRates}</p>
            <p><b>Sunday/PH Rates: </b>${sunRates}</p>
            <div>`);
        }
        
    }
    ).addTo(group3Hotels);
    // Filter by category (orchard)
    let OrchardRate_layer = L.geoJson(rates.data, {
        filter: filterOrchard,

        onEachFeature: function (feature, layer) {
            let carpark = feature.properties.carpark;
            let cat = feature.properties.category
            let wkDayRates = feature.properties.weekdays_rate_1;
            let satRates = feature.properties.saturday_rate;
            let sunRates = feature.properties.sunday_publicholiday_rate
            layer.bindPopup(`<div>
            <h3>${carpark}</h2>
            <p><b>Region: </b>${cat} </p>
            <p><b>Weekday Rates: </b>${wkDayRates}</p>
            <p><b>Saturday Rates: </b>${satRates}</p>
            <p><b>Sunday/PH Rates: </b>${sunRates}</p>
            <div>`);
        }
        
    }
    ).addTo(group3Orchard);
})


// Adding layers control to the maps
let baseLayers = {
    'Available URA Carparks': group,
    'Carpark Rates': group2,
}

let overlays = {
    'Attraction Rates':group3Attract,
    'Hotel Rates':group3Hotels,
    'Orchard Rates':group3Orchard
}
// Add layers to map
L.control.layers(baseLayers, overlays).addTo(map);


// External UI button for users to quickly filter between car rates and car availabilty

document.querySelector('#toggle-btn').addEventListener('click', function(){
    if (map.hasLayer(group2) == false) {
        map.addLayer(group2);
        map.removeLayer(group)
    }
})

document.querySelector('#switch-btn').addEventListener('click', function(){
    if (map.hasLayer(group) == false) {
        map.addLayer(group);
        map.removeLayer(group2);
        map.setView(orchard,18)
    }
})

// // event listener --> query selector (read radio value/check/selected)
// // call group3Attract layer
// window.addEventListener('click', async () => {
//     document.querySelector('rates-select')
    


// }
