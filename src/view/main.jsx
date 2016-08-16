import React, {Component} from 'react'

import MyAppBar from './app-bar'
import SSForm, { START_CONNECT, CLOSE_CONNECT, INPUT_TEXT_CHANGE } from './ss-form'
import shadowsocks, { server } from '../controller/shadowsocks'
import * as configModel from '../model/ss-config' 
import { LIST_ITEM_CLICK } from './drawer'

export default class extends Component {

    constructor() {
        super()
        this.state = {
            opened: false,
            'configs': []
        }
        configModel.getConfigs()
        .then(configs => this.setState({
            'configs': configs
        }))
    }
    
    handleDrawerEvent = e => {
       switch(e.type) {
        case LIST_ITEM_CLICK:
            this.changeHost(e.server)
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

    changeHost(serverName) {
        let configs = this.state.configs, config
        for (let i of configs) {
            if (i.server === serverName) {
                config = i
                break
            }
        }
        this.setState({ ...config })
    }

    stopConnect = () => {
        this.state.server.closeAll()
        this.setState({ opened: false })
    }

    startConnect = (config) => {
        if (this.state.opened) {
            this.stopConnect()
        }

        shadowsocks(config)
        .then(server => {
            this.setState({
                opened: true,
                ...config,
                server
            })
        })
        .then(() => {
            configModel.updateConfig(config)
            this.setState({ configs: configModel.getConfigs() })
        })
        .catch(() => {
            configModel.addConfig(config)
            this.setState({ configs: configModel.getConfigs() })
        })
    }

    render() {
        const configs = this.state.configs || []
        return (
            <div>
                <MyAppBar configs={configs} onEvent={this.handleDrawerEvent} />
                <SSForm  {...this.state} onEvent={this.handleSSFormEvent} />
            </div>
        )                
    }
}