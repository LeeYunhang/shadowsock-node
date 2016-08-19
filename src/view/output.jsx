import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router'

export default class extends Component {

    HandleClose() {
        hashHistory.goBack()
    }
    
    render() {
        return (
            <AppBar
                title={<span>Output</span>}
                iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
            />
        )
    }
}