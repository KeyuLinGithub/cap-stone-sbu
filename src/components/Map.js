import React from 'react';
import ReactMapboxGl, { GeoJSONLayer,Layer } from "react-mapbox-gl";
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
    this.fillClick=this.fillClick.bind(this);
  }
  componentDidMount() {

  }
  fillClick(event){
    console.log(event);
    console.log('The County: '+event.features[0].properties.COUNTY);

    // var json = JSON.parse(geojsonColorado);
    // console.log(json);
  }
  render() {
    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1IjoibWxjaGFlbGxpbjIyMiIsImEiOiJjamU4MGQydGYwaW1mMnhtemRqNjZpcm9lIn0.BnWHaQPHz8IPtBXoNW-wzA',

    });
    var thecenter = [-105.358887, 39.113014];
    var thezoom=[5.5];



    return (
      <div class="container">
        <div class="page-header">
          <h1>Original Map</h1>
        </div>
        <div id="original">
          <div class="container col-sm-3">
            <div class="form-group">
              <label>State:</label><br />
              <select id="state">
                <option value="US" >US</option>
                <option value="Colorado" >Colorado</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="Ohio">Ohio</option>
              </select>
            </div>
            <div class="form-group">
              <label>District Level:</label><br />
              <select id="compactness">
                <option value="congressional">Congressional distric</option>
                <option value="state" >State district</option>
                <option value="polling">Polling district</option>
              </select>
            </div>
            <div class="form-group">
              <label>Compactness:</label><br />
              <select id="compactness">
                <option value="1">Level 1</option>
                <option value="2" >Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>
            <div class="form-group">
              <label>Alignment By:</label><br />
              <select id="Alignment">
                <option value="county">County Boundaries</option>
                <option value="highways" >Highways</option>
                <option value="rivers">Rivers</option>
              </select>
            </div>
            <div class="form-group">
              <button type="button" class="btn btn-primary pull-middle">Redistrict</button>
            </div>
          </div>
          <div class="container col-sm-9" id="originalmap">
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
              }}
              fillOnClick={this.fillClick}
            />

            </Map>
          </div>
        </div>
        <div class="page-header">
          <h2>Redistricted Map</h2>
        </div>
        <div id="redistricted" >
          <div class="container col-sm-3">
            <strong>Basic Comparison and Analysis:</strong>
            <p>
              <br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />

            </p>
            <button type="button" class="btn btn-primary">Show Detailed Analysis </button>
          </div>
          <div class="container col-sm-9" id="newmap">
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
        </div>
        <div id="detailedanalysis">
          <div class="page-header">
            <h2>Detailed Analysis</h2>
          </div>
          <div class="card">
            <h4 class="card-header">About the Efficiency gap: </h4>
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
            <h4 class="card-header">Measurement of the partisan fairness: </h4>
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
