const selector = document.querySelector("#registerButton");
selector.addEventListener("click", async () => {
  try {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /.{8,}/;

    if (!emailRegex.test(email)) {
      alert("Formato de correo electrónico inválido");
      return;
    } else if (!passwordRegex.test(password)) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    } else {
      const data = {
        email,
        password,
        name: document.querySelector("#name").value,
      };
      document.querySelector("#lastName").value &&
        (data.lastName = document.querySelector("#lastName").value);
      document.querySelector("#photo").value &&
        (data.photo = document.querySelector("#photo").value);
      document.querySelector("#age").value &&
        (data.age = document.querySelector("#age").value);
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/sessions/register", opts);
      response = await response.json();
      response.statusCode === 201
        ? (alert("Usuario Registrado Correctamente"),
          location.replace("/sessions/verify"))
        : alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
