import { AValidationService } from './validation-service.abstract';
import { injectable } from 'inversify';
import { UnprocessableEntityError } from 'restify-errors';
@injectable()
export class IntegerValidationService extends AValidationService<number, string | object> {
    public validateAndTransform(data: string | object): number {
        if (typeof data === 'string') {
            const id: number = Number.parseInt(data, 10);
            if (this.validator.isInt(id) && (id > 0) && (id <= Number.MAX_SAFE_INTEGER)) {
                return id;
            }
        }
        throw new UnprocessableEntityError(`Validation error: ${data} is not valid id`);

    }
}
