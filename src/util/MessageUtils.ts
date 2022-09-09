import { messages } from './../messages';
import { GroupMessageEvent, PrivateMessageEvent } from "oicq";
import { config } from '../..';

/**
 * 获取消息有效正文
 */
export const getContent = function(messageEvent: GroupMessageEvent | PrivateMessageEvent) {

  if(messageEvent.message_type === 'group') {

    // @ts-ignore
    return getAtContent(messageEvent)
  }

  return messageEvent.raw_message.trim()

}

/**
 * 
 * 获取at消息有效正文
 */
export const getAtContent = function(groupMessageEvent: GroupMessageEvent) {

  
  const groupNick = groupMessageEvent.message.find(item => item.type === 'at')
  
  if(!groupNick) return ''

  // @ts-ignore
  const content = groupMessageEvent.raw_message.slice(groupNick.text.length)
  
  return content.trim()
}


/**
 * 是否是管理员消息
 * @param groupMessageEvent 
 */
export const isAdmin = function(groupMessageEvent: GroupMessageEvent | PrivateMessageEvent) {

  return groupMessageEvent.sender.user_id === config.admin

}