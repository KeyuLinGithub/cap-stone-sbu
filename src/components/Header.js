import React from 'react';
import { Link } from 'react-router-dom';


export const Header = (props) => {
    return(

        <nav class="navbar navbar-inverse bg-inverse navbar-default navbar-static-top">
          <div class="container ">
          <div class="containercontainer-fluid">
            <div class="navbar-header mr-5">
              <Link class="navbar-brand text-white" to={process.env.PUBLIC_URL +'/'}>Congressional Redistrict Generation</Link>
            </div>
            <ul class="nav navbar-nav">
              <li ><Link to={process.env.PUBLIC_URL +'/'}>General</Link></li>
              <li ><Link to={process.env.PUBLIC_URL +'/Maps'}>Maps</Link></li>
              <li ><Link to={process.env.PUBLIC_URL +'/AboutUs'}>About Us</Link></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li ><Link to={process.env.PUBLIC_URL +'/Login'}> Login <span class="glyphicon glyphicon-log-in">  </span></Link></li>
            </ul>
          </div>
          </div>
        </nav>

    );
};

export default Header;
