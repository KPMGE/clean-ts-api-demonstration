import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/express-route'
import { makeAddStudentController } from '../factories/add-student'

export default (router: Router) => {
  router.post('/student', expressRouteAdapter(makeAddStudentController()))
}
