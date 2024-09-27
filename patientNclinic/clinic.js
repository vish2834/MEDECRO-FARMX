function filterClinics() {
    // Get search input value
    let input = document.getElementById('searchInput').value.toLowerCase();

    // Get clinic elements
    let clinics = document.getElementsByClassName('clinic');

    // Loop through clinics and hide those that don't match the search query
    for (let i = 0; i < clinics.length; i++) {
        let clinicName = clinics[i].getAttribute('data-name').toLowerCase();
        let clinicLocation = clinics[i].getAttribute('data-location').toLowerCase();

        if (clinicName.includes(input) || clinicLocation.includes(input)) {
            clinics[i].style.display = 'block';
        } else {
            clinics[i].style.display = 'none';
        }
    }
}
