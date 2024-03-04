import { Express, Request, Response } from "express"
import paths from "../paths"

// Handle the root route
const handleRoot = (req: Request, res: Response) => {
  if (!paths.indexFile) {
    res.status(404).send("Root route not found")
  }
  res.sendFile(paths.indexFile)
}

/**
 * getRoutes()
 * @param app
 */
export default function getRoutes(app: Express) {
  // Routes
  app.get("/", (req, res) => handleRoot(req, res))
}
