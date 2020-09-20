import React from 'react';
import {Result} from 'antd';

const VerifyEmail = () => {
    return (
        <Result
            status="success"
            subTitle="Please verify your email. It may take a few minutes for the email to be sent"
            title="User Successfully registered!"
        />
    );
};

export default VerifyEmail;
