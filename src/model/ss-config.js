import path from 'path'
import fs from 'fs-promise'

const configPath = path.join(__dirname, '../../config/gui-config.json')
let _configs

export async function addConfig(config) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    const repeat = fileContent.configs.some(e => config.server === e.server)
    
    if (repeat) { throw new Error('Duplicate name') }

    fileContent.configs.push(config)
    _configs = fileContent.configs

    await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

/**
 * remove config by server name
 * 
 * @param {String} server name
 */
export async function removeConfig(server) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))

    _configs = fileContent.configs = fileContent.configs.filter(e => e.server !== server)
    await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

export async function getConfigs() {
    if (!_configs) {
        return _configs = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'})).configs
    }
    return _configs
}

export async function updateConfig(config) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    const index = fileContent.configs.findIndex(e => e.server === config.server)

    if (!~index) { throw new Error('server isn\'t exist') }
    fileContent.configs[index] = Object.assign(fileContent.configs[index], config)
    _configs = fileContent.configs
    await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

