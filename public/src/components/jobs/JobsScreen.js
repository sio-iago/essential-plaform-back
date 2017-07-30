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
const api = require('../../api/endpoints');


class JobsScreen extends Component {

  constructor(props) {
    super(props);

    this.loadAllJobs();
  }

  loadAllJobs = () => {
    api
      .getJobs()
      .then(result => {
        this.props.dispatch({
          type: JOB_ACTIONS.JOBS_LOADED,
          value: result.body,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    
    return (
      <ApplicationScreen {...this.props}>
        <h1>My Jobs</h1>
        <hr />
        <DataTable keys="label"
                   columns={[
                     {title: 'Identifier', prop: 'id'},
                     {title: 'Date Requested', prop: 'createdAt'},
                     {title: 'Status', prop: 'status'},
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
