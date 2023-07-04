import React, {useState} from 'react';
import { Input, Select, Button, Col, Row, Typography, List } from 'antd';

const { Title } = Typography;

const TodoListWithDesign = () => {
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

    const handleTaskTypeChange = (value: string) => {
        setTaskType(value);
    };

    const handleAddTask = (event: any) => {
        event.preventDefault();

        if (task !== '' && tasks[taskType].values.indexOf(task) === -1) {
            tasks[taskType].values.push(task);
            setTasks((prevState: any) => ({...prevState, [taskType]: tasks[taskType]}));
        }
    };

    return <main>
        <Row gutter={16}>
            <Col className={'gutter-row'} span={12}>
                <Input onChange={handleTaskLabelChange}/>
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
                            {tasks[taskType].values.map((task: any) =>
                                <List.Item>{task}</List.Item>
                            )}
                        </List>
                    </Col>
                );
            })}
        </Row>
    </main>;
};

export default TodoListWithDesign;
