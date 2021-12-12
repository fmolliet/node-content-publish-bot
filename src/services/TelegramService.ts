import { Context, Telegraf } from "telegraf";
import { Service } from "typedi";

@Service('TelegramService')
export default class TelegramService {

    
    bot : Telegraf;
    
    constructor(){
        this.bot = new Telegraf(process.env.BOT_TOKEN||'');
        this.bot.start((ctx) => ctx.reply('Welcome'));
        this.bot.launch();
    }
    
    async sendPhotoInChannel( channelId: string, file: string ){

        try {
            if (this.bot.botInfo){
                
                await this.bot.telegram.sendPhoto(channelId, { source: file });
            }
        } catch (err){
            throw err;
        }
       
    }
    
    async sendVideoInChannel( channelId: string, file: string) {
        try {
            if (this.bot.botInfo){
                
                await this.bot.telegram.sendVideo(channelId, { source: file });
            }
        } catch (err){
            throw err;
        }
    }
    
}