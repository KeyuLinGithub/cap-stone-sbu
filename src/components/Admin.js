import React from 'react';
import { Link } from 'react-router-dom';
export class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user_page:false,
      file_page:false,
      map_page:false,
      allUsers:{}
    };
    this.handleUser=this.handleUser.bind(this);
  }
  handleUser(event) {
    this.setState({user_page: true});
  }
  componentDidMount () {
    this.loadUsers()
  }
  loadUsers(){
    
  }
  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Admin</h1>
        </div>
        <div id="pill_nav">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active" href="#">User Management</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">File Managemnet</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Map Management</a>
          </li>
        </ul>

        </div>
        <div id="contents">
        <div className="page-header">
          <h3>User Management</h3>

        </div>
        </div>

      </div>
    )
  }
};

export default Admin;
