import { MemberIncreaseEvent, segment } from "oicq";


/**
 * 欢迎新成员消息
 */
export const welcome = (info: MemberIncreaseEvent) => 
[
  'Hi~, 欢迎新成员 ',
  segment.at(info.user_id, info.nickname, true),
  '! \n项目地址: https://github.com/Grasscutters/Grasscutter\n',
  '最新包发布地址: https://jenkins.4benj.com/job/Grasscutters/job/Grasscutter \n',
  'Resources 地址: https://github.com/tamilpp25/Grasscutter_Resources \n',
  '打补丁工具地址: https://github.com/Bambi5/Collei_Launcher\n',
  '群提供服务地址:  43.139.54.74:20000 \n 账号申请: @我 申请账号 即可\n',
  '有问题可以尝试@我~\n',
  segment.image('https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/welcome2.jpg'),
]

/**
 * 消息类型集合
 * 
 * 组合消息图片不能webp, 不然PC Tim看不了
 */
export const messages =  {

  "grasscutter": "项目地址: https://github.com/Grasscutters/Grasscutter/\n项目CI/CD (此处可下载最新包): https://jenkins.4benj.com/job/Grasscutters/job/Grasscutter/",

  "unlock_map": "解锁全部地图: /prop @uid unlockmap 1",
  
  "all": "获取所有物品: /g @uid all lv90 c6 r5 x10 \n 注: lv.等级 c.命座 r.精炼 x.数量",

  "player_level": "给玩家冒险阅历即可 /g @uid 102 x10000000 （直接拉满 60级(世界8)）",

  "patch_path": [
    "补丁在群文件可下载, 替换指定文件即可\n",
    "PC端: 游戏安装目录/Genshin Impact Game/YuanShen_Data/Managed/Metadata/global-metadata.dat",
  ],

  "error_4206": "1. 检查防火墙, 端口是否正常开放(80、443、8888和22102), 22102需要使用UDP协议\n2. 服务器未正确配置 HTTPS\n3. 检查config.json databaseInfo.server.http.accessAddress是否是服务器IP",
  
  "error_4214": "确认后端resources客户端版本一致, 然后补丁也打了还是4214, 可以尝试关闭代理, 进官服启动器修复资源, 再打补丁",
  
  "error_500": "1. 确认代理正常 \n 2. 3.0版本后续需要修补UA",

  "error_port": "Windows: cmd输入 netstat -ano | findstr 占用端口, 最后一列值为PID, 再执行 /taskkill/PID pid /F\nLinux: netstat -tunlp | grep 占用端口 最后一列值为PID/xxx, 再执行kill PID即可",
  
  "error_white": "1. 检查config.json databaseInfo.server.game.accessAddress是否是服务器IP\n2.检查22102端口是否是以UDP协议开放",
  
  "sspi_error": [
    "1. 系统代理ip填ip, 端口填代理端口\n",
  ],

  "empty": [
    "叫我干啥\n",
    segment.image("https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/what.jpg")
  ],

  "not": [
    "不好意思捏，我还不会这个呢\n",
    "问问群友吧，或进入 Discord( https://discord.gg/T5vZU6UyeG ) 和 github( https://github.com/Grasscutters/Grasscutter/discussions )",
    segment.image("https://grasscutter-oicq.oss-cn-hangzhou.aliyuncs.com/message/3e3490ec08fa513d38d47e38336d55fbb3fbd911%20%281%29.jpg")
  ]

}