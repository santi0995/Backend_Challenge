const socket = io();

socket.on("new sucess", (message) => alert(message));

function limpiarFormulario() {
  document.getElementById("miForm").reset();
}

document.querySelector("#newUser").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const data = {};
  email && (data.email = email);
  password && (data.password = password);
  console.log(data);
  socket.emit("new user", data);
  limpiarFormulario();
});
