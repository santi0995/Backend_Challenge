fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if(res.statusCode===200) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#register"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#loginForm"))
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" /* , token */ },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          console.log(response);
          if (response.statusCode === 200) {
            alert(response.response);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#newProduct"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#orders"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#signout"))
    }
    if (res.response?.role===0) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#newProduct"))
    } else if (res.response?.role===1) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#orders"))
    }
  });


  