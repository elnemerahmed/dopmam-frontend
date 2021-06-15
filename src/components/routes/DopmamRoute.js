import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ children, jwt, user, path, component }) => {
    let history = useHistory();

    useEffect(() => {
        if(!jwt || !(user.roles.includes('dopmam_medical_lead') || user.roles.includes('dopmam_medical') || user.roles.includes('dopmam_financial_lead') || user.roles.includes('dopmam_financial'))) {
            history.push('/')
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
        user: state.user.user,
        jwt: state.user.jwt
    };
};

export default connect(mapStateToProps)(PrivateRoute);