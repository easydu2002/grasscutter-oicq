import { defineCommand, Command } from './../command';
import CommandMap from '../CommandMap';


export const HelpCommand:Command = defineCommand({
  
  label: '帮助',
  alias: ['help'],
  
  execute(sender) {

    const replyMsg = CommandMap.commands.map((item, key) => {

      return [
        `命令: ${item.label}`,
        `${item.alias ? '别名: ' + item.alias.join(',') + '\n' : ''}`,
        `用法:`,
        `${ item.usage ? item.usage.map(usage => ` - ${item.label}${usage}`).join('\n') : ' - ' + item.label }`,
        `${ '='.repeat(11) }\n`
      ].join('\n')
    })

    return sender.reply(replyMsg)
  }
})