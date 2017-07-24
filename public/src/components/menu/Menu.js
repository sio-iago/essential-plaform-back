// React
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Classes
import { Navbar, Nav, NavItem, FormGroup } from 'react-bootstrap';

// Styling
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={this.props.dashboardLink}>Essential</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <NavItem eventKey={1}>
                <Link to={this.props.dashboardLink}>Dashboard</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to={this.props.listJobsLink}>My Jobs</Link>
              </NavItem>
            </Nav>
          
            <Navbar.Form pullRight>
              <FormGroup>
                <Link className="btn btn-md btn-success" to={this.props.newJobLink}>New Job</Link>
                {' '}
                <Link className="btn btn-md btn-danger" to={this.props.logoutLink}>
                  Logout
                </Link>
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}