import 'reflect-metadata'
import { bodyValidator } from '../../../app/controllers/decorators/bodyValidator'

class TestClass {
  @bodyValidator('name', 'pass')
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  testFunc(): void {}
}

describe('bodyValidator test suite', () => {
  test('Should store validators as metadata on a function', () => {
    const requiredBodyProps = Reflect.getMetadata(
      'validator',
      TestClass.prototype,
      'testFunc'
    ) || []

    expect(requiredBodyProps).toEqual(['name', 'pass'])
  })
})