import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import SingleMap from './SingleMap';
import Analysis from './Analysis';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAnalysis: false
    };
    this.showAnalysis=this.showAnalysis.bind(this);
  }
  showAnalysis(){
    if(this.state.displayAnalysis){
      this.setState({displayAnalysis: false})
    }else{
      this.setState({displayAnalysis: true})
    }
    console.log(this.state.displayAnalysis);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SingleMap google={this.props.google} showAnalysis={this.showAnalysis}/>
        </div>
        <div className="row">
          {this.state.displayAnalysis && <Analysis />}
        </div >
      </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(MapPage)
