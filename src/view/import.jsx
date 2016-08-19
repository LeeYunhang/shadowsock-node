import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper';
import Add from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { pinkA200, transparent, grey400 } from 'material-ui/styles/colors';

import nativeDialog from '../controller/native-dialog'

export default class extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    openFileDialog = () => {
        nativeDialog.openFileDialog({
            title: 'Select QRcode image or json file',
            filters: [
                { name: 'Images', extensions: ['jpg, png'] },
                { name: 'Text', extensions: ['txt', 'json'] }
            ]
        }).then(filenames => {
            filenames.forEach(filename => {
                const filetype = filename.substring(filename.indexOf('.') + 1, filename.length)
                
                if (filetype === 'jpg' || filetype === 'png') {
                    // TODO: parse QR code
                } else {
                    // TODO: parse text file
                }
            })
        }).catch(() => {
            // TODO: exception handle
        })
    }

    render() {
        return (

            <div>
                <AppBar
                    title={<span>Import</span>}
                    iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                />            
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <p style={styles.tip}>drag and drop QRcode or JSON here</p>
                    <Add style={styles.add} color={grey400} />
                    <FloatingActionButton
                        onTouchTap={this.openFileDialog}
                        style={styles.floatingButton}
                    >
                    <Add />        
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
}
