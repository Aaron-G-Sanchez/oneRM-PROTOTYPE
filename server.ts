import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { clerkClient, clerkMiddleware } from '@clerk/express'
import { verifyWebhook } from '@clerk/express/webhooks'

import { ValidateUser } from './middleware/ErrorHandling.middleware'

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
app.get('/protected', ValidateUser, async (req: Request, res: Response) => {
  const { id } = req.user!

  const user = await clerkClient.users.getUser(id)

  res.json({ user, msg: 'Protected route hit' })
})

// WEBHOOK ROUTE
app.post(
  '/api/webhooks',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    try {
      const event = await verifyWebhook(req)

      console.log(event.data)

      // TODO: Do something with payload
      // e.g. - Add new user to database.

      res.send('Webhook received')
    } catch (err) {
      console.error('Error verifying webhook:', err)
      res.status(400).json({ msg: 'Error verifying webhook.' })
    }
  }
)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
