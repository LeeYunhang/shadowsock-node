import React, {Component} from 'react'

import MyAppBar from './app-bar'
import { IMPORT_CONFIG, OUTPUT_CONFIG, ADD_HOST, DELETE_HOST } from './app-bar'
import SSForm, { START_CONNECT, CLOSE_CONNECT, INPUT_TEXT_CHANGE } from './ss-form'
import shadowsocks, { server } from '../controller/shadowsocks'
import * as configModel from '../model/ss-config' 
import { getConfigs } from '../model/ss-config' 
import appState from '../model/app-state'
import { LIST_ITEM_CLICK } from './drawer'

export default class extends Component {

    constructor() {
        super()
        this.state = {
            opened: false,
            configs: [],
            currentConfig: {}
        }

        let configs, opened
        configModel.getOpened()
        .then(_opened => opened = _opened)
        .then(() => configModel.getConfigs())
        .then(_configs => configs = _configs)
        .then(() => {
            let currentConfig = {}
            for (let i = 0, length = configs.length; i < length; ++i) {
                if (configs[i].server === opened) {
                    currentConfig = configs[i]
                }
            }

            if (opened) { this.startConnect(currentConfig) }
            this.setState({ configs, opened, currentConfig })
        })
    }
    
    handleAppbarEvent = e => {
       switch(e.type) {
        case LIST_ITEM_CLICK:
            this.switchHost(e.server)
            break
        case ADD_HOST:
            this.setState({ currentConfig: {} })
            break
        case DELETE_HOST:
            this.deleteHost(e.serverName)
            break
        case IMPORT_CONFIG:
            break
        case OUTPUT_CONFIG:
            break
       }
    }

    handleSSFormEvent = e => {
        switch(e.type) {
        case START_CONNECT:
            this.startConnect(e.config)
            break
        case CLOSE_CONNECT:
            this.stopConnect()
            break
        }
    }

    deleteHost(serverName) {
        configModel.removeConfig(serverName)
        .then(() => this.stopConnect())
    }

    switchHost(serverName) {
        let configs = this.state.configs, config
        for (let i of configs) {
            if (i.server === serverName) {
                config = i
                break
            }
        }

        // set default value
        config = Object.assign({
            local_addr: '127.0.0.1',
            local_port: '1080',
            server_port: '443',
            remarks: 'unnamed',
            method: 'aes-256-cfb',
        }, config)

        this.setState({ currentConfig: config })
    }

    stopConnect = () => {
        this.state.server.closeAll()
        configModel.setOpened(null)
        this.setState({ opened: false })
        appState.emit('currentConfig', null)
    }

    startConnect = (config) => {
        if (this.state.opened) {
            this.stopConnect()
        }

        let server, configs
        return shadowsocks(config)
            .then(_server => {
                server = _server
                appState.emit('currentConfig', config)
            })
            .then(() => configModel.setOpened(config.server))
            .then(() => configModel.updateConfig(config))
            .catch(() => configModel.addConfig(config))
            .then(() => configModel.getConfigs())
            .then(configs => {
                this.setState({ 
                    opened: config.server,
                    configs, server 
                })
            })
            .catch((e) => console.log(e))
    }

    render() {
        const configs = this.state.configs || []
        return (
            <div>
                <MyAppBar 
                    opened={this.state.opened}
                    configs={configs} 
                    onEvent={this.handleAppbarEvent} 
                />
                <SSForm  
                    {...this.state.currentConfig} 
                    opened={this.state.opened} 
                    onEvent={this.handleSSFormEvent} 
                />
            </div>
        )                
    }
}