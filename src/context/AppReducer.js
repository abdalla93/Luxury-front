export default (state, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case "REMOVETOKEN":
      return {
        user: {
          username: "",
          email: "",
          password: "",
          id:"",
          posts: [],
        },
        error: null,
        loading: true,
        token: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
