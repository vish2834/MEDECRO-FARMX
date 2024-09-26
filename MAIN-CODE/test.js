let map;
let markers = [];

// Initialize and add the map (using OpenStreetMap with Leaflet)
function initMap() {
    const defaultLocation = [28.4390, 77.0408]; // Coordinates for Delhi

    // Initialize the map and set its view
    map = L.map('map').setView(defaultLocation, 12);

    // Load and display the tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Function to get coordinates of the user-inputted location
function getCoordinates(location) {
    const url = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;
  
    // Fetch API call to get coordinates of the location
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const latitude = parseFloat(data[0].lat);
                const longitude = parseFloat(data[0].lon);
                console.log(`Coordinates: ${latitude}, ${longitude}`);  // For debugging
                // Update the map center
                const newCenter = [latitude, longitude];
                map.setView(newCenter, 12);
                // Call the clinic search function with the coordinates
                findClinics(latitude, longitude);
            } else {
                displayMessage('Location not found. Please try a different location.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Error fetching location. Please try again later.', 'error');
        });
}

// Function to find clinics near the coordinates (using fixed coordinates for Delhi)
function findClinics(lat, lon) {
    const clinicUrl = `https://nominatim.openstreetmap.org/search?q=clinic&format=json&limit=5&lat=${lat}&lon=${lon}`;
  
    // Fetch API call to get clinics near the coordinates
    fetch(clinicUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('clinic-results');
            resultsContainer.innerHTML = ''; // Clear previous results

            clearMarkers(); // Remove old markers from the map

            if (data && data.length > 0) {
                data.forEach(clinic => {
                    const clinicElement = document.createElement('div');
                    clinicElement.className = 'clinic';
                    clinicElement.innerHTML = `<h3>${clinic.display_name}</h3>`;
                    resultsContainer.appendChild(clinicElement);

                    // Create marker for each clinic on the map
                    const clinicLocation = [parseFloat(clinic.lat), parseFloat(clinic.lon)];
                    addMarker(clinicLocation, clinic.display_name);
                });
            } else {
                displayMessage('No clinics found near the location.', 'info');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Error fetching clinic data. Please try again later.', 'error');
        });
}

// Add a marker to the map at the given location
function addMarker(location, title) {
    const marker = L.marker(location).addTo(map).bindPopup(title);
    markers.push(marker);
}

// Clear all markers from the map
function clearMarkers() {
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];
}

// Function to display messages to the user
function displayMessage(message, type) {
    const resultsContainer = document.getElementById('clinic-results');
    resultsContainer.innerHTML = ''; // Clear previous results
  
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
  
    resultsContainer.appendChild(messageElement);
}

// Example usage:
document.getElementById('find-clinic-btn').addEventListener('click', function () {
    const location = document.getElementById('location-input').value;
    if (location) {
        getCoordinates(location);  // Fetch coordinates and update map
    } else {
        displayMessage('Please enter a valid location.', 'error');
    }
});

// Initialize the map on page load
initMap();
