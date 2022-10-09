import { buildSender } from './../model/Sender';
import { GroupMessageEvent, MessageEvent, PrivateMessageEvent, User } from "oicq";
import { Command } from "./command";
import { log } from '../util/Log';
import { handleMessage } from '../message-handler/MessagesHandler';

class CommandMap {
  
  _commands:Array<Command> = []

  get commands() {

    return this._commands
  }

  registerCommand(command: Command) {
    console.log('this', this);
    
    this._commands.push(command)

  }

  invoke(messageEvent: PrivateMessageEvent | GroupMessageEvent) {
    
    const sender = buildSender(messageEvent)

    if(sender) {

      let args = ''

      const command = this._commands.find(item => {
        const regStr = `^${item.label}${item.alias ? '|^' + item.alias.join('|^') : ''}`
        const matchs = new RegExp(regStr, 'gi').exec(sender.rawMessage)
        if(!matchs) return false
        args = this.resolveArgs(item, matchs[0], sender.rawMessage)
        return true
      })

      log(sender, command, args)
      
      if(command) {
        command.execute(sender, [args])
      }else {
        handleMessage(sender)
      }
    }

  }

  resolveArgs(command: Command, matched: string, rawMessage:string): string {

    let args = rawMessage.slice(matched[0].length)

    if(args && command.usage) {
      const matchdUsage = new RegExp(`${command.usage.join('|^')}`, 'gi').exec(args)
      args = matchdUsage ? matchdUsage[0] : args
    }

    return args

  }

}

export default new CommandMap()