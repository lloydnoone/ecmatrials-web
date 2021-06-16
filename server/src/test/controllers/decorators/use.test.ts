import 'reflect-metadata'
import { use } from '../../../app/controllers/decorators/use'

/* eslint-disable @typescript-eslint/no-empty-function */
function testMiddleware() {}
function anotherMiddleware() {}
/* eslint-enable @typescript-eslint/no-empty-function */

describe('use decorator test suite', () => {
  test('Should apply middleware as Metadata on a function', () => {
    class TestClass {
      @use(testMiddleware)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      testFunc(): void {}
    }

    const middlewares = Reflect.getMetadata(
      'middleware',
      TestClass.prototype,
      'testFunc'
    ) || []
    expect(middlewares).toEqual([testMiddleware])
  })

  test('Should handle multple middlewares correctly', () => {
    class TestClass {
      @use(testMiddleware)
      @use(anotherMiddleware)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      testFunc(): void {}
    }

    const middlewares = Reflect.getMetadata(
      'middleware',
      TestClass.prototype,
      'testFunc'
    ) || []
    expect(middlewares).toEqual([anotherMiddleware, testMiddleware])
  })
})

