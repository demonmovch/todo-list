import React, { Component } from 'react';
import Scheduler from '../../components/Scheduler';
import Catcher from '../../components/Catcher';

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Scheduler />
            </Catcher>
        );
    }
}
