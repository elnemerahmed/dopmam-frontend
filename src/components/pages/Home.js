import React, {useRef} from 'react'
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';

const { Content } = Layout;
const { Header } = Layout;

const Home = ({history, jwt, organization}) => {

    const aboutRef = useRef();
    const teamRef = useRef();
    const contactRef = useRef();

    return (
        <Layout>
            <Header>
                <div className="logo">Dopmam</div>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" onClick={() => {
                        aboutRef.current.scrollIntoView();
                    }}>About</Menu.Item>
                    <Menu.Item key="2" onClick={() => {
                        teamRef.current.scrollIntoView();
                    }}>Meet the team</Menu.Item>
                    <Menu.Item key="3" onClick={() => {
                        contactRef.current.scrollIntoView();
                    }}>Contact Us</Menu.Item>
                    <Menu.Item className="user-menu" key="4" onClick={() => {
                        history.push(jwt ? `/${ organization === 'dopmam' ? 'dopmam' : 'user' }/reports` : '/login');
                    }}>
                        { jwt ? 'View Reports' : 'Login'}
                    </Menu.Item>
                </Menu>

            </Header>
            <Layout>     
                <Content>
                    <div className="container white my-5">
                        <div className="row">
                            <div className="has-padding">
                                <span>Hero section</span>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '500px'}}></div>
                    <div className="container white my-5">
                        <div className="row">
                            <div ref={aboutRef} className="has-padding">
                                <span>About</span>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '500px'}}></div>
                    <div className="container white my-5">
                        <div className="row">
                            <div ref={teamRef} className="has-padding">
                                <span>Meet the team</span>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '500px'}}></div>
                    <div className="container white my-5">
                        <div className="row">
                            <div ref={contactRef} className="has-padding">
                                <span>Contact Us</span>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
};


const mapStateToProps = (state) => {
    return {
        jwt: state.user.jwt,
        organization: state.user.user.organization
    };
};

export default connect(mapStateToProps)(Home);