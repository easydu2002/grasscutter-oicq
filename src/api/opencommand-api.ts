import { config } from "../.."
import { post } from "../util/request-util"


const basePATH = '/opencommand/api'


export const getOnlinePlayer = () => post(basePATH, {
    "action": "online"
})

export const executeCommand = (command: string, ) => post(basePATH, {
    "action": "online",
    "token": config.server.token
})