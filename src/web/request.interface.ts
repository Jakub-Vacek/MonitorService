import { Request as restifyRequest } from 'restify';
import { User } from '../database/user';
export interface IRequest extends restifyRequest{
    user: User;
}
