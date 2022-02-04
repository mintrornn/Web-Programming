import React from "react";
import logo from "./logooo.png";
import ReactDOM from 'react-dom';
import App from './App';
import './login.css';


class Login extends React.Component {

    constructor(props) {
          super(props);
          this.state = { username: '', password: '', typ: 'password', pwd: false};
          this.handleChange = this.handleChange.bind(this);
      }
  
      handleChange(changeObject, e) {
        this.setState(changeObject);
        //to show or hide the password
        if (e.target.id === "showpwd") {
            if (this.state.pwd === false) {
                this.setState({typ: 'text'});
            } else {
                this.setState({typ: 'password'});
            }
        }
    }
  
    validate(e) {
        e.preventDefault();
        fetch("http://localhost:3000/login", { "method": "GET" })
        .then((res) => res.json()) 
        .then((data) => {
            let valid = true;
            if (data.error === false) {
              console.log(data.data);
                data.data.forEach(element => {
                    if (this.state.username === element.login_user && this.state.password === element.login_pwd) {
                        if (element.login_role === 'A') { //Admin
                            alert("you're admin");
                            valid = false;
                            ReactDOM.render(<App />, document.getElementById("root"));
                        } else { //normal user (customer)
                            window.confirm("you're customer");
                            valid = false;
                        }
                    } else if (this.state.username === element.login_user && this.state.password !== element.login_pwd) {
                        valid = false;
                        alert("password incorrect!");
                    }
                });
                if (valid === true) { alert("username incorrect!"); }
            }
        })
        .catch(err => {
            console.log(err); 
        });
    }
  
    render() {
      return (
        <form className="login-container">
          <div className="box">
            <img className="image" src={logo} alt="logo" width="90" height="100" />
            <h2>Login</h2>
            <div className="former">
              <label htmlFor='username'>Username: <br /></label>
              <input
                type='text' id='uname' name='username' placeholder="username" required
                value={this.state.username}
                onChange={(e) => this.handleChange({username: e.target.value}, e)}
              />
            </div>
  
            <div className="former">
              <label htmlFor='password'>Password: <br /></label>
              <input
                type={this.state.typ} name='password' id='password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Required at least one uppercase, lowercase letter, numbers and at least 8 or more characters" placeholder="password" required
                value={this.state.password}
                onChange={(e) => this.handleChange({password: e.target.value}, e)}
              />
              <input type="checkbox" id="showpwd" defaultChecked={this.state.pwd} onChange={(e) => this.handleChange({pwd: e.target.checked}, e)} /> Show Password <br /><br />
            </div>
            <div>
              <input type="button" id="login" value="login" onClick={(e) => this.validate(e)} />
            </div>
          </div>
  
        </form>
      );
    }
  }

  export default Login