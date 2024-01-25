const socket = io()

const user = {}

Swal.fire({
    title: "Type your nickname",
    input: "text",
    inputValidator: nickname => (!nickname && "Type your nickname!"),
    allowOutsideClick: false
}).then(obj=>{
    user.name = obj.value
    document.querySelector("#name").innerHTML = obj.value
    socket.emit("user", user)
})

const newChat = document.querySelector("#text")
newChat.addEventListener("keyup", event =>{
        if (event.key === "Enter") {
            if (newChat.value === "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No dejes el campo en blanco!"
                  });
            } else{
                socket.emit("new chat", {name: user.name, message: newChat.value})
                   newChat.value = ""
            }
    }
})

socket.on("all", (data)=>{
    const chatNew = data.map(each=>`<p><span>${each.name}: </span>${each.message}</p>`).join("")
    document.querySelector("#chats").innerHTML = chatNew 
})






