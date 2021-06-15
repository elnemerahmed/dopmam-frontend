import { Form, Input, Select, Button, message, Result} from 'antd';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import React, { useState } from 'react';

import { insertUserInfo, deleteUserInfo } from '../../actions/user';
import { login } from '../../axios/user';

const Option = Select.Option;

const LoginForm = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onLoginFormSubmit = ({name, organization}) => {
        setLoading(true);
        login(name, organization).then((response) => {
            const token = response.data.token;
            const user = jwt(token);
            props.insertUserInfo(token, user);
            props.history.push(`/${organization === 'dopmam' ? 'dopmam' : 'user' }/reports`);
        }).catch(() => {
            setLoading(false);
            message.error("Login Failed");
        });
    };

    return (
        <React.Fragment>
            <Form
                layout="vertical"
                form={form}
                onFinish={onLoginFormSubmit}
            >
                <Form.Item 
                    label="Username:"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label="Organization:"
                    name="organization"
                    rules={[{ required: true, message: 'Please Select an Orgranization!' }]}
                >
                    <Select className="w-100" placeholder="Please Select an Orgranization!">
                        <Option value="naser">Naser Hospital</Option>
                        <Option value="shifa">Shifa Hospital</Option>
                        <Option value="rantisi">Rantisi Hospital</Option>
                        <Option value="dopmam">Dopmam</Option>
                    </Select>
                </Form.Item>
                <Form.Item className="m-0">
                    <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
}

const ResultForm = (props) => {
    return (
        <React.Fragment>
            <Result
                status="warning"
                title={`Wellcome back, ${props.name}`}
                extra={
                    <Button type="primary" onClick={() => {props.deleteUserInfo()}}>
                        Sign out
                    </Button>
                }
            />
        </React.Fragment>
    );
}

const Login = (props) => {
    if(!props.jwt) {
        return (
            <div className="container">
                <div className="row" style={{paddingTop: '35vh'}}>
                    <div className="col-md-4 offset-md-4" style={{backgroundColor: 'white', padding: '24px'}}>
                        <LoginForm insertUserInfo={props.insertUserInfo} history={props.history}/>
                    </div>
                </div>
            </div> 
        );
    } else {
        return (
            <div className="container">
                <div className="row" style={{paddingTop: '30vh'}}>
                    <div className="col-md-6 offset-md-3" style={{backgroundColor: 'white'}}>
                        <ResultForm name={props.user.name} deleteUserInfo={props.deleteUserInfo} />
                    </div>
                </div>
            </div> 
        );
    }
};

const mapStateToProps = (state) => {
    return {
        jwt: state.user.jwt,
        user: state.user.user
    };
};

export default connect(mapStateToProps, {insertUserInfo, deleteUserInfo})(Login);