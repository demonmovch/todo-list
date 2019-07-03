import React, { PureComponent } from 'react';
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import SearchIcon from '../../theme/assets/SearchIcon';
import Checkbox from '../../theme/assets/Checkbox';
import { string, bool } from 'prop-types';

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

    render() {
        const { message } = this.props;

        return (
            <li className={Styles.task}>
                <div className={Styles.content}>
                    <div className={Styles.toggleTaskCompletedState}>
                        <Checkbox onClick={this._toggleTaskCompletedState} />
                    </div>
                    <input
                        disabled
                        maxLength='50'
                        type='text'
                        value={message}
                        ref={this.taskInput}
                    />
                </div>
                <div className={Styles.actions}>
                    <div className={Styles.toggleTaskFavoriteState}>
                        <Star />
                    </div>
                    <div className={Styles.updateTaskMessageOnClick}>
                        <Edit />
                    </div>
                    <div className={Styles.cross}>
                        <SearchIcon />
                    </div>
                </div>
            </li>
        );
    }
}
