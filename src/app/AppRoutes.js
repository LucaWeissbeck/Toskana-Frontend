import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import { myContext } from "./context";

const Dashboard = lazy(() => import('./dashboard/Dashboard'));


const Login = lazy(() => import('./user-pages/Login'));
// const Register1 = lazy(() => import('./user-pages/Register'));


export default function AppRoutes() {
    const ctx = useContext(myContext);


    return (
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Switch>
                    {ctx ? (<Route path="/dashboard" component={Dashboard} />) : null}
                    <Route path="/" component={() => <Login ctx={ctx} />} />

                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}
