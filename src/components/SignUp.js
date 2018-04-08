import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Sign Up</h1>
        </div>
        <div className="container col-sm-4">
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter Last name" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <div className="form-group">
              <Link to={process.env.PUBLIC_URL +'/'}><button type="button" class="btn btn-primary">Sign up</button></Link>
            </div>
            <div className="form-group">


            </div>

          </form>
        </div>
      </div>
    )
  }
};

export default Login;
