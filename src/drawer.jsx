import React from 'react'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import ContentSend from 'material-ui/svg-icons/file/cloud';
import FeedBack from 'material-ui/svg-icons/action/feedback';
import Settings from 'material-ui/svg-icons/action/settings';
import Done from 'material-ui/svg-icons/action/done';
import Help from 'material-ui/svg-icons/action/help';

class MyDrawer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Drawer 
                open={this.props.open}
                docked={false}
                style={style.root}
                onRequestChange={this.props.handleDrawer}>

                <List>
                    <ListItem 
                        primaryText="cfc" 
                        rightIcon={<Done color={pinkA200} />}
                        secondaryText="crazyforcode.org" 
                        />
                    <ListItem primaryText="night" secondaryText="10.22.16.100" />
                </List>      
                <Divider />    
                <List>
                    <ListItem primaryText="Public host" leftIcon={<ContentSend />} />
                    <ListItem primaryText="Settings" leftIcon={<Settings />} />
                    <ListItem primaryText="Send feedback" leftIcon={<FeedBack />} />
                    <ListItem primaryText="Help" leftIcon={<Help />} />
                    
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