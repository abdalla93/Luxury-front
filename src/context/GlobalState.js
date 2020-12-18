import React, { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "../axios.js";
const initialState = {
  user: {
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    password: "",
    posts: [],
    id: localStorage.getItem('id')
  },
  error: false,
  loading: true,
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token')?true:false,
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  function logout() {
    dispatch({
      type: "REMOVETOKEN",
      payload: "",
    });
    localStorage.setItem('username', '')
    localStorage.setItem('email', '')
    localStorage.setItem('id', '')
    localStorage.setItem('token', '')
  }
  function setLocalstorage(data)
  {
    localStorage.setItem('username', data.username)
    localStorage.setItem('email', data.email)
    localStorage.setItem('id', data.id)
    localStorage.setItem('token', data.token)

  }
  async function loginUser(user) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/login", user, config);
      if (res.data.token) {
        dispatch({
          type: "TOKEN",
          payload: res.data.token.accessToken,
        });
        state.user.username = res.data.user.name;
        state.user.email=res.data.user.email;
        state.user.id=res.data.user.id;
        setLocalstorage({
          username:state.user.username,
          email:state.user.email,
          id:state.user.id,
          token:res.data.token.accessToken
        })
        return res.data;
      }
    } catch (err) {
     
     
    }
  }

  async function registerUser(user) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/register", user, config);
      dispatch({
        type: "TOKEN",
        payload: res.data.token.accessToken,
      });
      state.user.username = res.data.user.name;
      state.user.email=res.data.user.email;
      state.user.id=res.data.user.id;
      setLocalstorage({
        username:state.user.username,
        email:state.user.email,
        id:state.user.id,
        token:res.data.token.accessToken
      })
      return res.data;
    } catch (error) {
    }
  }
  async function getPosts() {
    try {
      const { token } = state;
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      const allPosts = await axios.get("/api/post", config);
      setAllPosts(allPosts.data.posts);
      return allPosts.data.posts;
    } catch (error) {
    }
  }
  async function getMyPosts() {
    try {
      const { token } = state;
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      const myPosts= await axios.get("/api/user/posts",config);
      setMyPosts(myPosts.data.posts);
      return myPosts.data.posts;
    } catch (error) {
    }
  }
  async function getPostsbyTag(tag) {
    try {
      const { token } = state;
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      const res= await axios.get(`/api/posts/${tag}`,config);
      setAllPosts(res.data.tag.posts);
      // console.log(res.data.tag.posts);
      return res.data.tag.posts;
    } catch (error) {
    }
  }

  async function addPost(post) {
    const { token } = state;
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    try {

      await axios.post("/api/post", post, config);
      getMyPosts()
      // console.log('Here',res);

    } catch (error) {
     
    }
  }
  async function editMyPost(post){
    const { token } = state;
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      try {
        await axios.put(`/api/post/${post.id}`, post, config);
        if(post.location === '/myPosts')
        {
          getMyPosts()
        }
        else
        {
          getPosts()
        }
      } catch (error) {
       
      }
  }
  
  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        posts: allPosts,
        myPosts:myPosts,
        error: state.error,
        loading: state.loading,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        registerUser,
        getPosts,
        addPost,
        getMyPosts,
        logout,
        getPostsbyTag,
        editMyPost
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
