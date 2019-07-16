import React, { Component } from 'react';
import {
  Button, FormGroup, Input, Form,
} from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import withContext from '../Context/withContext';

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
      errmsg: '',
      redirectadmin: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const { isLog, getUserInfo } = this.props;
    axios.get(`http://134.209.194.234/api/users?username=${username}`).then((res) => {
      if (
        res.data['hydra:totalItems'] !== 0
        && res.data['hydra:member'][0].username === username
        && res.data['hydra:member'][0].password === password
      ) {
        isLog();
        getUserInfo(res.data['hydra:member'][0]);
        if (
          res.data['hydra:member'][0].role === 'admin'
        ) {
          this.setState({ redirectadmin: true });
        } else {
          this.setState({ redirect: true });
        }
      } else {
        this.setState({ errmsg: 'Username or password invalid' });
      }
    });
  };

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  };

  render() {
    const {
      username, password, redirect, errmsg, redirectadmin,
    } = this.state;
    if (redirectadmin) return <Redirect to="/admin" />;
    if (redirect) return <Redirect to="/map" />;
    return (
      <div className="wholeform">
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlid="username">
            <Input
              name="username"
              autoFocus
              type="username"
              className="inputLogin"
              checked={username}
              onChange={this.handleInputChange}
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup controlid="password">
            <Input
              name="password"
              className="inputLogin"
              checked={password}
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
              value="Submit"
              className="HappyButton"
            >
              Login
            </Button>
          </FormGroup>
          <FormGroup>
            <Button
              block
              type="submit"
              value="Submit"
              className="HappyButton"
            >
              <Link type="submit" value="Submit" className="HappyButton" to="/inscription">Register</Link>
            </Button>
            <div className="errmsg">{errmsg}</div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withContext(Connexion);
