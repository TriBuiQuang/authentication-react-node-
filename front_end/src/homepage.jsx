import React, { useState } from 'react';

import { authenticationService } from './authentication.service';

function HomePage() {
   const [currentUser] = useState(authenticationService.currentUserValue);
   return (
      <div>
         <h1>Hi {currentUser.username}!</h1>
         <p>You're logged in with React & JWT!!</p>
         <h3>Users from secure api end point:</h3>
      </div>
   );
}

export default HomePage;
