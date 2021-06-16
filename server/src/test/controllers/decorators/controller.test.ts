import 'reflect-metadata'
import { controller, get, use } from '../../../app/controllers/decorators'
import { App } from '../../../app/App'
import { AnyObject } from '../../../app/interfaces/AnyObject'

jest.mock('../../../app/controllers/RootController', () => jest.fn())
jest.mock('../../../app/controllers/LoginController', () => jest.fn())

/* eslint-disable-next-line @typescript-eslint/no-empty-function */
function testMiddleware() {}

@controller('/testprefix')

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class TestClass {
  @get('/testroute')
  @use(testMiddleware)
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  testFunc() {}
}

const app = new App()

beforeAll(async (done) => {
  app.ApplyMiddleware()
  app.startServer()
  done()
})

afterAll(() => {
  app.closeServer()
})

describe('controller decorator test suite', () => {
  test('Should add correct route, method and middleware to router', () => {
    //pull off details from express router
    let route
    // define array to hold routes from express handler
    const routes: { 
      path: string, 
      methods: { 
        get: boolean 
      }, 
      stack: [
        Layer: {
          handle: AnyObject
        }
      ] 
    }[] = [];

    app.getApp()._router.stack.forEach(function(middleware: AnyObject){
        if(middleware.route){ // routes registered directly on the app
            routes.push(middleware.route);
        } else if(middleware.name === 'router'){ // router middleware
            middleware.handle.stack.forEach(function(handler: AnyObject){
                route = handler.route;
                route && routes.push(route);
            });
        }
    })
    expect(routes[0].path).toBe('/testprefix/testroute')
    expect(routes[0].methods.get).toBe(true)
    expect(routes[0].stack[0].handle).toBe(testMiddleware)
  })
})