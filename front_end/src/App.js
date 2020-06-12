import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { authenticationService } from './authentication.service';
// route
import { PrivateRoute } from './privateRoute';
import HomePage from './homepage';
import LoginPage from './login';
import RegistrationPage from './registration';

const history = createBrowserHistory();

function App(props) {
   const [currentUser, setCurrentUser] = useState(null);

   // Similar to componentDidMount:
   useEffect(() => {
      // Update the current user
      setCurrentUser(authenticationService.currentUser);
      console.log(authenticationService.currentUser);
      // authenticationService.currentUser.subscribe((x) => setCurrentUser(x));
   }, []);

   const logout = () => {
      authenticationService.logout();
      history.push('/login');
      window.location.reload(false);
   };

   return (
      <Router history={history}>
         <div>
            {currentUser && (
               <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <div className="navbar-nav">
                     <Link to="/" className="nav-item nav-link">
                        Home
                     </Link>
                     <button onClick={() => logout()} className="nav-item nav-link">
                        Logout
                     </button>
                  </div>
               </nav>
            )}
            <div className="jumbotron">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6 offset-md-3">
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} {...props} />
                        <Route path="/registration" component={RegistrationPage} {...props} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Router>
   );
}

export default App;
