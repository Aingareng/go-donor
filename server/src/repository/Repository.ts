import Donor from '../entity/Donor'
import Email from '../valueObject/Email'

interface Repository {
  list(): Promise<void>
  create(donor: Donor): Promise<void>
  read(email: Email): Promise<void>
  update(filter: object, change: any): Promise<void>
  delete?(email: Email): Promise<void>
}

export default Repository