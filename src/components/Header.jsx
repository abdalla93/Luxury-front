import React, { useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import HighlightIcon from "@material-ui/icons/Highlight";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from '@material-ui/core/styles';


function Header(props) {
  const { user, isAuthenticated, logout,getPostsbyTag } = useContext(GlobalContext);
  const history = useHistory();
  const [tag, setTag] = useState('');
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));
  function change(event) {
    event.preventDefault();
    // console.log('Event: ', tag);
    getPostsbyTag(tag)
    setTag('')
    history.push("/all-posts");
  }
  const classes = useStyles();  
 
  const Logout = () => {
    logout();
  };
 
  const authenticatedNavBar = () => {
    return (
      <div className="right-header">
        <h3>Welcome {user.username}</h3>
        <button type="button" onClick={Logout}>
          <Link to="/" className="noBtn">
            logout
          </Link>
        </button>
      </div>
    );
  };

  const unauthenticatedNavBar = () => {
    return (
      <div className="right-header">
        <Link to="/login" className="noCss">
          <li>login</li>
        </Link>
        <Link to="/register" className="noCss">
          <li>Register</li>
        </Link>
      </div>
    );
  };
  const authenticatedPosts = () => {
    return (
      <>
      
      <div className="right-header">
     
        <Link to="/" className="noCss">
          <li>My Posts</li>
        </Link>
        <Link to="/all-posts" className="noCss">
          <li>All Posts</li>
        </Link>
      </div>

      </>
    );
  };
  const search=()=>{  
  return(
    <div className={classes.root}>
      <TextField
        label="Search By HashTag"
        value={tag} onChange={e => setTag(e.target.value)}
        InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={change}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
          )
        }}
      />
    </div>
    )
  }

  return (
    <header>
      <h1>
        <HighlightIcon />
        <Link to="/" className="noCss">
          Luxury
        </Link>
      </h1>
      <div>
      <ul>
      {!isAuthenticated ? '' : search()}
      </ul>
      </div>
      <div>
        <ul>
          {!isAuthenticated ? '' : authenticatedPosts()}
        </ul>
      </div>
      <div>
        <ul>
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </header>
  );
}

export default Header;
