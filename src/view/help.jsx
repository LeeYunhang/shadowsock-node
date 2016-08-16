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



export default  class Help extends Component {

    HandleClose() {
        hashHistory.goBack()
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
                    <p style={styles.p}>&nbsp;&nbsp;Shadowsocks-Node is used only for research and learning, if you want this software for commercial purposes. I do not take any responsibility. If you want to get Shadowsocks-Node source code, please click on the github link below.</p>
                </Paper>
                <Divider />
               
            </div>
        )
    }
}

const styles = {
  paper: {
    display: 'block',
    padding: '16px',
    margin: '16px',
  },
  p: {
      fontSize: '1.3em',
      lineHight: '1.5em',
      color: '#757575'
  }
}