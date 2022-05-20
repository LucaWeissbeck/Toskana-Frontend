import React, { Suspense, lazy } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Login = lazy(() => import('./user-pages/Login'));


export default function AppRoutes() {

    return (
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" component={() => <Login/>} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}
