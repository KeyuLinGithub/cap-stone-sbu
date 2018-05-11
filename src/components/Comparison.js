import React from 'react';
import ReactDOM from 'react-dom';
import StateInfo from './StateInfo';

class Comparison extends React.Component {
  render(){
    return(
        <div >
          <div className="page-header">
            <h2>Comparison Among States</h2>
          </div>
          <div id="states" className="col-sm-10 col-sm-offset-1">
            <div className="col-sm-4">
              <StateInfo state='CO' stateName="Colorado"/>
            </div>
            <div className="col-sm-4">
              <StateInfo state='NH'stateName='New Hampshire'/>
            </div>
            <div className="col-sm-4">
              <StateInfo state='SC' stateName='South Carolina'/>
            </div>
          </div>
        </div>
    )
  }
}

export default Comparison;
