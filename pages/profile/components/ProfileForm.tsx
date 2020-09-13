import {Form, Input, Button} from 'antd';
import React, {useEffect, useState} from 'react';

const ProfileForm = ({profile, onFinishProfileForm}) => {
    const [inited, setInited] = useState(false);
    const [profileForm] = Form.useForm();

    useEffect(() => {
        if (!profile || inited) return;

        profileForm.setFieldsValue({
            displayName: profile.displayName,
            photoURL: profile.photoURL,
        });

        setInited(true);
    }, [profile]);

    return (
        <Form
            form={profileForm}
            layout="vertical"
            name="Profile"
            onFinish={onFinishProfileForm}
            style={{
                minWidth: '400px',
                paddingLeft: '24px',
            }}
        >
            <Form.Item label="Name" name="displayName">
                <Input placeholder="John Smith" />
            </Form.Item>

            <Form.Item label="Photo URL" name="photoURL">
                <Input placeholder="https://url-to-my-photo.com" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProfileForm;
