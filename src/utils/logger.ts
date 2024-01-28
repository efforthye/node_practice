import process from 'process';
import dotenv from 'dotenv';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { TransformableInfo } from 'logform';
dotenv.config();

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const logDir = `${process.cwd()}/logs`;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} ${level}: ${message}`;
});

const labelName = process.env.LABEL ?? 'logger';

const logger = createLogger({
    level: 'silly',

    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: `[${labelName}]` }),
        logFormat,
    ),

    //  error: 0 , warn: 1 , info: 2 , http: 3 , verbose: 4 , debug: 5 , silly: 6 
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 180,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 180,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: `%DATE%.debug.log`,
            maxFiles: '14d',
            zippedArchive: true,
        }),
    ],

    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

logger.add(
   new winston.transports.Console({
        format: combine(
            label({ label: `${labelName}` }),
            colorize(),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            printf((info: TransformableInfo) => {
                const { timestamp, level, label, message, ...meta } = info;
                const metaString = Object.keys(meta).length ? `\n ${JSON.stringify(meta)}` : '';
                return `${timestamp} ${level} [${label}]: ${message}${metaString}`;
            }),
        ),
    }),
);

export {
    logger
}