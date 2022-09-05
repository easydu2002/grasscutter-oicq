import { messages } from './messages';
import { Client, PrivateMessageEvent } from "oicq"
import { DiscussMessageEvent } from "oicq"
import { Sendable } from "oicq"
import { GroupMessageEvent } from "oicq"
import { segment } from "oicq"

/**
 * 回复消息
 */
export const replyMessage = function(msg: GroupMessageEvent, content: Sendable) {
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
    match: (client: GroupMessageEvent) => Boolean,
    /**
     * 处理
     */
    handle: (client: GroupMessageEvent) => void,
}

const handler: Array<Handle> = [
    {
        match({raw_message: msg}) {

            return (msg.includes('解锁') || msg.includes('开放')) && (msg.includes('地图') || msg.includes('传送'))
        },
        handle(client) {
            client.reply(messages.unlock_map, true)
        }
    },
    {
        match({raw_message: msg}) {

            return (msg.includes('解锁') || msg.includes('获取')) && (msg.includes('物品') || msg.includes('角色') || msg.includes('武器'))
        },
        handle(client) {
            client.reply(messages.all, true)
        }
    },
    {
        match({raw_message: msg}) {
            return (msg.includes('冒险等级') || msg.includes('世界等级'))
        },
        handle(client) {
            client.reply(messages.player_level, true)
        }
    },
    {
        match({raw_message: msg}) {

            return msg.includes('补丁') && (msg.includes('位置') || msg.includes('路径'))
        },
        handle(client) {
            client.reply(messages.patch_path, true)
        }
    },
    {
        match({raw_message: msg}) {

            return msg.includes('4214')
        },
        handle(client) {
            client.reply(messages.error_4214, true)
        }
    },
    {
        match({raw_message: msg}) {

            return msg.includes('4206')
        },
        handle(client) {
            client.reply(messages.error_4206, true)
        }
    },
    {
        match({raw_message: msg}) {

            return msg.includes('端口') && msg.includes('占用')
        },
        handle(client) {
            client.reply(messages.error_4206, true)
        }
    },
    {
        match({raw_message: msg}) {

            msg = msg.toLocaleLowerCase()
            return msg.includes('grasscutter') || msg.includes('gs') || msg.includes('除草机')
        },
        handle(client) {
            client.reply(messages.grasscutter, true)
        }
    },
    {
        match(client) {
            
            return client.atme
        },
        handle(client) {
            
            const atInfo = client.message.find(item => item.type === 'at')
            if(!atInfo) return
            
            // @ts-ignore
            const content = client.raw_message.slice(atInfo.text.length)
            content.trim() ? replyMessage(client, messages.not) : replyMessage(client, messages.empty)
            
        }
    },
]

export const handleMessage = function(client: GroupMessageEvent) {
    
    if(!client.atme) return

    const handle = handler.find(item => item.match(client))
    handle && handle.handle(client)
}