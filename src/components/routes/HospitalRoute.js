import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

const PrivateRoute = ({ children, jwt, user, path, component }) => {
    let history = useHistory();

    useEffect(() => {
        if(!jwt || !(user.roles.includes('doctor') || user.roles.includes('head_department') || user.roles.includes('hospital_manager'))) {
            history.push('/')
        }
    }, []);

    return (
        <Route exact path={path} component={jwt ? component : ''}>
            { children }
        </Route>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        jwt: state.user.jwt
    };
};

export default connect(mapStateToProps)(PrivateRoute);