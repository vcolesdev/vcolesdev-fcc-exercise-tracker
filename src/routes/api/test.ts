import {Express, Request, Response} from "express";

/**
 * Handle the test route
 * @param req
 * @param res
 */
const handleApiTestRoute = (req: Request, res: Response) => {
  res.json({message: "Test endpoint"});
};

/**
 * Get API routes for test routes
 * @param app
 */
export default async function getTestApiRoutes (app: Express) {
  /**
   * Route to test the API
   * @route /api/test
   */
  app.get("/api/test", function(req: Request, res: Response) {
    return handleApiTestRoute(req, res);
  });
}