import { User, Exercise, UserLogs } from "../schema";
import { Request, Response, NextFunction } from "express";

/**
 * User module
 * @type module
 */
export default {
  events: {
    /**
     * Handle getting all users
     * @param req
     * @param res
     */
    handleGetAllUsers: async (req: Request, res: Response) => {
      const users = await User.find({});
      return res.json(users);
    },
    /**
     * Handle adding a new user
     * @param req
     * @param res
     * @param next
     */
    handleAddNewUser: async (
      req: Request,
      res: Response,
      next?: NextFunction,
    ) => {
      const { username } = req.body;
      const newUser = new User({
        username: username,
        user_id: Math.floor(Math.random() * 1000),
      });

      await newUser.save().then(() => {
        console.log("User saved: ", newUser);
      });

      if (next) next();
    },
    /**
     * Handle creating a user log entry
     * @param req
     * @param res
     */
    handleCreateNewUserLogs: async (req: Request, res: Response) => {
      const { username } = req.body;
      const currentUser = await User.findOne({ username: username });

      // Create a new user log entry
      const userLogs = new UserLogs({
        username: currentUser && currentUser.username,
        user_id: currentUser && currentUser.user_id,
        count: 0,
        log: [],
      });

      userLogs.save().then((logs) => {
        console.log("User logs saved: ", logs);
      });
      return res.json(userLogs);
    },
    /**
     * Handle getting a user by ID
     * @param req
     * @param res
     */
    handleGetUserById: async (req: Request, res: Response) => {
      const { user_id } = req.params;
      const user = await User.findOne({ user_id: user_id });
      return res.json(user);
    },
    /**
     * Handle checking for missing fields
     * @param req
     * @param res
     * @param next
     */
    handleCheckMissingFields: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { userId, description, duration, date } = req.body;
      if (!userId || !description || !duration || !date) {
        return res.json({
          msg: "Missing required fields",
        });
      }
      next();
    },
    /**
     * Handle checking for a current user by ID
     * @param req
     * @param res
     * @param next
     */
    handleCheckCurrUserById: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { userId } = req.body;
      const currentUser = await User.findOne({ user_id: userId });
      if (!currentUser) {
        return res.json({
          error: "User not found",
        });
      }
      next();
    },
    /**
     * Handle checking for an existing user by ID
     * @param req
     * @param res
     * @param next
     */
    handleCheckExistingUserById: async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { user_id } = req.params;
      const existingUser = await User.findOne({ user_id: user_id });
      if (!existingUser) {
        return res.json({
          error: `User with ID: ${user_id} not found in database.`,
        });
      }
      next();
    },
    /**
     * Handle adding a new exercise
     * @param req
     * @param res
     */
    handleAddNewExercise: async (req: Request, res: Response) => {
      // Get the request body
      const { userId, description, duration, date } = req.body;

      // Get the current user
      const currentUser = await User.findOne({ user_id: userId });

      // Create a new exercise
      const newExercise = new Exercise({
        username: currentUser!.username,
        user_id: currentUser!.user_id,
        description: description,
        duration: duration,
        date: date,
      });

      // Save the exercise
      await newExercise.save().then((exercise) => {
        console.log("Exercise saved: ", exercise);
      });

      // Return the new exercise
      return res.json(newExercise);
    },
    /**
     * Handle getting all exercises for a user
     * @param req
     * @param res
     */
    handleGetUserExercises: async (req: Request, res: Response) => {
      const { user_id } = req.params;
      const currentUser = await User.findOne({ user_id: user_id });
      const userExercises = await Exercise.find({
        username: currentUser!.username,
      });
      if (!userExercises) {
        return res.json({
          error: `No exercises found for user.`,
          user: currentUser!.username,
        });
      }
      console.log(
        `Found exercises for user: ${currentUser!.username}: `,
        userExercises,
      );
      return res.json(userExercises);
    },
    /**
     * Handle getting user logs
     * @param req
     * @param res
     */
    handleGetUserLogs: async (req: Request, res: Response) => {
      const { user_id } = req.params;
      await UserLogs.findOne({ user_id: user_id }).then((logs) => {
        if (!logs) {
          return res.json({
            error: `No logs found for user with id: ${user_id}.`,
          });
        }
        console.log(`Logs found for user with id: ${logs.user_id}:`, logs);
        return res.json(logs);
      });
    },
  },
  fn: {},
};
