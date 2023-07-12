import React, {useState} from 'react';
import {Input, Select, Button, Col, Row, Typography, List, Space, Modal} from 'antd';
import {CloseOutlined, EditOutlined} from '@ant-design/icons';

const {Title} = Typography;

const TodoListEdit = () => {
    const [tasks, setTasks] = useState<any>({
        todo: {label: 'To do', values: []},
        progress: {label: 'In progress', values: []},
        done: {label: 'Done', values: []}
    });

    const [column, setColumn] = useState<any>('');
    const [task, setTask] = useState<any>('');
    const [taskType, setTaskType] = useState<any>('todo');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('column');
    const [modalTitle, setModalTitle] = useState('');
    const [modalCurrentColumn, setModalCurrentColumn] = useState('');
    const [modalCurrentValue, setModalCurrentValue] = useState('');
    const [modalValue, setModalValue] = useState('');

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

    const editColumn = (givenTaskType: string) => {
        if (tasks[givenTaskType]) {
            setModalTitle('Column edition');
            setModalCurrentColumn(givenTaskType);
            setModalValue(tasks[givenTaskType].label);
            setModalType('column');
            setIsModalOpen(true);
        }
    }

    const removeColumn = (givenTaskType: string) => {
        if (tasks[givenTaskType]) {
            setTasks((current: any) => {
                const copy = {...current};
                delete copy[givenTaskType];

                let taskTypesKeys = Object.keys(copy);
                setTaskType(Object.keys(copy)[0] ?? null);

                return copy;
            });
        }
    }

    const handleAddTask = (event: any) => {
        event.preventDefault();

        if (task !== '' && tasks[taskType].values.indexOf(task) === -1) {
            tasks[taskType].values.push(task);
            setTasks((prevState: any) => ({...prevState, [taskType]: tasks[taskType]}));
            setTask('');
        }
    };

    const editTask = (givenTaskType: string, givenTaskValue: string) => {
        if (tasks[givenTaskType]) {
            let idx = tasks[givenTaskType].values.indexOf(givenTaskValue);
            if (idx !== -1) {
                setModalTitle('Task edition');
                setModalCurrentColumn(givenTaskType);
                setModalCurrentValue(givenTaskValue);
                setModalValue(givenTaskValue);
                setModalType('task');
                setIsModalOpen(true);
            }
        }
    }

    const removeTask = (givenTaskType: string, givenTaskValue: string) => {
        if (tasks[givenTaskType]) {
            let idx = tasks[givenTaskType].values.indexOf(givenTaskValue);
            if (idx !== -1) {
                delete tasks[givenTaskType].values[idx];
                setTasks((prevState: any) => ({...prevState, [givenTaskType]: tasks[givenTaskType]}));
            }
        }
    }

    const saveModalValue = () => {
        if (tasks[modalCurrentColumn]) {
            if (modalType === 'task') {
                let idx = tasks[modalCurrentColumn].values.indexOf(modalCurrentValue);
                if (idx !== -1) {
                    tasks[modalCurrentColumn].values[idx] = modalValue;
                }
            } else if (modalType === 'column') {
                tasks[modalCurrentColumn].label = modalValue;
            }

            setTasks((prevState: any) => ({...prevState, [modalCurrentColumn]: tasks[modalCurrentColumn]}));
        }
        setIsModalOpen(false);
    };

    return <main>
        <Row gutter={16}>
            <Col className={'gutter-row'} span={20}>
                <Input onChange={event => setColumn(event.target.value)} value={column}/>
            </Col>
            <Col className={'gutter-row'} span={4}>
                <Button type="primary" onClick={handleAddColumn} style={{width: '100%'}}>Add column</Button>
            </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '20px'}}>
            <Col className={'gutter-row'} span={12}>
                <Input onChange={event => setTask(event.target.value)} value={task}/>
            </Col>
            <Col className={'gutter-row'} span={8}>
                <Select
                    onChange={value => setTaskType(value)}
                    value={taskType}
                    style={{width: '100%'}}
                    allowClear
                    placeholder="Select a task type"
                >
                    {Object.keys(tasks).map(currentTaskType => {
                        return (
                            <Select.Option value={currentTaskType}>{tasks[currentTaskType].label}</Select.Option>
                        );
                    })}
                </Select>
            </Col>
            <Col className={'gutter-row'} span={4}>
                <Button type="primary" onClick={handleAddTask} style={{width: '100%'}}>Add task</Button>
            </Col>
        </Row>
        <Row gutter={16}>
            {Object.keys(tasks).map(currentTaskType => {
                return (
                    <Col flex={'auto'} style={{marginTop: '20px'}}>
                        <List
                            header={
                                <Space>
                                    <Title level={4}
                                           style={{textAlign: 'center'}}>{tasks[currentTaskType].label}</Title>
                                    <Button
                                        type={'primary'}
                                        icon={<EditOutlined/>}
                                        onClick={() => editColumn(currentTaskType)}
                                    />
                                    <Button
                                        type={'primary'}
                                        icon={<CloseOutlined/>}
                                        onClick={() => removeColumn(currentTaskType)}
                                        danger
                                    />
                                </Space>
                            }
                            bordered
                        >
                            {tasks[currentTaskType].values.map((taskValue: any) =>
                                <List.Item>
                                    <Row style={{width: '100%'}}>
                                        <Col span={20}>{taskValue}</Col>
                                        <Col span={4}>
                                            <Space>
                                                <Button
                                                    type={'primary'}
                                                    icon={<EditOutlined/>}
                                                    onClick={() => editTask(currentTaskType, taskValue)}
                                                />
                                                <Button
                                                    type={'primary'}
                                                    icon={<CloseOutlined/>}
                                                    onClick={() => removeTask(currentTaskType, taskValue)}
                                                    danger
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        </List>
                    </Col>
                );
            })}
        </Row>
        <Modal
            title={modalTitle}
            centered
            open={isModalOpen}
            onOk={saveModalValue}
            onCancel={() => setIsModalOpen(false)}
        >
            <Input onChange={event => setModalValue(event.target.value)} value={modalValue}/>
        </Modal>
    </main>;
};

export default TodoListEdit;
