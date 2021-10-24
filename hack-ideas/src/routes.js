import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import CreateChallenge from './pages/dashboard/components/newchallengeview';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';

const RouteWithSubRoutes = (route) => {
    return (<Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
    />)
}

export const RenderRoutes = ({ routes }) => {
    return (<Switch>
        {routes.map((route, i) => <RouteWithSubRoutes {...route} key={i} />)}
        <Route component={() => <h1>Error 404!</h1>} />
    </Switch>)
}

const ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: Login },
    {
        path: '/dashboard', key: 'APP', component:(props)=>{ return !localStorage.getItem('isLoggedin')?<Redirect to={"/"}/>:<RenderRoutes {...props}/>}, routes: [
            { path: '/dashboard/new-challenge', key: 'NEW', exact: true, component: CreateChallenge },
            { path: '/dashboard', key: 'DASH', exact: true, component: Dashboard }
        ]
    },

]

export default ROUTES;

