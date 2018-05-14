import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import SingleGuestMap from './SingleGuestMap';
class GuestMap extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <SingleGuestMap google={this.props.google}/>
      </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAWOHt6Ix1LV1rgCOm1nvRFnuo2Dq2BJE8'),
  libraries: ['places']
})(GuestMap)
