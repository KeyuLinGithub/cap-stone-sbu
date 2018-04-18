import React from 'react';
import ReactDOM from 'react-dom';

class SingleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:"US",
      dLevel:"congressional",
      color:"Default",
      compactness:25,
      population:25,
      racial:25,
      partisan:25
    };
    this.changeState=this.changeState.bind(this);
    this.changeDLevel=this.changeDLevel.bind(this);
    this.updateLayer=this.updateLayer.bind(this);

    this.handleCompactnessChange=this.handleCompactnessChange.bind(this);
    this.handlePopulationChange=this.handlePopulationChange.bind(this);
    this.handleRacialChange=this.handleRacialChange.bind(this);
    this.handlePartisanChange=this.handlePartisanChange.bind(this);
    this.removePreviousLayer=this.removePreviousLayer.bind(this);
  }

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

      this.map = new maps.Map(node, mapConfig);

      // var obj = this
      this.Layer = new google.maps.Data();
      var Layer=this.Layer;

      this.Layer.setStyle({visible: false});

      // Add mouseover and mouse out styling for the GeoJSON State data
      Layer.addListener('mouseover', e => {
        Layer.overrideStyle(e.feature, {
          strokeWeight: 3,
          zIndex: 3
        })
      })

      Layer.addListener('mouseout', e => {
        Layer.overrideStyle(e.feature, {

          strokeWeight: 1,
          zIndex: 1
        })
      })

      //sets the geojson Layer onto the map
      Layer.setMap(this.map)
    }
  }
  changeState(e){
    this.setState({state: e.target.value});
    this.updateLayer(e.target.value,this.state.dLevel);

  }
  changeDLevel(e){
    this.setState({dLevel: e.target.value});
    this.updateLayer(this.state.state,e.target.value);
  }
  updateLayer(state,dLevel){
    console.log(state,dLevel);
    this.updateMapCenter(state);
    this.removePreviousLayer();
    if(state==='US'){
      return;
    }
    fetch("http://localhost:8080/RedistrictSystem/displayState.do", {
  	  method: "POST",
  	  credentials: 'include',//open sending cookie(default doesnt send cookie)
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body: "state="+state+
  	  		"DLevel="+dLevel
  	})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //this.Layer.addGeoJson(data);
    });
  }
  updateMapCenter(state){
    if(state==='US'){
      this.map.setZoom(4);
      this.map.setCenter({lat: 40, lng: -98});
      this.Layer.setStyle({visible: false});
      return;
    }else if(state==='Colorado'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 39, lng: -105.7821});
    }else if(state==='NewHampshire'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 43.8938516, lng: -71.57239529999998});
    }else if(state==='Ohio'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 40.4172871, lng: -82.90712300000001});
    }
  }
  handleCompactnessChange(e){
    this.setState({compactness: e.target.value});
  }
  handlePopulationChange(e){
    this.setState({population: e.target.value});
  }
  handleRacialChange(e){
    this.setState({racial: e.target.value});
  }
  handlePartisanChange(e){
    this.setState({partisan: e.target.value});
  }
  removePreviousLayer(){
    var layer=this.Layer;
    layer.forEach(function (feature) {
        //console.log(feature);
        layer.remove(feature);
    });
  }

  render(){
    const originalStyle = {
      width: '100%',
      height: '120vh'
    }
    return(
    <div id="original">

      <div className="page-header">
        <h1>Original Map</h1>
      </div>
      <div>
        <div className="container col-sm-2">
          <div className="form-group">
            <label>State:</label><br />
            <select id="state"
            onChange={this.changeState}
            >
              <option value="US">US</option>
              <option value="Colorado">Colorado</option>
              <option value="NewHampshire">New Hampshire</option>
              <option value="Ohio">Ohio</option>
            </select>
          </div>
          <div className="form-group">
            <label>District Level:</label><br />
            <select id="compactness" onChange={this.changeDLevel}>
              <option value="congressional" >Congressional district</option>
              <option value="precinct" >Precinct district</option>
            </select>
          </div>

          <div className="form-group">
            <label>Constraints By Weights:</label><br />
            <div>Partisan Fairness: {this.state.partisan}%</div>
            <input type="range"
              value={this.state.partisan}
              onChange={e=> {this.handlePartisanChange(e)}}
            />
            <div>Equal Population: {this.state.population}%</div>
            <input type="range"
              value={this.state.population}
              onChange={e=> {this.handlePopulationChange(e)}}
            />
            <div>Racial Fairness: {this.state.racial}%</div>
            <input type="range"
              value={this.state.racial}
              onChange={e=> {this.handleRacialChange(e)}}
            />
            <div>Compactness: {this.state.compactness}%</div>
            <input type="range"
              value={this.state.compactness}
              onChange={e=> {this.handleCompactnessChange(e)}}
            />
            <div>
              Contiguity:&nbsp;&nbsp;
              <input type="checkbox" className="form-check-input" />

            </div>
            <div>
              Align with natural boundary:&nbsp;&nbsp;
              <input type="checkbox" className="form-check-input" />

            </div>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary pull-middle">Redistrict</button>

          </div>
        </div>
        <div className="container col-sm-10" id="originalmap">
          <div ref='map' style={originalStyle}>
            loading map...
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default SingleMap;
