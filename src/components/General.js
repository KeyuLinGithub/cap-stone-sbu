import React from 'react';

export class General extends React.Component {
  render(){
    return(
      <div class="container mt-5 pt-5">
        <div class="page-header">
          <h1>General</h1>
        </div>

        <div class="container">
          <div class="container col-sm-7">
            <h3>What is Gerrymander?</h3>
            <p>
              A Gerrymander is a voting district that is designed redistrict voting area to serve some political purpose.  Once people realize the consequences that Gerrymandering might bring, some scientific methods are designed in order to measure the presence of Gerrymandering, while others are to challenge the legal boundary of redistricting or just to minimize the effects of future redistricting.
            </p>
          </div>
          <div class="container col-sm-5">
            <img src="./img/demoImg.png" class="img-responsive" alt="Demo" />
          </div>
          
        </div>
        <div class="container">
          <div class="container col-sm-5">
            <img src="./img/demoImg.png" class="img-responsive" alt="Demo" />
          </div>
          <div class="container col-sm-7">
            <h3>About congressional-redistrict-generation:</h3>
            <p>
            The congressional-redistrict-generation is a tool to analyze Gerrymanderring in US and generate new congressional district boundaries without any political influence. It reassigns the congressional districts base on the votes of each polling place under several constraints of users, and displays the new districts with demographic data. It also provides comparison between the original and new district distribution to user for further analysis.
            </p>
          </div>

        </div>
      </div>
    )
  }
};

export default General;
