import React, {Suspense, lazy, useContext, useEffect} from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import { myContext } from "./context";

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Homepage = lazy(() => import('./user-pages/Homepage'));


const Login = lazy(() => import('./user-pages/Login'));
// const Register1 = lazy(() => import('./user-pages/Register'));


export default function AppRoutes(){
  const ctx = useContext(myContext);


  return(
      <Suspense fallback={<Spinner/>}>
          <BrowserRouter>
              <Switch>
                     <Route exact path="/login" component={Login} />
                     {ctx ? (<Route exact path="/dashboard" component={Dashboard} />) : null}
              </Switch>
          </BrowserRouter>
      </Suspense>
  );
}
