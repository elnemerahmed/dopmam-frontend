import { useEffect } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ children, jwt, path, component }) => {
    let history = useHistory();

    useEffect(() => {
        if(!jwt) {
            history.push('/login')
        }
    }, []);

    return (
        <Route exact path={path} component={jwt ? component : ''}>
            { children }
        </Route>
    )
};

const mapStateToProps = (state) => {
    return {
        jwt: state.user.jwt
    };
};

export default connect(mapStateToProps)(PrivateRoute);