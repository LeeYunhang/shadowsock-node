import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import Add from 'material-ui/svg-icons/content/add'
import Done from 'material-ui/svg-icons/action/done'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { pinkA200, transparent, grey400 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import fs from 'fs-promise'

import { openFileDialog } from '../controller/native-dialog'
import { parseConfigsByFilename } from '../controller/parse-configs'

export default class extends Component {

    HandleClose() {
        hashHistory.goBack()
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
            return promises[0]
        }).then(configs => {
            console.log(configs);
        }).catch((e) => {
            console.log(e);
            // TODO: exception handle
        })
    }

    render() {
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
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <p style={styles.tip}>drag and drop QRcode or JSON here</p>
                    <Add style={styles.add} color={grey400} />
                    <FlatButton 
                        onTouchTap={this.openFileDialog} 
                        style={styles.openFile} 
                        label="Open file" 
                    />
                    <FloatingActionButton style={styles.floatingButton}>
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
