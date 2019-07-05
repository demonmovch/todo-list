import React, { PureComponent } from 'react';
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';
import { string, bool } from 'prop-types';
import cx from 'classnames';

export class Task extends PureComponent {
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

    _toggleTaskCompletedState = () => {
        let task = this._getTaskShape(this.props);

        this.props._updateTaskAsync({ ...task, completed: !task.completed });
    };

    _removeTask = () => {
        this.props._removeTaskAsync(this.props.id);
    };

    render() {
        const { message, completed } = this.props;

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
                        disabled
                        maxLength='50'
                        type='text'
                        value={message}
                        ref={this.taskInput}
                    />
                </div>
                <div className={Styles.actions}>
                    <Star
                        className={Styles.toggleTaskFavoriteState}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#000'
                    />
                    <Edit
                        className={Styles.updateTaskMessageOnClick}
                        inlineBlock={true}
                        color1='#3B8EF3'
                        color2='#000'
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
