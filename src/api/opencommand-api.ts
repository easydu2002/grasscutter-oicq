import { config } from "../.."
import { post } from "../util/request-util"


const basePATH = '/opencommand/api'


// 在线玩家
export const getOnlinePlayer = () => post(basePATH, {
    "action": "online"
})

// 执行命令
export const executeCommand = (command: string ) => post(basePATH, {
    "action": "command",
    "token": config.server.token,
    "data": command
})

export const createAccount = ({username, password, uid}: { username: string, password: string, uid: number }) => executeCommand(`account create ${username} ${password} ${uid}`)