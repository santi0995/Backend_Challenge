const socket = io();

socket.on("new sucess", (message) => alert(message));

function limpiarFormulario() {
  document.getElementById("miForm").reset();
}

document.querySelector("#newUser").addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const photo = document.querySelector("#photo").value;
  const email = document.querySelector("#email").value;
  const data = {};
  name && (data.name = name);
  photo && (data.photo = photo);
  email && (data.email = email);
  console.log(data);
  socket.emit("new user", data);
  limpiarFormulario();
});
