import os from 'os'
import { getContent, isAdmin } from './../util/MessageUtils';
import { executeCommand, getOnlinePlayer } from '../api/opencommand-api';
import { MessageHandler } from '../interface/MessageHandler';
import { performance } from 'perf_hooks';



export const apiHandlers: Array<MessageHandler> = [
  {
    match: ({ raw_message: msg }) => !!msg.match(/(在线)/g),
    handle: messageEvent => {


      const startTime = performance.now()

      getOnlinePlayer()
        .then(resp => {

          const endTime = performance.now()

          const replyMsg = [
            // @ts-ignore
            `当前在线人数: ${resp.data.count}人\n`,
            // @ts-ignore
            `玩家列表: \n${resp.data.playerList.map('\n')}`,
            `本次请求时间: ${(endTime-startTime)}ms`,
          ]

          messageEvent.reply(replyMsg, true)
        }).catch(err => {
          messageEvent.reply(JSON.stringify(err), true)
        })
    }
  },
  {
    match: ({ raw_message: msg }) => !!msg.match(/(系统|服务器)[\s\S]*(状态|信息)/g),
    handle: messageEvent => {


      const cpus = os.cpus()
      const messages = [
        `系统信息: ${os.platform()} 已正常运行时间 ${(os.uptime() / 60 / 60).toFixed(2)}小时\n`,
        `CPU: ${cpus[0].model} ${cpus.length}核\n`,
        `内存信息: 总内存${(os.totalmem() / 1024 / 1024).toFixed(2)}M, 可用${(os.freemem() / 1024 / 1024).toFixed(2)}M\n`,
        `Game Version: 3.0; GS Version: 1.3.1-dev`,
      ]
      messageEvent.reply(messages, true)
    }
  },
  {
    match: ({ raw_message: msg }) => msg.includes('do /'),
    handle: (messageEvent) => {

      if(!isAdmin(messageEvent)) {

        return messageEvent.reply('没有权限!', true)
      }


      const command = getContent(messageEvent).slice('do /'.length)
      
      if(!command) {
        return messageEvent.reply('没有识别到指令!', true)
      }

      const startTime = performance.now()

      executeCommand(command)
        .then(resp => {
          
          const endTime = performance.now()

          const replyMsg = [
            `本次请求时间: ${((endTime-startTime).toFixed(2))}ms\n`,
            `操作结果: \n${resp.data}`,
          ]
          messageEvent.reply(replyMsg, true)

        }).catch(err => {
          messageEvent.reply(err, true)
        })
    }
  }

]