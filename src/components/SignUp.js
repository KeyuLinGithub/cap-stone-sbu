import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
  render(){
    return(
      <div class="container">
        <div class="page-header">
          <h1>Sign Up</h1>
        </div>
        <div class="container col-sm-4">
          <form>
            <div class="form-group">
              <label>First Name</label>
              <input type="text" class="form-control" id="loginEmail" placeholder="Enter first name" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control" id="loginEmail" placeholder="Enter Last name" />
            </div>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" class="form-control" id="loginEmail" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="text" class="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <div class="form-group">
              <Link to={process.env.PUBLIC_URL +'/Login'}><button type="button" class="btn btn-primary">Sign up</button></Link>
            </div>
            <div class="form-group">


            </div>

          </form>
        </div>
      </div>
    )
  }
};

export default Login;
