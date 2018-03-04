import React from 'react';

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
                  <label>Name:</label><br/>
                  <input type="text" id="name" placeholder="Full name"/><br/>
                  <label>Email:</label><br/>
                  <input type="email" id="email" placeholder="example@gmail.com"/><br/>
                  <label>Feedback:</label><br/>
                  <input type="textarea" id="feedback" style={{ height: 150, width: 400 }} />
                  <br/>
                  <input type="submit" value="Submit" />
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
