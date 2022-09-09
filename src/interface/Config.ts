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
