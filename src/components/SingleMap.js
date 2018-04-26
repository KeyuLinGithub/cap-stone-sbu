import React from 'react';
import ReactDOM from 'react-dom';

//import all geojson
import c_c_d from '../geodata/c_c_d.json';
import n_c_d from '../geodata/1.json';
import o_c_d from '../geodata/o_c_d_test.json';
import n_p from '../geodata/2.json';
import c_p from '../geodata/c_p.json';
import o_p from '../geodata/o_p_test.json';

class SingleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:"US",
      dLevel:"CD",
      color:"Default",
      compactness:25,
      population:25,
      racial:25,
      partisan:25,
      contiguity: false,
      naturalBoundary: false,
      redistrictStatus:false,
      algorithmStatus:"stopped",
      algorithmStatusClassName:"btn btn-warning",
      algorithmStatusText:"Running...",
      buttonStatusText:"Pause",
      inactiveButtonController:false
    };
    this.changeState=this.changeState.bind(this);
    this.changeDLevel=this.changeDLevel.bind(this);
    this.handleConstraintChange=this.handleConstraintChange.bind(this);
    this.handleCheckboxConstraintChange=this.handleCheckboxConstraintChange.bind(this);
    this.handleRedistrictRequest=this.handleRedistrictRequest.bind(this);
    this.changeAlgorithmStatus=this.changeAlgorithmStatus.bind(this);
    this.stopAlgorithm=this.stopAlgorithm.bind(this);
  }
  componentDidMount () {
    this.loadMap();
  }
  componentWillUpdate(nextProps, nextState) {
      console.log(nextState.algorithmStatus);
   }
  loadMap(){
    if (this.props && this.props.google) {
      //map set up
      const { google } = this.props;
      const maps = google.maps;
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
      //data layer
      this.layer = new maps.Data();
      //info window
      var infowindow = new maps.InfoWindow();
      //install all the event listener
      var layer=this.layer;
      layer.addListener('mouseover', e => {
        layer.overrideStyle(e.feature, {
          strokeWeight: 3,
          zIndex: 3
        })
        if(this.state.dLevel==="CD"){
          var content='STATEFP: '+e.feature.f.STATEFP+' GEOID: '+e.feature.f.GEOID+' Population: '+e.feature.f.POPULATION;
          infowindow.setContent(content);
          infowindow.setPosition(e.latLng);
          infowindow.open(this.map);
        }
      })
      layer.addListener('mouseout', e => {
        layer.overrideStyle(e.feature, {
          strokeWeight: 1,
          zIndex: 1
        })

        infowindow.close();
      })
      layer.setMap(this.map)
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
    this.removePreviousLayer();
    this.updateMapCenter(state,dLevel);
    if(state==='US'){
      return;
    }
    fetch("http://localhost:8080/RedistrictSystem/displayState.do", {
  	  method: "POST",
  	  credentials: 'include',
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body: "stateName="+state+
  	  		"&dLevel="+dLevel
  	})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.layer.addGeoJson(data);
      //add color for the layer
      var temp=this.layer;
      this.layer.forEach(function (feature) {
          temp.overrideStyle(feature, {
            fillColor: feature.getProperty('fill'),
            fillOpacity: 0.2,
            strokeColor: '#000000',
            strokeWeight: 1,
            zIndex: 1
          })
      });
    });
    // this.layer.addGeoJson(n_p);
    // //add color for the layer
    // var temp=this.layer;
    // this.layer.forEach(function (feature) {
    //     temp.overrideStyle(feature, {
    //       fillColor: feature.getProperty('fill'),
    //       fillOpacity: 0.2,
    //       strokeColor: '#000000',
    //       strokeWeight: 1,
    //       zIndex: 1
    //     })
    // });
  }

  updateMapCenter(state,dLevel){
    if(state==='US'){
      this.map.setZoom(4);
      this.map.setCenter({lat: 40, lng: -98});
      return;
    }else if(state==='CO'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 39, lng: -105.7821});
      // if(dLevel==="congressional"){
      //   this.layer.addGeoJson(c_c_d);
      // }else{
      //   this.layer.addGeoJson(c_p);
      // }
      // this.layer.setStyle({
      //     fillColor: '#b0987a',
      //      fillOpacity: 0.4,
      //      strokeColor: '#000000',
      //     strokeWeight: 1,
      //      zIndex: 1,
      //     visible: true
      // });
    }else if(state==='NH'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 43.8938516, lng: -71.57239529999998});
      // if(dLevel==="congressional"){
      //   this.layer.addGeoJson(n_c_d);
      // }else{
      //   this.layer.addGeoJson(n_p);
      // }
      // //add color for the layer
      // var temp=this.layer;
      // this.layer.forEach(function (feature) {
      //   //console.log(feature.getProperty('fill'))
      //     temp.overrideStyle(feature, {
      //       fillColor: feature.getProperty('fill'),
      //       fillOpacity: 0.2,
      //       strokeColor: '#000000',
      //       strokeWeight: 1,
      //       zIndex: 1
      //     })
      // });
      // this.layer.setStyle({
      //     fillColor: '#b0987a',
      //      fillOpacity: 0.4,
      //      strokeColor: '#000000',
      //     strokeWeight: 1,
      //      zIndex: 1,
      //     visible: true
      // });
    }else if(state==='OH'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 40.4172871, lng: -82.90712300000001});
      // if(dLevel==="congressional"){
      //   this.layer.addGeoJson(o_c_d);
      //   this.layer.setStyle({
      //       fillColor: '#b0987a',
      //        fillOpacity: 0.4,
      //        strokeColor: '#000000',
      //       strokeWeight: 1,
      //        zIndex: 1,
      //       visible: true
      //   });
      // }else{
      //   this.layer.addGeoJson(o_p);
      // }
      // //add color for the layer
      // var temp=this.layer;
      // this.layer.forEach(function (feature) {
      //
      //     console.log(feature.getProperty('fill'));
      //     temp.overrideStyle(feature, {
      //       fillColor: feature.getProperty('fill'),
      //       fillOpacity: 0.2,
      //       strokeColor: '#000000',
      //       strokeWeight: 1,
      //       zIndex: 1
      //     })
      // });
    }
  }
  handleConstraintChange (event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({[name]: value});
  }
  handleCheckboxConstraintChange(event){
    var name = event.target.name;
    var value = false;
    if(event.target.checked){
      value=true;
    }
    this.setState({[name]: value});
  }
  removePreviousLayer(){
    var layer=this.layer;
    layer.forEach(function (feature) {
        layer.remove(feature);
    });
  }
  handleRedistrictRequest(){
    this.setState({
      redistrictStatus:true,
      algorithmStatus:'running'
    });
    this.algorithmStatus='running';
    //this.testFetch();
    this.sendStartAlgorithmRequest();
  }
  sendStartAlgorithmRequest(){
    fetch("http://localhost:8080/RedistrictSystem/redistrict.do", {
  	  method: "POST",
  	  credentials: 'include',
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
  	  body: "compactness="+this.state.compactness+
  	  		"&population="+this.state.population+
          "&racial="+this.state.racial+
          "&partisan="+this.state.partisan+
          "&contiguity="+this.state.contiguity+
          "&naturalBoundary="+this.state.naturalBoundary
  	})
    .then(response => response.json())
    .then(data => {
      this.updateMapChange(data);
      //this.requestMoreMapChange();
    })
    .catch(err => console.log(err));
    // var data={pricienctID:"111",fill:"#000"};
    // this.updateMapChange(data);
    // var temp=this.layer;
    // this.layer.forEach(function (feature) {
    //     if(feature.f.VTDI10=== "A"){
    //       temp.overrideStyle(feature, {
    //         fillColor: '#f3370f',
    //         fillOpacity: 0.2,
    //         strokeColor: '#000000',
    //         strokeWeight: 1,
    //         zIndex: 1
    //       })
    //     }
    //
    // });
  }
  updateMapChange(data){
    // console.log(data);
    // console.log(Object.values(data));
    // console.log(Object.values(data)[0]);
    console.log(data.fill);
    console.log(data.pricienctID);
    var temp=this.layer;
    this.layer.forEach(function (feature) {
        if(data.pricienctID===feature.f.VTDI10){
          temp.overrideStyle(feature, {
            fillColor: data.fill,
            fillOpacity: 0.2,
            strokeColor: '#000000',
            strokeWeight: 1,
            zIndex: 1
          })
        }

    });
  }
  requestMoreMapChange(){
    fetch("http://localhost:8080/RedistrictSystem/process.do")
    .then(res => res.json())
    .then(data => {
      this.updateMapChange(data);
      if(this.state.algorithmStatus=='running'){
        this.requestMoreMapChange();
      }
    })
    .catch(err => console.log(err));
  }
  // testFetch(){
  //     fetch(`http://www.reddit.com/search.json?q=food`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       if(this.state.algorithmStatus=='running'){
  //         this.testFetch();
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }
  changeAlgorithmStatus(){
   if(this.state.algorithmStatus==='running'){
     this.setState({
       algorithmStatus:'stopped',
       algorithmStatusClassName: "btn btn-info",
       algorithmStatusText:"Paused",
       buttonStatusText:'Resume'
     });

   }else{
     this.setState({
       algorithmStatus:'running',
       algorithmStatusClassName:"btn btn-warning",
       algorithmStatusText:"Running...",
       buttonStatusText:'Pause'
     });
     this.requestMoreMapChange();
   }
 }
 stopAlgorithm(){
   this.setState({
     algorithmStatus:'stopped',
     algorithmStatusText:"Stopped",
     inactiveButtonController:true
   });
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
              <option value="CO">Colorado</option>
              <option value="NH">New Hampshire</option>
              <option value="OH">Ohio</option>
            </select>
          </div>
          <div className="form-group">
            <label>District Level:</label><br />
            <select id="compactness" onChange={this.changeDLevel}>
              <option value="CD" >Congressional district</option>
              <option value="PD" >Precinct district</option>
            </select>
          </div>

          <div className="form-group">
            <label>Constraints By Weights:</label><br />
            <div>Partisan Fairness: {this.state.partisan}%</div>
            <input type="range"
              name="partisan"
              value={this.state.partisan}
              onChange={e=> {this.handleConstraintChange(e)}}
            />
            <div>Equal Population: {this.state.population}%</div>
            <input type="range"
              name="population"
              value={this.state.population}
              onChange={e=> {this.handleConstraintChange(e)}}
            />
            <div>Racial Fairness: {this.state.racial}%</div>
            <input type="range"
              name="racial"
              value={this.state.racial}
              onChange={e=> {this.handleConstraintChange(e)}}
            />
            <div>Compactness: {this.state.compactness}%</div>
            <input type="range"
              name="compactness"
              value={this.state.compactness}
              onChange={e=> {this.handleConstraintChange(e)}}
            />
            <div>
              Contiguity:&nbsp;&nbsp;
              <input
               type="checkbox"
               className="form-check-input"
               name="contiguity"
               onClick={e=> {this.handleCheckboxConstraintChange(e)}}
              />
            </div>
            <div>
              Align with natural boundary:&nbsp;&nbsp;
              <input
               type="checkbox"
               className="form-check-input"
               name="naturalBoundary"
               onClick={e=> {this.handleCheckboxConstraintChange(e)}}
              />
            </div>
          </div>
          <div className="form-group">
            <button
             type="button"
             className="btn btn-primary"
             onClick={this.handleRedistrictRequest}
            >
             Redistrict
            </button>
          </div>
          {this.state.redistrictStatus &&
            <div className="form-group">
              <label>Controller:</label><br />
              The Status:&nbsp;{this.state.algorithmStatusText}
              <br /><br/>
              <button
               type="button"
               className={this.state.algorithmStatusClassName}
               onClick={this.changeAlgorithmStatus}
               disabled={this.state.inactiveButtonController}
              >
               {this.state.buttonStatusText}
              </button>
              &nbsp;&nbsp;
              <button
               type="button"
               className="btn btn-danger"
               onClick={this.stopAlgorithm}
               disabled={this.state.inactiveButtonController}
              >
               Stop
              </button>
              <br/><br/>
              Reset the Map:
              <button type="button" className="btn btn-success">Reset</button>
              <br/><br/>
              Show Analysis:
              <button type="button" className="btn btn-primary">Show</button>
            </div>
          }
        </div>
        <div className="container col-sm-10" id="originalmap">
          <div ref='map' style={originalStyle}>
            loading map...
          </div>
          {this.state.state!=='US' &&
            <div id='stateInfoBox'>
              <h4>{this.state.state} :</h4>
              <p>Population: 111</p>
              <p>Avg. Income: 111</p>
              <p>Area: 111 sq mi </p>
              <p>Number of C. D.: 111</p>
              <p>Number of P. D.: 111</p>
            </div>
          }
        </div>
      </div>
    </div>
    )
  }
}

export default SingleMap;
