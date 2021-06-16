import 'reflect-metadata'
import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'
import { AnyObject } from '../../interfaces/AnyObject'

export function use(middleware: RequestHandler) {
  //target is controller, key is the function middleware is added to
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  return function(target: AnyObject, key: string, desc: PropertyDescriptor): void {

    // get middlewares that have already been added or return empty array
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target,
      key
    ) || []

    // then add the current middleware to the array and set that as new metadata
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    )
  }
}