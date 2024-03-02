import { Express } from "express";
import getUserApiRoutes from "./users";
import getExerciseApiRoutes from "./exercises";
import getTestApiRoutes from "./test";

const userApiRoutes = getUserApiRoutes;
const exerciseApiRoutes = getExerciseApiRoutes;
const testApiRoutes = getTestApiRoutes;

/**
 * Get API routes
 */
export default async function getApiRoutes(app: Express) {
  await testApiRoutes(app);
  await userApiRoutes(app);
  await exerciseApiRoutes(app);
}
