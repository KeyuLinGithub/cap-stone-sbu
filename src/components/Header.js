import React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => {
    return(
      <nav>
        <ul>
          <li><Link to={"/"}>General</Link></li>
          <li><Link to={"/Maps"}>Maps</Link></li>
          <li><Link to={"/AboutUs"}>AboutUs</Link></li>
          <li><Link to={"/Login"}>Login</Link></li>
        </ul>
      </nav>
    );
};

export default Header;
