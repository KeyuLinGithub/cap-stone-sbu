import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import SingleMap from './SingleMap';
import Analysis from './Analysis';

class MapPage extends React.Component {
  componentDidMount() {

  }
  // fillClick(event){
  //   console.log(event);
  //   console.log('The County: '+event.features[0].properties.COUNTY);
  //
  //   var json = JSON.parse(geojsonColorado);
  //   console.log(json);
  // }
  render() {

    var thecenter = [-105.358887, 39.113014];
    var thezoom=[5.5];
    //var color=this.state.color;

    return (
      <div className="container-fluid">
        <div className="row">
        <SingleMap google={this.props.google} />
        </div>
        <div className="row">
        <Analysis />
        </div >
      </div>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(MapPage)
