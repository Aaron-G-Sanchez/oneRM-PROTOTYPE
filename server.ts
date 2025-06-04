import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express'

dotenv.config()

// TODO: Bring back DB connection functionality.

const PORT = process.env.PORT || 8080
const REMOTE_ORIGIN = process.env.ORIGIN || 'http://localhost:5173'

const app = express()

app.use(
  cors({
    origin: REMOTE_ORIGIN
  })
)
app.use(clerkMiddleware())

// TODO: Add routes and controller files.

// Route is unprotected.
app.get('/hello-world', (req: Request, res: Response) => {
  res.json({ msg: 'Hello, World' })
})

// Uses getAuth to protect a route via authorization status.
app.get('/protected', async (req: Request, res: Response) => {
  // TODO: Convert to middleware along with the clerkMiddleware function.
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).json({ error: 'User not authenticated' })
    return
  }

  const user = await clerkClient.users.getUser(userId)

  res.json({ user, msg: 'Protected route hit' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
