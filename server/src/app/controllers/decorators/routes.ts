import 'reflect-metadata'
import { RequestHandler } from 'express'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import { AnyObject } from '../../interfaces/AnyObject'

// limit the use of route decorators by applying this interace. It can then only
// be applied to functions that are RequestHandlers. i.e take in a res, req and return void
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler 
}

function routeBinder(method: string) {
  return function(path: string) {
    /* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
    return function(target: AnyObject, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key)
      Reflect.defineMetadata(MetadataKeys.method, method, target, key)
    }
  }
}

export const get = routeBinder(Methods.get)
export const put = routeBinder(Methods.put)
export const post = routeBinder(Methods.post)
export const del = routeBinder(Methods.del)
export const patch = routeBinder(Methods.patch)