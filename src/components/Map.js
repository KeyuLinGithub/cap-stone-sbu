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
      state: 'US',
      viewOriginalMap:false,
      year: '2017'
    };
    this.showAnalysis=this.showAnalysis.bind(this);
    this.showOriginal=this.showOriginal.bind(this);
    this.viewOriginalMap=this.viewOriginalMap.bind(this);
    this.changeYear=this.changeYear.bind(this);
  }
  changeYear(value){
    this.setState({year: value});
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
    this.setState({state:theState});
  }
  viewOriginalMap(){
    if(this.state.viewOriginalMap==true){
      this.setState({viewOriginalMap:false});
    }else{
      this.setState({viewOriginalMap:true});
    }
    console.log("2");
    console.log(this.state);

  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SingleMap google={this.props.google} changeYear={this.changeYear} showAnalysis={this.showAnalysis} showOriginal={this.showOriginal} viewOriginalMap={this.viewOriginalMap}/>
        </div>
        <div className="row">
          {this.state.viewOriginalMap==true && <OriginalMap google={this.props.google} state={this.state.state}/>}

        </div>
        <div className="row">
          {this.state.displayAnalysis && <Analysis />}
        </div >
        <div className="row">
          <Comparison year={this.state.year}/>
        </div>
      </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(MapPage)
