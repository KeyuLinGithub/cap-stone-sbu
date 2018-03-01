import React from 'react';
import ReactMapboxGl from "react-mapbox-gl";

const theMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWxjaGFlbGxpbjIyMiIsImEiOiJjamU4MGQydGYwaW1mMnhtemRqNjZpcm9lIn0.BnWHaQPHz8IPtBXoNW-wzA'

});

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center : [-77.01239, 38.91275],

      lng: 5,
      lat: 34,
      zoom: 1.5
    };
  }
  componentDidMount() {

  }
  render(){

    return(
      <div>
        <theMap center={this.state.center}>
        </theMap>
      </div>
    )
  }
};

export default Map;
