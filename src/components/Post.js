import React, { useState,useContext } from "react";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLocation } from 'react-router-dom'
import { GlobalContext } from "../context/GlobalState";

const Post = ({ post,name,myPosts }) => {
  const { editMyPost } = useContext(GlobalContext);
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  let EditTags=[]
     post.tags.forEach(tag=>{
     EditTags.push(tag.name)
  })
  const [editpost, setpost] = useState({
    id:post.id,
    text: post.text,
    tags: `#${EditTags.join('#')}`,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const chagnePost=()=>{
    setOpen(false);
    let tags=editpost.tags.split('#')
    tags.shift()
    const newPost = {
      id:editpost.id,
      text: editpost.text,
      tags,
      location:location.pathname
    };
    editMyPost(newPost)
    
  }
  const handleClose = () => {
    setOpen(false);
  };
  const editButton = () => {
    return (
      <IconButton variant="outlined" onClick={handleClickOpen}>
      <EditIcon  style={{ fontSize: 18,color: '#42a5f5',float:'right' }}/>
    </IconButton>
    )
  };
  function handleChange(event) {
    const { name, value } = event.target;

    setpost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }

  const tags=()=>{  
    return(
      <div >
        Tags:
          {post.tags.map((tag) => (
        <p style={{'font-size': "11px",display : 'inline',color:'#1e88e5'}}>#{tag.name} </p> 
      ))}
      </div>
      )
    }
  return (
    <div className="note">
    <div >
    <AccountCircleSharpIcon  />
      <h1  style={{display : 'inline'}}> {name}</h1>
    </div>
      <hr/>
      <div>
      <p style={{display : 'inline'}}>{post.text}</p>
      {myPosts && editButton()}

     
      </div>
      {post.tags && tags()}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
        <DialogContent>
        <TextField
          onChange={handleChange}
          name="text"
          placeholder= "What is in your mind..."
          value={editpost.text}
        />
        </DialogContent>
        <DialogContent>
        <TextField
            onChange={handleChange}
            name="tags"
            placeholder=""
            rows="3"
            value={editpost.tags}
          />
        </DialogContent>
        <DialogActions>
        <IconButton variant="outlined" onClick={chagnePost}>
          <EditIcon  style={{ fontSize: 18,color: '#42a5f5',float:'right' }}/>
        </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Post;
