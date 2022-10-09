import { log } from './../util/Log';
import { isAdmin } from './../util/MessageUtils';
import { GroupMessageEvent, MessageRet, PrivateMessageEvent, Sendable } from "oicq";
import { getContent } from "../util/MessageUtils";
import { config } from '../..';

export interface Sender {

  /**
   * 事件对象
   */
  e: GroupMessageEvent | PrivateMessageEvent,

  /**
   * 是否是管理员消息
   */
  isAdmin: boolean,

  /**
   * 发送者qq
   */
  userId: number,

  /**
   * 所在群ID
   */
  groupId?: number,

  /**
   * 回复消息
   */
  reply: (msg: Sendable, quote?: boolean) => Promise<MessageRet>,

  /**
   * 发送私信
   */
  sendPrivateMsg: (msg: Sendable, quote?: boolean) => Promise<MessageRet>,

  /**
   * 消息内容
   */
  rawMessage: string

}

export const buildSender = function(messageEvent: PrivateMessageEvent | GroupMessageEvent): Sender|undefined {

  let sender: Sender

  switch(messageEvent.message_type) {
    case 'group':

      sender = buildGroupSender(messageEvent as GroupMessageEvent)
      break
    case 'private':

      sender = buildPrivateSender(messageEvent as PrivateMessageEvent)
      break

  }

  return sender

}

function buildGroupSender(messageEvent: GroupMessageEvent): Sender {

  return {

    e: messageEvent,
    isAdmin: messageEvent.sender.user_id === config.admin,
    userId: messageEvent.sender.user_id,
    groupId: messageEvent.group_id,
    rawMessage: getContent(messageEvent),
    reply: (...args) => messageEvent.reply(...args),
    sendPrivateMsg: ((messageEvent: GroupMessageEvent) => {

      return (msg: Sendable) => {
        
        return messageEvent.member.sendMsg(msg)
      }
    })(messageEvent)
  }
}

function buildPrivateSender(messageEvent: PrivateMessageEvent): Sender {

  return {

    e: messageEvent,
    isAdmin: messageEvent.sender.user_id === config.admin,
    groupId: messageEvent.sender.group_id,
    userId: messageEvent.sender.user_id,
    rawMessage: getContent(messageEvent),
    reply: (...args) => messageEvent.reply(...args),
    sendPrivateMsg: (...args) => messageEvent.reply(...args)
  }
}