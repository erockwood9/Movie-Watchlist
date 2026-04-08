// Main entrypoint for the backend. Run `npm run dev` to start server

import express from "express";
import router from "./routes/router.js";
import db from "./db.js";

const app = express();

app.use("/api", router);

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
