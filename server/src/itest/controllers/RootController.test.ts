import { request } from '../../test/helper'
import { Response } from 'supertest';

describe('GET /', () => {
  test('should return a 200 response', async (done) => {
    request
    .get('/')
    .end((err: Error, res: Response) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})

describe('GET /protected', () => {
  test('should return a 200 response if logged in', async (done) => {
    request
    .get('/')
    .set('session', 'loggedIn=true' )
    .end((err: Error, res: Response) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})