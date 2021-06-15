import { Layout, Menu } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { deleteUserInfo } from '../../actions/user';

const { Header } = Layout;
const { SubMenu } = Menu;

const HeaderComponent = ({user, roles, deleteUserInfo}) => {
    let history = useHistory();
    
    return (
        <Header>
            <div className="logo" onClick={() => {
                history.push('/');
            }}>Dopmam</div>
            <Menu theme="dark" mode="horizontal">
                { roles.includes('doctor') && <Menu.Item key="1" onClick={() => { history.push('/user/reports/new'); }}>New Report</Menu.Item> }
                <Menu.Item key="2"onClick={() => { history.push(`/${ user.organization === 'dopmam' ? 'dopmam' : 'user' }/reports`); }}>Archive</Menu.Item>
                <SubMenu className="user-menu" key="user" title={ user.name } onClick={() => { deleteUserInfo(); history.push('/'); }}>
                    <Menu.Item key="3">Logout</Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        roles: state.user.user.roles
    };
};

export default connect(mapStateToProps, {deleteUserInfo})(HeaderComponent);