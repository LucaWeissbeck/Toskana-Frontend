import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import Context from "./context";
import axios from 'axios';

class App extends Component {

  render() {

    return (
      <Context>
        <AppRoutes />
      </Context>
    );


  }

}

export default withTranslation()(withRouter(App));
