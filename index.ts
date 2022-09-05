"use strict"

import { handleMessage } from "./src/MessageHandler"

import { createClient } from "oicq"
import { messages } from "./src/messages"


const account = 3481477273

const bot = createClient(account)

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录, (copy data直接登录)")
	process.stdin.once("data", () => {
		this.login()
	})
})
.login()


bot.on("message.group", handleMessage)
bot.on("notice.group.increase", info => {
	
	bot.sendGroupMsg(info.group_id, messages.welcome(info))
})

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

exports.bot = bot