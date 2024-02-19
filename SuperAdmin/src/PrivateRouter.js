import React from "react";
import { Redirect, Route } from 'react-router-dom';

export const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('token') && localStorage.getItem('token') !== ""
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)