import path from 'path'
import fs from 'fs-promise'

const configPath = path.join(__dirname, '../../config/gui-config.json')

export async function addConfig(config) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    const repeat = fileContent.configs.some(e => config.server === e.server)
    
    if (repeat) { throw new Error('Duplicate name') }
    fileContent.configs.push(config)
    await fs.writeFile(configPath, JSON.stringify(fileContent))
}

/**
 * remove config by server name
 * 
 * @param {String} server name
 */
export async function removeConfig(server) {
    const fileContent = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))

    fileContent.configs = fileContent.configs.filter(e => e.server !== server)
    await fs.writeFile(configPath, JSON.stringify(fileContent))
}

export async function getConfigs() {
    const { configs } = JSON.parse(await fs.readFile(configPath, {encoding: 'utf8'}))
    return configs
}

