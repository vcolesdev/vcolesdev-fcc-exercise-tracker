import {Express, NextFunction, Request, Response} from "express";
import UserModule from "../../modules/User";

const userEvents = UserModule.events;

/**
 * Get API routes for exercises routes
 * @param app
 */
export default async function getUserApiRoutes(app: Express) {
  /**
   * Route to add a new user to the database
   * @route /api/users/add_new
   */
  app.post("/api/users/add_new",
    async function(req: Request, res: Response, next: NextFunction) {
      await userEvents.handleAddNewUser(req, res, next);
    }, async function(req: Request, res: Response) {
      return userEvents.handleCreateNewUserLogs(req, res);
    });
  /**
   * Route to get all users from the database
   * @route /api/users
   */
  app.get("/api/users",
    async function(req: Request, res: Response) {
      return userEvents.handleGetAllUsers(req, res);
    });
  /**
   * Route to get a user by ID from the database
   * @route /api/users/:user_id
   */
  app.get("/api/users/:user_id",
    async function(req: Request, res: Response) {
      return userEvents.handleGetUserById(req, res);
    });
  /**
   * Route to view a list of users exercises.
   * @route /api/users/:_id/exercises/
   */
  app.get("/api/users/:user_id/exercises",
    async (req: Request, res: Response, next: NextFunction) =>
      userEvents.handleCheckExistingUserById(req, res, next),
    async function(req, res) {
      return userEvents.handleGetUserExercises(req, res);
    });
  /**
   * Route to view a list of users logs.
   * @route /api/users/:_id/logs/
   */
  app.get("/api/users/:user_id/logs",
    async (req: Request, res: Response, next: NextFunction) =>
      userEvents.handleCheckExistingUserById(req, res, next),
    async function(req: Request, res: Response) {
      return userEvents.handleGetUserLogs(req, res);
    });
}