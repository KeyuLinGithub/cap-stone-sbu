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
      infoboxArea:0,
      previousHistoryList: [],
      newFileName:'default',
      showOriginalMap:false,
      originalDetails:[],
      currentDetails:[]
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
    this.saveMap=this.saveMap.bind(this);
    this.requestPreviousGeoJson=this.requestPreviousGeoJson.bind(this);
    this.deletePreviousGeojson=this.deletePreviousGeojson.bind(this);
    this.showOrigninalMap=this.showOrigninalMap.bind(this);
  }

  componentDidMount(){
    this.initializeMap();
    this.loadPreviousHistory();
    //this.displayOriginalMap();
  }
  loadPreviousHistory(){
    fetch("http://localhost:8080/RedistrictSystem/getFileList.do")
    .then(response => response.json())
    .then(data => {
      this.setState({
        previousHistoryList:data
      });
    })
    .catch(err => console.log(err));
  }
  requestPreviousGeoJson(fileName){
    fetch("http://localhost:8080/RedistrictSystem/importState.do", {
     method: "POST",
     credentials: 'include',
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: "fileName="+fileName
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //load loadGeoJson
      this.removePreviousLayer();
      this.layer.addGeoJson(data);
      //move map setCenter
      this.updateMapCenter(data.sName,'PD');
      //update constraints
      this.setState({
        state:data.sName,
        dLevel:"PD",
        compactness:data.COMPACTNESSWEIGHT,
        population:data.POPULATIONVARIANCEWEIGHT,
        racial:data.RACIALFAIRNESSWEIGHT,
        partisan:data.PARTISANFAIRNESSWEIGHT
      });
    })
    .catch(err => console.log(err));
  }
  deletePreviousGeojson(fileName){
    if(window.confirm('Are you sure you want to delete this user?')){
      fetch("http://localhost:8080/RedistrictSystem/removeFile.do", {
       method: "POST",
       credentials: 'include',
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       body: "fileName="+fileName
     })
     .then(response => this.loadPreviousHistory())
      .catch(err => console.log(err));
    }
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
    this.props.showOriginal(e.target.value);
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
      body: "COMPACTNESSWEIGHT="+this.state.compactness+
          "&POPULATIONVARIANCEWEIGHT="+this.state.population+
          "&RACIALFAIRNESSWEIGHT="+this.state.racial+
          "&PARTISANFAIRNESSWEIGHT="+this.state.partisan+
          "&isContiguity="+this.state.contiguity+
          "&isNaturalBoundary="+this.state.naturalBoundary
  	})
    .then(response => response.json())
    .then(data => {
      this.updateMapChange(data);
      if(data.terminated){
        this.setState({
          algorithmStatus:'finished',
          algorithmStatusText:"Finished",
          inactiveButtonController:true
        });
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
        this.setState({
          algorithmStatus:'finished',
          algorithmStatusText:"Finished",
          inactiveButtonController:true,
          currentDetails:data.details
        });
        return;
      }
      else if(this.state.algorithmStatus=='running'){
        this.requestMoreMapChange();
      }
    })
    .catch(err => console.log(err));
  }

  updateMapChange(data){
    if(data.details){
      this.setState({currentDetails: data.details});
    }
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

  saveMap(){
    // fetch("http://localhost:8080/RedistrictSystem/exportState.do", {
  	//   method: "POST",
  	//   credentials: 'include',
  	//   headers: {
  	//     "Content-Type": "application/x-www-form-urlencoded"
  	//   },
    //   body: "fileName="+this.state.newFileName+'.json'
  	// })
    // .catch(err => console.log(err));

    fetch("http://localhost:8080/RedistrictSystem/process.do", {
     method: "POST",
     credentials: 'include',
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: "fileName="+'hahah.json'
     //+this.state.newFileName+
   })
    .then(response => response.json())
    .then(data => {
      console.log('woops');
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
      partisan:25,
      newFileName:'default'
    });
    //reset resetGeoJson
    this.displayGeoJSON(this.state.state,this.state.dLevel);
  }
  showOrigninalMap(){
    this.props.viewOriginalMap();
    console.log('1')
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
    <button
     type="button"
     className="btn btn-success"
     onClick={this.saveMap}

    >
      Save
    </button>
      <div className="page-header">
        <h1>Map</h1>
      </div>
      <div>
        <div className="container col-sm-2">
          <div className="panel-group">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <a data-toggle="collapse" href="#collapsePrevious">Previous History</a>
                </h3>
              </div>
              <div id="collapsePrevious" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul className="list-group">
                    {this.state.previousHistoryList.length==0 &&
                      <li className="list-group-item" >No History found for this User</li>
                    }
                    {this.state.previousHistoryList.length!=0 &&

                      this.state.previousHistoryList.map((fileName,index) =>
                        <li className="list-group-item" ><span onClick={() => this.requestPreviousGeoJson(fileName)}>{index+1}: {fileName}</span> <span onClick={() => this.deletePreviousGeojson(fileName)}><i className="fas fa-times-circle" ></i></span></li>
                      )

                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
              Save the progress:
              <br/>
              <input type="text" name="newFileName"
                onChange={e=> {this.handleConstraintChange(e)}}
                style={{width:"70px"}}
                value={this.state.newFileName}/>.json
              &nbsp;&nbsp;
              <button
               type="button"
               className="btn btn-success"
               onClick={this.saveMap}
               disabled={!this.state.inactiveButtonController}
              >
                Save
              </button>
              <br/><br/>
              Reset the Map:&nbsp;&nbsp;
              <button
               type="button"
               className="btn btn-success"
               onClick={this.resetMap}
               disabled={!this.state.inactiveButtonController}
              >
                Reset
              </button>

              <br/><br/>
              Display Original Map:&nbsp;&nbsp;
              <button
               type="button"
               className="btn btn-primary"
               onClick={this.showOrigninalMap}
               >
                Show
              </button>
              <br/><br/>
              Show Analysis:&nbsp;&nbsp;
              <button
               type="button"
               className="btn btn-primary"
               onClick={this.showAnalysis}
               disabled={!this.state.inactiveButtonController}
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
              <p>Avg. Income: $ {this.state.infoboxAVGIncome}</p>
              <p>Area: {this.state.infoboxArea} mi² </p>
              <p>Number of C. D.: {this.state.infoboxNumOfCDs}</p>
              <p>Number of P. D.: {this.state.infoboxNumOfPDs}</p>
            </div>
          }
        </div>
      </div>
      <div className="col-sm-12">
        <div className="page-header">
          <h3>Current Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Original data</th>
              <th scope="col">Population Variance</th>
              <th scope="col">Partisan Variance</th>
              <th scope="col">Racial Fairness</th>
              <th scope="col">Compactness</th>
              <th scope="col">Goodness</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.originalDetails.map((district,index) =>
              <tr>
                <th scope="row">{district.cdName}</th>
                <td>{district.populationVariance}</td>
                <td>{district.partisanFairness}</td>
                <td>{district.racialFairness}</td>
                <td>{district.compactness}</td>
                <td>{district.goodness}</td>
              </tr>
              )
            }
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Current data</th>
              <th scope="col">Population Variance</th>
              <th scope="col">Partisan Variance</th>
              <th scope="col">Racial Fairness</th>
              <th scope="col">Compactness</th>
              <th scope="col">Goodness</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.currentDetails.map((district,index) =>
              <tr>
                <th scope="row">{district.cdName}</th>
                <td>{district.populationVariance}</td>
                <td>{district.partisanFairness}</td>
                <td>{district.racialFairness}</td>
                <td>{district.compactness}</td>
                <td>{district.goodness}</td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

export default SingleMap;
