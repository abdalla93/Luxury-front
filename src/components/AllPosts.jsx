import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Post from "./Post";
function AllPosts() {
  const { posts, getPosts,user } = useContext(GlobalContext);
  useEffect(() => {
    getPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} myPosts={post.user.id == user.id ?true:false} post={post} name={post.user.name} />
      ))}
    </>
  );
}

export default AllPosts;
