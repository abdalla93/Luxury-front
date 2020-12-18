import React from "react";

const Message = (message) => {
  return (
    <div>
      <div role="alert" className="error">
        <h1> {message.message}</h1>
      </div>
    </div>
  );
};

export default Message;
