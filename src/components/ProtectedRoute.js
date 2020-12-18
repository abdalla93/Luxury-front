import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import React, {  useContext } from "react";


export const ProtectedRoute = ({

    component: Component,
  ...rest
}) => {
const {  isAuthenticated } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
