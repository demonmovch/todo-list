import React, { Component } from 'react';
import { Catcher, Scheduler } from '../../components';

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Scheduler />
            </Catcher>
        );
    }
}
