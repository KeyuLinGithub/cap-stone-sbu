import React from 'react';
import demo from '../img/demoImg.png';
export class General extends React.Component {
  render(){
    return(
      <div className="container mt-5 pt-5 pb-5">
        <div className="page-header">
          <h1>General</h1>
        </div>

        <div className="row mb-5">
          <div className="container col-sm-6">
            <h3>What is Gerrymander?</h3>
            <p>
              A Gerrymander is a voting district that is designed redistrict voting area to serve some political purpose.  Once people realize the consequences that Gerrymandering might bring, some scientific methods are designed in order to measure the presence of Gerrymandering, while others are to challenge the legal boundary of redistricting or just to minimize the effects of future redistricting.
            </p>
          </div>
          <div className="container col-sm-6">
            <img src={'https://source.unsplash.com/collection/1973752/1600x900,'+'0'} className="img-responsive" alt="Demo" />
          </div>

        </div>
        <div className="row mb-5">
          <div className="container col-sm-6">
            <img src={'https://source.unsplash.com/collection/1973752/1600x900,'+'2'} className="img-responsive" alt="Demo" />
          </div>
          <div className="container col-sm-6">
            <h3>About congressional-redistrict-generation:</h3>
            <p>
            The congressional-redistrict-generation is a tool to analyze Gerrymanderring in US and generate new congressional district boundaries without any political influence. It reassigns the congressional districts base on the votes of each polling place under several constraints of users, and displays the new districts with demographic data. It also provides comparison between the original and new district distribution to user for further analysis.
            </p>
          </div>

        </div>
        <hr/>
      </div>
    )
  }
};

export default General;
