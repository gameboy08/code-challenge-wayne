import React from "react";
import "./ErrorContent.scss";
export default function ErrorContent(props) {
    const {children} = props;
  return (
    <div className="error-container">
      {children}, please go back to{" "}
      <a href="http://localhost:3000/ ">http://localhost:3000/ </a>
    </div>
  );
}
