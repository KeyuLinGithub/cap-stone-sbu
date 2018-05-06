import React from 'react';
import User from './User';
import { Link } from 'react-router-dom';

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userRole:'GUEST'
    };
    this.setUserRole=this.setUserRole.bind(this);
  }
  setUserRole(role){
    this.setState({userRole:role});
  }
  render(){
    return(
      <nav className="navbar navbar-inverse bg-inverse navbar-default navbar-static-top">
        <div className="container-fluid ">
        <div className="containercontainer-fluid">
          <div className="navbar-header mr-5">
            <Link className="navbar-brand text-white" to={process.env.PUBLIC_URL +'/'}>
              Congressional Redistrict Generation
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li ><Link to={process.env.PUBLIC_URL +'/'}>General</Link></li>
            <li ><Link to={process.env.PUBLIC_URL +'/Maps'}>Maps</Link></li>
            <li ><Link to={process.env.PUBLIC_URL +'/AboutUs'}>About Us</Link></li>
            {
              this.state.userRole==='ADMIN' &&
              <li ><Link to={process.env.PUBLIC_URL +'/Admin'}>Admin</Link></li>
            }

          </ul>
          <User setUserRole={this.setUserRole}/>
        </div>
        </div>
      </nav>
    )
  }
};

export default Header;
