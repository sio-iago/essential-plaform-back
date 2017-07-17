import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Application Components
import AuthenticationScreen from './components/authentication/AuthenticationScreen';
import DashboardScreen from './components/dashboard/DashboardScreen';


const store = require('./store/storeConfig').store;
window.store = store;

ReactDOM.render(
	<Provider store={store}>
    <Router>
      <div>
        {/* Authorization Routes */}
        <Route path="/" exact={true} component={AuthenticationScreen} />

        {/* Application Routes */}
        <Route path="/dashboard" exact={true} component={DashboardScreen} />
      </div>
    </Router>
  </Provider>,

	document.getElementById('root')
);
registerServiceWorker();
