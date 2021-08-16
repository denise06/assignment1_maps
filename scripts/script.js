// setting up viewer's map POV
let map = L.map('map').setView([1.3598, 103.8107], 12);
// map.setMaxBounds(map.getBounds());
map.setMinZoom(12);


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
            "pk.eyJ1IjoiZGVuaXNlMDYiLCJhIjoiY2tzZW16eGcyMTFueDJvcXFpcjRpbmY0eSJ9.AzJkmtv0tJURlXptLLy8Gg"
    }
).addTo(map);

let group = L.layerGroup(); //Availability
let group2 = L.layerGroup(); // Car Park rates
let group3Attract = L.layerGroup(); // rates --Attractions
let group3Hotels = L.layerGroup();  //rates -- Hotels
let group3Orchard = L.layerGroup();

// Define functions to filter data based on categories 
function filterAttract(feature) {
    if (feature.properties.category == "Singapore Attractions") return true
}

function filterHotel(feature) {
    if (feature.properties.category == "Hotels") return true
}

function filterOrchard(feature) {
    if (feature.properties.category == "Orchard Area") return true
}

// Define the icons for different filters

const hotelIcon = L.icon({
    iconUrl: "images/hotel_icon.png",
    iconSize: [25, 25],
    iconAnchor: [25, 20],
    popupAnchor: [0, -28],
    className: 'hotel-icon',
})

const orchardIcon = L.icon({
    iconUrl: "images/shopping_icon.png",
    iconSize: [25, 25],
    iconAnchor: [25, 20],
    popupAnchor: [0, -28],
    className: 'orchard-icon',
})

const attractIcon = L.icon({
    iconUrl: "images/attract_icon.png",
    iconSize: [25, 25],
    iconAnchor: [25, 20],
    popupAnchor: [0, -28],
    className: 'attract-icon',
})

function ratesIcon (feature) {
    if (feature.properties.category == "Orchard Area"){
        return orchardIcon
    }else if (feature.properties.category == "Hotels"){
        return hotelIcon
    }else {
        return attractIcon
    }
}

// create marker cluster
let markerClusterLayer = L.markerClusterGroup();


//   Read the URA available parking lot 
window.addEventListener('DOMContentLoaded', async () => {
    let response = await axios.get("data/carpark-rates/ura_parking.geojson");
    let ura_layer = L.geoJson(response.data, {
        color: 'black',
        onEachFeature: function (feature, layer) {
            // console.log(feature)

            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let type = divElement.querySelector('td').innerHTML;
            let no_lot = divElement.querySelectorAll('td')[1].innerHTML;
            let location = divElement.querySelectorAll('td')[3].innerHTML;

            // if type == CAR LOTS, display icons etc. 

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
        // pointToLayer: function (feature, coordinates) {
        //     return L.marker(coordinates, { icon: ratesIcon })
        // },
        
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
    },
    
    ).addTo(group2);
    
    rate_layer.addTo(markerClusterLayer)
    
    // Filter by category (Attractions)....

    let AttractRate_layer = L.geoJson(rates.data, {
        pointToLayer: function (feature, coordinates) {
            return L.marker(coordinates, { icon: attractIcon })
        },

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

        pointToLayer: function (feature, coordinates) {
            return L.marker(coordinates, { icon: hotelIcon })
        },

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
    ).addTo(group3Hotels)


    // Filter by category (orchard)
    let OrchardRate_layer = L.geoJson(rates.data, {
        pointToLayer: function (feature, coordinates) {
            return L.marker(coordinates, { icon: orchardIcon })
        },

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
    ).addTo(group3Orchard)
})


// setView([103.8458175,1.2995949 ],4)

// Adding layers control to the maps
let baseLayers = {
    'Available URA Carparks': group,
    'Carpark Rates': markerClusterLayer,
}

let overlays = {
    'Attraction Rates': group3Attract,
    'Hotel Rates': group3Hotels,
    'Orchard Rates': group3Orchard,
    // 'Cluster rates':markerClusterLayer
}
// Add layers to map
L.control.layers(baseLayers, overlays).addTo(map);


// External UI button for users to quickly filter between car rates and car availabilty
document.querySelector('#rates-btn').addEventListener('click', function () {
    if (map.hasLayer(group2) == false) {
        // map.addLayer(group2);
        map.addLayer(markerClusterLayer);
        map.removeLayer(group)
    }
})
// Available Carpark button
document.querySelector('#avail-btn').addEventListener('click', function () {
    if (map.hasLayer(group) == false) {
        map.addLayer(group);
        map.removeLayer(group2);
    }
})


// add radio buttons selections as overlays 
if (document.querySelector('input[name="purpose"]')) {
    document.querySelectorAll('input[name="purpose"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            var item = event.target.value;
            console.log(item);
            if (item == "hotel") {
                map.addLayer(group3Hotels),
                map.removeLayer(group3Orchard),
                map.removeLayer(group3Attract)
            } else if (item == "attract") {
                map.addLayer(group3Attract)
                map.removeLayer(group3Orchard),
                map.removeLayer(group3Hotels)
            } else if (item == "orchard"){
                map.addLayer(group3Orchard)
                map.removeLayer(group3Hotels)
                map.removeLayer(group3Attract)
            } else {
                map.removeLayer(group3Hotels)
                map.removeLayer(group3Attract)
                map.removeLayer(group3Orchard)
            }

        });
    });
}

// collapse and expand drop down of external action buttons 
$('#tab-toggle').click(() => {
    $('#myTabContent').slideToggle();
    $('#tab-toggle svg').toggleClass('fa-rotate-180');
});




