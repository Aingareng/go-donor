import Donor from '../entity/Donor'
import Email from '../valueObject/Email'

interface Repository {
  list(): Promise<Donor>
  create(donor: Donor): Promise<void>
  read(email: Email): Promise<Donor>
  update(donor: Donor): Promise<void>
  delete(email: Email): Promise<void>
}

export default Repository