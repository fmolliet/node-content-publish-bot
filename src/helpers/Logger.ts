import { Service } from 'typedi';
import winston from 'winston';

@Service('Logger')
export default class Logger {
    
    private levels : {[key: string]: number} = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    }
    
    private colors : {[key: string]: string} = {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white',
    }
    
    
    private format: winston.Logform.Format = winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    );
    
    private instance : winston.Logger = winston.createLogger({
        level: 'info',
        levels: this.levels,
        format: this.format,
        transports: [
            new winston.transports.Console({ level: 'info' }),
        ],
    });
    
    constructor(){
        winston.addColors(this.colors);
    }
    
    getInstance(){
        return this.instance;
    }
    
}