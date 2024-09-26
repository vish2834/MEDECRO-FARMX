document.getElementById("sign-in-tab").addEventListener("click", function () {
    document.getElementById("sign-up-tab").classList.remove("active");
    this.classList.add("active");
    document.getElementById("sign-up-form").innerHTML = `
          <input type="email" placeholder="Email" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">Sign In</button>
      `;
    document.querySelector(".login-link").style.display = "none";
  });
  
  document.getElementById("sign-up-tab").addEventListener("click", function () {
    document.getElementById("sign-in-tab").classList.remove("active");
    this.classList.add("active");
    document.getElementById("sign-up-form").innerHTML = `
          <input type="text" placeholder="Full Name" required>
          <input type="email" placeholder="Email" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>`;
            document.querySelector(".login-link").style.display = "block";
  });
  

function demoDataDestroy(){
  localStorage.clear();
}

function demoData(){
  const data = {
    "doctors":{"users":{
      "user@gmail.com":{"password":"password123"},
    }
    },
    "patient":{"users":
      {
        "user@gmail.com":{"password":"password123"},
      }
    }
  };

  const current_user = {
    "active":false,
    "usertype":"",
    "user":"",
    "password":"",
  }

  localStorage.setItem("current_user",JSON.stringify(current_user))

  localStorage.setItem("user",JSON.stringify(data));
}



