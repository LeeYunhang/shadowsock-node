import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import Div from './div'

React.router((
    <Router>
        <Route path="/" component={Div}></Route>
    </Router>
), document.body)