/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adapterRoute } from '../adapters/express/express-route-adapter'
export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
