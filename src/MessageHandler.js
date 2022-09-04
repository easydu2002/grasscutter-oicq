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
            msg.reply('解锁全部地图: /prop unlockmap 1', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            return (msg.includes('解锁') || msg.includes('获取')) && (msg.includes('物品') || msg.includes('角色') || msg.includes('武器'))
        },
        handle(msg) {
            msg.reply('解锁全部地图: /prop unlockmap 1', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            return (msg.includes('冒险等级') || msg.includes('世界等级'))
        },
        handle(msg) {
            msg.reply('给玩家冒险阅历即可 /g @uid 102 x10000000 （直接拉满 60级(世界8)）', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            return msg.includes('补丁') && (msg.includes('位置') || msg.includes('路径'))
        },
        handle(msg) {
            msg.reply('PC端: 游戏安装目录/Genshin Impact Game/YuanShen_Data/Managed/Metadata/global-metadata.dat', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            return msg.includes('4214')
        },
        handle(msg) {
            msg.reply('确认后端resources客户端版本一致, 然后补丁也打了还是4214, 可以尝试关闭代理, 进官服启动器修复资源, 再打补丁', true)
        }
    }),
    defineHandle({
        match({raw_message: msg, self_id}) {
            if(self_id !== account) return
            msg = msg.toLocaleLowerCase()
            return msg.includes('grasscutter') || msg.includes('gs') || msg.includes('除草机')
        },
        handle(msg) {
            msg.reply('项目地址: https://github.com/Grasscutters/Grasscutter/   \n项目CI/CD (此处可下载最新包): https://jenkins.4benj.com/job/Grasscutters/job/Grasscutter/', true)
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
                msg.reply('不好意思捏，我还不会这个呢')
                msg.reply('问问群友吧，或进入 Discord( https://discord.gg/T5vZU6UyeG ) 和 github( https://github.com/Grasscutters/Grasscutter/discussions )')
                msg.reply(segment.image("https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/3e3490ec08fa513d38d47e38336d55fbb3fbd911%20%281%29.jpg"))
            }else {

                msg.reply('叫我干啥?')
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