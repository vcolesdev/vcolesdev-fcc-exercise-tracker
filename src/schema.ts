import mongoose, {Mongoose, SchemaDefinition} from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel = mongoose.model("users", UserSchema);

export const ExerciseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
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
    required: false,
  },
});

export const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

export const UserLogsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  log: {
    type: Array,
    required: true,
  },
});

export const UserLogsModel = mongoose.model("user_logs", UserLogsSchema);
