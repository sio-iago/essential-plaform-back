// React
import React, { Component } from 'react';

// Redux actions
import { connect } from 'react-redux';

// Main application class
import ApplicationScreen from './../application/ApplicationScreen';


import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Row, Col, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

// FA Icons
import 'font-awesome/css/font-awesome.min.css';
const FontAwesome = require('react-fontawesome');

// API Methods
const api = require('../../api/endpoints');

// Actions
const onFormSubmit = (evt, history) => {
  evt.preventDefault();
  
  const formData = new FormData(evt.target);
  api.uploadFastaFile(formData);

  history.push('/dashboard');
};

class NewJobScreen extends Component {

  getGoBackButton = () => {
    return (
      <Button bsStyle="default" onClick={ () => this.props.history.goBack() }>
        <FontAwesome name="arrow-left"></FontAwesome> Back
      </Button>
    );
  }

  render() {
    return (
      <ApplicationScreen {...this.props}>
        <h1>Create a new Job</h1>

        <hr/>

        {this.getGoBackButton()}

        <hr />

        <Row>
          <Col xs={12}>
            <form encType="application/x-www-form-urlencoded"
                  onSubmit={(evt) => onFormSubmit(evt,this.props.history)}>
              <FormGroup>
                <FormGroup>
                  <ControlLabel>Select An Organism</ControlLabel>
                  <select name="organism" className="form-control">
                    <option value="degaa-e-scer.fasta">Saccharomyces cerevisiae</option>
                    <option value="degaa-e-dani.fasta">Danio Rerio</option>
                    <option value="degaa-e-eleg.fasta">Caenorhabditis elegans</option>
                  </select>
                </FormGroup>
                <ControlLabel>Upload your file</ControlLabel>
                <input type="file"
                       name="fastaFile" />
              </FormGroup>
              <FormGroup>
                <input type="submit"
                        value="Start Job"
                        className="btn btn-md btn-success" />
              </FormGroup>
            </form>
          </Col>
        </Row>
        
      </ApplicationScreen>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    username: state.userReducer.username,
    token: state.userReducer.token,
});

export default connect(mapStateToProps, null)(NewJobScreen);
