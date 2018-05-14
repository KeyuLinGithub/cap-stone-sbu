import React from 'react';
import ReactDOM from 'react-dom';
class OriginalMap extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state:'US'
    };
    this.displayOriginalMap=this.displayOriginalMap.bind(this);
  }
  componentDidMount(){
    this.displayOriginalMap();
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log(nextProps.state);
    this.displayGeoJSON(nextProps.state);
    return true;
  }
  displayGeoJSON(state){
    this.removePreviousLayer();
    this.updateMapCenter(state);
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
  	  		"&dLevel="+'PD'
  	})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.layer2.addGeoJson(data);
      //add color for the layer
      var temp=this.layer2;
      this.layer2.forEach(function (feature) {
          temp.overrideStyle(feature, {
            fillColor: feature.getProperty('fill'),
            fillOpacity: 0.2,
            strokeColor: '#000000',
            strokeWeight: 1,
            zIndex: 1
          })
      });
    });
  }
  updateMapCenter(state){
    if(state==='US'){
      this.map2.setZoom(4);
      this.map2.setCenter({lat: 40, lng: -98});
    }else if(state==='CO'){
      this.map2.setZoom(7);
      this.map2.setCenter({lat: 39, lng: -105.7821});
    }else if(state==='NH'){
      this.map2.setZoom(8);
      this.map2.setCenter({lat: 43.8938516, lng: -71.57239529999998});
    }else if(state==='SC'){
      this.map2.setZoom(8);
      this.map2.setCenter({lat: 33.836082, lng: -81.163727});
    }
  }
  removePreviousLayer(){
    var layer=this.layer2;
    layer.forEach(function (feature) {
        layer.remove(feature);
    });
  }
  displayOriginalMap(){
    if(this.state.showOriginalMap){
      this.setState({showOriginalMap: false});
    }else{
      this.setState({showOriginalMap: true});
    }
    console.log('here');
    if (this.props && this.props.google) {
      //map set up
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map2;
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
      this.map2 = new maps.Map(node, mapConfig);
      //data layer
      this.layer2 = new maps.Data();

      this.layer2.setMap(this.map2)
    }

  }
  render(){
    const originalStyle = {
      width: '100%',
      height: '120vh'
    }
    return(
      <div className="container col-sm-12">
        <div id='theOriginalMap'>
          <div className="page-header">
            <h1>Original Map</h1>
          </div>
          <div className="container col-sm-2" >
          </div>
          <div className="container col-sm-10" >
            <div ref='map2' style={originalStyle}>
              loading original map...
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default OriginalMap;
