import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router'



export default  class Settings extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    render() {
        return (
            <AppBar
                title={<span>Setting</span>}
                iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                iconElementRight={<FlatButton label="Save" />}
            />
        )
    }
}