import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import { Request, Response, NextFunction, RequestHandler } from 'express'

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request')
      return
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`)
        return
      }
    }

    next()
  }
}

export function controller(routePrefix: string) {
  //fine to use "Function" because it will not be called.
  /* eslint-disable-next-line  @typescript-eslint/ban-types */
  return function(target: Function): void {
    const router = AppRouter.getInstance()
    
    for (const key in target.prototype) {
      // get each piece of metadata of each key
      const routeHandler = target.prototype[key]
      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype, // class
        key // name of the function
      )

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype,
        key
      ) || []

      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key
      ) || []

      const validator = bodyValidators(requiredBodyProps)

      if (path) {
        //set each http method on router with path, handler and middlewares
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
      }
    }
  }
}