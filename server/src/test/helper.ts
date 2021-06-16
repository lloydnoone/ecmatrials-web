process.env.NODE_ENV = 'test'

import supertest from 'supertest'
import { App } from '../app/App'

const app = new App()
app.ApplyMiddleware()

export const request = supertest(app.getApp())

