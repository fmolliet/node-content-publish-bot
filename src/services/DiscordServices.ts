import { MessageAttachment, MessagePayload, WebhookClient } from "discord.js";
import { Service } from "typedi";


@Service('DiscordServices')
export default class DiscordServices {
    
    private webhookClient: WebhookClient;
    
    constructor(){
        this.webhookClient =  new WebhookClient({id: process.env.DISCORD_WEBHOOK_ID || "id", token: process.env.DISCORD_WEBHOOK_TOKEN || ""})
    }
    
    // TODO: adicionar Webhook com base na configuração passada (Yiff -> nsfw e Cats -> para Blessed e memes -> memes)
    async sendfile( image : string ){
        return this.webhookClient.send({
            username: 'Horny Bot',
            files: [new MessageAttachment(image)]
        });
    }
}