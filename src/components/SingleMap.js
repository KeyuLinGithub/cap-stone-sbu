import React from 'react';
import ReactDOM from 'react-dom';

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
      inactiveButtonController:false,
      infoboxPopulation:0,
      infoboxAVGIncome:0,
      infoboxNumOfCDs:0,
      infoboxNumOfPDs:0,
      infoboxArea:0
    };
    this.changeState=this.changeState.bind(this);
    this.changeDLevel=this.changeDLevel.bind(this);
    this.handleConstraintChange=this.handleConstraintChange.bind(this);
    this.handleCheckboxConstraintChange=this.handleCheckboxConstraintChange.bind(this);
    this.handleRedistrictRequest=this.handleRedistrictRequest.bind(this);
    this.changeAlgorithmStatus=this.changeAlgorithmStatus.bind(this);
    this.stopAlgorithm=this.stopAlgorithm.bind(this);
    this.resetMap=this.resetMap.bind(this);
    this.showAnalysis=this.showAnalysis.bind(this);
  }

  componentDidMount(){
    this.initializeMap();
  }

  initializeMap(){
    if (this.props && this.props.google) {
      //map set up
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: new google.maps.LatLng(40.00, -98),
        zoom: 4,
        mapTypeId: 'terrain',
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
      //add searchBar
      var searchBarInput=ReactDOM.findDOMNode(this.refs.searchBar);
      var searchBox = new google.maps.places.Autocomplete(searchBarInput);
      var theMap=this.map;
      theMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchBarInput);

      searchBox.bindTo('bounds', theMap);

      searchBox.addListener('place_changed', () => {
        const place = searchBox.getPlace();
        theMap.panTo(place.geometry.location);
        theMap.setZoom(8);
        });
    }
  }

  displayGeoJSON(state,dLevel){
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
      //request state info
      this.displayStateInfo();
    });
  }

  displayStateInfo(){
    fetch("http://localhost:8080/RedistrictSystem/getStateInfo.do", {
     method: "POST",
     credentials: 'include',
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: "stateName="+this.state.state
   })
    .then(response => response.json())
    .then(data => {
      this.setState({
        infoboxPopulation:data.population,
        infoboxAVGIncome:data.aveIncome,
        infoboxNumOfCDs:data.numOfCds,
        infoboxNumOfPDs:data.numOfPds,
        infoboxArea:data.area
      });
    });
  }

  updateMapCenter(state,dLevel){
    if(state==='US'){
      this.map.setZoom(4);
      this.map.setCenter({lat: 40, lng: -98});
    }else if(state==='CO'){
      this.map.setZoom(7);
      this.map.setCenter({lat: 39, lng: -105.7821});
    }else if(state==='NH'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 43.8938516, lng: -71.57239529999998});
    }else if(state==='SC'){
      this.map.setZoom(8);
      this.map.setCenter({lat: 33.836082, lng: -81.163727});
    }
  }

  removePreviousLayer(){
    var layer=this.layer;
    layer.forEach(function (feature) {
        layer.remove(feature);
    });
  }

  changeState(e){
    this.setState({state: e.target.value});
    this.displayGeoJSON(e.target.value,this.state.dLevel);
  }

  changeDLevel(e){
    this.setState({dLevel: e.target.value});
    this.displayGeoJSON(this.state.state,e.target.value);
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

  handleRedistrictRequest(){
    this.setState({
      redistrictStatus:true,
      algorithmStatus:'running'
    });
    this.sendStartAlgorithmRequest();
  }

  sendStartAlgorithmRequest(){
    fetch("http://localhost:8080/RedistrictSystem/redistrict.do", {
  	  method: "POST",
  	  credentials: 'include',
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
      body: "objectElementMap[COMPACTNESSWEIGHT]="+this.state.compactness+
          "&objectElementMap[POPULATIONVARIANCEWEIGHT]="+this.state.population+
          "&objectElementMap[RACIALFAIRNESSWEIGHT]="+this.state.racial+
          "&objectElementMap[PARTISANFAIRNESSWEIGHT]="+this.state.partisan+
          "&isContiguity="+this.state.contiguity+
          "&isNaturalBoundary="+this.state.naturalBoundary
  	})
    .then(response => response.json())
    .then(data => {
      this.updateMapChange(data);
      if(data.terminated){
        return;
      }
      this.requestMoreMapChange();
    })
    .catch(err => console.log(err));
  }

  requestMoreMapChange(){
    fetch("http://localhost:8080/RedistrictSystem/process.do", {
    	  method: "POST",
      	  credentials: 'include',
      	  headers: {
      	    "Content-Type": "application/x-www-form-urlencoded"
      	  }
      	})
    .then(res => res.json())
    .then(data => {
      this.updateMapChange(data);
      if(data.terminated){
        return;
      }
      else if(this.state.algorithmStatus=='running'){
        this.requestMoreMapChange();
      }
    })
    .catch(err => console.log(err));
  }

  updateMapChange(data){
    var temp=this.layer;
    this.layer.forEach(function (feature) {
        if(data.VTDST10===feature.f.VTDST10){
          temp.overrideStyle(feature, {
            fillColor: data.fill,
            fillOpacity: 0.2,
            strokeColor: '#000000',
            strokeWeight: 4,
            zIndex: 1
          })
        }
    });
  }

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

  resetMap(){
    //reset the buttons
    this.setState({
      algorithmStatus:'stopped',
      algorithmStatusClassName:"btn btn-warning",
      algorithmStatusText:"Running...",
      buttonStatusText:'Pause',
      inactiveButtonController:false,
      redistrictStatus:false,
      compactness:25,
      population:25,
      racial:25,
      partisan:25
    });
    //reset resetGeoJson
    this.displayGeoJSON(this.state.state,this.state.dLevel);
  }

  showAnalysis(){
    this.props.showAnalysis();
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
              <option value="SC">South Carolina</option>
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
             disabled={this.state.inactiveButtonController}
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
              <button
               type="button"
               className="btn btn-success"
               onClick={this.resetMap}
              >
                Reset
              </button>
              <br/><br/>
              Show Analysis:
              <button
               type="button"
               className="btn btn-primary"
               onClick={this.showAnalysis}
               >
                Show
              </button>
            </div>
          }
        </div>
        <div className="container col-sm-10" id="originalmap">
          <input
            ref='searchBar'
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Search Box"
          />
          <div ref='map' style={originalStyle}>
            loading map...
          </div>
          {this.state.state!=='US' &&
            <div id='stateInfoBox'>
              <h4>{this.state.state} :</h4>
              <p>Population: {this.state.infoboxPopulation}</p>
              <p>Avg. Income: {this.state.infoboxAVGIncome}</p>
              <p>Area: {this.state.infoboxArea} sq mi </p>
              <p>Number of C. D.: {this.state.infoboxNumOfCDs}</p>
              <p>Number of P. D.: {this.state.infoboxNumOfPDs}</p>
            </div>
          }
        </div>
      </div>
    </div>
    )
  }
}

export default SingleMap;
