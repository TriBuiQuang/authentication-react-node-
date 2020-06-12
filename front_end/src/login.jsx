import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';

import { authenticationService } from './authentication.service';

function Login(props) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState({});

   useEffect(() => {
      // redirect to home if already logged in
      if (authenticationService.currentUserValue) props.history.push('/');
      return function () {
         //  Add cleanup code here
         setUsername('');
         setPassword('');
         setError({});
      };
   }, [props]);

   const btnLogin = async () => {
      const response = await authenticationService.login(username, password);
      if (response.status === 200) {
         props.history.push('/');
         window.location.reload(false);
      }
      setError(response);
   };

   const btnRegistration = () => {
      props.history.push('/registration');
   };

   const onChange = (e) => {
      e.preventDefault();
      switch (e.target.name) {
         case 'username':
            setUsername(e.target.value);
            break;
         default:
            setPassword(e.target.value);
            break;
      }
   };

   return (
      <Form>
         <h2 className="text-center">Login</h2>
         <FormGroup>
            <Label>Username</Label>

            {error.status !== 200 && error.status !== undefined ? (
               <Input name="username" onChange={(e) => onChange(e)} invalid />
            ) : (
               <Input name="username" onChange={(e) => onChange(e)} />
            )}

            {error.status === 500 || error.status === 401 ? (
               <FormFeedback tooltip> {error.message} </FormFeedback>
            ) : (
               <FormFeedback> {error.message} </FormFeedback>
            )}
         </FormGroup>

         <FormGroup>
            <Label>Password</Label>
            <Input name="password" onChange={(e) => onChange(e)} />
         </FormGroup>

         <Button color="info" onClick={btnLogin} className="col-md-6">
            Login
         </Button>
         <Button onClick={btnRegistration} className="col-md-6">
            Registration
         </Button>
      </Form>
   );
}

export default Login;
