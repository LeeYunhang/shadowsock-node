import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';

import shadowsocks, { server } from '../controller/shadowsocks'
import EncryptSelector from './encrypt-method-selector'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            open: false,

            floatingButtonIcon: <Send />
        }

        this.handleFloatingButtonClicked = this.handleFloatingButtonClicked.bind(this)
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
        this.handleDialog = this.handleDialog.bind(this)
        this.handleDialog = this.handleDialog.bind(this)
    }

    handleFloatingButtonClicked() {
        if (!this.state.serverName) {
            this.handleDialog(true)
            return
        }

        const server = this.state.serverName
        const server_port = this.state.serverPort
        const password = this.state.password
        const method = 'aes-256-cfb'

        shadowsocks({ server, server_port, password, method })
        .then(server => {
            this.setState({floatingButtonIcon: <Done />})
        })
    }

    handleTextFieldChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleDialog(open = false) {
        if (typeof open !== 'boolean') { open = false }
        this.setState({ open })
    }


    render() {
        return (
            <div>
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <label htmlFor="remarks" style={styles.label}>remarks:</label>
                    <TextField id="remarks"
                        onChange={this.handleTextFieldChange}
                        value={this.state.remarks}
                        style={styles.TextField}
                        hintText="default: unnamed"
                    />
                    <br />
                    <label htmlFor="serverName" style={styles.label}>server name:</label>
                    <TextField id="serverName"
                        onChange={this.handleTextFieldChange}
                        value={this.state.serverName}
                        style={styles.TextField}
                        hintText="enter server name"
                    />
                    <br />
                    <label htmlFor="password" style={styles.label}>password:</label>
                    <TextField id="password"
                        onChange={this.handleTextFieldChange}
                        value={this.state.password}
                        style={styles.TextField}
                        hintText="enter password"
                    />
                    <br />
                    <label htmlFor="serverPort" style={styles.label}>server port:</label>
                    <TextField id="serverPort"
                        onChange={this.handleTextFieldChange}
                        value={this.state.serverPort}
                        style={styles.TextField}
                        hintText="default: 443"
                    />
                    <br />
                    <label htmlFor="localName" style={styles.label}>local name:</label>
                    <TextField id="localName"
                        onChange={this.handleTextFieldChange}
                        value={this.state.localName}
                        style={styles.TextField}
                        hintText="default: 127.0.0.1"
                    />
                    <br />
                    <label htmlFor="localPort" style={styles.label}>local port:</label>
                    <TextField id="localPort"
                        onChange={this.handleTextFieldChange}
                        value={this.state.localPort}
                        style={styles.TextField}
                        hintText="default: 1080"
                    />
                    <br />
                    <label htmlFor="method" style={styles.label}>method:</label>
                    <EncryptSelector id="method"
                        style={styles.TextField}
                    />
                </Paper>
                <FloatingActionButton
                    onClick={this.handleFloatingButtonClicked} 
                    style={styles.floatingButton}
                    keyboardFocused={true}
                    onTouchTap={this}
                >
                    {this.state.floatingButtonIcon}
                </FloatingActionButton>
                <Dialog
                    title="Sorry"
                    actions={
                        <FlatButton
                            label="OK"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.handleDialog}
                        />           
                    }
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >
                    Please enter your server name
                </Dialog> 
            </div>           
        )
    }
}

const styles = {
  paper: {
    display: 'inline-block',
    padding: '16px',
    margin: '16px',
  },
  label: {
      width: '100px',
      display: 'inline-block',
      textAlign: 'right',
      marginRight: '12px',
  },

  floatingButton: {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
  },
  rotate: {
      blackground: 'black'
  }
}
