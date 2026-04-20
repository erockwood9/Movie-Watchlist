// Main entrypoint for the backend. Run `npm run dev` to start server

// Load environment variables from backend/.env
import "dotenv/config";
import express from "express";
import router from "./routes/router.js";
import db from "./db.js";
import cors from "cors";

const app = express();

// Allows frontend and backend to communicate
app.use(cors({
  origin: "http://localhost:5173"
}));

// Middleware to parse incoming JSON body data
app.use(express.json());

// Mount all API routes under /api
app.use("/api", router);

// Start the HTTP server on port 5001
app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
