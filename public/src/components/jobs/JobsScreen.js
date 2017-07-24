// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';


import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Row, Col, Button } from 'react-bootstrap';


// API Methods
const api = require('../../api/mock-api');


class JobsScreen extends Component {

  render() {
    return (
      <ApplicationScreen {...this.props}>
        <h1>My Jobs</h1>
      </ApplicationScreen>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(JobsScreen);
