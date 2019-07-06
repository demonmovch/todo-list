import React, { Component } from 'react';
import Styles from './styles.m.css';
import { Catcher, Spinner, Task } from '../../components';
import Checkbox from '../../theme/assets/Checkbox';
import FlipMove from 'react-flip-move';
import { api, MAIN_URL, TOKEN } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export class Scheduler extends Component {
    state = {
        isTasksFetching: false,
        newTaskMessage: '',
        tasksFilter: '',
        tasks: [],
        allTasksChecked: false,
        filteredTasks: [],
    };

    componentDidMount() {
        this._fetchTasksAsync();
    }

    _updateTaskAsync = async updatedTask => {
        this._setTasksFetchingState(true);

        if (updatedTask.completed === false && this.state.allTasksChecked !== false) {
            this.setState(() => ({
                allTasksChecked: false,
            }));
        }

        let updatedTasks = await api.updateTask(MAIN_URL, TOKEN, updatedTask);
        updatedTasks = updatedTasks[0];

        this.setState(({ tasks }) => ({
            tasks: this._sortTasks(
                tasks.map(task => (task.id === updatedTasks.id ? updatedTasks : task))
            ),
        }));

        this._setTasksFetchingState(false);
    };

    _removeTaskAsync = async taskId => {
        this._setTasksFetchingState(true);

        const removedTask = await api.removeTask(MAIN_URL, TOKEN, taskId);

        if (removedTask) {
            this.setState(({ tasks }) => {
                const newTasks = tasks.filter(task => task.id !== taskId);
                return { tasks: [...newTasks] };
            });
        }

        this._setTasksFetchingState(false);
    };

    _createTaskAsync = async event => {
        event.preventDefault();

        if (this.state.newTaskMessage === '') {
            return null;
        }

        this._setTasksFetchingState(true);

        const createdTask = await api.createTask(MAIN_URL, TOKEN, this.state.newTaskMessage);

        this.setState(({ tasks }) => {
            return { tasks: [...tasks, createdTask], newTaskMessage: '' };
        });

        this._setTasksFetchingState(false);
    };

    _updateTasksFilter = event => {
        this.setState({ tasksFilter: event.target.value.toLowerCase() });
    };

    _updateNewTaskMessage = event => {
        this.setState({ newTaskMessage: event.target.value });
    };

    _completeAllTasksAsync = async () => {
        let notCompletedTasks = this.state.tasks.filter(task => task.completed !== true);
        if (notCompletedTasks.length === 0) {
            return null;
        }

        this._setTasksFetchingState(true);

        notCompletedTasks = notCompletedTasks.map(item => {
            return { ...item, completed: true };
        });

        api.completeAllTasks(MAIN_URL, TOKEN, notCompletedTasks);

        this.setState(state => {
            const tasks = state.tasks.map(item => {
                return { ...item, completed: true };
            });

            return { tasks: this._sortTasks(tasks), allTasksChecked: true };
        });

        this._setTasksFetchingState(false);
    };

    _getAllCompleted = () => {
        if (this.state.tasks.some(task => task.completed === false) === false) {
            return true;
        }
        return false;
    };

    _sortTasks = tasks => {
        let tasksCopy = JSON.parse(JSON.stringify(tasks));

        tasksCopy.sort((a, b) => {
            if (a.favorite > b.favorite) {
                return -1;
            }
            if (a.favorite < b.favorite) {
                return 1;
            }
            return 0;
        });

        tasksCopy.sort((a, b) => {
            if (a.completed < b.completed) {
                return -1;
            }
            if (a.completed > b.completed) {
                return 1;
            }
            return 0;
        });

        return tasksCopy;
    };

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const tasks = await api.fetchTasks(MAIN_URL, TOKEN);

        console.log(tasks);

        this.setState({
            tasks: this._sortTasks(tasks),
        });

        if (this._getAllCompleted()) {
            this.setState({
                allTasksChecked: true,
            });
        }

        this._setTasksFetchingState(false);
    };

    _setTasksFetchingState = value => {
        this.setState({
            isTasksFetching: value,
        });
    };

    render() {
        const { tasks, isTasksFetching, allTasksChecked, tasksFilter, newTaskMessage } = this.state;
        let taskJSX;

        const taskCallback = task => {
            return (
                <Catcher key={task.id}>
                    <Task
                        {...task}
                        _removeTaskAsync={this._removeTaskAsync}
                        _updateTaskAsync={this._updateTaskAsync}
                    />
                </Catcher>
            );
        };

        if (tasksFilter === '') {
            taskJSX = tasks.map(taskCallback);
        } else {
            let filteredTasks = tasks.filter(task => task.message.includes(tasksFilter));

            taskJSX = filteredTasks.map(taskCallback);
        }

        return (
            <section className={Styles.scheduler}>
                <Spinner isSpinning={isTasksFetching} />
                <main>
                    <header>
                        <h1>Todo List</h1>
                        <input
                            placeholder='Поиск'
                            type='search'
                            value={tasksFilter}
                            onChange={this._updateTasksFilter}
                        />
                    </header>
                    <section>
                        <form onSubmit={this._createTaskAsync}>
                            <input
                                maxLength='50'
                                placeholder='Описaние моей новой задачи'
                                type='text'
                                onChange={this._updateNewTaskMessage}
                                value={newTaskMessage}
                            />
                            <button>Добавить задачу</button>
                        </form>

                        <ul>
                            <FlipMove>{taskJSX}</FlipMove>
                        </ul>
                    </section>
                    <footer>
                        <Checkbox
                            onClick={this._completeAllTasksAsync}
                            className={Styles.toggleTaskCompletedState}
                            color1='#363636'
                            color2='#FFF'
                            checked={allTasksChecked}
                            hover={false}
                        />
                        <span className={Styles.completeAllTasks}>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
