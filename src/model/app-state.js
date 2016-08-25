import EventEmitter from 'events'
import AutoLaunch from 'auto-launch'

const appState = new EventEmitter()

export let currentConfig = null
export default appState
export let appLauncher = new AutoLaunch({
    name: process.execPath
})

appState.on('currentConfig', _currentConfig => currentConfig = _currentConfig)