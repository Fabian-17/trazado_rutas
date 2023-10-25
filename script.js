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

function calculateTripCost(distanceInMeters) {
    // Precio fijo de la bajada de bandera
    var bajadaDeBanderaPrice = 320;

    // Precio por metro recorrido
    var pricePerMeter = 0.36;

    // Calcular el costo total del viaje
    var totalCost = bajadaDeBanderaPrice + (distanceInMeters * pricePerMeter);

    return totalCost;
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

            // Convertir la distancia a metros
            var distanceInMeters = distance;

            // Convertir la distancia a kilómetros si es mayor o igual a 1000 metros
            var distanceTextContent;
            if (distanceInMeters < 1000) {
                distanceTextContent = distanceInMeters + ' metros';
            } else {
                var distanceInKilometers = (distanceInMeters / 1000).toFixed(2);
                distanceTextContent = distanceInKilometers + ' kilómetros';
            }

            // Mostrar la distancia en pantalla
            var distanceText = document.getElementById('distance');
            distanceText.textContent = 'Distancia: ' + distanceTextContent;

            // Calcular el costo del viaje
            var tripCost = calculateTripCost(distanceInMeters);

            // Mostrar el costo en pantalla
            var costText = document.getElementById('cost');
            costText.textContent = 'Costo del viaje: $' + tripCost.toFixed(2);
        } else {
            alert('No se pudo calcular la ruta: ' + status);
        }
    });
}
