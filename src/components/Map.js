import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import SingleMap from './SingleMap';
import Analysis from './Analysis';
import Comparison from './Comparison';
import OriginalMap from './OriginalMap';
class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAnalysis: false,
      state: 'US'
    };
    this.showAnalysis=this.showAnalysis.bind(this);
    this.showOriginal=this.showOriginal.bind(this);
  }
  showAnalysis(){
    if(this.state.displayAnalysis){
      this.setState({displayAnalysis: false})
    }else{
      this.setState({displayAnalysis: true})
    }
    console.log(this.state.displayAnalysis);
  }
  showOriginal(theState){
    console.log('dam111');
    this.setState({state:theState});
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SingleMap google={this.props.google} showAnalysis={this.showAnalysis} showOriginal={this.showOriginal}/>
        </div>
        <div className="row">
          <OriginalMap google={this.props.google} state={this.state.state}/>
        </div>
        <div className="row">
          {this.state.displayAnalysis && <Analysis />}
        </div >
        <div className="row">
          <Comparison/>
        </div>
      </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(MapPage)
