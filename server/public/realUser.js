const socket = io();

// socket.on("products", (data) => {
//   data = data.map(
//     (each) => `
// <div class="card m-2" style="width: 360px">
//   <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.price}">
//   <h5 class="p-2 text-center card-title">${each.price}</h5>
// </div>`
//   ).join("");
// });

socket.on("new sucess", (message) => alert(message));

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
});
