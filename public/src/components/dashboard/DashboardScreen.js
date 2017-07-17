// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';


// CSS for this screen
import './DashboardScreen.css';

import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Row, Col, Button } from 'react-bootstrap';

// API Methods
const api = require('../../api/mock-api');

// The store and reducer
const store = require('../../store/storeConfig').store;


// Authorization verification
const isUserAuthorized = (token, history) => {
  const apiResponse = api.validateUser();
  
  if(apiResponse.error || apiResponse.token !== token) {
    history.push('/');
  }
}


class DashboardScreen extends Component {

  componentWillMount() {
    isUserAuthorized(this.props.token, this.props.history);
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, {this.props.username}</h1>
        <Link to={'/'}
							  className="btn btn-md btn-info">
          Logout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(DashboardScreen);
