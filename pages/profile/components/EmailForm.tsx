import {Form, Input, Button} from 'antd';
import React, {useEffect, useState} from 'react';

const EmailForm = ({profile, onFinishEmailForm}) => {
    const [inited, setInited] = useState(false);
    const [emailForm] = Form.useForm();

    useEffect(() => {
        if (!profile || inited) return;

        emailForm.setFieldsValue({email: profile.email});
        setInited(true);
    }, [profile]);

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
        },
    };

    return (
        <Form
            form={emailForm}
            layout="vertical"
            name="emailForm"
            onFinish={onFinishEmailForm}
            validateMessages={validateMessages}
        >
            <Form.Item name="email" label="Email" rules={[{type: 'email'}]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EmailForm;
