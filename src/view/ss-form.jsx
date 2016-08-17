import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Done from 'material-ui/svg-icons/action/done';

import EncryptSelector from './encrypt-method-selector'

export const START_CONNECT = Symbol('start connect')
export const CLOSE_CONNECT = Symbol('close connect')

export default class extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            open: false,
            method: 'aes-256-cfb',
            password: '62910666',
            serverName: '76.164.224.102',
            serverPort: 36796,
        }
    }

    handleFloatingButtonClicked = () => {
        if (!this.state.serverName) {
            this.handleDialog(true)
            return
        }

        // if connected
        if (this.props.opened) {
            this.props.onEvent({
                type: CLOSE_CONNECT
            })
            return
        }

        const remarks = this.state.remarks || 'unnamed'
        const server = this.state.serverName
        const server_port = this.state.serverPort || 443
        const password = this.state.password
        const local_addr = this.state.localName
        const local_port = this.state.localPort
        const method = this.state.method
        const config = { server, server_port, password, method, remarks, local_addr, local_port }
        this.props.onEvent({
            type: START_CONNECT,
            config
        })
    }

    handleTextFieldChange = (e) => {
        e.preventDefault()
        if (!this.props.opened) {
            this.setState({ [e.target.id]: e.target.value })
        }
    }

    handleDialog = (open = false) => {
        if (typeof open !== 'boolean') { open = false }
        this.setState({ open })
    }

    handleSelectChange = value => {
        if (!this.props.opened) {
            this.setState({ method: value })
        }
    }

    receiveProps = props => {
        this.state.remarks = props.remarks
        this.state.serverName = props.server
        this.state.serverPort = props.server_port
        this.state.password = props.password
        this.state.localName = props.local_addr
        this.state.localPort = props.local_port
        this.state.method = props.method
    }

d
    render() {
        const icon = this.props.opened? (<Done />) : (<Send />)
        this.receiveProps(this.props)
        const open = this.state.open || false
        const method = this.state.method
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
                        value={method}
                        style={styles.TextField}
                        onEvent={this.handleSelectChange}
                    />
                </Paper>
                <FloatingActionButton
                    onTouchTap={this.handleFloatingButtonClicked}
                    style={styles.floatingButton}
                >
                    {icon}
                </FloatingActionButton>
                <Dialog
                    title="Sorry"
                    actions={
                        <FlatButton
                            label="OK"
                            primary={true}
                            onTouchTap={this.handleDialog}
                        />           
                    }
                    modal={false}
                    open={open}
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
