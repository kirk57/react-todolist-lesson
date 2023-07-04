import React, {useState} from 'react';
import { Input, Select, Button, Col, Row, Typography, List } from 'antd';

const { Title } = Typography;

const TodoListWithDesign = () => {
    const [tasks, setTasks] = useState<any>({
        todo: {label: 'To do', values: []},
        progress: {label: 'In progress', values: []},
        done: {label: 'Done', values: []}
    });

    const [column, setColumn] = useState<any>('');
    const [task, setTask] = useState<any>('');
    const [taskType, setTaskType] = useState<any>('todo');

    const handleColumnLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumn(event.target.value);
    };

    const handleAddColumn = (event: any) => {
        event.preventDefault();

        let columnId = column.replace(' ', '').toLowerCase();

        if (columnId !== '' && !tasks[columnId]) {
            tasks[columnId] = {
                label: column,
                values: []
            };
            setTasks((prevState: any) => ({...prevState, [columnId]: tasks[columnId]}));
            setColumn('');
        }
    };

    const handleTaskLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const handleTaskTypeChange = (value: string) => {
        setTaskType(value);
    };

    const handleAddTask = (event: any) => {
        event.preventDefault();

        if (task !== '' && tasks[taskType].values.indexOf(task) === -1) {
            tasks[taskType].values.push(task);
            setTasks((prevState: any) => ({...prevState, [taskType]: tasks[taskType]}));
            setTask('');
        }
    };

    return <main>
        <Row gutter={16}>
            <Col className={'gutter-row'} span={20}>
                <Input onChange={handleColumnLabelChange} value={column}/>
            </Col>
            <Col className={'gutter-row'} span={4}>
                <Button type="primary" onClick={handleAddColumn} style={{ width: '100%' }}>Add column</Button>
            </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col className={'gutter-row'} span={12}>
                <Input onChange={handleTaskLabelChange} value={task}/>
            </Col>
            <Col className={'gutter-row'} span={8}>
                <Select onChange={handleTaskTypeChange} style={{ width: '100%' }}>
                    {Object.keys(tasks).map(taskType => {
                        return (
                            <Select.Option value={taskType}>{tasks[taskType].label}</Select.Option>
                        );
                    })}
                </Select>
            </Col>
            <Col className={'gutter-row'} span={4}>
                <Button type="primary" onClick={handleAddTask} style={{ width: '100%' }}>Add task</Button>
            </Col>
        </Row>
        <Row gutter={16}>
            {Object.keys(tasks).map(taskType => {
                return (
                    <Col flex={'auto'} style={{ marginTop: '20px' }}>
                        <List
                            header={<Title level={4} style={{ textAlign: 'center' }}>{tasks[taskType].label}</Title>}
                            bordered
                        >
                            {tasks[taskType].values.map((taskValue: any) =>
                                <List.Item>{taskValue}</List.Item>
                            )}
                        </List>
                    </Col>
                );
            })}
        </Row>
    </main>;
};

export default TodoListWithDesign;
