import React from 'react';
import ReactDOM from 'react-dom';

//import all geojson
import c_c_d from '../geodata/c_c_d.json';
import n_c_d from '../geodata/n_c_d.json';
import o_c_d from '../geodata/o_c_d.json';
import n_p from '../geodata/n_p.json';
import c_p from '../geodata/c_p.json';
import o_p from '../geodata/o_test2.json';

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
      partisan:25,
      redistrictStatus:false,
      algorithmStatus:false,
      algorithmStatusClassName:"btn btn-primary",
      algorithmStatusText:"Running..."
    };
    this.changeState=this.changeState.bind(this);
    this.changeDLevel=this.changeDLevel.bind(this);
    this.updateLayer=this.updateLayer.bind(this);

    this.handleCompactnessChange=this.handleCompactnessChange.bind(this);
    this.handlePopulationChange=this.handlePopulationChange.bind(this);
    this.handleRacialChange=this.handleRacialChange.bind(this);
    this.handlePartisanChange=this.handlePartisanChange.bind(this);
    this.removePreviousLayer=this.removePreviousLayer.bind(this);

    this.handleRedistrictRequest=this.handleRedistrictRequest.bind(this);
    this.changeAlgorithmStatus=this.changeAlgorithmStatus.bind(this);
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
      this.Layer = new google.maps.Data();
      var Layer=this.Layer;
      //this.Layer.setStyle({visible: false});
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
    this.removePreviousLayer();
    this.updateMapCenter(state,dLevel);
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
  	  		"dLevel="+dLevel
  	})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //this.Layer.addGeoJson(data);
    });
  }
  updateMapCenter(state,dLevel){
    if(state==='US'){
      this.map.setZoom(4);
      this.map.setCenter({lat: 40, lng: -98});
      return;
    }else if(state==='Colorado'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 39, lng: -105.7821});
      if(dLevel==="congressional"){
        this.Layer.addGeoJson(c_c_d);
      }else{
        this.Layer.addGeoJson(c_p);
      }
      this.Layer.setStyle({
          fillColor: '#b0987a',
           fillOpacity: 0.4,
           strokeColor: '#000000',
          strokeWeight: 1,
           zIndex: 1,
          visible: true
      });
    }else if(state==='NewHampshire'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 43.8938516, lng: -71.57239529999998});
      if(dLevel==="congressional"){
        this.Layer.addGeoJson(n_c_d);
      }else{
        this.Layer.addGeoJson(n_p);
      }
      this.Layer.setStyle({
          fillColor: '#b0987a',
           fillOpacity: 0.4,
           strokeColor: '#000000',
          strokeWeight: 1,
           zIndex: 1,
          visible: true
      });
    }else if(state==='Ohio'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 40.4172871, lng: -82.90712300000001});
      if(dLevel==="congressional"){
        this.Layer.addGeoJson(o_c_d);
        this.Layer.setStyle({
            fillColor: '#b0987a',
             fillOpacity: 0.4,
             strokeColor: '#000000',
            strokeWeight: 1,
             zIndex: 1,
            visible: true
        });
      }else{
        this.Layer.addGeoJson(o_p);
        var temp=this.Layer;
        this.Layer.forEach(function (feature) {
            console.log(feature.getProperty('fill'));
            temp.overrideStyle(feature, {
              fillColor: feature.getProperty('fill'),
              fillOpacity: 0.2,
              strokeColor: '#000000',
              strokeWeight: 1,
              zIndex: 1
            })
        });
      }
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
  handleRedistrictRequest(){
    this.setState({
      redistrictStatus:true,
      algorithmStatus:true
    });
  }
 changeAlgorithmStatus(){
   if(this.state.algorithmStatus==true){
     this.setState({
       algorithmStatus:false,
       algorithmStatusClassName:"btn btn-danger",
       algorithmStatusText:"Stopped"
     });
   }else{
     this.setState({
       algorithmStatus:true,
       algorithmStatusClassName:"btn btn-primary",
       algorithmStatusText:"Running..."
     });
   }
 }
  render(){
    const originalStyle = {
      width: '100%',
      height: '120vh'
    }
    return(
    <div id="singleMaps">
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
            <button type="button" className="btn btn-primary" onClick={this.handleRedistrictRequest}>Redistrict</button>
          </div>
          {this.state.redistrictStatus &&
            <div className="form-group">
              <label>Controller:</label><br />
              The Status:&nbsp;
              <button type="button" className={this.state.algorithmStatusClassName} onClick={this.changeAlgorithmStatus}>{this.state.algorithmStatusText}</button>

              <br /><br/>
              Reset the Map:
              <button type="button" className="btn btn-success">Reset</button>

              <br /><br/>
              --after that--<br />
              Show Analysis:
              <button type="button" className="btn btn-primary">Show</button>
              <br />--after that--
            </div>
          }
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
