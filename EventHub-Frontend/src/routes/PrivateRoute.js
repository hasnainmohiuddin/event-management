import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from '../helpers/authHelpers';
import urls from '../constants/urls';

export default function PrivateRoute({ component: Component, ...restProps }) {
    const currentUser = getUser();

    if (currentUser) return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;

    return <Redirect to={urls.login} />
};
