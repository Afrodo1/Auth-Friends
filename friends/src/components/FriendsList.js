
import React from "react";
import AddFriend from "./AddFriends";
import { axiosWithAuth } from "../Utilities/Utilities";

class FriendsList extends React.Component {
  //sets state of friends to empty array
    state = {
    friends: [],
  };
//Once the component mounts the method getData will be called.
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
    //pulls list of friends from server.js
      .get("/api/friends/")
      .then(res => {
        console.log(res.data);
        //sets state of friends to the response data.
        this.setState({
          friends: res.data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state, "rendering");
    return (
      <div>
          <AddFriend />
        {this.state.friends.map(item => (
          <div key ={item.id}>
            <p>id: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <p>Email: {item.email}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default FriendsList;