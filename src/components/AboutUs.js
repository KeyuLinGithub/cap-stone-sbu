import React from 'react';
import { Link } from 'react-router-dom';
export class AboutUs extends React.Component{
  render(){
    return(
      <div class="container">
        <div class="page-header">
          <h1>About Us</h1>
        </div>
        <div class="card">
          <h3 class="card-header">This project: </h3>
          <div class="card-block">
            <p class="card-text">This is the Cap Stone project for CSE 308 at Stony Brook University.</p>
          </div>
          <hr />
        </div>
        <div class="card">
          <h3 class="card-header">The team 	Titans: </h3>
          <div class="card-block">
            <ul>
              <li>Keyu Lin</li>
              <li>Yushan Zhou</li>
              <li>Xin Yu</li>
              <li>Huahai Liang</li>
            </ul>
          </div>
          <hr />
        </div>

        <div class="card ">
          <h3 class="card-header">Give us feedback: </h3>
          <div class="card-block">
            <div class="container">
              <div class="col-lg-4 col-lg-offset-1">
                <form>
                  <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter your name" />
                  </div>
                  <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="example@gmail.com" />
                  </div>
                  <div class="form-group">
                    <label>Feedback:</label>
                    <input type="textarea" class="form-control" id="feedback" style={{ height: 150, width: 400 }}/>
                  </div>
                  <div class="form-group">
                    <Link to={process.env.PUBLIC_URL +'/'}><button type="button" class="btn btn-primary">Submit</button></Link>
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
