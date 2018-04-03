import React from 'react';
import { Link } from 'react-router-dom';
export class AboutUs extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>About Us</h1>
        </div>
        <div className="card">
          <h3 className="card-header">This project: </h3>
          <div className="card-block">
            <p className="card-text">This is the Cap Stone project for CSE 308 at Stony Brook University.</p>
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
          <h3 className="card-header">Give us feedback: </h3>
          <div className="card-block">
            <div className="container">
              <div className="col-lg-4 col-lg-offset-1">
                <form>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="example@gmail.com" />
                  </div>
                  <div className="form-group">
                    <label>Feedback:</label>
                    <input type="textarea" className="form-control" id="feedback" style={{ height: 150, width: 400 }}/>
                  </div>
                  <div className="form-group">
                    <Link to={process.env.PUBLIC_URL +'/'}><button type="button" className="btn btn-primary">Submit</button></Link>
                  </div>

                </form>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }
};

export default AboutUs;
