/**
 * 配置文件
 */
export interface Config {

	/**
	 * 机器人qq
	 */
	"account": number,
	/**
	 * 管理员qq
	 */
	"admin": number,
	/**
	 * [可选]管理员密码, token 过期尝试使用
	 */
	"password"?: string,
	
	"server": {

		/**
		 * grasscutter ip
		 */
		"host": string
		/**
		 * grasscutter http端口
		 */
		"port": string,
		/**
		 * GCOpenCommand consoleToken
		 */
		"token": string
	}
}
