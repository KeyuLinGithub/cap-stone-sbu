import React from 'react';
import demo from '../img/demoImg.png';
import ReactDOM from 'react-dom';

class SingleRedistrictMap extends React.Component {
  componentDidMount () {
    this.loadMap()
  }

  loadMap () {
    if (this.props && this.props.google) {
      //google api wrapper
      const { google } = this.props;
      const maps = google.maps;
      //find the component
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: new google.maps.LatLng(40.00, -98),
        zoom: 4,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        }
      })

      this.map = new maps.Map(node, mapConfig)
    }
  }
  render(){
    const NewStyle = {
      width: '100%',
      height: '80vh'
    }
    return(
      <div id='redistrict'>
        <div class="page-header">
          <h2>Redistricted Map</h2>
        </div>
        <div >
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
            <div ref='map' style={NewStyle}>
              loading map...
            </div>
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
    )
  }
}

export default SingleRedistrictMap;
