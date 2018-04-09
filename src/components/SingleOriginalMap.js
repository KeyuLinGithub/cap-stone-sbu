import React from 'react';
import ReactDOM from 'react-dom';

///all geojson
import c_c_d from '../geodata/c_c_d.json';
import n_c_d from '../geodata/n_c_d.json';
import o_c_d from '../geodata/o_c_d.json';
import o_p from '../geodata/o_p.json';
import n_p from '../geodata/n_p.json';
///

class SingleOriginalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:"US",
      color:"Default",
      compactness:25,
      population:25,
      racial:25,
      partisan:25
    };
    this.changeState=this.changeState.bind(this);
    this.changeColor=this.changeColor.bind(this);
    this.handleCompactnessChange=this.handleCompactnessChange.bind(this);
    this.handlePopulationChange=this.handlePopulationChange.bind(this);
    this.handleRacialChange=this.handleRacialChange.bind(this);
    this.handlePartisanChange=this.handlePartisanChange.bind(this);
    this.changeLayer=this.changeLayer.bind(this);
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
      Layer.addGeoJson(c_c_d);
      Layer.addGeoJson(n_c_d);
      Layer.addGeoJson(o_c_d);

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
      Layer.addListener('click',  e =>{
        console.log(this.state.color);
        var newColor;
        if(this.state.color==='Blue'){
          newColor="#006eff"
        }else if(this.state.color==='Green'){
          newColor="#00ff48"
        }else if(this.state.color==='Red'){
          newColor="#ff3700"
        }else if(this.state.color==='Yellow'){
          newColor="#f6ff00"
        }else{
          newColor="#b0987a"
        }
        Layer.overrideStyle(e.feature, {
          fillColor: newColor
        })
        console.log(this.state.current);
        console.log('STATEFP: '+e.feature.f.STATEFP+' GEOID: '+e.feature.f.GEOID);
      })
      //sets the geojson Layer onto the map
      Layer.setMap(this.map)
    }
  }
  changeState(e){
    const { google } = this.props;

    this.setState({current: e.target.value});
    //console.log(e.target.value);
    var state=e.target.value;
    if(state==='US'){
      this.map.setZoom(4);
      this.map.setCenter({lat: 40, lng: -98});
      this.Layer.setStyle({visible: false});
      return;
    }else if(state==='Colorado'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 39, lng: -105.7821});


    }else if(state==='NewHampshire'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 44.1938516, lng: -71.57239529999998});

    }else if(state==='Ohio'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 40.4172871, lng: -82.90712300000001});

    }
    this.Layer.setStyle({
        fillColor: '#b0987a',
         fillOpacity: 0.4,
         strokeColor: '#000000',
        strokeWeight: 1,
         zIndex: 1,
        visible: true
    });

  }
  changeColor(e){
    this.setState({color: e.target.value});
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
  changeLayer(e){
    console.log(e.target.value);
    this.removePreviousLayer();
    if(e.target.value==="congressional"){
      this.Layer.addGeoJson(c_c_d);
      this.Layer.addGeoJson(n_c_d);
      this.Layer.addGeoJson(o_c_d);
    }else if(e.target.value==="state"){

    }else if(e.target.value==="precinct"){
      this.Layer.addGeoJson(o_p);
      this.Layer.addGeoJson(n_p);
    }
  }
  render(){
    const originalStyle = {
      width: '100%',
      height: '80vh'
    }
    return(
    <div id="original">

      <div className="page-header">
        <h1>Original Map</h1>
      </div>
      <div>
        <div className="container col-sm-3">
          <div className="form-group">
            <label>State:</label><br />
            <select id="state"
            options={this.state.stateOptionsoptions}
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
            <select id="compactness" onChange={this.changeLayer}>
              <option value="congressional" >Congressional district</option>
              <option value="state" >State district</option>
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
        <div className="container col-sm-9" id="originalmap">
          <div ref='map' style={originalStyle}>
            loading map...
          </div>
        </div>
      </div>
    </div>
    )
  }
}
//color selection
// <div className="form-group">
//   <label>Current Color:</label><br />
//   <select id="color" onChange={this.changeColor}>
//     <option value="Default">Default</option>
//     <option value="Blue">Blue</option>
//     <option value="Green">Green</option>
//     <option value="Red">Red</option>
//     <option value="Yellow">Yellow</option>
//   </select>
// </div>
export default SingleOriginalMap;
