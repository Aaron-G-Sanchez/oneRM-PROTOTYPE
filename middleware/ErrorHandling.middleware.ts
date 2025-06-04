import { Request, Response, NextFunction } from 'express'
import { getAuth } from '@clerk/express'

export const ValidateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = getAuth(req)

  if (!userId) {
    res.status(401).json({ msg: 'User not authenticated' })
    return
  }

  req.user = { id: userId }

  next()
}
