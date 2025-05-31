import { Schema } from 'mongoose'

export const exerciseModel = new Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  sets: { type: Number, required: true }
})
