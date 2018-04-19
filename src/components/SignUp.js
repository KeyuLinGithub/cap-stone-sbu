import React from 'react';
import { Link } from 'react-router-dom';

export class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fName:'',
      invalidFName:false,
      lName:'',
      invalidLName:false,
      email:'',
      invalidEmail:false,
      password:'',
      invalidPassword:false,
      allValid:false,
    };
    this.editFName=this.editFName.bind(this);
    this.editLName=this.editLName.bind(this);
    this.editEmail=this.editEmail.bind(this);
    this.checkEmail=this.checkEmail.bind(this);
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
  checkEmail(){
    fetch("http://localhost:8080/RedistrictSystem/checkEmail.do", {
  	  method: "POST",
  	  credentials: 'include',//open sending cookie(default doesnt send cookie)
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body:
          "email="+this.state.email

  	})
    .then(response => response.json())
    .then(data => {
      if(data==1){
        this.setState({invalidEmail: false});
      }else{
        this.setState({invalidEmail: true});
      }
    });
  }
  editPassword(event){
    this.setState({password: event.target.value});
  }
  checkPassword(event){
    if(event.target.value.length!=0 && event.target.value!=this.state.password){
      this.setState({invalidPassword:true});
    }else{
      this.setState({invalidPassword:false});
    }
  }
  checkAllFields(){
    if(this.state.fName.length==0){
      this.setState({invalidFName:true});
    }
    if(this.state.lName.length==0){
      this.setState({invalidLName:true});
    }
    if(this.state.email.length==0){
      this.setState({invalidEmail:true});
    }
    if(this.state.password.length==0){
      this.setState({invalidPassword:true});
    }
    if(this.state.invalidFName==false ||
      this.state.invalidLName==false ||
      this.state.invalidEmail==false ||
      this.state.invalidPassword==false){
      return false;
    }
    this.setState({allValid:true});
    return true;

  }
  signUp(){
    if(!this.checkAllFields()){
      return;
    }
    fetch("http://localhost:8080/RedistrictSystem/signup.do", {
  	  method: "POST",
  	  credentials: 'include',//open sending cookie(default doesnt send cookie)
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body:  "fName="+this.state.fName+
            "&lName="+this.state.lName+
          "&email="+this.state.email+
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
              {this.state.invalidFName && <p className="text-danger">Please enter a valid first name</p>}

            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" id="loginEmail" placeholder="Enter Last name" onChange={this.editLName}/>
              {this.state.invalidLName && <p className="text-danger">Please enter a valid last name</p>}

            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" onChange={this.editEmail} onBlur={this.checkEmail}/>
              {this.state.invalidEmail && <p className="text-danger">The field is empty/The email address alrealy registerd</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" onChange={this.editPassword}/>
            </div>
            <div className="form-group">
              <label>Confirm the Password</label>
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" onChange={this.checkPassword}/>
              {this.state.invalidPassword && <p className="text-danger">The Password do not match</p>}
            </div>
            <div className="form-group">
              {!this.state.allValid && <button type="button" class="btn btn-primary" onClick={this.signUp}>Sign up</button>}
              {this.state.allValid && <Link to={process.env.PUBLIC_URL +'/'}><button type="button" class="btn btn-primary" onClick={this.signUp} >Sign up</button></Link>}

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
//
