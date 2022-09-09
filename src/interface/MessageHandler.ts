import { GroupMessageEvent, PrivateMessageEvent } from "oicq";

export interface MessageHandler {
  /**
   * 匹配
   */
  match: (messageEvent: GroupMessageEvent | PrivateMessageEvent) => Boolean,
  /**
   * 处理
   */
  handle: (messageEvent: GroupMessageEvent | PrivateMessageEvent) => void,
}