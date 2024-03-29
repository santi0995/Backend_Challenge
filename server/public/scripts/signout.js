fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    if(res.statusCode===200) {
      document.querySelector(".navbar").removeChild(document.querySelector("#register"))
      document.querySelector(".navbar").removeChild(document.querySelector("#loginForm"))
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" /* , token */ },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          if (response.statusCode === 200) {
            alert(response.message);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"))
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#signout"))
    }
    if (res.response?.role===0) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#formButton"))
    } else if (res.response?.role===1) {
      document.querySelector(".navbar-nav").removeChild(document.querySelector("#ordersButton"))
    }
  });