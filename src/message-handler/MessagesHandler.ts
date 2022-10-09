import { log } from './../util/Log';
import { messages } from "../messages";
import { Sender } from "../model/Sender";

interface Handler {
    match: (sender: Sender) => boolean,
    handle: (sender: Sender) => any
}

export const messageHandlers: Array<Handler> = [
  {
      match: ({rawMessage: msg}) => !!msg.match(/(解锁|开放|激活|开启)[\s\S]*(地图|传送|锚点)/g),
      handle: sender => sender.reply(messages.unlock_map, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(解锁|获取|激活)[\s\S]*(物品|角色|武器)/g),
      handle: sender => sender.reply(messages.all, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(世界|冒险)[\s\S]*(等级|级别|level)/g),
      handle: sender => sender.reply(messages.player_level, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(补丁)/g),
      handle: sender => sender.reply(messages.patch_path, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(4214)/g),
      handle: sender => sender.reply(messages.error_4214, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(白屏)/g),
      handle: sender => sender.reply(messages.error_white, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(4206)/g),
      handle: sender=> sender.reply(messages.error_4206, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(端口)[\s\S]*(占用)/g),
      handle: sender => sender.reply(messages.error_port, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(sspi|超时)/gi),
      handle: sender => sender.reply(messages.sspi_error, true)
  },
  {
      match: ({rawMessage: msg}) => !!msg.match(/(grasscutter|gs|除草)/gi),
      handle: sender => sender.reply(messages.grasscutter, true)
  },
  {
      match: () => true,
      handle: sender => {
        sender.rawMessage ? sender.reply(messages.not).then(log).catch(log) : sender.reply(messages.empty).then(log).catch(log)
      }
  },
]

export const handleMessage = function(sender: Sender) {

    const handler = messageHandlers.find(item => item.match(sender))
    handler && handler.handle(sender)
}