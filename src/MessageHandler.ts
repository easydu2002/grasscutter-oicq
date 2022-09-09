import { PrivateMessageEvent } from "oicq"
import { GroupMessageEvent } from "oicq"
import { MessageHandler } from "./interface/MessageHandler"


const handler: Array<MessageHandler> = [
]

/**
 * 注册消息处理
 * @param handlers 
 */
export const registerHandler = function(handlers: Array<MessageHandler>) {

    handler.push(...handlers)
}

export const handleMessage = function(messageEvent: GroupMessageEvent | PrivateMessageEvent) {
    
    const handle = handler.find(item => item.match(messageEvent))
    handle && handle.handle(messageEvent)
}