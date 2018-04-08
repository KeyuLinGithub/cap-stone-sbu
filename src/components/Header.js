import React from 'react';
import User from './User';
import { Link } from 'react-router-dom';


export const Header = (props) => {
    return(

        <nav className="navbar navbar-inverse bg-inverse navbar-default navbar-static-top">
          <div className="container ">
          <div className="containercontainer-fluid">
            <div className="navbar-header mr-5">
              <Link className="navbar-brand text-white" to={process.env.PUBLIC_URL +'/'}>Congressional Redistrict Generation</Link>
            </div>
            <ul className="nav navbar-nav">
              <li ><Link to={process.env.PUBLIC_URL +'/'}>General</Link></li>
              <li ><Link to={process.env.PUBLIC_URL +'/Maps'}>Maps</Link></li>
              <li ><Link to={process.env.PUBLIC_URL +'/AboutUs'}>About Us</Link></li>

            </ul>
            <User />
          </div>
          </div>
        </nav>

    );
};
//<li ><Link to={process.env.PUBLIC_URL +'/Login'}> Login <span className="glyphicon glyphicon-log-in">  </span></Link></li>
export default Header;
