import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <div className="container col-sm-4">
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <div className="form-group">
              <Link to={process.env.PUBLIC_URL +'/'}><button type="button" className="btn btn-primary">Login</button></Link>
            </div>
            <div className="form-group">

              Need sign up? <Link to={process.env.PUBLIC_URL +'/SignUp'}><label>Sign up now</label></Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default Login;
