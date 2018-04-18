import React from 'react';
import demo from '../img/demoImg.png';
import ReactDOM from 'react-dom';

class Analysis extends React.Component {
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
    )
  }
}

export default Analysis;
