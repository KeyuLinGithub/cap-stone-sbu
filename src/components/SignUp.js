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
      incorrectPassword: false,
    };
    this.handleInput=this.handleInput.bind(this);
    this.signUp=this.signUp.bind(this);
    this.checkPassword=this.checkPassword.bind(this);
  }
  handleInput (event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({[name]: value});
  }
  checkPassword(event){
    if(event.target.value.length!=0 && event.target.value!=this.state.password){
      this.setState({incorrectPassword:true});
    }else{
      this.setState({incorrectPassword:false});
    }
  }
  signUp(){
    console.log(this.state.fName);
    console.log(this.state.lName);
    console.log(this.state.email);
    console.log(this.state.password);

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
              <input type="text" className="form-control" name="fName" placeholder="Enter first name" onBlur={this.handleInput} required/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" name="lName" placeholder="Enter Last name" onBlur={this.handleInput}/>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" name="email" placeholder="Enter email" onBlur={this.handleInput}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" name="password" placeholder="Password" onBlur={this.handleInput}/>
            </div>
            <div className="form-group">
              <label>Confirm the Password</label>
              <input type="text" className="form-control" name="confirmPassword" placeholder="Password" onChange={this.checkPassword}/>
              {this.state.incorrectPassword && <p className="text-danger">The field is empty/The Password do not match</p>}

            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.signUp} >Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default SignUp;
//<Link to={process.env.PUBLIC_URL +'/'}></Link>
