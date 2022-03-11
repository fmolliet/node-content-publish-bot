import { MessageAttachment, MessagePayload, WebhookClient } from "discord.js";
import { Service } from "typedi";

const YIFF_KEYWORD : string = 'yiff';
const CATS_KEYWORD : string = 'cats';

@Service('DiscordServices')
export default class DiscordServices {
    
    private webhookId: string    = "";
    private webhookToken: string = "";
    private username : string    = "";
    
    private webhookClient?: WebhookClient;
    
    constructor( config ?: string ){
        if ( config ){
            this.setConfig(config);
        }
    }
    
    public setConfig( config: string ): void {
        if ( config && config.toLowerCase() === YIFF_KEYWORD){
            this.webhookId      = process.env.DISCORD_WEBHOOK_ID_YIFF || "" ,
            this.webhookToken   = process.env.DISCORD_WEBHOOK_TOKEN_YIFF|| "" ;
            this.username       = "Horny bot";
        } else if ( config && config.toLowerCase() === CATS_KEYWORD) {
            this.webhookId      = process.env.DISCORD_WEBHOOK_ID_CATS || "";
            this.webhookToken   = process.env.DISCORD_WEBHOOK_TOKEN_CATS || "";
            this.username       = "Blessed bot";
        } else {
            this.webhookId      = process.env.DISCORD_WEBHOOK_ID_MEMES || "" ;
            this.webhookToken   = process.env.DISCORD_WEBHOOK_TOKEN_MEMES || "";
            this.username       = "Meme Machine";
        }
        this.webhookClient =  new WebhookClient({id:this.webhookId, token: this.webhookToken })
    }
    
    // TODO: adicionar Webhook com base na configuração passada (Yiff -> nsfw e Cats -> para Blessed e memes -> memes)
    async sendfile( image : string ){
        return this.webhookClient!.send({
            username: this.username,
            files: [new MessageAttachment(image)]
        });
    }
}