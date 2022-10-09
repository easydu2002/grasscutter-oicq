import { defineCommand } from "../command";
import os from 'os'
import { getOnlinePlayer } from "../../api/opencommand-api";


export const ServerCommand = defineCommand({
  label: '服务器',
  alias: ['server'],
  usage: ['状态', '在线', '重启', '停止'],
  execute(sender, args) {

    switch(args[0]) {

      case '在线':
        getOnlinePlayer()
          .then(resp => {
            const replyMsg = [
              // @ts-ignore
              `当前在线人数: ${resp.data.count}人\n`,
              // @ts-ignore
              `玩家列表: \n${resp.data.playerList.map('\n')}`,
            ]
            sender.reply(replyMsg, true)
          }).catch(err => {throw Error(err)})
        break;

      case '状态':
      default:
        const cpus = os.cpus()
        const messages = [
          `${os.platform()} 已正常运行时间 ${(os.uptime() / 60 / 60).toFixed(2)}小时\n`,
          '='.repeat(11) + '\n',
          `CPU: ${cpus[0].model} ${cpus.length}核\n`,
          `总内存${(os.totalmem() / 1024 / 1024).toFixed(2)}M, 可用${(os.freemem() / 1024 / 1024).toFixed(2)}M\n`,
          '='.repeat(11) + '\n',
          '地址: https://43.139.54.74:20000\n',
          `支持版本: 3.1`,
        ]

        sender.reply(messages)
        break;
    }

  }
})