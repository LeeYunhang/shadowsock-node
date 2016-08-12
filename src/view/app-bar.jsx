import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import MyDrawer from './drawer'

class AppBarExampleIcon extends React.Component {

    constructor(props) {
        super(props)

        this.state = { open: false }
    }

    handleDrawer() {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Shadowsocks-Node"
                    onLeftIconButtonTouchTap={this.handleDrawer.bind(this)}
                    iconElementRight={
                    <IconMenu
                        width="150px"
                        iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <List>
                            <MenuItem  primaryText="Import" />
                            <MenuItem primaryText="Output" />
                        </List>
                        <Divider />
                        <List>
                            <MenuItem  primaryText="Delete" />
                        </List>                        
                    </IconMenu>
                    }                    
                />
                <MyDrawer open={this.state.open} 
                    handleDrawer={this.handleDrawer.bind(this)}
                />
            </div>
        )
    }
}

const styles = {
}

export default AppBarExampleIcon