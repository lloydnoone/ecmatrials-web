import { App } from '../app/App'
//import { AppRouter } from '../app/AppRouter'

//jest.mock('../app/AppRouter')

//mock decorators
jest.mock('../app/controllers/RootController', () => jest.fn())
jest.mock('../app/controllers/LoginController', () => jest.fn())
jest.mock('../app/controllers/decorators/controller', () => jest.fn())

const app = new App()

beforeAll(async (done) => {
  app.ApplyMiddleware()
  app.startServer()
  done()
})

afterAll(() => {
  app.closeServer()
})

describe('Server test suite', () => {
  test('should be able to create server on port 3000', () => {
    setTimeout(() => {
      expect(app.getPort()).toBe(5000)
    }, 1000)
  })
})