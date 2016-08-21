import fs from 'fs-promise'

import { parseQrCode } from '../controller/qr-code'
import { configIsExist } from '../model/ss-config'

export function parseConfigsByFilename(filename) {
    return Promise.resolve().then(() => {
        const filetype = filename.substring(filename.indexOf('.') + 1, filename.length)
        if (filetype === 'jpg' || filetype === 'png') {
            return  parseQrCode(filename)
        } else {
            return fs.readFile(filename, { encoding: 'utf8' })
        }
    }).then(configsJSON => {
        const configs = JSON.parse(configsJSON)
        
        // a entire configuration file
        if (configs.configs) {
            const tmp = configs.configs
            tmp.forEach((config, index) => {
                if (!config.server || !config.password) {
                    throw new Error('server or password is null')
                }
            })

            return tmp
        } else {     // a single object
            if (!configs.server || !configs.password) {
                throw new Error('server or password is null')
            }
            return configs
        }
    }).then(configs => {
        if (Array.isArray(configs)) {
            return Promise.all(configs.map(configIsExist))
        }
        return configIsExist(configs)
    })
}