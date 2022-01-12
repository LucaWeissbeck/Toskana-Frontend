import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

const backgroundImage2 = require("../../assets/images/background2.png");

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    if (this.props.ctx) {
      window.location.href = "/dashboard";
    }
  }

  setUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  login() {
    const username = this.state.username;
    const password = this.state.password;
    axios.post("http://localhost:8080/authorize/login", {
      username,
      password
    }, {
      withCredentials: true
    }).then(res => {
      if (res.status === 200) {
        window.location.href = "/dashboard";
      }
    })
  }

  getUser() {
    axios.get("http//localhost:8080/authorize/user", {
      withCredentials: true
    }).then(res => {
      console.log(res.data);
    })
  }

  render() {
    return (
      <div style={{ backgroundImage: `url(${backgroundImage2})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}>
        {console.log(this.ctx)}
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <h1>Toskana</h1>
                </div>
                <h4>Smart Home Applikation</h4>
                <h6 className="font-weight-light">Bitte einloggen um fortzufahren!</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="username" placeholder="Benutzername" size="lg" className="h-auto" onChange={this.setUsername} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Passwort" size="lg" className="h-auto" onChange={this.setPassword} />
                  </Form.Group>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.login}>LOG IN</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
