import Container, { Inject, Service } from "typedi";
import fs from 'fs';
import Path from 'path';
import Logger from "./helpers/Logger";
import winston from "winston";
import ZipService from "./services/ZipService";
import TelegramService from "./services/TelegramService";

@Service('Controller')
export default class Controller {

    private logger !: winston.Logger;

    @Inject('ZipService')
    private zipService !: ZipService;
    
    @Inject('TelegramService')
    private telegramService !: TelegramService;
    
    private files : string[] | undefined;
    
    private channel : string | undefined = process.env.TELEGRAM_CHANNEL ; 


    constructor() {
        this.logger = Container.get<Logger>('Logger').getInstance();
    }

    public change(path: string, stats?: fs.Stats) {
        this.logger.info('change')
    }

    public init() {
        this.logger.info('Inicializado!')
    }

    public async add(path: string, stats?: fs.Stats) {

        this.logger.info(`Arquivo recebido: ${Path.basename(path)}`);

        if (Path.extname(path).match(".zip")) {
            this.logger.info('Arquivo ZIP para ser extraido...');
            
            const saved = await this.zipService.extractFiles(path);
            
            this.files = saved;
            
            this.logger.info('Arquivos extraidos com sucesso!');
            try {
                this.logger.info('Enviando arquivos no canal ...');
                
                this.files.forEach( 
                    async file => await this.telegramService.sendPhotoInChannel( this.channel || '', file )
                );
                this.logger.info('Envio finalizado!');
                
            } catch ( err ){
                this.logger.error(err)
            }

        } else {
            await this.telegramService.sendVideoInChannel( this.channel || '', path )
        }


       
    }

    public error(error: Error) {
        console.log('Error')
        //throw new Error('Method not implemented.');
    }
}