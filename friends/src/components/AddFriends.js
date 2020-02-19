
//importing dependencies
import React from "react";
import { axiosWithAuth } from "../Utilities/Utilities";

class AddFriend extends React.Component {
  state = {
    addFriend: {
      id: Date.now,
      name: "",
      age: "",
      email: ""
    }
  };

  handleChange = e => {
    this.setState({
        //upon each keystroke the value of each form is set to its corresponding addFriend value.
       addFriend: {...this.state.addFriend ,
        [e.target.name]: e.target.value}
      }
    );
    console.log(this.state.addFriend);
  };

  addNewFriend = e => {

    
    axiosWithAuth()
    //sends post request with values stored within addFriend to server.js 
    .post("/api/friends/", this.state.addFriend)
    .then(res => {
        console.log(res);

    //adds state value to new object array addFriends.
      this.setState({ addFriends: [...res.data]})
         this.props.history.push("/friends");
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log();
    return (
      <div>
        <form onSubmit={this.addNewFriend}>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.addFriend.name}
            onChange={this.handleChange}
          />
          Age:
          <input
            type="text"
            name="age"
            value={this.state.addFriend.age}
            onChange={this.handleChange}
          />
          Email:
          <input
            type="text"
            name="email"
            value={this.state.addFriend.email}
            onChange={this.handleChange}
          />
          <button>Add Friend</button>
        </form>
      </div>
    );
  }
}
export default AddFriend;