import React from 'react';
import { Link } from 'react-router-dom';

class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allUsers:[],
      currentUserIndex: 0,
      currentFirstName: '',
      currentLastName: '',
      currentPreferParty: '',
      currentEmail:''
    };
    this.changeCurrentPerson=this.changeCurrentPerson.bind(this);
    this.submitChange=this.submitChange.bind(this);
  }
  componentDidMount () {
    this.loadUsers()
  }
  changeCurrentPerson(index){
    this.setState({
      currentUserIndex: index
    })
    this.loadUserInfo(index);
  }
  submitChange(){
    //change locally
    this.state.allUsers[this.state.currentUserIndex].firstName=this.state.currentFirstName;
    this.state.allUsers[this.state.currentUserIndex].lastName=this.state.currentLastName;
    this.state.allUsers[this.state.currentUserIndex].preferParty=this.state.currentPreferParty;
    //change remotely
    fetch("http://localhost:8080/RedistrictSystem/updateUser.do", {
  	  method: "POST",
  	  credentials: 'include',
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded"
  	  },
      body: "firstName="+this.state.currentFirstName+
            "&lastName="+this.state.currentLastName+
            "&party="+this.state.currentPreferParty+
            "&email="+this.state.currentEmail
  	})
    .catch(err => console.log(err));
  }
  loadUsers(){
    fetch("http://localhost:8080/RedistrictSystem/getUsers.do")
    .then(res => res.json())
    .then(data => {
      this.setState({allUsers: data});
      this.loadUserInfo();
    })
    .catch(err => console.log(err));
  }
  loadUserInfo(index){
    var theUser=this.state.allUsers[index];
    this.setState({
      currentFirstName: theUser.firstName,
      currentLastName: theUser.lastName,
      currentPreferParty: theUser.preferParty,
      currentEmail:theUser.email
    });
  }
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Admin/User Management</h1>
        </div>
        <div id='content' className="col-sm-4">
          <ul className="list-group">
            {this.state.allUsers &&
              this.state.allUsers.map((user,index) =>
                <li className="list-group-item" onClick={() => this.changeCurrentPerson(index)}>{index+1}: {user.firstName} {user.lastName}</li>
              )
            }
          </ul>
        </div>
        <div  className="col-sm-8">
          <div className="page-header">
            <h3>The user</h3>
          </div>
          <form>
          <div className="form-group">
            <label>First Name</label>
            <input type="text"
             className="form-control"
             name="fName"
             value={this.state.currentFirstName}
            />
            </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
             type="text"
             className="form-control"
             name="lName"
             value={this.state.currentLastName}
            />
          </div>
          <div className="form-group">
            <label>Preferred Party</label><br />
            <select id="PreferredParty"
             name='party'
             value={this.state.currentPreferParty}
            >
              <option value="REPUBLICAN">REPUBLICAN</option>
              <option value="DEMOCRATIC">DEMOCRATIC</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.submitChange}>
              Save the Change
            </button>
          </div>
          </form>
        </div>
      </div>
    )
  }
};

export default Admin;
