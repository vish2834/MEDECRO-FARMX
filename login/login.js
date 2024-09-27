document.getElementById('loginToggle').addEventListener('click', function () {
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('loginToggle').classList.add('active');
  document.getElementById('signupToggle').classList.remove('active');
});

document.getElementById('signupToggle').addEventListener('click', function () {
  document.getElementById('signupForm').classList.add('active');
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('signupToggle').classList.add('active');
  document.getElementById('loginToggle').classList.remove('active');
});

document.getElementById('switchToLogin').addEventListener('click', function () {
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('loginToggle').classList.add('active');
  document.getElementById('signupToggle').classList.remove('active');
});

document.addEventListener("DOMContentLoaded", () => {   
  const loginToggle = document.getElementById("loginToggle");
  const signupToggle = document.getElementById("signupToggle");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Switch between Login and Signup forms
  loginToggle.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginToggle.classList.add("active");
    signupToggle.classList.remove("active");
  });

  signupToggle.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupToggle.classList.add("active");
    loginToggle.classList.remove("active");
  });

  // Handle Signup Form Submission
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = signupForm.querySelector("#username").value;
    const email = signupForm.querySelector("#email").value;
    const password = signupForm.querySelector("#password").value;
    const confpassword = signupForm.querySelector("#confirm-password").value;

    if(username && email && password && (password == confpassword)){
      const userData = {
        "username": username,
        "email": email,
        "password": password,
      };
  
      let users_data = JSON.parse(localStorage.getItem("user"));
      if(Object.keys(users_data.patient.users).includes(email) || Object.keys(users_data.doctors.users).includes(email)){
          return messageBox("Email already registered.", "warning");
      }else{
          users_data.patient.users[email] = (userData);

          localStorage.setItem("user", (JSON.stringify(users_data)));

          messageBox("Sign Up successful! User data saved.", "info");
          signupForm.reset(); // Clear the form fields

          loginForm.classList.remove("hidden");
          signupForm.classList.add("hidden");
          loginToggle.classList.add("active");
          signupToggle.classList.remove("active");

          window.location.href = "../login/login.html"; // Replace with actual path
      }
      
    }else{
      return messageBox("Something is wrong please check filled form", "error");
    }
  });

  // Handle Login Form Submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = loginForm.querySelector("#email-login").value;
    const password = loginForm.querySelector("#pass-login").value;
  

    if(email && password){
      const userData = {
        "email": email,
        "password": password
      };
  

      let users_data = JSON.parse(localStorage.getItem("user"));
      
      if(Object.keys(users_data.patient.users).includes(email) || Object.keys(users_data.doctors.users).includes(email)){
        let userType = "";
        if(Object.keys(users_data.patient.users).includes(email)){
          console.log("1",Object.keys(users_data.patient.users).includes(email) , Object.keys(users_data.doctors.users).includes(email))
          userType = users_data.patient;
          userType.users[email]['active'] = True;
          localStorage.setItem("current_user", JSON.stringify(userType.users[email]));

          messageBox("Login successful! User data saved.","info");
          window.location.href = "../patientNclinic/patient/patient.html";
        }

        if(Object.keys(users_data.doctors.users).includes(email)){
          console.log("2",Object.keys(users_data.patient.users).includes(email) , Object.keys(users_data.doctors.users).includes(email))
          userType = users_data.doctors;
          userType.users[email]['active'] = 'True';
          localStorage.setItem("current_user", JSON.stringify(userType.users[email]));

          console.log("hello");

          messageBox("Login successful! User data saved.","info");
          window.location.href = "../doctor-dashboard/index.html";
        }
      }else{
        return messageBox("Wrong Email", "error");
      }

      loginForm.reset(); // Clear the form fields
   
    }
  });

});

function destroy(){
  document.getElementById(`message-box`).style.display = 'none';
}

function activate(){
  document.getElementById(`message-box`).style.display = 'flex';
}

messageBox = (msg, msgType)=>{
  activate();
  let type = {
    "info":"info-msg",
    "error":"error-msg",
    "warning":"warning-msg"
  };
  
  let ele = document.getElementById(`${type[msgType]}`);
  ele.innerText = msg;
  ele.style.display = 'block';
  
}


