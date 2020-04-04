import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityError } from 'restify-errors';
import { ValidMonitoredEndpoint } from '../web/monitored-endpoint/valid-monitored-endpoint.model';
import { injectable } from 'inversify';
import { AValidationService } from './validation-service.abstract';
@injectable()
export class MonitoredEndpointValidationService extends AValidationService<ValidMonitoredEndpoint, object>{
    public validateAndTransform(data: object): ValidMonitoredEndpoint {
     const classObject: ValidMonitoredEndpoint = plainToClass(ValidMonitoredEndpoint, data);
     const errors: ValidationError[] = this.validator.validateSync(classObject);
     if (errors.length) {
         throw new UnprocessableEntityError(errors.toString());
     }
     return classObject;
 }
}
