var map;
var directionsService;
var directionsDisplay;
var markers = [];
var distanceText;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 8
    });

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

    distanceText = document.getElementById('distance');

    map.addListener('click', function (e) {
        if (markers.length < 2) {
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });

            markers.push(marker);

            if (markers.length === 2) {
                calculateAndDisplayRoute(markers[0].getPosition(), markers[1].getPosition());
            }
        } else {
            alert('Ya has seleccionado dos puntos.');
        }
    });
}

function calculateAndDisplayRoute(origin, destination) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var distance = 0;

            for (var i = 0; i < route.legs.length; i++) {
                distance += route.legs[i].distance.value;
            }

            // Convertir la distancia a metros y mostrarla
            var distanceInMeters = distance;
            var distanceTextContent;

            if (distanceInMeters < 1000) {
                distanceTextContent = distanceInMeters + ' metros';
            } else {
                var distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
                distanceTextContent = distanceInKilometers + ' kilómetros';
            }

            distanceText.textContent = distanceTextContent;
        } else {
            alert('No se pudo calcular la ruta: ' + status);
        }
    });
}