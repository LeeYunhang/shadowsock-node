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



export default  class Settings extends Component {

    HandleClose() {
        hashHistory.goBack()
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
                                leftCheckbox={<Checkbox />}
                                primaryText="PAC mode"
                            />
                            <ListItem
                                leftCheckbox={<Checkbox />}
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