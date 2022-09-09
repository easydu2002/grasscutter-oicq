
"use strict"

import { defaultHandlers } from './src/message-handler/common-messages';
import { handleMessage, registerHandler } from "./src/MessageHandler"
import { createClient } from "oicq"
import { welcome } from "./src/messages"
import { apiHandlers } from "./src/message-handler/api-messages"
import { Config } from './src/interface/Config';


const config: Config = require('./config.json') 

const bot = createClient(config.account)

bot.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录, (copy data直接登录)")
	process.stdin.once("data", () => {
		this.login()
	})
}).login()

bot.on("message.private", handleMessage)
bot.on("message.group",e => e.atme && handleMessage(e))
bot.on("notice.group.increase", e => bot.sendGroupMsg(e.group_id, welcome(e)))

registerHandler(apiHandlers)
registerHandler(defaultHandlers)

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

export { bot, config }