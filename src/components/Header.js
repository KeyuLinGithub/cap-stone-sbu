import React from 'react';
import { Link } from 'react-router-dom';


export const Header = (props) => {
    return(

        <nav class="navbar navbar-inverse bg-inverse navbar-default navbar-static-top">
          <div class="container ">
          <div class="containercontainer-fluid">
            <div class="navbar-header mr-5">
              <a class="navbar-brand text-white" href="/">Congressional Redistrict Generation</a>
            </div>
            <ul class="nav navbar-nav">
              <li ><Link to={"/"}>General</Link></li>
              <li ><Link to={"/Maps"}>Maps</Link></li>
              <li ><Link to={"/AboutUs"}>About Us</Link></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li ><Link to={"/Login"}> Login <span class="glyphicon glyphicon-log-in">  </span></Link></li>
            </ul>
          </div>
          </div>
        </nav>

    );
};

export default Header;
