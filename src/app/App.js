import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import { withTranslation } from "react-i18next";
import { Auth0Provider } from "@auth0/auth0-react";

class App extends Component {

  render() {
    return (
      <Auth0Provider
        domain="dev-m07kca-9.us.auth0.com"
        clientId='Kki1BI6x8GbtrfQ92N3KEuvqZnORAhdG'
        redirectUri={window.location.origin + "/dashboard"} 
      >
        <AppRoutes />
      </Auth0Provider>
    );


  }

}

export default withTranslation()(withRouter(App));
