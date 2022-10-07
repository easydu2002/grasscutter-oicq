import { GroupMessageEvent } from 'oicq';
import os from 'os'
import { getContent, isAdmin } from './../util/MessageUtils';
import { executeCommand, getOnlinePlayer } from '../api/opencommand-api';
import { MessageHandler } from '../interface/MessageHandler';
import { performance } from 'perf_hooks';
import { bot } from '../..';



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
    match: ({ raw_message: msg }) => !!msg.match(/服务器/g),
    handle: messageEvent => {


      const cpus = os.cpus()
      const messages = [
        `系统信息: ${os.platform()} 已正常运行时间 ${(os.uptime() / 60 / 60).toFixed(2)}小时\n`,
        `CPU: ${cpus[0].model} ${cpus.length}核\n`,
        `内存信息: 总内存${(os.totalmem() / 1024 / 1024).toFixed(2)}M, 可用${(os.freemem() / 1024 / 1024).toFixed(2)}M\n`,
        `游戏版本: 3.1`,
      ]
      messageEvent.reply(messages, true)
    }
  },
  {
    match: ({ raw_message: msg }) => !!msg.match(/申请账号/g),
    handle: messageEvent => {

      const qq = messageEvent.sender.user_id
      const uid = qq
      const username = uid
      const password = Math.random().toString(36).slice(2)

      executeCommand(`account create ${username} ${password} ${uid}`)
        .then(resp => {

          if(resp.data.toString().includes('已存在')) {

            messageEvent.reply('不能重复申请账号!', true)
          }else {

            // Promise.all([
            //   executeCommand(`permission @${uid} clear`),
            //   executeCommand(`permission @${uid} add player.give`),
            //   executeCommand(`permission @${uid} add player.setprop`)
            // ]).then((resp) => {
              
              messageEvent.reply('申请成功, 账号信息已发送至私信!', true)
              const privateMsg = `服务器地址: 43.139.54.74:20000 \n${'='.repeat(10)}\n 登录信息:\n账号: ${username}\n密码: ${password}`
              
              if(messageEvent.message_type === 'group') {
                const group = messageEvent as GroupMessageEvent
                bot.pickMember(group.group_id, qq).sendMsg(privateMsg)
              }else {
                bot.sendPrivateMsg(qq, privateMsg)
              }
            // }).catch(err => {
            //   throw Error(err)
            // })

          }
        }).catch(err =>{

          messageEvent.reply(err, true)
        })
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