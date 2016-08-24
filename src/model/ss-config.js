import path from 'path'
import fs from 'fs-promise'

const configPath = path.join(__dirname, '../../config/gui-config.json')
let _configs, opened

export async function addConfig(config) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    await configIsExist(config)

    fileContent.configs.push(config)
    _configs = fileContent.configs

    await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

export async function addConfigs(configs) {
    await Promise.all(...configs.map(configIsExist))
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))

    fileContent.configs.push(...configs)
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

/**
 * return {boolean} is config exist?
 */
export async function configIsExist(config) {
    const configs = await getConfigs()
    
    for (let i = 0, length = configs.length; i < length; ++i) {
        if (configs[i].server === config.server) {
            throw new Error(`server {$config.server} is exist!`)
        }
    }
    return config
}

export async function updateConfig(config) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    const index = fileContent.configs.findIndex(e => e.server === config.server)

    if (!~index) { throw new Error('server isn\'t exist') }
    fileContent.configs[index] = Object.assign(fileContent.configs[index], config)
    _configs = fileContent.configs
    await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

/**
 * get opened host
 */
export async function getOpened() {
    if (opened) { return opened }
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    return opened = fileContent.opened
}

export async function setOpened(serverName) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    opened = fileContent.opened = serverName
    return await fs.writeFile(configPath, JSON.stringify(fileContent, null, 4))
}

