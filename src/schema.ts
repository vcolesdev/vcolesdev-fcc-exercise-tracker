import mongoose from "mongoose"

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
})

export const ExerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export const UserLogsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  },
})

// Export models
export const User = mongoose.model("users", UserSchema)
export const Exercise = mongoose.model("exercises", ExerciseSchema)
export const UserLogs = mongoose.model("user_logs", UserLogsSchema)
