import { MessageAttachment, MessagePayload, WebhookClient } from "discord.js";
import { Service } from "typedi";

const YIFF_KEYWORD : string = 'yiff';
const CATS_KEYWORD : string = 'cats';

@Service('DiscordServices')
export default class DiscordServices {
    
    private webhookId    : string = "";
    private webhookToken : string = "";
    private username     : string = "";
    private avatar       : string = "";
    
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
            this.avatar         = "https://cdn.discordapp.com/attachments/803273083725152277/951650299259547649/unknown.png";
            
        } else if ( config && config.toLowerCase() === CATS_KEYWORD) {
            this.webhookId      = process.env.DISCORD_WEBHOOK_ID_CATS || "";
            this.webhookToken   = process.env.DISCORD_WEBHOOK_TOKEN_CATS || "";
            this.username       = "Blessed bot";
            this.avatar         = "https://cdn.discordapp.com/attachments/803273083725152277/951650079989694484/win.png"
        } else {
            this.webhookId      = process.env.DISCORD_WEBHOOK_ID_MEMES || "" ;
            this.webhookToken   = process.env.DISCORD_WEBHOOK_TOKEN_MEMES || "";
            this.username       = "Meme Machine";
            this.avatar         = "https://cdn.discordapp.com/attachments/803273083725152277/951650359913353247/1527884512.agusta_win3.png";
        }
        this.webhookClient =  new WebhookClient({id:this.webhookId, token: this.webhookToken })
    }
    
    // TODO: adicionar Webhook com base na configuração passada (Yiff -> nsfw e Cats -> para Blessed e memes -> memes)
    async sendfile( image : string ){
        return this.webhookClient!.send({
            username: this.username,
            avatarURL: this.avatar,
            files: [new MessageAttachment(image)]
        });
    }
}