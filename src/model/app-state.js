import EventEmitter from 'events'

const appState = new EventEmitter()

export let currentConfig = null
export default appState

appState.on('currentConfig', _currentConfig => currentConfig = _currentConfig)

