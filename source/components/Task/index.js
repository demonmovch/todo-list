import React, { PureComponent } from 'react';
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';
import { string, bool } from 'prop-types';
import cx from 'classnames';

export default class Task extends PureComponent {
    static propTypes = {
        id: string.isRequired,
        completed: bool.isRequired,
        favorite: bool.isRequired,
        message: string.isRequired,
        created: string.isRequired,
    };

    state = { isTaskEditing: false, newTaskMessage: this.props.message };

    taskInput = React.createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _toggleTaskFavoriteState = () => {
        const task = this._getTaskShape(this.props);

        this.props._updateTaskAsync({ ...task, favorite: !task.favorite });
    };

    _setTaskEditingState = editingState => {
        if (editingState) {
            this.setState({
                isTaskEditing: true,
            });

            setImmediate(() => this.taskInput.current.focus());
        } else {
            this.setState(() => ({
                isTaskEditing: false,
            }));
        }
    };

    _updateNewTaskMessage = event => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    };

    _updateTask = () => {
        if (this.props.message === this.state.newTaskMessage) {
            this._setTaskEditingState(false);

            return null;
        }

        const task = this._getTaskShape(this.props);

        this.props._updateTaskAsync({ ...task, message: this.state.newTaskMessage });

        this._setTaskEditingState(false);
    };

    _updateTaskMessageOnClick = () => {
        if (this.state.newTaskMessage === '') {
            return null;
        }

        if (this.state.isTaskEditing === true) {
            this._updateTask();
            return null;
        } else {
            this._setTaskEditingState(true);
        }
    };

    _updateTaskMessageOnKeyDown = event => {
        if (this.state.newTaskMessage === '') {
            return null;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            this._updateTask();
        } else if (event.key === 'Escape') {
            this._cancelUpdatingTaskMessage();
        }
    };

    _cancelUpdatingTaskMessage = () => {
        this.setState({
            newTaskMessage: this.props.message,
            isTaskEditing: false,
        });
    };

    _toggleTaskCompletedState = () => {
        let task = this._getTaskShape(this.props);

        this.props._updateTaskAsync({ ...task, completed: !task.completed });
    };

    _removeTask = () => {
        this.props._removeTaskAsync(this.props.id);
    };

    render() {
        const { completed } = this.props;
        const { newTaskMessage, isTaskEditing } = this.state;

        const statusStyle = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className={statusStyle}>
                <div className={Styles.content}>
                    <Checkbox
                        onClick={this._toggleTaskCompletedState}
                        className={Styles.toggleTaskCompletedState}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#FFF'
                        checked={completed}
                        hover={false}
                    />
                    <input
                        disabled={!isTaskEditing}
                        maxLength='50'
                        type='text'
                        value={newTaskMessage}
                        ref={this.taskInput}
                        onChange={this._updateNewTaskMessage}
                        onKeyDown={this._updateTaskMessageOnKeyDown}
                    />
                </div>
                <div className={Styles.actions}>
                    <Star
                        className={Styles.toggleTaskFavoriteState}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#000'
                        onClick={this._toggleTaskFavoriteState}
                        checked={this.props.favorite}
                    />
                    <Edit
                        className={Styles.updateTaskMessageOnClick}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#000'
                        onClick={this._updateTaskMessageOnClick}
                        checked={this.state.isTaskEditing}
                    />
                    <Remove
                        onClick={this._removeTask}
                        className={Styles.cross}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#000'
                    />
                </div>
            </li>
        );
    }
}
