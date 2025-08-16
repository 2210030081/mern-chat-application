const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const { initSocket } = require("./socket/index.js");

dotenv.config(); // Load .env variables

const app = express();

// ✅ Use PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// ✅ Updated CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", require("./Routes/auth_routes.js"));
app.use("/user", require("./Routes/userRoutes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Server setup
const server = http.createServer(app);

// Socket.io setup (with CORS)
initSocket(server);

// Start server and connect to database
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
  connectDB();
});
