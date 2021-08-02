// define singapore lat & long
let singapore = [1.29, 103.85];

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

let group = L.layerGroup();
let group2 = L.layerGroup();
let group3 = L.layerGroup();


//   Read the URA available parking lot 
window.addEventListener('DOMContentLoaded', async () => {
    let response = await axios.get("data/carpark-rates/ura_parking.geojson");
    let ura_layer = L.geoJson(response.data, {
        onEachFeature: function (feature, layer) {
            // console.log(feature)

            // display only the type and name of carpark

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

    // }).addTo(map);
        }).addTo(group);      

    // //   style the URA parking layer
    // ura_layer.setStyle({
    //     'color': 'blue',
    // })
    // // adding layers based on carpark type

    // var vehicleType =[{
    //     "type": "Feature",
    //     "properties": {
    //         "TYPE": "CAR LOTS"
    //     }
    // },
    // {
    //     "type": "Feature",
    //     "properties": {
    //         "TYPE": "MYCYCLE LOTS"
    //     }
    // }
    // ]

    // L.geoJSON(vehicleType, {
    //     style: function(feature){
    //         switch (feature.properties.TYPE) {
    //             case 'CAR LOTS': return {color: "#ff0000"};
    //             case 'MYCYCLE LOTS':   return {color: "#00FF00"};
    //     }
    // }
    // }).addTo(map);


    // Read the carpark rates geojson file
    let rates = await axios.get("data/carpark-rates/carpark-rates_LL.geojson")
    let rate_layer = L.geoJson(rates.data, {
        onEachFeature: function (feature, layer) {
            // console.log(feature)
            let divElement = document.createElement('div');
            // divElement.innerHTML = feature.properties.Description;
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
    }).addTo(group2)
})




async function getAvailablelayer() {
    let availResponse = await axios.get("data/carpark-rates/CarParkAvailability.json")
        .bindPopup('<p>${AvailableLots}</p>')

    for (let obj of availResponse.data) {
        const { Development, Location } = obj;
        L.circle(Location, {
            color: 'yellow',
            fillColor: "yellow",
            fillOpacity: 0.8,
            radius: 55
        }).bindPopup(`<p>${Development}</p>`).addTo(group3);
    }
    return;
}

// Adding layers control to the maps
let baseLayers ={
    'Available URA Carparks': group,
    'Carpark Rates': group2
}

// let overlays = {
//     'Green Circle':group3
// }
// Add layers to map
L.control.layers(baseLayers).addTo(map);

