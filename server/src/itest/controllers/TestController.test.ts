import { request } from '../../test/helper'
import { Response } from 'supertest';

const snippetCorrect = {
  snippet: "const testvar = 1"
}

const snippetIncorrect = {
  snippet: ""
}

const invalidJavaScript = {
  snippet: "const 123 + 123"
}

describe('POST /tests/test', () => {
  test('should return a 422 unproccessible entity response for empty string', async (done) => {
    request
      .post('/tests/test')
      .type('form')
      .send(snippetIncorrect)
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(422)
        done()
      })
  })

  test('should return a 422 unproccessible entity response for invalid JavaScript.', async (done) => {
    request
      .post('/tests/test')
      .type('form')
      .send(invalidJavaScript)
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(422)
        done()
      })
  })

  test('should return the snippets errors if there are any.', async (done) => {
    request
      .post('/tests/test')
      .type('form')
      .send(invalidJavaScript)
      .end((err: Error, res: Response) => {
        expect(res.body).toEqual({
          message: expect.any(String),
          error: {
            message: expect.any(String),
            name: expect.any(String),
            stack: expect.any(String)
          }
        })
        done()
      })
  })

  test('should return a 200 ok response for a snippet that is a string', async (done) => {
    request
      .post('/tests/test')
      .type('form')
      .send(snippetCorrect)
      .end((err: Error, res: Response) => {
        expect(res.status).toBe(200)
        done()
      })
  })
})