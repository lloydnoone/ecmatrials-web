import { Request, Response } from 'express'
import { controller, bodyValidator, post } from './decorators'
import { Controller } from '../controllers/Controller'
import { NodeVM } from 'vm2'

const vm: NodeVM = new NodeVM({
  console: 'inherit',
  sandbox: {},
  eval: false,
  wasm: false,
  require: {
      external: false,
      builtin: [],
      root: "./",
      mock: {}
  }
});

@controller('/tests')
export class TestController extends Controller {
  @post('/test')
  @bodyValidator('snippet')
  postSnippet(req: Request, res: Response): void {
    const { snippet } = req.body

    // const functionInSandbox = vm.run("module.exports = function(who) { console.log('hello '+ who); }");
    // functionInSandbox('world');

    if (snippet === '') {
      res.status(422).send('Invalid snippet received.')
    }

    try {
      const testFunction = vm.run(`${snippet}

      module.exports = function() {
        if(testvar === 1) {
          return true
        } else {
          return false
        }
      }`)

      if (testFunction()) {
        res.status(200).send('Test passed')
      } else {
        res.status(200).send('Test failed')
      }
    } catch (err) {
      res.status(422).send({ message: 'invalid JS.', 
      error: { 
        message: err.message,
        name: err.name,
        stack: err.stack
      }})
    }
  }
}