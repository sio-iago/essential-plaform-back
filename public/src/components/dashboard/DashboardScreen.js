// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';

// CSS for this screen
import './DashboardScreen.css';

import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Row, Col, Button } from 'react-bootstrap';


class DashboardScreen extends Component {

  render() {
    return (
      <ApplicationScreen {...this.props}>
        <h1>Hello, {this.props.username}</h1>
        <Link to={'/'}
                className="btn btn-md btn-info">
          Logout
        </Link>
      </ApplicationScreen>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(DashboardScreen);
