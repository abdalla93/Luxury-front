import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Post from "./Post";
function PostList() {
  const { myPosts,user,getMyPosts } = useContext(GlobalContext);
  useEffect(() => {
    getMyPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const posts=()=>{
    return (
      <>
         {myPosts.map((post) => (
        <Post key={post.id} myPosts={true} post={post} name={user.username} />
      ))}
      </>
    );
  }
  return (
    <>
      {user.posts ? posts() : ''}
    </>
  );
}

export default PostList;
