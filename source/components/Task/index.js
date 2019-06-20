import React, { PureComponent } from 'react';
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import SearchIcon from '../../theme/assets/SearchIcon';
import Checkbox from '../../theme/assets/Checkbox';

export class Task extends PureComponent {
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

    render() {
        const { message } = this.props;

        return (
            <li className={Styles.task}>
                <div className={Styles.content}>
                    <div className={Styles.toggleTaskCompletedState}>
                        <Checkbox />
                    </div>
                    <input disabled maxLength='50' type='text' value={message} />
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
