import React from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class AppBarExampleIcon extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { open: false }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default AppBarExampleIcon