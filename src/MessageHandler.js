/**
 * 
 * @callback Handle~matchCallback
 * @param {import("oicq").PrivateMessageEvent | import("oicq").GroupMessageEvent} msg
 * @callback Handle~handleCallback
 * @param {MessageEvent} msg
 * 
 * @typedef {Object} Handle
 * @property {Handle~matchCallback} match
 * @property {Function} handle
 * 
 */
const { segment } = require("oicq")

const { account } = require("..")

/**
 * 
 * @param {Handle} handle 
 * @returns {Handle}
 */
const defineHandle = function(handle) {

    return handle
}



const handler = [
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            return (msg.includes('解锁') || msg.includes('开放')) && (msg.includes('地图') || msg.includes('传送'))
        },
        handle(msg) {
            msg.reply('/prop unlockmap 1', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            return self_id === account
        },
        handle(msg) {
            const atInfo = msg.message.find(item => item.type === 'at')
            if(!atInfo) return

            const content = msg.raw_message.slice(atInfo.text.length)
            if(content.trim()) {
                msg.reply('不好意思捏，我还不会这个呢', true)
                msg.reply(segment.image("https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/3e3490ec08fa513d38d47e38336d55fbb3fbd911%20%281%29.jpg"))
            }else {

                msg.reply('叫我干啥?', true)
                msg.reply(segment.image("https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/what.webp"))
            }
        }
    })
]

exports.handleMessage = function(msg) {
    console.log(msg);
    const handle = handler.find(item => item.match(msg))
    handle && handle.handle(msg)
}