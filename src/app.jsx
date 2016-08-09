
import ReactDOM from 'react-dom'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import MyAppBar from './bin/app-bar'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const MyAwesomeReactComponent = () => (
    <RaisedButton label="Default" />
)

const App = () => (
    <MuiThemeProvider>
        <MyAppBar />
    </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('wrapper'))
