import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Send from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import EncryptSelector from './encrypt-method-selector'

export default class extends Component {
    render() {
        return (
            <div>
                <Paper style={styles.paper} zDepth={1} rounded={false}>
                    <label htmlFor="comment" style={styles.label}>comment:</label>
                    <TextField id="comment"
                        style={styles.TextField}
                        hintText="comment"
                    />
                    <br />
                    <label htmlFor="serverName" style={styles.label}>server name:</label>
                    <TextField id="serverName"
                        style={styles.TextField}
                        hintText="Server IP/domain"
                    />
                    <br />
                    <label htmlFor="password" style={styles.label}>password:</label>
                    <TextField id="password"
                        style={styles.TextField}
                        hintText="Server port"
                    />
                    <br />
                    <label htmlFor="serverPort" style={styles.label}>server port:</label>
                    <TextField id="serverPort"
                        style={styles.TextField}
                        hintText="Password"
                    />
                    <br />
                    <label htmlFor="localName" style={styles.label}>local name:</label>
                    <TextField id="localName"
                        style={styles.TextField}
                        hintText="Local IP/domain"
                    />
                    <br />
                    <label htmlFor="localPort" style={styles.label}>local port:</label>
                    <TextField id="localPort"
                        style={styles.TextField}
                        hintText="Local port"
                    />
                    <br />
                    <label htmlFor="method" style={styles.label}>method:</label>
                    <EncryptSelector id="method"
                        style={styles.TextField}
                    />
                </Paper>
                <FloatingActionButton style={styles.floatingButton}>
                    <Send />
                </FloatingActionButton>
            </div>           
        )
    }
}

const styles = {
  paper: {
    display: 'inline-block',
    padding: '16px',
    margin: '16px',
  },
  label: {
      width: '100px',
      display: 'inline-block',
      textAlign: 'right',
      marginRight: '12px',
  },

  floatingButton: {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
  },
  rotate: {
      blackground: 'black'
  }
}
