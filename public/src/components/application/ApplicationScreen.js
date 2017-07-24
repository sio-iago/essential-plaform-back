// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Navbar
import Menu from './../menu/Menu';

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

export default class ApplicationScreen extends Component {
  componentWillMount() {
    isUserAuthorized(this.props.token, this.props.history);
  }

  render() {
    return (
      <div className="dashboard-screen">
        <Menu dashboardLink="/dashboard"
              newJobLink="/jobs/new"
              listJobsLink="/jobs"
              logoutLink="/" />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }  
}