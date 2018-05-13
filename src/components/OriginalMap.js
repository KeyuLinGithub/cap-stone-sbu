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
  getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps);
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
            text
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
