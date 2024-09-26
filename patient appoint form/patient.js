let patients = [];

// Fetch initial patient data from JSON file
fetch('patient_data.json')
    .then(response => response.json())
    .then(data => {
        patients = data;
        console.log("Initial patient data loaded:", patients);
    })
    .catch(error => console.error("Error loading patient data:", error));

// Function to handle form submission
function myFunction() {
    console.log("fsdds");
    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const dob = document.querySelector('input[placeholder="Date of Birth"]').value;
    const gender = document.querySelector('select[name="gender"]').value;
    const city = document.querySelector('select[name="city"]').value;
    const clinic = document.querySelector('select[name="clinic"]').value;
    const speciality = document.querySelector('select[name="speciality"]').value;
    const doctor = document.querySelector('select[name="doctor"]').value;
    const appointmentDate = document.querySelector('input[placeholder="Select Date "]').value;
    const slot = document.querySelector('select[name="slot"]').value;
    const mode = document.querySelector('select[name="mode"]').value;

    const newPatient = {
        patientId: (patients.length + 1).toString(),
        name: `${firstName} ${lastName}`,
        email: email,
        phoneNumber: phone,
        dateOfBirth: dob,
        gender: gender,
        city: city,
        clinic: clinic,
        speciality: speciality,
        doctor: doctor,
        appointmentDate: appointmentDate,
        slot: slot,
        mode: mode,
    };

    patients.push(newPatient);
    displayPatientDetails(newPatient);
    alert("Appointment booked successfully!");
    document.querySelector("form").reset();
}

function displayPatientDetails(patient) {
    const detailsDiv = document.getElementById("patientDetails");

    const patientInfo = document.createElement("div");
    patientInfo.innerHTML = `
        <h2>Patient Details:</h2>
        <p><strong>Patient ID:</strong> ${patient.patientId}</p>
        <p><strong>Name:</strong> ${patient.name}</p>
        <p><strong>Email:</strong> ${patient.email}</p>
        <p><strong>Phone:</strong> ${patient.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> ${patient.dateOfBirth}</p>
        <p><strong>Gender:</strong> ${patient.gender}</p>
        <p><strong>City:</strong> ${patient.city}</p>
        <p><strong>Clinic:</strong> ${patient.clinic}</p>
        <p><strong>Speciality:</strong> ${patient.speciality}</p>
        <p><strong>Doctor:</strong> ${patient.doctor}</p>
        <p><strong>Appointment Date:</strong> ${patient.appointmentDate}</p>
        <p><strong>Slot:</strong> ${patient.slot}</p>
        <p><strong>Mode:</strong> ${patient.mode}</p>
        <hr />
    `;
    detailsDiv.appendChild(patientInfo);
}

function myFunction2() {
    alert("Action canceled.");
    document.querySelector("form").reset();
}
