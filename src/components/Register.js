import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { GlobalContext } from "../context/GlobalState";
import Message from "./Message";
const Register = (props) => {
  const { registerUser } = useContext(GlobalContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState('');
  function change(event) {
    event.preventDefault();
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      password2: user.password2,
    };
    if(user.username && user.email && user.password && user.password === user.password2)
    {
      registerUser(newUser).then((data) => {
        if (data) {
          const { accessToken } = data.token;
          if (accessToken) props.history.push("/myPosts");
        } else {
          setMessage('Wrong Input Data');
          setUser((prev) => {
            return {
              ...prev,
              email: "",
              password: "",
              password2: "",
            };
          });
        }
      });
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="form-style-6">
      <form required autoComplete="off" className="create-user">
        <input
          required 
          type="text"
          onChange={handleChange}
          name="username"
          value={user.username}
          placeholder="Username"
        />
        <input
          required 
          type="email"
          onChange={handleChange}
          name="email"
          value={user.email}
          placeholder="Email"
        ></input>
        <input
          required 
          type="password"
          onChange={handleChange}
          name="password"
          value={user.password}
          placeholder="Password"
        ></input>
        <input
          required 
          type="password"
          onChange={handleChange}
          name="password2"
          value={user.password2}
          placeholder="Confirm Password"
        ></input>
        <Button
          className="upload-btn"
          variant="contained"
          color="default"
          onClick={change}
          startIcon={<CloudUploadIcon />}
        >
          Register
        </Button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};
export default Register;
