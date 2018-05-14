import React from 'react';
import ReactDOM from 'react-dom';

class StateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoboxPopulation:0,
      infoboxAVGIncome:0,
      infoboxNumOfCDs:0,
      infoboxNumOfPDs:0,
      infoboxArea:0,
      infoboxCompactness: 0,
      infoboxPoliticalFairness: 0,
      infoboxGoodness: 0,
      infoboxRacialFairness: 0,
      details:[],
      year:'1997'
    };
  }
  componentDidMount(){
    this.requestState('1997');
    console.log("000");
  }
  shouldComponentUpdate(nextProps, nextState){
    //console.log(nextProps.year);
    //this.requestState(nextProps.year);
    if(nextProps.year===this.state.year){
       console.log("111");
       return false;
    }
    // this.setState({year:nextProps.year});
    // this.requestState(nextProps.year);
    console.log("222");
    return true;
  }
  requestState(year){
    var state=this.props.state;
    var dLevel='PD';
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
      this.getStateInfo(year);
      });
  }
  getStateInfo(year){
    var state=this.props.state;

    fetch("http://localhost:8080/RedistrictSystem/getCompareState.do", {
     method: "POST",
     credentials: 'include',
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: "stateName="+state+
          "&year="+year
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
        infoboxCompactness: data.compactness,
        infoboxPoliticalFairness: data.politicalFairness,
        infoboxGoodness: data.goodness,
        infoboxRacialFairness: data.racialFairness,
        details: data.details
      });
    });
  }
  render(){
    return(
      <div>
        <div className='well col-sm-3' >
          <h3>{this.props.stateName}:</h3>
          <p>Population: {this.state.infoboxPopulation}</p>
          <p>Avg. Income: {this.state.infoboxAVGIncome}</p>
          <p>Area: {this.state.infoboxArea} mi² </p>
          <p>Number of C. D.: {this.state.infoboxNumOfCDs}</p>
          <p>Number of P. D.: {this.state.infoboxNumOfPDs}</p>
          <p>Compactness: {this.state.infoboxCompactness}</p>
          <p>Political Fairness: {this.state.infoboxPoliticalFairness}</p>
          <p>Racial Fairness: {this.state.infoboxRacialFairness}</p>
          <p>Goodness: {this.state.infoboxGoodness}</p>
        </div>
        <div className="col-sm-9">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equal Population</th>
              <th scope="col">Partisan Fairness</th>
              <th scope="col">Racial Fairness</th>
              <th scope="col">Compactness</th>
              <th scope="col">Goodness</th>
              <th scope="col">Representative</th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.details.map((district,index) =>
              <tr>
                <th scope="row">{district.cdName}</th>
                <td>{district.populationVariance}</td>
                <td>{district.partisanFairness}</td>
                <td>{district.racialFairness}</td>
                <td>{district.compactness}</td>
                <td>{district.goodness}</td>
                <td>{district.representive}</td>
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

export default StateInfo;
