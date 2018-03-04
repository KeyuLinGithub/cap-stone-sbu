import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
  render(){
    return(
      <div class="container">
        <div class="page-header">
          <h1>Login</h1>
        </div>
        <div class="container col-sm-4">
          <form>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control" id="loginEmail" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <div class="form-group">
              <Link to={process.env.PUBLIC_URL +'/'}><button type="button" class="btn btn-primary">Login</button></Link>
            </div>
            <div class="form-group">

              Need sign up? <Link to={process.env.PUBLIC_URL +'/SignUp'}><label>Sign up now</label></Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default Login;
