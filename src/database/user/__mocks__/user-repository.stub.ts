import { User } from '../user.model';
export class UserRepositoryStub {
    public async getByToken(token: string): Promise< User| undefined> {
            if (token === 'valid') {
                return (new User('tes', 'test@email.com', token));
            }
            return undefined;
    }
}


