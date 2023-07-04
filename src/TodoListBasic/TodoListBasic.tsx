import React, {useState} from 'react';
import './TodoListBasic.css';

const TodoListBasic = () => {
    const [tasks, setTasks] = useState<any>({
        todo: {label: 'To do', values: []},
        progress: {label: 'Progress', values: []},
        done: {label: 'Done', values: []}
    });

    const [task, setTask] = useState<any>('');
    const [taskType, setTaskType] = useState<any>('todo');

    const handleTaskLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleTaskTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskType(event.target.value);
    };

    const handleAddTask = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (tasks[taskType].values.indexOf(task) === -1) {
            tasks[taskType].values.push(task);
            setTasks((prevState: any) => ({...prevState, [taskType]: tasks[taskType]}));
        }
    };

    return <main>
        <div id="inputs-wrapper">
            <input onChange={handleTaskLabelChange}/>
            <select onChange={handleTaskTypeChange}>
                {Object.keys(tasks).map(taskType => {
                    return (
                        <option value={taskType}>{tasks[taskType].label}</option>
                    );
                })}
            </select>
            <button onClick={handleAddTask}>Add task</button>
        </div>
        <div id="data-wrapper">
            {Object.keys(tasks).map(taskType => {
                return (
                    <div>
                        <h2>{tasks[taskType].label}</h2>
                        <ul>
                            {tasks[taskType].values.map((task: any) =>
                                <li>{task}</li>
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    </main>;
};

export default TodoListBasic;
