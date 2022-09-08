import { getContent } from './util/MessageUtils';
import { messages } from './messages';
import { Client, PrivateMessageEvent } from "oicq"
import { DiscussMessageEvent } from "oicq"
import { Sendable } from "oicq"
import { GroupMessageEvent } from "oicq"
import { segment } from "oicq"

/**
 * 回复消息
 */
export const replyMessage = function(msg: GroupMessageEvent | PrivateMessageEvent, content: Sendable) {
    if(typeof content === 'string') {
        msg.reply(content, true)
    }else if(typeof content === 'object') {
        msg.reply(content)
    }

}   


interface Handle {
    /**
     * 匹配
     */
    match: (messageEvent: GroupMessageEvent | PrivateMessageEvent) => Boolean,
    /**
     * 处理
     */
    handle: (messageEvent: GroupMessageEvent | PrivateMessageEvent) => void,
}

const handler: Array<Handle> = [
    {
        match: ({raw_message: msg}) => !!msg.match(/(解锁|开放|激活|开启)[\s\S]*(地图|传送|锚点)/g),
        handle: messageEvent => messageEvent.reply(messages.unlock_map, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(解锁|获取|激活)[\s\S]*(物品|角色|武器)/g),
        handle: messageEvent => messageEvent.reply(messages.all, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(世界|冒险)[\s\S]*(等级|级别|level)/g),
        handle: messageEvent => messageEvent.reply(messages.player_level, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(补丁)/g),
        handle: messageEvent => messageEvent.reply(messages.patch_path, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(4214)/g),
        handle: messageEvent => messageEvent.reply(messages.error_4214, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(白屏)/g),
        handle: messageEvent => messageEvent.reply(messages.error_white, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(4206)/g),
        handle: messageEvent=> messageEvent.reply(messages.error_4206, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(端口)[\s\S](占用)/g),
        handle: messageEvent => messageEvent.reply(messages.error_port, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(sspi|超时)/gi),
        handle: messageEvent => messageEvent.reply(messages.sspi_error, true)
    },
    {
        match: ({raw_message: msg}) => !!msg.match(/(grasscutter|gs|除草)/gi),
        handle: messageEvent => messageEvent.reply(messages.grasscutter, true)
    },
    {
        match: () => true,
        handle: messageEvent => getContent(messageEvent) ? replyMessage(messageEvent, messages.not) : replyMessage(messageEvent, messages.empty)
    },
]

export const handleMessage = function(messageEvent: GroupMessageEvent | PrivateMessageEvent) {
    
    const handle = handler.find(item => item.match(messageEvent))
    handle && handle.handle(messageEvent)
}