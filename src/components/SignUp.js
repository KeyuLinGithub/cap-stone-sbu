import React from 'react';
import { Link } from 'react-router-dom';

export class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
    this.editFName=this.editFName.bind(this);
    this.editLName=this.editLName.bind(this);
    this.editEmail=this.editEmail.bind(this);
    this.editPassword=this.editPassword.bind(this);
    this.checkPassword=this.checkPassword.bind(this);
    this.signUp=this.signUp.bind(this);
  }

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
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter first name" onChange={this.editFName}/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter Last name" onChange={this.editLName}/>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" onChange={this.editEmail}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" onChange={this.editPassword}/>
            </div>
            <div className="form-group">
              <label>Confirm the Password</label>
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" onChange={this.checkPassword}/>
            </div>
            <div className="form-group">
              <button type="button" class="btn btn-primary" onClick={this.signUp}>Sign up</button>
            </div>
            <div className="form-group">


            </div>

          </form>
        </div>
      </div>
    )
  }
};

export default SignUp;
<Link to={process.env.PUBLIC_URL +'/'}></Link>
