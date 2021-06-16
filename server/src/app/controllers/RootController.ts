import { Request, Response, NextFunction } from 'express'
import { get, controller, use } from './decorators'
import { Controller } from '../controllers/Controller'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Not Permitted')
}

@controller('')
export class RootController extends Controller {
  @get('/')
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `)
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `)
    }
  }
  
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.status(200).send('Welcome to protected route, logged in user')
  }
}