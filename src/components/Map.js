import React from 'react';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import demo from '../img/demoImg.png';

const geojsonColorado = require('../geodata/Colorado_County_Boundaries.geojson');


export class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uscenter:[39,-98],
      uszoom:[4.5],
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
    var thecenter = [-105.358887, 39.113014];
    var thezoom=[5];

    return (
      <div class="container">
        <div class="page-header">
          <h1>Map</h1>
        </div>
        <div>
          <label>State:&nbsp;
          </label>
          <select id="state" >
          <option value="US" >US</option>
            <option value="Colorado" >Colorado</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="Ohio">Ohio</option>
          </select>
          <label>&nbsp;District Level:&nbsp;
          </label>
          <select id="compactness">
            <option value="congressional">Congressional distric</option>
            <option value="state" >State district</option>
            <option value="polling">Polling district</option>
          </select>
          <label>&nbsp;Compactness:&nbsp;
          </label>
          <select id="compactness">
            <option value="1">Level 1</option>
            <option value="2" >Level 2</option>
            <option value="3">Level 3</option>
          </select>
          <label>&nbsp;Alignment By:&nbsp;
          </label>
          <select id="Alignment">
            <option value="county">County Boundaries</option>
            <option value="highways" >Highways</option>
            <option value="rivers">Rivers</option>
          </select>
          <button type="button" class="btn btn-primary pull-right">Generate</button>
        </div>
        <div class="container col-sm-5">
          <Map style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "60vh",
              width: "100%"
            }}
            center={thecenter}
            zoom={thezoom}>
          <GeoJSONLayer
          data={geojsonColorado}
          fillPaint={{
            'fill-color': '#F5B041',
            'fill-opacity': 0.5,
            'fill-outline-color' :'#FA2305'
          }}/>
          </Map>
        </div>
        <div class="container col-sm-2">
          <div class="col-sm-offset-4">
          <i class="fas fa-angle-double-right fa-5x vertical-center"></i>
          <i class="fas fa-angle-double-right fa-5x vertical-center"></i>
          <i class="fas fa-angle-double-right fa-5x vertical-center"></i>
          <i class="fas fa-angle-double-right fa-5x vertical-center"></i>
          <i class="fas fa-angle-double-right fa-5x vertical-center"></i>
          </div>
        </div>
        <div class="container col-sm-5">
          <Map style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "60vh",
              width: "100%"
            }}
            center={thecenter}
            zoom={thezoom}>
          <GeoJSONLayer
          data={geojsonColorado}
          fillPaint={{
            'fill-color': '#F5B041',
            'fill-opacity': 0.5,
            'fill-outline-color' :'#FA2305'
          }}/>
          </Map>
        </div>

        <div class="col-sm-offset-5 pt-5 mt-5 d-block">
          <button type="button" class="btn btn-primary">Show Analysis </button>
        </div>
        <div>
          <div class="page-header">
            <h1>Analysis</h1>
          </div>
          <div class="card">
            <h3 class="card-header">About the Efficiency gap: </h3>
            <div class="card-block container">

              <div class="container col-sm-5">
                <img src={demo} class="img-responsive" alt="Demo" />
              </div>
              <div class="container col-sm-7">
                <p> The efficiency gap....</p>
              </div>
            </div>
            <hr />
          </div>
          <div class="card">
            <h3 class="card-header">Measurement of the partisan fairness: </h3>
            <div class="card-block container">
              <div class="container col-sm-7">
                <p> Measurement of the partisan fairness....</p>
              </div>
              <div class="container col-sm-5">
                <img src={demo} class="img-responsive" alt="Demo" />
              </div>
            </div>
            <hr />
          </div>
        </div>

      </div>
    );
  }
};

export default MapPage;
