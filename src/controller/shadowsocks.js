import { startServer } from '../../lib/shadowsocks-js/lib/ssLocal'

let server
const defaultConfig = {
    pacServerPort: 8090,
    timeout: 600,
    level: 'warn',
    localAddrIPv6: '::1',                                                                                                                                                          
    serverAddrIPv6: '::1',                                                                                                                                                         
    _recordMemoryUsage: false
}

/**
 * start shadowsock server
 * 
 * config demo
 * {
 *  serverAddr: '12.12.12.12',
 *  serverPort: 1232,
 *  localAddr: '127.0.0.1', 
 *  localPort: 1080, 
 *  password: 'qdasdqwe1', 
 *  method: 'aes-256-cfb', 
 * }
 */
export default function(config) {
    const { server: serverAddr, server_port: serverPort,
    local: localAddr = '127.0.0.1', local_port: localPort = 1080, method, password } = config
    const userConfig = Object.assign(defaultConfig, {serverAddr, serverPort, localAddr, localPort, method, password})

    if (server) {
        server.closeAll()
    }

    return startServer(userConfig, true)
}