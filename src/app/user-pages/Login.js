import React, { Component } from 'react';
import LoginButton from '../authentication/LoginButton';

const backgroundImage2 = require("../../assets/images/background2.png");

export class Login extends Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${backgroundImage2})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", width: "100vw", height: "100vh" }}>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <h1>Toskana</h1>
                </div>
                <h4>Smart Home Applikation</h4>
                <h6 className="font-weight-light">Bitte einloggen um fortzufahren!</h6>
                <LoginButton />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
