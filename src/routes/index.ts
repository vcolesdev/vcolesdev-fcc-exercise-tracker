import paths from "../paths";
import {Express, Request, Response} from "express";

// Handle the root route
const handleRoot = (req: Request, res: Response) => {
  if (!paths.indexFile) {
    res.status(404).send("Root route not found");
  }
  res.sendFile(paths.indexFile);
}

/**
 * getRoutes()
 * @param app
 */
export default function getRoutes(app: Express) {
  // Routes
  app.get("/", function(req, res) {
    return handleRoot(req, res);
  });
}