
import ReactDOM from 'react-dom'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Main from './bin/view/main'
import Settings from './bin/view/settings'
import PublicHost from './bin/view/public-host'
import Feedback from './bin/view/feedback'
import Help from './bin/view/help'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const App = () => (
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/">
                <IndexRoute component={Main} />
                <Route path="/home" component={Main}></Route>
                <Route path="/settings" component={Settings}></Route>
                <Route path="/public-host" component={PublicHost}></Route>
                <Route path="/feedback" component={Feedback}></Route>
                <Route path="/help" component={Help}></Route>
            </Route>
        </Router>
    </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('wrapper'))
