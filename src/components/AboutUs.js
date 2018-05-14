import React from 'react';
import { Link } from 'react-router-dom';
import cheers from  '../img/cheers.png';
class AboutUs extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>About Us</h1>
        </div>
        <div className="card">
          <h3 className="card-header">This project: </h3>
          <div className="card-block">
            <p className="card-text">
              This is the Cap Stone project for CSE 308 at Stony Brook University.
            </p>
          </div>
          <hr />
        </div>
        <div className="card">
          <h3 className="card-header">The team 	Titans: </h3>
          <div className="card-block">
            <ul>
              <li>Keyu Lin</li>
              <li>Yushan Zhou</li>
              <li>Xin Yu</li>
              <li>Huahai Liang</li>
            </ul>
          </div>
          <hr />
        </div>
        <div className="card ">
          <h3 className="card-header">Resources: </h3>
          <div className="card-block">
            <div className="container">
                <ul>
                  <li>Libraries:
                  <ul>
                    <li><a href="https://github.com/jdiemke/delaunay-triangulator">delaunay-triangulator</a></li>
                    <li><a href="https://sourceforge.net/projects/jts-topo-suite/">jts-topp-suite</a></li>
                  </ul>
                  </li>
                  <li>Relative Readings:
                  <ul>
                    <li><a href="https://gking.harvard.edu/files/gking/files/compact.pdf">Article 1</a></li>
                    <li><a href="https://www.washingtonpost.com/graphics/2017/politics/courts-law/gerrymander/?utm_term=.5daf3dce66f8">Article 2</a></li>
                    <li><a href="https://www.washingtonpost.com/news/wonk/wp/2016/06/09/how-a-widespread-practice-to-politically-empower-african-americans-might-actually-harm-them/?noredirect=on&utm_term=.755ddbe520dc">Article 3</a></li>
                  </ul>
                  </li>

                </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="card ">
          <h3 className="card-header">Frist success with 100% compactness:</h3>
          <div className="card-block">
            <div className="container">
              <img
               src={cheers}
               className="img-responsive"
               alt="First Sucess"
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }
};

export default AboutUs;
