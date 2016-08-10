import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

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
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleDrawer.bind(this)}
                    
                />
                <MyDrawer open={this.state.open} 
                    handleDrawer={this.handleDrawer.bind(this)}
                />
            </div>
        )
    }
}

export default AppBarExampleIcon