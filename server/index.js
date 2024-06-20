const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const socketIo_Config = require("./socket");
const app = express();
const JWT_SECRET = "your_secret_key_here";

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.io setup
const io = new Server(4000, {
  cors: { origin: "*" },
});
socketIo_Config(io);

app.post("/api/jwt", (req, res) => {
  console.log("Entering server endpoint for JWT generation");

  const { userId } = req.body;
  console.log("userId from client ", userId);

  if (userId) {
    jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        console.log("Generated token:", token);
        res.json({ token });
      }
    });
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

const PORT = 5000;
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("error", (err) => {
  console.error("Socket.io error:", err);
});
