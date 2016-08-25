import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router'

import { appLauncher } from '../model/app-state'
import { setPacMode, getPacMode } from '../model/ss-config'

export default  class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pacChecked: false,
            startupChecked: false
        }

        Promise.all(appLauncher.isEnabled(), getPacMode())
        .then(([enabled, mode]) => this.setState({
            startupChecked: enabled,
            pacChecked: mode === 'pac'
        })).catch(e => console.log(e))
    }

    HandleClose() {
        hashHistory.goBack()
    }

    handleStartAtBoot = () => {
        appLauncher.isEnabled().then(enabled => {
            if (!enabled) { appLauncher.enable() }
            else { appLauncher.disable() }
            this.setState({ startupChecked: !enabled })
        })
    }

    handleMode = () => {
        getPacMode().then(mode => {
            let tmp = true

            if (mode === 'pac') { tmp = false }
            this.setState({ packChecked: tmp })
            setPacMode(mode === 'pac'? 'global':'pac') 
        })
    }

    render() {
        return (

            <div>
                <AppBar
                    title={<span>Setting</span>}
                    iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton label="Save" />}
                />
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <List>
                        <Subheader>Normal</Subheader>
                            <ListItem
                                leftCheckbox={
                                <Checkbox 
                                    onCheck={this.handleMode}
                                />}
                                primaryText="PAC mode"
                            />
                            <ListItem
                                leftCheckbox={
                                <Checkbox 
                                    onCheck={this.handleStartAtBoot}
                                />}
                                primaryText="Start at boot"
                                
                            />
                    </List>
                </Paper>
            </div>
        )
    }
}

const styles = {
  paper: {
    display: 'block',
    padding: '16px',
    margin: '16px',
  }
}