//this is to show a map on the index page, and connect to the weather, when click on the map, directly show the weather
function initMap() {
  const address = '1600 Amphitheatre Parkway, Mountain View, CA';
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644},
      });
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      map.setOptions({ draggable: true });

      // Add a click event listener to capture the clicked position
      map.addListener("click", (event) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              console.log(results[0]);
              queryWeather(results[0].formatted_address)
            } else {
              console.log("No results found");
            }
          } else {
            console.log(`Geocoder failed due to: ${status}`);
          }
        });
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
