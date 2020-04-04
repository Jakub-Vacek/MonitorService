import { MonitoredEndpointService } from '../../monitored-endpoint';
import { Next, Response } from 'restify';
import { MonitoredEndpoint } from '../../database/monitored-endpoint';
import { Controller, Delete, Get, Post, Put } from 'inversify-restify-utils';
import { injectable } from 'inversify';
import { ValidMonitoredEndpoint } from './valid-monitored-endpoint.model';
import { IntegerValidationService, MonitoredEndpointValidationService } from '../../validation';
import { IRequest } from '../request.interface';
import logger from '../../logger/logger.model';

@Controller(MonitoredEndpointController.PATH)
@injectable()
export class MonitoredEndpointController {
    public static PATH: string = '/monitored-endpoints';
    public static PARAM: string = 'id';
    public constructor(private readonly endpointService: MonitoredEndpointService,
                       private readonly validationService: MonitoredEndpointValidationService,
                       private readonly intValidationService: IntegerValidationService
    ) {}
    @Get('/')
    public async get(request: IRequest, response: Response, next: Next): Promise<void> {
        try {
            logger.debug(`Getting monitored endpoints`);
            const monitoredEndpoints: MonitoredEndpoint [] = await this.endpointService.getUserEndpoints(request.user.id);
            response.json(200, monitoredEndpoints);
            return next();
        } catch (e) {
            next(e);
        }
    }
    @Post('/')
    public async create(request: IRequest, response: Response, next: Next): Promise<void> {
        try {
            const newMonitoredEndpoint: ValidMonitoredEndpoint = this.validationService.validateAndTransform(request.body);
            await this.endpointService.create(request.user, newMonitoredEndpoint.name, newMonitoredEndpoint.url, newMonitoredEndpoint.monitoredInterval);
            response.json(200);
            return next();
        } catch (e) {
            next(e);
        }
    }
    @Put(`/:${MonitoredEndpointController.PARAM}/`)
    public async update(request: IRequest, response: Response, next: Next): Promise<void> {
        try {
            response.header('Access-Control-Allow-Methods', 'PUT');
            const id: number = this.intValidationService.validateAndTransform(request.params[MonitoredEndpointController.PARAM]);
            const newMonitoredEndpoint: ValidMonitoredEndpoint = this.validationService.validateAndTransform(request.body);
            await this.endpointService.update(id, newMonitoredEndpoint, request.user.id);
            response.json(204);
            return next();
        } catch (e) {
            next(e);
        }
    }
    @Delete(`/:${MonitoredEndpointController.PARAM}/`)
    public async delete(request: IRequest, response: Response, next: Next): Promise<void> {
        try {
            response.header('Access-Control-Allow-Methods', 'DELETE');
            const id: number = this.intValidationService.validateAndTransform(request.params[MonitoredEndpointController.PARAM]);
            await this.endpointService.delete(id, request.user.id);
            response.json(204);
            return next();
        } catch (e) {
            next(e);
        }
    }
}
