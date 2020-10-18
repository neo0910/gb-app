import {Button, Modal, Form, Input, Select} from 'antd';
import React, {FC, useState} from 'react';
const {Option} = Select;

const AddGameForm: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [addGameForm] = Form.useForm();

    const genres = [
        {id: 1, title: 'RPG'},
        {id: 2, title: 'action'},
        {id: 3, title: 'sport'},
        {id: 4, title: 'platform'},
        {id: 5, title: 'shooter'},
    ];

    const toggleModal = () => setModalVisible(!modalVisible);

    const addGame = (values) => {
        console.log(values);
    };

    return (
        <>
            <Button ghost type="dashed" style={{marginLeft: 12}} onClick={toggleModal}>
                Add Game
            </Button>
            <Modal
                destroyOnClose={true}
                footer={null}
                onCancel={toggleModal}
                title="Add Game Form"
                visible={modalVisible}
            >
                <Form form={addGameForm} onFinish={addGame}>
                    <Form.Item name="title" label="Title" rules={[{required: true}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="genre" label="Genre" rules={[{required: true}]}>
                        <Select placeholder="Select an option or change input text above" allowClear>
                            {genres.map((g) => (
                                <Option key={g.id} value={g.id}>
                                    {g.title}
                                </Option>
                            ))}
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.genre !== currentValues.genre}
                    >
                        {({getFieldValue}) => {
                            return getFieldValue('genre') === 'other' ? (
                                <Form.Item name="customizeGenre" label="Customize Genre" rules={[{required: true}]}>
                                    <Input />
                                </Form.Item>
                            ) : null;
                        }}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export {AddGameForm};
