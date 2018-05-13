import React from "react";

import Header from "./Header";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:''
    };
    this.setCurrentUser=this.setCurrentUser.bind(this);
  }
  setCurrentUser(userName){
    this.setState({currentUser:userName});
  }
    render() {
        return (
          <div>
            <Header setCurrentUser={this.setCurrentUser}/>
            <div>
                {this.props.children}
            </div>
          </div>
        );
    }
}
export default Root;
