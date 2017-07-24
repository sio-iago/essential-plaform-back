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



const onFormSubmit = (evt) => {
  evt.preventDefault();
  
  const form = document.getElementById('newjob');
  const formData = new FormData(form);
  
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => (req.status === 200 ? console.log('WORKS!') : console.log('=/'));
  req.open('post', form.action, true);
  req.send(formData);

  /*
  # Uploading on server side:
  
  var multer  = require('multer');
  var upload = multer({ dest: 'public/tmp' });

  router.post('/upload', upload.single('fastaFile'), function(req, res, next) {
    console.log(req.file)
  });
  
  */

};

class NewJobScreen extends Component {

  render() {
    return (
      <ApplicationScreen {...this.props}>
        <h1>Create a new Job</h1>

        <hr/>

        <form id="newjob"
              action="http://localhost:10000/upload"
              method="POST"
              enctype="application/x-www-form-urlencoded"
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
