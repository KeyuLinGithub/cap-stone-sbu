import React from 'react';
import { Link } from 'react-router-dom';

class NewUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fName:'',
      lName:'',
      email:'',
      password:'',
      party: 'REPUBLICAN',
      incorrectPassword: false,
      invalidFName:false,
      invalidLName:false,
      invalidEmail:false,
      showValidEmailMessage:false,
      oldEmail:false,
      invalidPassword:false,
      submissionError:false
    };
    this.handleInput=this.handleInput.bind(this);
    this.handleEmailInput=this.handleEmailInput.bind(this);
    this.signUp=this.signUp.bind(this);
    this.checkPassword=this.checkPassword.bind(this);
  }
  handleInput (event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({[name]: value});
  }
  handleEmailInput (event) {
    var value = event.target.value;
    this.setState({email: value});
    fetch("http://localhost:8080/RedistrictSystem/validateEmail.do", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
          "email="+value
    })
    .then(response => response.json())
    .then(data => {
      if(data==true){
        this.setState({
          oldEmail: false,
          showValidEmailMessage:true
        });
      }else{
        this.setState({
          oldEmail: true,
          showValidEmailMessage:false
        });
      }
    });
  }
  checkPassword(event){
    if(event.target.value.length!=0 &&
       event.target.value!=this.state.password){
      this.setState({incorrectPassword:true});
    }else{
      this.setState({incorrectPassword:false});
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

    if(this.state.invalidFName==true ||
      this.state.invalidLName==true ||
      this.state.invalidEmail==true ||
      this.state.invalidPassword==true ||
      this.state.incorrectPassword==true||
      this.state.oldEmail==true){
      return false;
    }
    return true;
  }
  signUp(){
    console.log(this.state);
    if(this.checkAllFields()==true){
      fetch("http://localhost:8080/RedistrictSystem/register.do", {
    	  method: "POST",
    	  credentials: 'include',
    	  headers: {
    	    "Content-Type": "application/x-www-form-urlencoded"
    	  },
    	  body:  "firstName="+this.state.fName+
              "&lastName="+this.state.lName+
              "&party="+this.state.preferParty+
            "&email="+this.state.email+
    	  		"&password="+this.state.password
    	})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.history.push(process.env.PUBLIC_URL +'/');
      });
    }else{
      this.setState({submissionError:true});
    }
  }
  render(){
    return(
      <div className="container">
        <div className="container col-sm-4">
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input type="text"
               className="form-control"
               name="fName"
               placeholder="Enter first name"
               onBlur={this.handleInput}
              />
              {this.state.invalidFName && <p className="text-danger">Please enter a valid first name</p>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
               type="text"
               className="form-control"
               name="lName"
               placeholder="Enter Last name"
               onBlur={this.handleInput}
              />
              {this.state.invalidLName && <p className="text-danger">Please enter a valid last name</p>}
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
               type="email"
               className="form-control form-control-success"
               name="email"
               placeholder="Enter email"
               onBlur={this.handleEmailInput}
              />
              {this.state.showValidEmailMessage && <p className="text-success">Valid Email address <i className="fas fa-check"></i></p>}
              {this.state.invalidEmail && <p className="text-danger">The field is empty</p>}
              {this.state.oldEmail && <p className="text-danger">The email address alrealy registerd</p>}
            </div>
            <div className="form-group">
              <label>Preferred Party</label><br />
              <select id="PreferredParty"
               name='party'
               onChange={this.handleInput}
              >
                <option value="REPUBLICAN">REPUBLICAN</option>
                <option value="DEMOCRATIC">DEMOCRATIC</option>
                <option value="OTHERS">OTHERS</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
               type="text"
               className="form-control"
               name="password"
               placeholder="Password"
               onBlur={this.handleInput}
              />
              {this.state.invalidPassword && <p className="text-danger">The field is empty</p>}
            </div>
            <div className="form-group">
              <label>Confirm the Password</label>
              <input
               type="text"
               className="form-control"
               name="confirmPassword"
               placeholder="Password"
               onChange={this.checkPassword}
              />
              {this.state.incorrectPassword && <p className="text-danger">The Passwords do not match</p>}
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.signUp} >
                Add New User
              </button>
              {this.state.submissionError && <p className="text-danger">Woops, Something is wrong!</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default NewUser;
