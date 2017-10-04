import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Application Components
import AuthenticationScreen from './components/authentication/AuthenticationScreen';
import RegistrationScreen from './components/authentication/RegistrationScreen';
import NewJobScreen from './components/jobs/NewJobScreen';
import JobsScreen from './components/jobs/JobsScreen';
import JobDetailsScreen from './components/jobs/JobDetailsScreen';

const store = require('./store/storeConfig').store;
window.store = store;

ReactDOM.render(
	<Provider store={store}>
    <Router>
      <div>
        {/* Authorization Routes */}
        <Route path="/" exact={true} component={AuthenticationScreen} />
        <Route path="/register" exact={true} component={RegistrationScreen} />

        {/* Application Routes */}
        <Route path="/dashboard" exact={true} component={JobsScreen} />
        <Route path="/jobs/new" exact={true} component={NewJobScreen} />
        <Route path="/job/:id" component={JobDetailsScreen} />
      </div>
    </Router>
  </Provider>,

	document.getElementById('root')
);
