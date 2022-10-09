import { Sender } from "../model/Sender";

export interface Command {
  label: string,
  alias?: Array<string>,
  usage?: Array<string>,
  permission?: Array<string>,
  execute: (sender: Sender, args: Array<string>) => Promise<any> | void
}

export const defineCommand = function(command: Command): Command {
  
  if(!command.label) {
    throw Error('label 不能为空!')
  }

  const oldExecute = command.execute

  command.execute = function(...args) {
    
    return new Promise((resolve, reject) => {

      try {
        const result = oldExecute(...args)
        if(result instanceof Promise) {
          result.then(resolve).catch(reject)
        }else {
          resolve(true)
        }
      }catch (err) {
        reject(err)
      }
    })

  }

  return command
}