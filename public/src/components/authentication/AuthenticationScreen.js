// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// CSS for this screen
import './AuthenticationScreen.css';

// Bootstrap Classes
import { Row, Col, Button } from 'react-bootstrap';

// Reducer Actions
import { USER_ACTIONS } from '../../reducers/userReducer';

// API Methods
const api = require('../../api/mock-api');

// The store and reducer
const store = require('../../store/storeConfig').store;

// Change handling
const handleUsernameChange = (evt) =>
  store.dispatch({type: USER_ACTIONS.UPDATE_USERNAME, value: evt.target.value});

const handlePasswordChange = (evt) =>
  store.dispatch({type: USER_ACTIONS.UPDATE_PASSWORD, value: evt.target.value});

// Form Submission
const handleFormSubmit = (evt, history) => {
  evt.preventDefault();

  const user = api.login();
  if(!user.error && user.token) {
    store.dispatch({type: USER_ACTIONS.LOGIN_USER, value: user.token });
    history.push('/dashboard');
  }

}

class AuthenticationScreen extends Component {

  render() {
    return (
      <div className="container">
        <Row>
          <Col xs={8} xsOffset={2} sm={6} smOffset={3} md={4} mdOffset={4}>
            <h2 style={ {textAlign:'center', paddingTop: 30, paddingBottom: 20} }>Essential Proteins</h2>
            
            <form onSubmit={evt => handleFormSubmit(evt, this.props.history)}>

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
                <Button bsStyle="success" className="form-control" type="submit">Login</Button>
              </div>
              
            </form>
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
    
});

export default connect(mapStateToProps, null)(AuthenticationScreen);
