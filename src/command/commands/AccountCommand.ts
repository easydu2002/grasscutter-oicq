import { log } from './../../util/Log';
import { getCommandDescripion } from './../command';
import { config } from "../../..";
import { createAccount } from "../../api/opencommand-api";
import { Sender } from "../../model/Sender";
import { defineCommand } from "../command";


export const AccountCommand = defineCommand({
  label: '账号',
  alias: ['account'],
  usage: ['申请', '重置', '改密', '注销'],
  execute(sender, args) {
    
    switch(args[0]) {
      case '申请':
        registerAccount(sender)
        break;
      case '重置':
        break;
      case '改密':
        break;
      case '注销':
        break;
      default:
        log(this)
        sender.reply(getCommandDescripion(AccountCommand))
    }
  }

})


function registerAccount(sender: Sender) {
  const qq = sender.userId

  const accountInfo = {
    uid: qq,
    username: `${qq}`,
    password: Math.random().toString(36).slice(2)
  }

  sender.sendPrivateMsg('请稍等....')
    .then(() => createAccount(accountInfo))
    .then((resp) => {
      if(resp.data.toString().includes('已存在')) {

        sender.reply('不能重复申请账号!\n若忘记密码可尝试 账号改密', true)
      }else {
          
        sender.reply('申请成功, 账号信息已发送至私信!', true)
        sender.sendPrivateMsg(`服务器地址: https://${config.server.host}:${config.server.port}\n${'='.repeat(10)}\n 登录信息:\n账号: ${accountInfo.username}\n密码: ${accountInfo.password}`)

      }
    })
    .catch(sender.reply)

}