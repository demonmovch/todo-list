import React, { Component } from 'react';
import Styles from './styles.m.css';
import { object } from 'prop-types';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('ERROR', error);
        console.log('STACKTRACE', stack.componentStack);

        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return (
                <section className={Styles.catcher}>
                    <span>A mysterious error occured!</span>
                    <p>Our space engineers are fixing that already.</p>
                </section>
            );
        }

        return this.props.children;
    }
}
