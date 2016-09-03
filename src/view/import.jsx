import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import Add from 'material-ui/svg-icons/content/add'
import Done from 'material-ui/svg-icons/action/done'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { pinkA200, transparent, grey400, green400, red900, blue400 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import fs from 'fs-promise'

import { openFileDialog } from '../controller/native-dialog'
import { parseConfigsByFilename } from '../controller/parse-configs'
import { parseConfigsByJSON } from '../controller/parse-configs'
import * as configModel from '../model/ss-config'

const initialTip = 'drag and drop QRcode or JSON here'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dragFlag: grey400,
            tip: initialTip,
        }
    }
    HandleClose() {
        hashHistory.goBack()
    }

    saveImportConfigs = (e) => {
        Promise.resolve().then(() => {
            if (Array.isArray(this.state.importConfigs)) {
                configModel.addConfigs(this.state.importConfigs)
            } else {
                configModel.addConfig(this.state.importConfigs)
            }
        }).then(() => {
            this.setState({ importConfigs: null })
            this.HandleClose()
        })
    }

    dragenter = (event) => {
        this.setState({ dragFlag: blue400 })
    }

    dragleave = () => {
        this.setState({ 
            dragFlag: grey400,
            tip: initialTip,
        })
    }

    drop = (event) => {
        let data = event.dataTransfer.getData('text')

        parseConfigsByJSON(data).then((config) => {
            console.dir(config);
            this.setState({ 
                dragFlag: green400,
                tip: 'Parsing successfully!',
                importConfigs: config,    
             })
        }).catch(e => {
            this.setState({ 
                dragFlag: red900,
                tip: 'Parsing failed!',
            })
        })
    }

    openFileDialog = () => {
        openFileDialog({
            title: 'Select QRcode image or json file',
            filters: [
                { name: 'Text', extensions: ['txt', 'json'] },
                { name: 'Images', extensions: ['png', 'jpg'] }
            ]
        }).then(filenames => {
            const promises = filenames.map(parseConfigsByFilename)
            return Promise.all(promises)
        }).then(configs => {
            this.setState({ importConfigs: configs })
        }).catch((e) => {
            // TODO: handle exception
            this.setState({ importConfigs: null })
        })
    }

    render() {
        const disabled = !!!this.state.importConfigs

        return (

            <div>
                <AppBar
                    title={<span>Import</span>}
                    iconElementLeft={
                        <IconButton onClick={this.HandleClose}>
                            <NavigationClose />
                        </IconButton>
                    }
                />            
                <Paper 
                    style={styles.paper} 
                    zDepth={1} rounded={false}>
                    <p style={styles.tip}>{this.state.tip}</p>
                    <Add
                        onDragEnter={this.dragenter}
                        onDragLeave={this.dragleave}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={this.drop}
                        style={styles.add} 
                        color={this.state.dragFlag} />
                    <FlatButton 
                        onTouchTap={this.openFileDialog} 
                        style={styles.openFile} 
                        label="Open file" 
                    />
                    <FloatingActionButton 
                        onTouchTap={this.saveImportConfigs}
                        disabled={disabled} 
                        style={styles.floatingButton}>
                    <Done />        
                    </FloatingActionButton>
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
  tip: {
      color: '#9E9E9E',
      textAlign: 'center',
      margin: '64px auto 16px auto',
  },
  add: {
      display: 'block',
      margin: 'auto',
      width: '100px',
      height: '100px',
  },
  floatingButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
  },
  openFile: {
      display: 'block',
      margin: 'auto'
  }
}
