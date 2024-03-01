import {Document} from "mongodb";

export type User = {
  username: string,
  _id: string,
}

export type Exercise = {
  userId: string,
  description: string,
  duration: number,
  date?: string,
}

