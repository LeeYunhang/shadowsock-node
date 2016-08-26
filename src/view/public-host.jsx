import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { hashHistory } from 'react-router'
import Paper from 'material-ui/Paper'



export default  class PublicHost extends Component {

    HandleClose() {
        hashHistory.goBack()
    }

    render() {
        return (
            
            <div>
                <AppBar
                    title={<span>Public host</span>}
                    iconElementLeft={<IconButton onClick={this.HandleClose}><NavigationClose /></IconButton>}
                    iconElementRight={<IconButton><NavigationRefresh /></IconButton>}
                />
                <p style={styles.p}>waiting...</p>
            </div>
        )
    }
}

const styles = {
    p: {
        paddingLeft: '2em',
        paddingTop: '2em',
        fontSize: '1.3em',
        lineHight: '1.5em',
        color: '#757575',
        wordBreak: 'break-all',
    },
}