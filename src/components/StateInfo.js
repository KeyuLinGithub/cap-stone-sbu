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
      infoboxPoliticalFairness: 0
    };
  }
  componentDidMount(){
    this.getStateInfo();
  }
  getStateInfo(){
    var state=this.props.state;
    fetch("http://localhost:8080/RedistrictSystem/getStateInfo.do", {
     method: "POST",
     credentials: 'include',
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: "stateName="+state
   })
    .then(response => response.json())
    .then(data => {
      this.setState({
        infoboxPopulation:data.population,
        infoboxAVGIncome:data.aveIncome,
        infoboxNumOfCDs:data.numOfCds,
        infoboxNumOfPDs:data.numOfPds,
        infoboxArea:data.area,
        infoboxCompactness: data.compactness,
        infoboxPoliticalFairness: data.politicalFairness
      });
    });
  }
  render(){
    return(
      <div className='well'>
        <h3>{this.props.stateName}:</h3>
        <p>Population: {this.state.infoboxPopulation}</p>
        <p>Avg. Income: {this.state.infoboxAVGIncome}</p>
        <p>Area: {this.state.infoboxArea} sq mi </p>
        <p>Number of C. D.: {this.state.infoboxNumOfCDs}</p>
        <p>Number of P. D.: {this.state.infoboxNumOfPDs}</p>
        <p>Compactness: {this.state.infoboxCompactness}</p>
        <p>Political Fairness: {this.state.infoboxPoliticalFairness}</p>
      </div>
    )
  }
}

export default StateInfo;