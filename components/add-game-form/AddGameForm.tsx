import {Button, Modal, Form, Input, Select} from 'antd';
import React, {FC, useState} from 'react';
const {Option} = Select;

type PropsType = {
    genres: Array<{name: string; id: string}>;
    platforms: Array<{name: string; id: string; year: number}>;
};

const AddGameForm: FC<PropsType> = ({genres, platforms}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [addGameForm] = Form.useForm();

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
                        <Select placeholder="Select a genre" allowClear>
                            {genres.map((g) => (
                                <Option key={g.id} value={g.id}>
                                    {g.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="platform" label="Platform" rules={[{required: true}]}>
                        <Select placeholder="Select a platform" allowClear>
                            {platforms.map((p) => (
                                <Option key={p.id} value={p.id}>
                                    {p.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="poster" label="Poster" rules={[{required: true}, {type: 'url'}]}>
                        <Input />
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
