var markers = [];

async function run() {
    // get bus data    
    const locations = await getBusLocations();
    for (let i = 0; i < locations.length; i++) {
        let location = locations[i];
        let id  = location.id;
        let Lng = location.longitude;
        let Lat = location.latitude;
        if (markers[i] === undefined) {
            markers[i] = new mapboxgl.Marker()
            .setLngLat([Lng, Lat])
            .setPopup(new mapboxgl.Popup({ offset: [-10, -40] }) // add popups
            .setHTML('<p>Bus #' + id + '</p>'))
            .addTo(map);
        } else {
            markers[i].setLngLat([Lng, Lat]);
        } 
    }

    // timer
    setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api.metro.net/agencies/lametro/routes/2/vehicles/';
    const response = await fetch(url);
    const json     = await response.json();
    return json.items;
}

mapboxgl.accessToken = 'pk.eyJ1IjoiZDJ3ZWJsb2dpYyIsImEiOiJja29nZXI1dzAwZWZoMm5xZjJ3NXdkdTU3In0.vqbKYeFtVH1of_QXRP3Khw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-day-v1',
    center: [-118.361418, 34.071565], 
    zoom: 12
});

run();