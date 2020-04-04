import { Next, Response } from 'restify';
import { MonitoringResultService } from '../../../monitoring-result';
import { MonitoringResult } from '../../../database/monitoring-result';
import { Controller, Get } from 'inversify-restify-utils';
import { injectable } from 'inversify';
import { IRequest } from '../../request.interface';
import { IntegerValidationService } from '../../../validation';
import { MonitoredEndpointController } from '../index';
@Controller(`${MonitoredEndpointController.PATH}/:${MonitoredEndpointController.PARAM}${MonitoringResultController.PATH}`)
@injectable()
export class MonitoringResultController {
    public static PATH: string = '/monitoring-results';
    public constructor(private readonly monitoringResultService: MonitoringResultService, private readonly intValidationService: IntegerValidationService) {
    }
    @Get('/')
    public async get(request: IRequest, response: Response, next: Next): Promise<void> {
        try {
            const id: number = this.intValidationService.validateAndTransform(request.params[MonitoredEndpointController.PARAM]);
            const monitoringResults: MonitoringResult [] = await this.monitoringResultService.getEndpointResults(id, request.user.id);
            response.json(200, monitoringResults);
            return next();
        } catch (e) {
            next(e);
        }
    }
}
