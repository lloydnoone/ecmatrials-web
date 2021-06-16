import express from 'express'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import { AddressInfo, Server } from 'net'

import './controllers/LoginController'
import './controllers/RootController'
import './controllers/TestController'

export class App {
  private app: express.Application = express()
  private port = 0
  private server: Server | null = null

  public getApp(): express.Application {
    return this.app
  }

  public ApplyMiddleware(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(cookieSession({ keys: ['alsdfsdf'] }))
    this.app.use(AppRouter.getInstance())
  }

  public startServer(): void {
    const server = this.app.listen(5000, () => {
      const { port } = server.address() as AddressInfo
      this.port = port
      console.log('Listening on port ' + this.port)
    })
    this.server = server
  }

  public getPort(): number {
    return this.port
  }

  public closeServer(): void {
    if (this.server) this.server.close()
  }
}