import React, {Component} from 'react'

import MyAppBar from './app-bar'
import SSForm from './ss-form'

export default class extends Component {
    render() {
        return (
            <div>
                <MyAppBar />
                <SSForm />
            </div>
        )                
    }
}