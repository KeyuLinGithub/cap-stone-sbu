import React from 'react';
import demo from '../img/demoImg.png';
import ReactDOM from 'react-dom';

class Analysis extends React.Component {
  componentDidMount () {
    this.loadMap()
  }
  render(){
    return(
        <div id="detailedanalysis">
          <div className="page-header">
            <h2>Detailed Analysis</h2>
          </div>
          <div className="card">
            <h4 className="card-header">About the Efficiency gap: </h4>
            <div className="card-block container">
              <div className="container col-sm-5">
                <img src={demo} className="img-responsive" alt="Demo" />
              </div>
              <div className="container col-sm-7">
                <p> The efficiency gap....</p>
              </div>
            </div>
            <hr />
          </div>
          <div className="card">
            <h4 className="card-header">Measurement of the partisan fairness: </h4>
            <div className="card-block container">
              <div className="container col-sm-7">
                <p> Measurement of the partisan fairness....</p>
              </div>
              <div className="container col-sm-5">
                <img src={demo} className="img-responsive" alt="Demo" />
              </div>
            </div>
            <hr />
          </div>
        </div>
    )
  }
}

export default Analysis;
