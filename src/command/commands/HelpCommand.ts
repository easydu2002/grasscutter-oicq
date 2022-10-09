import { defineCommand, Command, getCommandDescripion } from './../command';
import CommandMap from '../CommandMap';


export const HelpCommand:Command = defineCommand({
  
  label: '帮助',
  alias: ['help'],
  
  execute(sender) {

    const replyMsg = CommandMap.commands.map(getCommandDescripion)

    return sender.reply(replyMsg)
  }
})