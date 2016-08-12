import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { hashHistory } from 'react-router'



export default  class PublicHost extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    render() {
        return (
            <AppBar
                title={<span>Public host</span>}
                iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                iconElementRight={<IconButton><NavigationRefresh /></IconButton>}
            />
        )
    }
}