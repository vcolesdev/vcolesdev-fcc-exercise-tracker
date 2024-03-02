import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import getRoutes from "./routes";
import serverMsg from "./serverMsg";
import getApiRoutes from "./routes/api";

dotenv.config();

// Config
const appPort = process.env.PORT || 3000;
const corsOptions = { optionsSuccessStatus: 200 };
const mongoURI = process.env.MONGO_URI;

// App
export const app = express();

// Database
export const db = mongoose.connect(mongoURI!, {
  dbName: "freecodecamp",
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));

// Routes
getRoutes(app);
getApiRoutes(app);

// Listener
const listener = app.listen(appPort, () => serverMsg.listener);

// Main function
const main = async () => {
  try {
    await db;
    serverMsg.dbConnected();
  } catch (error) {
    serverMsg.dbError();
  }
};

main().then(() => {
  console.log("Hello from main! Starting server...");

  // Start server
  listener.on("error", (error) => serverMsg.error(error));
});
