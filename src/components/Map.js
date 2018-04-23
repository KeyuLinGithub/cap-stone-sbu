import React from 'react';

import { GoogleApiWrapper } from 'google-maps-react';
import SingleMap from './SingleMap';
import Analysis from './Analysis';

class MapPage extends React.Component {
  render() {
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
