import React from 'react';
import ReactDOM from 'react-dom';
class SingleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state:"US",
      dLevel:"CD",
      infoboxPopulation:0,
      infoboxAVGIncome:0,
      infoboxNumOfCDs:0,
      infoboxNumOfPDs:0,
      infoboxArea:0,
    };
    this.changeState=this.changeState.bind(this);
    this.changeDLevel=this.changeDLevel.bind(this);
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
          var content='STATEFP: '+e.feature.f.STATEFP
                      +' <br\>GEOID: '+e.feature.f.GEOID
                      +' <br\>Population: '+e.feature.f.POPULATION
                      +' <br\>Population of White: '+e.feature.f.white
                      +' <br\>Population of Asian: '+e.feature.f.blackAfrican
                      +' <br\>Population of African American: '+e.feature.f.asian
                      +' <br\>'
                      +' <br\>HouseHold Median Income: '+e.feature.f.houseHoldMedian
                      +' <br\>HouseHold Avg. Income: $'+e.feature.f.houseHoldAvg
                      +' <br\>Total Enrolled Students: '+e.feature.f.schoolEnroll
                      +' <br\>Total Employees: '+e.feature.f.employees
                      +' <br\>'
                      +' <br\>Democratic votes: '+e.feature.f.DVOTES
                      +' <br\>Republican votes: '+e.feature.f.RVOTES;
          infowindow.setContent(content);
          infowindow.setPosition(e.latLng);
          infowindow.open(this.map);
        }else if(this.state.dLevel==="PD"){
          var content='County: '+e.feature.f.county;
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
      //change location based on search
      searchBox.bindTo('bounds', theMap);
      //add marker
      var marker = new google.maps.Marker({
          map: this.map,
          anchorPoint: new google.maps.Point(0, -29)
        });

      searchBox.addListener('place_changed', () => {
        const place = searchBox.getPlace();
        theMap.panTo(place.geometry.location);
        theMap.setZoom(8);
        //marker
        marker.setIcon(/** @type {google.maps.Icon} */({
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      });

    }
  }
  displayGeoJSON(state,dLevel){
    this.removePreviousLayer();
    this.updateMapCenter(state,dLevel);
    if(state==='US'){
      return;
    }
    console.log(state);
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
            fillOpacity: 0.4,
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
      console.log(data);
      this.setState({
        infoboxPopulation:data.population,
        infoboxAVGIncome:data.aveIncome,
        infoboxNumOfCDs:data.numOfCds,
        infoboxNumOfPDs:data.numOfPds,
        infoboxArea:data.area,
        originalDetails:data.details,
        currentDetails:data.details
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
    if(e.target.value==="PD"){
      this.setState({
        checkedStatus: false
      });
    }else{
      this.setState({
        checkedStatus: true
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
        <h1>Guest Map</h1>
      </div>
      <div>
        <div className="container col-sm-2">
          <div className="form-group">
            <label>State:</label><br />
            <select id="state"
            onChange={this.changeState}
            value={this.state.state}
            >
              <option value="US">US</option>
              <option value="CO">Colorado</option>
              <option value="NH">New Hampshire</option>
              <option value="SC">South Carolina</option>
            </select>
          </div>
          <div className="form-group">
            <label>District Level:</label><br />
            <select id="compactness" onChange={this.changeDLevel} value={this.state.dLevel}>
              <option value="CD" >Congressional district</option>
              <option value="PD" >Precinct district</option>
            </select>
          </div>
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
              <p>Avg. Income: $ {this.state.infoboxAVGIncome}</p>
              <p>Area: {this.state.infoboxArea} mi² </p>
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
