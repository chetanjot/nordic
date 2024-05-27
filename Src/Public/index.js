const form = document.getElementById("chat-form");
const messageBox = document.getElementById("messageBox");
const chatBox = document.getElementById("chat-box");

const socket = io("localhost:4000");

/*recevice message from server*/
socket.on("message", (message) => {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = message;

  chatBox.appendChild(li);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageBox.value;
  /*Send message to server*/
  socket.emit("message", message);
  messageBox.value = "";
});
