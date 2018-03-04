import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";

const geojsonColorado = require('../geodata/Colorado_County_Boundaries.geojson');
export class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center:[39,-98],
      lng: 39,
      lat: -98,
      zoom: 1.5
    };
  }
  componentDidMount() {

  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1IjoibWxjaGFlbGxpbjIyMiIsImEiOiJjamU4MGQydGYwaW1mMnhtemRqNjZpcm9lIn0.BnWHaQPHz8IPtBXoNW-wzA',

    });
    var thecenter = [-98, 39];
    var thezoom=[4.5];

    return (
      <div class="container">
        <div class="page-header">
          <h1>Map</h1>
        </div>
        <Map style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={thecenter}
          zoom={thezoom}
        >
        <GeoJSONLayer
        data={geojsonColorado}
        fillPaint={{
          'fill-color': '#F5B041',
          'fill-opacity': 0.5,
          'fill-outline-color' :'#FA2305'
        }}

          />
        </Map>

      </div>
    );
  }
};

export default MapPage;
