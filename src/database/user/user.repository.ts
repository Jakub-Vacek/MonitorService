import { AbstractRepository, EntityRepository } from 'typeorm';
import { User } from './user.model';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User>{
    public async getByToken(token: string): Promise<User | undefined> {
        return this.repository.createQueryBuilder('user')
            .where('user.access_token = :token', { token })
            .limit(1)
            .getOne();
    }
}
