import React from 'react';
import { Link } from 'react-router-dom';

export class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fName:'',
      lName:'',
      email:'',
      password:'',
      validPassword:false
    };
    this.editFName=this.editFName.bind(this);
    this.editLName=this.editLName.bind(this);
    this.editEmail=this.editEmail.bind(this);
    this.editPassword=this.editPassword.bind(this);
    this.checkPassword=this.checkPassword.bind(this);
    this.signUp=this.signUp.bind(this);
  }
  editFName(event){
    this.setState({fName: event.target.value});
  }
  editLName(event){
    this.setState({lName: event.target.value});
  }
  editEmail(event){
    this.setState({email: event.target.value});
  }
  editPassword(event){
    this.setState({password: event.target.value});
  }
  checkPassword(event){
    if(event.target.value.length!=0 && event.target.value!=this.state.password){
      this.setState({validPassword:true});
    }else{
      this.setState({validPassword:false});
    }
  }
  signUp(){
    fetch("http://localhost:8080/RedistrictSystem/signup.do", {
  	  method: "POST",
  	  credentials: 'include',//open sending cookie(default doesnt send cookie)
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body:  "fName="+this.state.fName+
            "&lName="+this.state.lName+
          "&email="+this.state.username+
  	  		"&password="+this.state.password
  	})
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
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
              {this.state.validPassword && <p className="text-danger">The Password do not match</p>}
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
//<Link to={process.env.PUBLIC_URL +'/'}></Link>
