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

    const username = signupForm.querySelector("input[type='text']").value;
    const email = signupForm.querySelector("input[type='email']").value;
    const password = signupForm.querySelector("input[type='password']").value;

    const userData = {
      username,
      email,
      password,
      type: 'signup'
    };

    // Store user data in local storage
    localStorage.setItem('userData', JSON.stringify(userData));
    alert("Sign Up successful! User data saved.");
    signupForm.reset(); // Clear the form fields
  });

  // Handle Login Form Submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.querySelector("input[type='text']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    const userData = {
      username,
      password,
      type: 'login'
    };

    // Store user data in local storage
    localStorage.setItem('userData', JSON.stringify(userData));
    alert("Login successful! User data saved.");
    loginForm.reset(); // Clear the form fields
  });
});
