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
      height: '120vh'
    }
    return(
      <div id='redistrict' style={{marginTop:'20px'}}>
        <div className="page-header">
          <h2>Redistricted Map</h2>
        </div>
        <div >
          <div className="container col-sm-2">
            <strong>Basic Comparison and Analysis:</strong>
            <p>
              <br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />
              text text text text text<br /><br />

            </p>
            <button type="button" className="btn btn-primary">Show Detailed Analysis </button>
          </div>
          <div className="container col-sm-10" id="newmap">
            <div ref='map' style={NewStyle}>
              loading map...
            </div>
          </div>
        </div>
        <div id="detailedanalysis">
          <div className="page-header">
            <h2>Detailed Analysis</h2>
          </div>
          <div className="card">
            <h4 className="card-header">About the Efficiency gap: </h4>
            <div className="card-block container">

              <div className="container col-sm-5">
                <img src={demo} className="img-responsive" alt="Demo" />
              </div>
              <div className="container col-sm-7">
                <p> The efficiency gap....</p>
              </div>
            </div>
            <hr />
          </div>
          <div className="card">
            <h4 className="card-header">Measurement of the partisan fairness: </h4>
            <div className="card-block container">
              <div className="container col-sm-7">
                <p> Measurement of the partisan fairness....</p>
              </div>
              <div className="container col-sm-5">
                <img src={demo} className="img-responsive" alt="Demo" />
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
