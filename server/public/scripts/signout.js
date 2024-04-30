fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#register"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#loginForm"));
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
            alert(response.response);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          alert(error);
        }
      });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#newProduct"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#orders"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#products"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#myproducts"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#allproducts"));
    }
    if (res.response?.role === 0) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#newProduct"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#allproducts"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#myproducts"));
    } else if (res.response?.role === 1) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#orders"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#products"));
        document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#myproducts"));
    } else if (res.response?.role === 2) {
      document
      .querySelector(".navbar-nav")
      .removeChild(document.querySelector("#allproducts"));
    }
  });
