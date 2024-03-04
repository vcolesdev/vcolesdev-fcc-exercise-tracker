import { Express, NextFunction, Request, Response } from "express"
import UserModule from "../../modules/User"
import { User } from "../../schema"

const userEvents = UserModule.events

/**
 * Get API routes for exercises routes
 * @param app
 */
export default async function getUserApiRoutes(app: Express) {
  /**
   * Route to add a new user to the database
   * @route /api/users/add_new
   */
  app.post(
    "/api/users/add_new",
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.body
      if (!username) {
        return res.status(400).json({ error: "Username is required." })
      }
      if (username.length < 3) {
        return res.status(400).json({ error: "Username must be at least 3 characters." })
      }
      if (username.length > 20) {
        return res.status(400).json({ error: "Username must be less than 20 characters." })
      }
      if (typeof username !== "string") {
        return res.status(400).json({ error: "Username must be a string." })
      }
      const existingUser = await User.findOne({ username: username })
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." })
      }
      next()
    },
    async (req: Request, res: Response, next: NextFunction) => {
      await userEvents.handleAddNewUser(req, res, next)
    },
    async (req: Request, res: Response) => userEvents.handleCreateNewUserLogs(req, res)
  )
  /**
   * Route to get all users from the database
   * @route /api/users
   */
  app.get("/api/users", async (req: Request, res: Response) => userEvents.handleGetAllUsers(req, res))
  /**
   * Route to get a user by ID from the database
   * @route /api/users/:user_id
   */
  app.get("/api/users/:user_id", async (req: Request, res: Response) => userEvents.handleGetUserById(req, res))
  /**
   * Route to view a list of users exercises.
   * @route /api/users/:_id/exercises/
   */
  app.get(
    "/api/users/:user_id/exercises",
    async (req: Request, res: Response, next: NextFunction) => userEvents.handleCheckExistingUserById(req, res, next),
    async (req, res) => userEvents.handleGetUserExercises(req, res)
  )
  /**
   * Route to view a list of users logs.
   * @route /api/users/:_id/logs/
   */
  app.get(
    "/api/users/:user_id/logs",
    async (req: Request, res: Response, next: NextFunction) => userEvents.handleCheckExistingUserById(req, res, next),
    async (req: Request, res: Response) => userEvents.handleGetUserLogs(req, res)
  )
}
