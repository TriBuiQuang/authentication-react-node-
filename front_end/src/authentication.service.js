const currentUserSubject = JSON.parse(localStorage.getItem('currentUser'));
const apiUrl = 'http://localhost:3000';
export const authenticationService = {
   login,
   registration,
   logout,
   currentUser: currentUserSubject,
   get currentUserValue() {
      return currentUserSubject;
   },
};
const requestOptions = (username, password) => {
   return { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) };
};

async function login(username, password) {
   const response = await fetch(`${apiUrl}/login`, requestOptions(username, password));
   const user = await handleResponse(response);
   if (response.status === 200) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { user, status: response.status };
   }
   return user;
}

async function registration(username, password) {
   const response = await fetch(`${apiUrl}/registration`, requestOptions(username, password));
   const user = await handleResponse(response);
   if (response.status === 200) return { user, status: response.status };
   return user;
}

function logout() {
   // remove user from local storage to log user out
   localStorage.removeItem('currentUser');
}

export function handleResponse(response) {
   return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
         if ([401, 403].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authenticationService.logout();
         }

         const error = (data && data.message) || response.statusText;
         return { status: response.status, message: error };
      }

      return data;
   });
}
