import {UserModel, ExerciseModel, UserLogsModel} from "../schema";
import {Request, Response, Express, NextFunction} from "express";

// Handle the test route
const handleApiTestRoute = (req: Request, res: Response) => {
  res.json({message: "Test endpoint"});
};

/**
 * checkIfUserExists()
 * Check if user exists
 */
const checkIfUserExists = async (res: Response, username: string) => {
  const userExists = await UserModel.exists({username: username});
  if (userExists) {
    res.json({error: "Username already exists"});
  }
  return false;
}

/**
 * Get API routes
 */
export default async function getApiRoutes(app: Express) {
  app.get("/api/test", function(req: Request, res: Response) {
    return handleApiTestRoute(req, res);
  });

  app.get("/api/users/", async (req: Request, res: Response) => {
    let userDocs: typeof UserModel[] = [];
    const users: typeof UserModel[] = await UserModel.find({});
    for await (const user of users) {
      userDocs.push(user);
    }
    res.send(userDocs);
    return res.json(userDocs);
  });

  // Add new user
  app.post("/api/users/add_new", async (req: Request, res: Response) => {
    const {username} = req.body;

    // Check if user exists
    const userExists = await checkIfUserExists(res, username);
    if (userExists) {
      res.json({error: "Username already exists"});
    }

    // Create new user and save to the database
    const newUserDoc = new UserModel({username: username});
    await newUserDoc.save();

    // Return the new user
    return res.send(newUserDoc);
  });

  app.get("/api/users/:_id", async (req: Request, res: Response) => {
    const {_id} = req.params;
    const user = await UserModel.findById(_id);
    return res.json(user);
  });

  app.post("/api/exercises/add_new", async (req, res) => {
    const {userId, description, duration, date} = req.body;

    // Check if user exists
    const user = await UserModel.findById(userId)
      .then((user) => user)
      .catch((err) => {
        console.error("User not found: ", err);
      });

    // Create new exercise and save to the database
    const newExerciseDoc = new ExerciseModel({
      username: user && user.username || "test",
      userId: userId,
      description: description,
      duration: duration,
      date: date,
    });

    // Save the new exercise
    await newExerciseDoc.save();

    // Return the new exercise
    return res.send(newExerciseDoc);
  });

  // Get exercises for the current user
  app.get("/api/users/:_id/exercises", async (req, res) => {
    const {_id} = req.params;

    // Get the current user
    const user = await UserModel.findById(_id);

    // Get the exercises for the current user
    const exercises = await ExerciseModel.find({userId: _id});

    // Check if there are no exercises
    if (!exercises) {
      return res.json({error: "No exercises found for the current user"});
    }

    // Return the exercises
    return res.json(exercises);
  });

  // Get user logs
  app.get("/api/users/:_id/logs", async (req, res) => {
    const {_id} = req.params;

    // Get the current user
    const user = await UserModel.findById(_id);
    const exerciseLogs = await ExerciseModel.find({userId: _id});

    // Create the user logs
    const userLogs = new UserLogsModel({
      username: user && user.username || "test",
        count: exerciseLogs.length,
      _id: _id,
      log: exerciseLogs.map((log) => {
        return {
          description: log.description,
          duration: log.duration,
          date: log.date,
        }
      }) || [],
    });

    // Save the user logs to the database
    await userLogs.save();

    // Return the user logs
    return res.json(userLogs);
  });
}