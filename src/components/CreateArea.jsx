import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { GlobalContext } from "../context/GlobalState";

function CreateArea() {
  const { addPost } = useContext(GlobalContext);
  const [isExpanded, setExpanded] = useState(false);

  const [post, setpost] = useState({
    text: "",
    tags: "#",
  });

  function change(event) {
    let tags=post.tags.split('#')
    tags.shift()
    const newNote = {
      text: post.text,
      tags: tags,
    };

    addPost(newNote);
    setpost({ text: "", tags: "#" });
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setpost((prevPost) => {
      return {
        ...prevPost,
        [name]: value,
      };
    });
  }
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form autoComplete="off" className="create-note">
        <textarea
          required 
          onClick={expand}
          onChange={handleChange}
          name="text"
          placeholder= "What is in your mind..."
          value={post.text}
        />
        {isExpanded && (
          <>
          <input
            onChange={handleChange}
            name="tags"
            placeholder=""
            rows="3"
            value={post.tags}
          />
          <p style={{color: "red",'font-size': "10px" }}>write hashTags seprated with #</p>
          </>
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={change}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
