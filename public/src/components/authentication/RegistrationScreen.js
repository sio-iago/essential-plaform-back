// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

// CSS for this screen
import './AuthenticationScreen.css';

// Bootstrap Classes
import { Row, Col, Button, Alert } from 'react-bootstrap';

// Reducer Actions
import { USER_ACTIONS } from '../../reducers/userReducer';

// API Methods
const api = require('../../api/endpoints');

// The store and reducer
const store = require('../../store/storeConfig').store;

// Change handling
const handleEmailChange = (evt) =>
  store.dispatch({type: USER_ACTIONS.UPDATE_EMAIL, value: evt.target.value});

const handleUsernameChange = (evt) =>
  store.dispatch({type: USER_ACTIONS.UPDATE_USERNAME, value: evt.target.value});

const handlePasswordChange = (evt) =>
  store.dispatch({type: USER_ACTIONS.UPDATE_PASSWORD, value: evt.target.value});

// Form Submission
const handleFormSubmit = (evt, history) => {
  evt.preventDefault();

  api
    .register()
    .then(user => {
      store.dispatch({type: USER_ACTIONS.LOGIN_USER, value: user.body.token });
      history.push('/dashboard');
    })
    .catch(error => {
      store.dispatch({
        type: USER_ACTIONS.USER_ERROR
      });
    });
}

class RegistrationScreen extends Component {

  renderError = () => {
    return (
      this.props.error ?
      <Alert bsStyle="danger">{this.props.error}</Alert> :
      null
    );
  }

  render() {
    return (
      <div className="container">
        
        <Row>
          <Col xs={8} xsOffset={2} sm={6} smOffset={3} md={4} mdOffset={4}>
            <h2 style={ {textAlign:'center', paddingTop: 30, paddingBottom: 20} }>Essential Proteins</h2>

            {this.renderError()}

            <form onSubmit={evt => handleFormSubmit(evt, this.props.history)}>
              <div className="form-group">
                <label>Email</label>
                <input className="form-control"
                       type="text"
                       value={this.props.email || ''}
                       onChange={handleEmailChange} />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input className="form-control"
                       type="text"
                       value={this.props.username || ''}
                       onChange={handleUsernameChange} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input className="form-control"
                       type="password"
                       value={this.props.password || ''}
                       onChange={handlePasswordChange} />
              </div>
              
              <div className="form-group">
                <Button bsStyle="success" className="form-control" type="submit">Register</Button>
              </div>
              
            </form>

            <p style={ {textAlign:'center'} }>Or</p>

            <div className="form-group">
              <Link to={'/'} className="btn btn-info form-control">Login</Link>
            </div>

          </Col>     
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    password: state.userReducer.password,
    email: state.userReducer.email,
    token: state.userReducer.token,
    error: state.userReducer.error,
});

export default connect(mapStateToProps, null)(RegistrationScreen);
