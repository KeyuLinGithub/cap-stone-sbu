import React from 'react';
import { Link } from 'react-router-dom';

export class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };
    this.handleLogin=this.handleLogin.bind(this);
    this.editEmail=this.editEmail.bind(this);
    this.editPassword=this.editPassword.bind(this);
  }
  handleLogin(event){
    console.log(this.state.email+' '+this.state.password);
    fetch('http://localhost:8080/RedistrictSystem/login.do',
    		{
        method: 'POST',
        body:{
              email: this.state.email,
              password : this.state.password
              },
        dataType: "text",
    })
    .then(res => console.log(res));
  }
  editEmail(event){
    this.setState({email: event.target.value});
  }
  editPassword(event){
    this.setState({password: event.target.value});
  }
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
              <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" onChange={this.editEmail}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="loginPassword" placeholder="Password" onChange={this.editPassword}/>
            </div>
            <div className="form-group">

              <button type="button" onClick={this.handleLogin} className="btn btn-primary">Login</button>

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
  //<Link to={process.env.PUBLIC_URL +'/'}>
    //</Link>
export default Login;
