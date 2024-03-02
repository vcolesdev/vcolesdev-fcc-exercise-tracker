import { Express, NextFunction, Request, Response } from "express";
import UserModule from "../../modules/User";

const userEvents = UserModule.events;

/**
 * Get API routes for exercises routes
 * @param app
 */
export default async function getExerciseApiRoutes(app: Express) {
  /**
   * Route to add a new exercise to the database
   * @route /api/exercises/add_new
   */
  app.post(
    "/api/exercises/add_new",
    async (req: Request, res: Response, next: NextFunction) =>
      userEvents.handleCheckMissingFields(req, res, next),
    async (req: Request, res: Response, next: NextFunction) =>
      userEvents.handleCheckCurrUserById(req, res, next),
    async function (req: Request, res: Response) {
      return userEvents.handleAddNewExercise(req, res);
    },
  );
}
