import React, { Component } from 'react';
import Styles from './styles.m.css';
import { Catcher, Spinner, Task } from '../../components';
import { api, MAIN_URL, TOKEN } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export class Scheduler extends Component {
    state = {
        isTasksFetching: false,
        newTaskMessage: '',
        tasksFilter: '',
        tasks: [],
    };

    componentDidMount() {
        this._fetchTasksAsync();
    }

    _updateTaskAsync = async () => {};

    _removeTaskAsync = async () => {};

    _createTaskAsync = async () => {};

    _updateTasksFilter = () => {};

    _updateNewTaskMessage = () => {};

    _completeAllTasksAsync = async () => {};

    _getAllCompleted = () => {};

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const tasks = await api.fetchTasks(MAIN_URL, TOKEN);

        console.log(tasks);

        this.setState({
            tasks,
        });

        this._setTasksFetchingState(false);
    };

    _setTasksFetchingState = value => {
        this.setState({
            isTasksFetching: value,
        });
    };

    render() {
        const { tasks, isTasksFetching } = this.state;
        const taskJSX = tasks.map(task => {
            return (
                <Catcher key={task.id}>
                    <Task {...task} _removeTaskAsync={this._removeTaskAsync} />
                </Catcher>
            );
        });

        return (
            <section className={Styles.scheduler}>
                <Spinner isSpinning={isTasksFetching} />
                {taskJSX}
            </section>
        );
    }
}
