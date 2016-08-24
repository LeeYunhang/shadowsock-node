import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton'
import fs from 'fs'
import { remote } from 'electron'

import appState, { currentConfig } from '../model/app-state'
import { getConfigs } from '../model/ss-config' 
import { saveFileDialog } from '../controller/native-dialog'
import { generateQrCode } from '../controller/qr-code'

const clipboard = remote.clipboard

export default class extends Component {

    constructor(props) {
        super(props)

        this.state = { currentConfig } 
        appState.on('currentConfig', currentConfig => {
            if (currentConfig !== this.state.currentConfig) {
                this.setState({ currentConfig })
            }
        })
    }
    
    HandleClose() {
        hashHistory.goBack()
    }

    outputCurrentConfigViaText = config => {
        clipboard.writeText(JSON.stringify(config, null, 4))
    }

    outputCurrentConfigViaQrCode = config => {
        saveFileDialog().then(filename => {
            const output = fs.createWriteStream(filename)
            generateQrCode(JSON.stringify(config, null, 4)).pipe(output)
        }).catch(() => {})
    }

    outputConfigsViaText = () => {
        getConfigs().then(configs => {
            saveFileDialog('./config.json').then(filename => {
                const output = fs.createWriteStream(filename)
                output.end(JSON.stringify({ configs }, null, 4))
            })
        }).catch(() => {})
    }
    
    render() {
        getConfigs().then(configs => {
            if (this.state.configs !== configs) {
                this.setState({ configs })
            }
        })
        return (

            <div>
                <AppBar
                    title={<span>Output</span>}
                    iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                />
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <div style={styles.paperFirstChild}>
                        <FlatButton 
                            disabled={!this.state.currentConfig}
                            style={styles.flatButton} 
                            label="Output current text" primary={true} 
                            onTouchTap={this.outputCurrentConfigViaText.bind(this, this.state.currentConfig)}
                        />
                    </div>
                    <FlatButton 
                        style={styles.flatButton} 
                        label="Output current QRcode" 
                        primary={true} 
                        disabled={!this.state.currentConfig}
                        onTouchTap={this.outputCurrentConfigViaQrCode.bind(this, this.state.currentConfig)}
                    />
                    <FlatButton 
                        style={styles.flatButton} 
                        label="Output all"
                        disabled={!this.state.configs}
                        onTouchTap={this.outputConfigsViaText}
                    />
                </Paper>       
            </div>
        )
    }
}

const styles = {
  paper: {
    display: 'block',
    position: 'relative',
    padding: '16px',
    margin: '16px',
    height: '365px',
  },
  flatButton: {
      display: 'block',
      margin: 'auto',
  },
  paperFirstChild: {
      marginTop: '100px'
  }
}