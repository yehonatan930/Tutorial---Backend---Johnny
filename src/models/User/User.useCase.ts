//Use Case - specific database actions

import { MoreThan } from 'typeorm';
import { AppDataSource } from '../../utils/data-source';
import { User } from './User.entity';

const LEGAL_AGE = 18;

async function getAllLegalAge() {
  return await AppDataSource.getRepository(User).findBy({
    age: MoreThan(LEGAL_AGE),
  });
}

export { getAllLegalAge };
