import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { AnyObject } from '../../interfaces/AnyObject'

export function bodyValidator(...keys: string[]) {
    /* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
  return function(target: AnyObject, key: string, desc: PropertyDescriptor): void {
    Reflect.defineMetadata(
      MetadataKeys.validator,
      keys,
      target,
      key
    )
  }
}