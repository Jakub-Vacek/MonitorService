import {  } from './app';
import logger from './logger/logger.model';
import { Server } from './server';
const app: Server = new Server();
app.start().then((): void => {logger.info('Server started');}).catch((e: Error): void => {logger.error(e);});
