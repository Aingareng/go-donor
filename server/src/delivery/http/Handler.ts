import Donor from '../../entity/Donor'
import Repository from '../../repository/Repository'
import { Router, Request, Response } from 'express'
import Email from '../../valueObject/Email'

export default (repository: Repository): Router => {
  const router: Router = Router()

  router.get('/', async (req: Request, res: Response) => {
    let email: Email = new Email("ngarengai@gmail.com")
    let user: Donor = await repository.read(email)

    res.json({
      message: 'yeeyy',
      email,
      user
    })
  })

  return router

}