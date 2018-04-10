import React from 'react';
import { Link } from 'react-router-dom';

export class User extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: "",
      password:'',
      showInvalid: false
    };
    this.handleLogout=this.handleLogout.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.editEmail=this.editEmail.bind(this);
    this.editPassword=this.editPassword.bind(this);
  }
  handleLogin(event){
    // this.setState({
    //   login:true,
    // });
    console.log(this.state.username+' '+this.state.password);

    fetch("http://localhost:8080/RedistrictSystem/login.do", {
  	  method: "POST",
  	  credentials: 'include',//open sending cookie(default doesnt send cookie)
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body: "email="+this.state.username+
  	  		"&wocao="+this.state.username+
  	  		"&password="+this.state.password+
  	  		""
  	})
    .then(response => response.json())
    .then(data => {
      if(data=='1'){
        this.setState({
          login:true,
          showInvalid:false
        });
      }else{
        this.setState({
          showInvalid:true,
        });
      }
    });
//   .then(function(res) {
// //		console.log(res.params.email)
// 		console.log(res.json())
// 	  if (res.ok) {
// 	    alert("Perfect! Your settings are saved.");
// 	  } else if (res.status == 404) {
// 	    alert("Oops! You are not authorized.");
// 	  }
// 	}, function(e) {
// 	  alert("Error submitting form!");
// 	});
  }
  handleLogout(){
    this.setState({login:false});
  }
  editEmail(event){
    this.setState({username: event.target.value});
  }
  editPassword(event){
    this.setState({password: event.target.value});
  }
  render(){
    if(this.state.login==true){
      return(
        <div>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.username} <span className="glyphicon glyphicon-menu-down"></span>
              </a>
              <ul className="dropdown-menu " aria-labelledby="navbarDropdown" style={{width:"100px"}}>
              <li><a className="dropdown-item" >Settings</a></li>
              <li><a className="dropdown-item" onClick={this.handleLogout}>Logout</a></li>
              </ul>
            </li>

          </ul>
        </div>
      )
    }else{
      return(
        <div>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login <span className="glyphicon glyphicon-menu-down"></span>
              </a>
              <div className="dropdown-menu " aria-labelledby="navbarDropdown" style={{width:"200px"}}>
                <div className="col-sm-offset-1">
                <form>
                  <h4>Login</h4>
                  <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" id="loginName" placeholder="Username" onChange={this.editEmail} style={{width:"150px"}}/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" onChange={this.editPassword} style={{width:"150px"}}/>
                  </div>
                  <div className="form-group">
                    {this.state.showInvalid && <p className="text-danger">Invalid UserName or Password</p>}
                    <button type="button" onClick={this.handleLogin} className="btn btn-primary">Login</button>
                  </div>
                </form>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link to={process.env.PUBLIC_URL +'/SignUp'}> SignUp <span className="glyphicon glyphicon-log-in">  </span></Link>
            </li>
          </ul>
        </div>
      )
    }

  }
};

export default User;
