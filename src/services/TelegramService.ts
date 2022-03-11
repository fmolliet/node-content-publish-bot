import { Context, Telegraf } from "telegraf";
import { Service } from "typedi";

const YIFF_KEYWORD : string = 'yiff';
const CATS_KEYWORD : string = 'cats';
@Service('TelegramService')
export default class TelegramService {

    public bot ?: Telegraf;
    private channel : string = ""; 
    
    constructor( channel: string ){
        if ( channel ){
            this.setConfig( channel )
        }
        this.bot = new Telegraf(process.env.BOT_TOKEN||'');
        this.bot.start((ctx) => ctx.reply('Welcome'));
        this.bot.launch();
    }
    
    setConfig( channel: string) {
        if ( channel && channel.toLowerCase() === YIFF_KEYWORD){
            this.channel = process.env.TELEGRAM_CHANNEL_YIFF || "";
        } else if ( channel && channel.toLowerCase() === CATS_KEYWORD) {
            this.channel = process.env.TELEGRAM_CHANNEL_CATS || "";
        } else {
            this.channel = process.env.TELEGRAM_CHANNEL_MEMES|| "";
        }
    }
    
    async sendPhotoInChannel( file: string ){

        try {
            if (this.bot!.botInfo){
                
                await this.bot!.telegram.sendPhoto(this.channel, { source: file });
            }
        } catch (err){
            throw err;
        }
       
    }
    
    async sendVideoInChannel( file: string) {
        try {
            if (this.bot!.botInfo){
                
                await this.bot!.telegram.sendVideo(this.channel, { source: file });
            }
        } catch (err){
            throw err;
        }
    }
    
}