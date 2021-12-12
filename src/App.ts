import chokidar   from 'chokidar';
import Container, { Inject } from 'typedi';
import { config }  from 'dotenv';
import winston from 'winston';
import Path from "path";

import Chokidar from './config/Chokidar';

import './helpers/Logger';
import Controller from './Controller';
import Logger from './helpers/Logger';


export default class App {
    
    @Inject('Controller')
    controller!: Controller;
    
    @Inject('Logger')
    logger!: winston.Logger;
    
    constructor(){
        config();
        this.controller = Container.get<Controller>('Controller');
        this.logger = Container.get<Logger>('Logger').getInstance();
    }
    
    public listen( path : string ){
        
        // TODO: Validate if dir or file exist
        try {
            this.logger.info('Escutando pasta ' + Path.resolve(path).toString() )
        
            
        } catch {
            throw Error("Path Não encontrado");
        }
        
        chokidar
            .watch( path, Chokidar )
            .on( 'add' ,  this.controller.add.bind(this.controller)    )
            .on('error',  this.controller.error.bind(this.controller)   )
            .on('ready',  this.controller.init.bind(this.controller)    )
            .on('change', this.controller.change.bind(this.controller)  );
        
    }
    
}