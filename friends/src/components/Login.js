//importing React and axios dependencies
import React from "react";
import axios from 'axios';


class Login extends React.Component {
//Setting the state of the credentials to empty strings
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  //Fires upon onChange event, setting the state of credentials to that of what is inside the forms
  handleChange = e => {
      this.setState({
          credentials: {
              ...this.state.credentials,
              [e.target.name]: e.target.value
          }
      });
  };

  
  login = e => {

    //prevents page from refreshing upon submit.
    e.preventDefault();

    //upon submit sends values stored in credentials to server.js to verrify if they match.
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        console.log(res);
        
        //if they match then the payload value that 'token' is set to is sent back and then set to the localStorage value of 'token'.
        localStorage.setItem('token', res.data.payload);

        //the user is then sent to the /protected page.
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err));
  };

render() {
    return (
      <div>
          <h1>Sign In</h1>
        <form onSubmit={this.login}>
         Username: <input 
          type='text'
          name='username'
          value={this.state.credentials.username}
          onChange={this.handleChange}

          />
         Password:  <input 
          type='text'
          name='password'
          value={this.state.credentials.password}
          onChange={this.handleChange}
          />
          <button type='submit'>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;