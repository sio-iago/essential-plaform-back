// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';


import { Link } from 'react-router-dom';

// Bootstrap Classes
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

// API Methods
const api = require('../../api/mock-api');

// Actions
const onFormSubmit = (evt) => {
  evt.preventDefault();
  
  const formData = new FormData(evt.target);
  api.uploadFastaFile(formData);
};

class NewJobScreen extends Component {

  render() {
    return (
      <ApplicationScreen {...this.props}>
        <h1>Create a new Job</h1>

        <hr/>

        <form encType="application/x-www-form-urlencoded"
              onSubmit={onFormSubmit}>
          <FormGroup>
            <ControlLabel>Upload your file</ControlLabel>
            <input className="form-control"
                    type="file"
                    name="fastaFile" />
          </FormGroup>
          <FormGroup>
            <input type="submit"
                    value="Start Job"
                    className="btn btn-md btn-success" />
          </FormGroup>
        </form>
        
      </ApplicationScreen>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(NewJobScreen);
