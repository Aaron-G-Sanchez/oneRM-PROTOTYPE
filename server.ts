import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_CONN_STRING = process.env.MONGODB_CONN_STRING

if (!MONGO_CONN_STRING) throw new Error('Error loading .env file')

mongoose
  .connect(MONGO_CONN_STRING)
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log(err)
  })

export const db = mongoose.connection
process.on('SIGINT', () => {
  db.close().then(() => {
    console.log('MongoDB connection disconnected')
    process.exit(0)
  })
})

const app = express()

app.listen(8001, () => {
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  console.log(`Server is running on port 8001`)
})
