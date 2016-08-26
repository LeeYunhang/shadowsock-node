import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import { shell } from 'electron'


export default  class Help extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    handleTwitterButton() {
        shell.openExternal('https://twitter.com/HanghangBaby')
    }

    handleGithubButton() {
        shell.openExternal('https://github.com/mrcodehang')
    }

    render() {
        return (
            <div>
                <AppBar
                    title={<span>Help</span>}
                    iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                    iconElementRight={<IconButton><ActionUpdate /></IconButton>}
                />
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <p style={styles.p}>&nbsp;&nbsp;Shadowsocks-Node is used only for research and learning, 
                        if you want this software for commercial purposes. I do not take any responsibility.
                        Thank <a style={styles.a} href="https://github.com/oyyd/shadowsocks-js">oyyd</a> for providing the source code of Shadowsocks-js.
                        If you want to get Shadowsocks-Node source code, please click on the github link below.
                    </p>
                    <br />
                    <div style={{textAlign: 'right'}}>
                        <p style={styles.p}>email: mrcodehang@163.com</p>
                    </div>
                    <div style={styles.div}>
                        <RaisedButton 
                            label="Github" 
                            style={styles.button}
                            onTouchTap={this.handleGithubButton}
                            icon={<FontIcon className="muidocs-icon-custom-github" /> }
                        />
                        <RaisedButton
                            onTouchTap={this.handleTwitterButton}
                            label="Twitter"
                            backgroundColor="#03A9F4"
                            labelColor="#fff"
                            style={styles.button}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
  paper: {
    display: 'block',
    overflow: 'hidden',
    padding: '16px',
    margin: '16px',
  },
  p: {
      fontSize: '1.3em',
      lineHight: '1.5em',
      color: '#757575',
      wordBreak: 'break-all',
  },
  button: {
      float: 'right',
      margin: '12px'
  },
  div: {
      marginTop: '40px',
  },
  a: {
      color: '0091EA',
      textDecoration: 'none',
  }
}