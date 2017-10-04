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
            <Navbar.Form pullRight>
              <FormGroup>
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