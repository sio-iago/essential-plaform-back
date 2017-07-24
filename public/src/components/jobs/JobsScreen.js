// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';


import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Row, Col, Button } from 'react-bootstrap';

// Data table
import { DataTable } from 'react-data-components';

// Reducers
import { JOB_ACTIONS } from './../../reducers/jobsReducer';

// API Methods
const api = require('../../api/mock-api');


class JobsScreen extends Component {

  constructor(props) {
    super(props);

    props.dispatch({
      type: JOB_ACTIONS.JOBS_LOADED,
      value: api.getJobs(),
    });
  }

  render() {
    
    return (
      <ApplicationScreen {...this.props}>
        <h1>My Jobs</h1>
        <hr />
        <DataTable keys="label"
                   columns={[
                     {title: 'Label', prop: 'label'},
                     {title: 'Date', prop: 'date'},
                     {title: 'status', prop: 'status'},
                   ]}
                   initialData={this.props.jobs}
                   initialPageLength={10}
                   initialSortBy={{prop: 'date', order: 'descending'}} />
      </ApplicationScreen>
    );
    
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
    jobs: state.jobsReducer.jobs,
});

export default connect(mapStateToProps, null)(JobsScreen);
