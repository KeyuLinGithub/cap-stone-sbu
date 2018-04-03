import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import SingleOriginalMap from './SingleOriginalMap';
import SingleRedistrictMap from './SingleRedistrictMap';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uscenter:[39,-98],
      uszoom:[4.5],
      lng: 39,
      lat: -98,
      zoom: 1.5,
      color: '#F5B041',
      features: []
    };


  }

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
    var color=this.state.color;

    return (
      <div class="container">
        <SingleOriginalMap google={this.props.google} />
        <SingleRedistrictMap google={this.props.google} />
      </div>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(MapPage)
