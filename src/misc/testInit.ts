import { AppDataSource } from '../utils/data-source';
import { User } from '../models/User/User.entity';

export async function testInit() {
  const testUser = {
    firstName: 'Timber',
    lastName: 'Saw',
    age: 27,
  };

  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOneBy(testUser);

  if (!existingUser) {
    await userRepository.save(testUser);
  }
}
