import React from 'react';
import { Link } from 'react-router-dom';

class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allUsers:[]
    };

  }
  componentDidMount () {
    this.loadUsers()
  }
  loadUsers(){
    fetch("http://localhost:8080/RedistrictSystem/getUsers.do")
    .then(res => res.json())
    .then(data => {
      this.setState({allUsers: data});
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Admin/User Management</h1>
        </div>
        <div id='content' className="col-sm-4">
          <ul className="list-group">
            {
              this.state.allUsers.map((user,index) =>
                <li className="list-group-item">{index}: {firstName} {lastName}</li>
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
            />
            </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
             type="text"
             className="form-control"
             name="lName"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
             type="email"
             className="form-control form-control-success"
             name="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
             type="text"
             className="form-control"
             name="password"
            />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-primary">
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
