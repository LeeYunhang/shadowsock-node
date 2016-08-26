import React from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import ContentSend from 'material-ui/svg-icons/file/cloud';
import FeedBack from 'material-ui/svg-icons/action/feedback';
import Settings from 'material-ui/svg-icons/action/settings';
import Done from 'material-ui/svg-icons/action/done';
import Help from 'material-ui/svg-icons/action/help';
import { Link } from 'react-router'
import { shell } from 'electron'

export const LIST_ITEM_CLICK = Symbol('list item click')
class MyDrawer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
    }

    configsToListItems = (configs) => {
        return this.listItems = configs.map((value, index) => {
            let done
            if(this.props.opened && this.props.opened === value.server) {
                done = <Done color={pinkA200}/>
            }
            const listItem = <ListItem
                key={index}
                onTouchTap={this.props.onEvent.bind(this, {
                })}
                onTouchTap={() => {
                    this.props.onEvent({
                        server: value.server, 
                        type: LIST_ITEM_CLICK
                    })
                    this.props.handleDrawer()
                }}
                rightIcon={done}
                primaryText={value.remarks || 'unnamed'}
                secondaryText={value.server}
            />
            return listItem
        })
    }

    handFeedback() {
        shell.openExternal('https://github.com/mrcodehang/shadowsock-node/issues')
    }

    render() {
        const listItems = this.configsToListItems(this.props.configs)
        
        return (
            <Drawer 
                open={this.props.open}
                docked={false}
                style={style.root}
                onRequestChange={this.props.handleDrawer}>
                <List>{ listItems }</List>      
                <Divider />    
                <List>
                    <ListItem primaryText="Public host" leftIcon={<ContentSend />} containerElement={<Link to={{pathname:"/public-host"}} />} />
                    <ListItem primaryText="Settings" leftIcon={<Settings />} containerElement={<Link to={{pathname:"/settings"}} />} />
                    <ListItem primaryText="Send feedback" leftIcon={<FeedBack />} onTouchTap={this.handFeedback} />
                    <ListItem primaryText="Help" leftIcon={<Help />} containerElement={<Link to={{pathname:"/help"}} />} />
                </List>   
            </Drawer>
        )
    }
}

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  menu: {
    overflow: 'hidden',
    width: '95%'
  },
   root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default MyDrawer