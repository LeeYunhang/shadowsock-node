import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import { hashHistory } from 'react-router'



export default  class Help extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    render() {
        return (
            <AppBar
                title={<span>Help</span>}
                iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                iconElementRight={<IconButton><ActionUpdate /></IconButton>}
            />
        )
    }
}