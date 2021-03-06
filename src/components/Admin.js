import React from 'react';
import { Link } from 'react-router-dom';
import NewUser from './NewUser';
class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allUsers:[],
      currentUserIndex: 0,
      currentFirstName: '',
      currentLastName: '',
      currentPreferParty: 'REPUBLICAN',
      currentEmail:''
    };
    this.changeCurrentPerson=this.changeCurrentPerson.bind(this);
    this.submitChange=this.submitChange.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
    this.changePropertyFile=this.changePropertyFile.bind(this);
  }
  componentDidMount () {
    this.loadUsers();

  }
  changeCurrentPerson(index){
    this.setState({
      currentUserIndex: index
    })
    this.loadUserInfo(index);

    console.log("change user only");
  }

  changePropertyFile(){
    fetch("http://localhost:8080/RedistrictSystem/editProperties.do")
    .catch(err => console.log(err));
  }
  handleInput (event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({[name]: value});
  }
  deleteUser(index){
    if(window.confirm('Are you sure you want to delete this user?')){
      if(this.state.currentUserIndex!=0 && this.state.currentUserIndex==index){
        this.setState({currentUserIndex: index-1});
      }
      var deleteEmail=this.state.allUsers[index].email;
      fetch("http://localhost:8080/RedistrictSystem/deleteUser.do", {
    	  method: "POST",
    	  credentials: 'include',
    	  headers: {
    	    "Content-Type": "application/x-www-form-urlencoded"
    	  },
        body: "email="+deleteEmail
    	})
      .catch(err => console.log(err));

      var newList=this.state.allUsers
      newList.splice(index, 1);
      this.setState({allUsers: newList});
    }
    console.log("delete only");
  }
  submitChange(){
    console.log(this.state);
    //change locally
    var list=this.state.allUsers;
    list[this.state.currentUserIndex].firstName=this.state.currentFirstName;
    list[this.state.currentUserIndex].lastName=this.state.currentLastName;
    list[this.state.currentUserIndex].party=this.state.currentPreferParty;
    this.setState({
      allUsers: list
    });
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
    .then(response => response.json())
    .then(data => {
      this.loadUsers();
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
    console.log(this.state);
    var theUser=this.state.allUsers[index];
    this.setState({
      currentFirstName: theUser.firstName,
      currentLastName: theUser.lastName,
      currentPreferParty: theUser.party,
      currentEmail:theUser.email
    });
  }
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Admin</h1>
        </div>
        <div className="panel-group">

          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href="#collapse2">
                  Admin/User Management-Edit User
                </a>
              </h4>
            </div>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body">
                <div id='content' className="col-sm-4">
                  <ul className="list-group">
                    {this.state.allUsers &&
                      this.state.allUsers.map((user,index) =>
                        <li className="list-group-item" ><span onClick={() => this.changeCurrentPerson(index)}>{index+1}: {user.firstName} {user.lastName}</span> <span onClick={() => this.deleteUser(index)}><i className="fas fa-times-circle" ></i></span></li>
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
                     name="currentFirstName"
                     value={this.state.currentFirstName}
                     onChange={this.handleInput}
                    />
                    </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                     type="text"
                     className="form-control"
                     name="currentLastName"
                     value={this.state.currentLastName}
                     onChange={this.handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Party</label><br />
                    <select id="PreferredParty"
                     name='currentPreferParty'
                     value={this.state.currentPreferParty}
                     onChange={this.handleInput}
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
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href="#collapse1">
                  Admin/User Management-Add User
                </a>
              </h4>
            </div>
            <div id="collapse1" className="panel-collapse collapse">
              <div className="panel-body">
                <NewUser loadUsers={this.loadUsers}/>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" href="#collapse3">Admin/File Management</a>
              </h4>
            </div>
            <div id="collapse3" className="panel-collapse collapse">
              <div className="panel-body">
                <button type="button" className="btn btn-primary" onClick={this.changePropertyFile} >
                  Change the Property File
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

export default Admin;
