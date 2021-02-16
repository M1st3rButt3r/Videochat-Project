const socket = io();

socket.on('connect', () => {
    socket.emit('ready', getCookie("uuid"));
});

socket.on("call", (id, peerid) => {;
    incomingCall(id, peerid);
});