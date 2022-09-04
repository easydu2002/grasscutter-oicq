"use strict"
const { log } = require("console")
const { segment } = require("oicq")
const { bot } = require("./index")
const { handleMessage } = require("./src/MessageHandler")

// hello world
bot.on("message", function (msg) {
	handleMessage(msg)

})

// 撤回和发送群消息
// bot.on("message.group", function (msg) {
// 	if (msg.raw_message === "dice") {
// 		// 撤回这条消息
// 		msg.recall()
// 		// 发送一个骰子
// 		msg.group.sendMsg(segment.dice())
// 		// 发送一个戳一戳
// 		msg.member.poke()
// 	}
// })

// 接收戳一戳
// bot.on("notice.group.poke", function (e) {
// 	if (e.target_id === this.uin)
// 		e.group.sendMsg("dont poke me")
// })
