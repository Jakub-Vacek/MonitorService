import { createLogger, format, Logger, transports } from 'winston';
// tslint:disable-next-line:typedef
const colorizer = format.colorize();

const logger: Logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        format.simple(),
        // tslint:disable-next-line:typedef
        format.printf ((msg) =>
            colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
        )
    ),
    transports: [
        new transports.Console()
    ]

});
export default logger;
