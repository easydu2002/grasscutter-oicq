import { defineCommand } from "../command";

export const ErrorCommand = defineCommand({
  label: '错误',
  alias: ['报错'],
  usage: ['<错误信息>[4206|4214...]'],
  execute(sender, args) {

    sender.reply(getErrorTip(args[0]), true)

  }
})

function getErrorTip(keywords: string) {

  return ''

}