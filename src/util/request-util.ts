
import https from 'https'
import { config } from "../.."

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'


interface OpenCommandResponse  {
    
    retcode: number
    message: string
    data: Object
}

/**
 * 发起post请求
 */
export const post = function(path: string, 
                            data: Object, 
                            options?: https.RequestOptions): Promise<OpenCommandResponse> {

    let result:any = ''

    return new Promise((resolve, reject) => {

        try {
            
            const request = https.request({
                headers: {
                    'Content-Type': 'application/json',
                },
                host: config.server.host,
                port: config.server.port,
                method: 'POST',
                path,
                ...options
            }, res => {

                    res.on('data', chunk => result += chunk.toString())
                    res.on('end', () => resolve(JSON.parse(result)))
            })
            
            request.write(JSON.stringify(data))
            request.end()

        } catch(err) {
            reject(err)
        }

    })
}