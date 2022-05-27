//Leaflet map's latitude, longitude and zoom level
const mymap = L.map('map').setView([0, 0], 1)


//Open Street Map attribution
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'


//Open Street Map tiles
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)


//Leaflet Marker
const customIcon = L.icon({
    iconUrl: "https://i.gifer.com/ZNeT.gif",
    iconSize: [38,35],
    iconAnchor: [22, 20]
})

const marker = L.marker([0, 0], {icon: customIcon}).addTo(mymap)


//ISS API url
const url = "https://api.wheretheiss.at/v1/satellites/25544"

//Fetch
async function getISS() {
    const response = await fetch(url) 
    const data = await response.json() 
    const { latitude, longitude, units, altitude, velocity, visibility} = data  

//Updates marker on the map
marker.setLatLng([latitude, longitude])


document.getElementById('latitude').textContent = latitude
document.getElementById('longitude').textContent = longitude
document.getElementById('units').textContent = units
document.getElementById('altitude').textContent = altitude
document.getElementById('velocity').textContent = velocity
document.getElementById('visibility').textContent = visibility
}

// getISS()

setInterval(() => {
    getISS()
    (data => {
        const coords = { lat: data.latitude, lng: data.longitude }
        map.setCenter(coords)
        getISS(data.latitude, data.longitude, data.altitude, data.velocity)
        updateMarkerPosition(coords, marker)
    })
}, 2000) //2 secs interval



  