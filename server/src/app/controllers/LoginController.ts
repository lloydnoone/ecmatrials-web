import { Request, Response } from 'express'
import { get, controller, bodyValidator, post } from './decorators'
import { Controller } from '../controllers/Controller'

@controller('/auth')
export class LoginController extends Controller {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.status(200).send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body
  
    if (email && password && email === 'lloyd@email.com' && password === 'pass') {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.status(401).send('Invalid email or password. ')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined
    res.status(200).redirect('/')
  }
}