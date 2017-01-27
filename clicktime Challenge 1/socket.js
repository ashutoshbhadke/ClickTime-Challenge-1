// Socket events

var base = 'http://clicktime.herokuapp.com:80/rooms/';
var roomName = 'WhiteBoard';    // Replace this with your own room name
var socket = io.connect(base + roomName);
console.log("Sending Welcome");
socket.emit('welcome');
      /**
       * These are the events that the websocket server will emit
       *
       * When sending messages, make sure the type is set to 'message', or other clients won't receive your data
       * (e.g. socket.emit('message', { ... }); )
       */
    socket.on('welcome', function () {
        // Connection is established, start using the socket
        console.log("welcome to whiteboard..");
      });

    socket.on('message', function (data) {
       // The 'message' event is emitted whenever another client sends a message
       // Messages are automatically broadcasted to everyone in the room
       // socket.emit('message', 'this is a response message!');
        console.log("Received "+ data);
        addClick(data.x, data.y,data.dragging);
        redraw(data.senderColor);
      });

      socket.on('heartbeat', function () {
          // You can listen on this event to make sure your connection is receiving events correctly
          // The server will emit a heartbeat every 30 seconds to all connected clients
          console.log("received heartbeat");
      });

      socket.on('error', function (err) {
          // Sometimes things go wrong!
          var type = err.type;    // This is the type of error that occurred
          var message = err.message;    // This is a friendly message that should describe the error
      });

