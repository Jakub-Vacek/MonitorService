import { Validator } from 'class-validator';
import { injectable } from 'inversify';
@injectable()
export abstract class AValidationService<T, D> {
    protected readonly validator: Validator;
    protected constructor(){
        this.validator = new Validator();
    }
    protected abstract validateAndTransform(data: D): T;
}
