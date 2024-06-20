const { Server } = require("socket.io");

const socketIo_Config = (io) => {
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const addUser = (userId, socketId) => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId });
    }
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connect", (socket) => {
    console.log("A client connected");

    socket.emit("welcome", "Welcome to the server!");

    socket.on("addUser", (userId) => {
      console.log("User joined:", userId);
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });

    socket.on(
      "sendNotification",
      ({ postImage, receiverId, senderName, message, userData }) => {
        console.log("Notification sent to:", receiverId);

        const user = getUser(receiverId);
        if (user) {
          io.to(user.socketId).emit("getNotifications", {
            postImage,
            senderName,
            message,
            receiverId,
            userData,
          });
        } else {
          console.log("User not found:", receiverId);
        }
      }
    );
  });
};

module.exports = socketIo_Config;
