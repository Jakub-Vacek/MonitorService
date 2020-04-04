import { DatabaseProvider, User } from '../database';
import { injectable } from 'inversify';
import { Next, Response } from 'restify';
import { NotAuthorizedError } from 'restify-errors';
import logger from '../logger/logger.model';
import { IRequest } from '../web';

@injectable()
export class AuthorizationService {
    public constructor(private readonly database: DatabaseProvider) {}
    auth = async (request: IRequest, _response: Response, next: Next): Promise<void> => {
        const user: User | undefined = await this.database.getUserRepository().getByToken(request.authorization.credentials);
        if(!user) {
            logger.info('Unsuccessful authorization attempt');
            return next(new NotAuthorizedError());
        }
        request.user = user;
        next();
    }
}
