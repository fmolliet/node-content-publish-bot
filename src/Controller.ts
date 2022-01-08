import Container, { Inject, Service } from "typedi";
import fs from 'fs';
import Path from 'path';
import Logger from "./helpers/Logger";
import winston from "winston";
import ZipService from "./services/ZipService";
import TelegramService from "./services/TelegramService";
import { isThisTypeNode } from "typescript";


const YIFF_KEYWORD : string = 'yiff';
@Service('Controller')
export default class Controller {

    private logger !: winston.Logger;

    @Inject('ZipService')
    private zipService !: ZipService;
    
    @Inject('TelegramService')
    private telegramService !: TelegramService;
    
    private files : string[] | undefined;
    
    private channel : string | undefined = process.env.TELEGRAM_CHANNEL_CATS; 


    constructor() {
        this.logger = Container.get<Logger>('Logger').getInstance();
    }
    
    public setChannel(  channel: string ): void {
        if ( channel && channel.toLowerCase() === YIFF_KEYWORD){
            this.channel = process.env.TELEGRAM_CHANNEL_YIFF;
            this.logger.info("Canal configurado: YIFF")
        } else {
            this.channel = process.env.TELEGRAM_CHANNEL_CATS;
            this.logger.info("Canal configurado: GATOS")
        }
    }

    public change(path: string, stats?: fs.Stats): void {
        this.logger.info('change')
    }

    public init(): void {
        this.logger.info('Inicializado!')
    }

    public async add(path: string, stats?: fs.Stats) {

        this.logger.info(`Arquivo recebido: ${Path.basename(path)}`);

        if (Path.extname(path).match(".zip")) {
            this.logger.info('Arquivo ZIP para ser extraido...');
            
            this.files = await this.zipService.extractFiles(path);
            
            this.logger.info('Arquivos extraidos com sucesso!');
            try {
                this.logger.info('Enviando arquivos no canal ...');
                
                this.files.forEach( 
                    async file => {
                        await this.telegramService.sendPhotoInChannel( this.channel || '', file )
                        // Deleta cada arquivo
                        this.deleteFile(file);
                    } 
                );
                this.logger.info('Envio finalizado!');
                
            } catch ( err ){
                this.logger.error(err)
            }

        } else {
            await this.telegramService.sendVideoInChannel( this.channel || '', path );
            this.logger.info('Envio finalizado!');
        }
        // Deleta o ZIP FILE
        await this.deleteFile(Path.resolve(path));
        this.logger.info('Arquivo deletado!');
        
       
    }
    
    private async deleteFile( path: string){
        await new Promise( (resolve, reject ) => {
            fs.unlink(path, (err) => {
                if (err) reject(err);
                resolve("Arquivo deletado!");
            });
        });
    }

    public error(error: Error) {
        console.log('Error')
        //throw new Error('Method not implemented.');
    }
}