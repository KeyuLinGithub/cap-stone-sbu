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
          <div id="states" className="col-sm-12">
            <div className="col-sm-12 ">
              <StateInfo state='CO' stateName="Colorado" year={this.props.year}/>
            </div>
            <div className="col-sm-12 " >
              <StateInfo state='NH'stateName='New Hampshire' year={this.props.year}/>
            </div>
            <div  className="col-sm-12 ">
              <StateInfo state='SC' stateName='South Carolina'year={this.props.year}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Comparison;
