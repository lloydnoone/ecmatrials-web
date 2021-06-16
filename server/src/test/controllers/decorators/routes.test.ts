import 'reflect-metadata'
import { Methods } from '../../../app/controllers/decorators/Methods'
import { get } from '../../../app/controllers/decorators/routes'

class TestClass {
  @get('/testpath')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  testFunc(): void {}
}

describe('routes decorator test suite', () => {
  test('should store correct path and method as metadata', () => {
    setTimeout(() => {
      const path: string = Reflect.getMetadata(
      '/testpath',
      TestClass.prototype,
      'testFunc' // name of the function
    )

    const method: Methods = Reflect.getMetadata(
      'get',
      TestClass.prototype,
      'testFunc'
    )
    expect(path).toBe('/testpath')
    expect(method).toBe('get')
    }, 1000)
  })
})

