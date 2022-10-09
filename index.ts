"use strict"

const config: Config = require('./config.json') 

import { log } from './src/util/Log';
import { createClient } from "oicq"
import { welcome } from "./src/messages"
import CommandMap from './src/command/CommandMap';
import commands from './src/command/commands';
import { Config } from './src/model/Config';

commands.forEach(commad => CommandMap.registerCommand(commad))

log('加载', CommandMap.commands.length, '条命令...');

const bot = createClient(config.account)

bot.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录, (copy data直接登录)")
	process.stdin.once("data", () => {
		this.login()
	})
}).login()

bot.on("message.private", CommandMap.invoke)
bot.on("message.group",e => e.atme && CommandMap.invoke(e))
bot.on("notice.group.increase", e => bot.sendGroupMsg(e.group_id, welcome(e)))

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

export { bot, config }