import React from "react";

export default function SpinnerLocal(): JSX.Element {
  return (
    <div
      style={{ position: "absolute" }}
      className="container d-flex justify-content-center align-items-center"
    >
      <div
        className="spinner-grow m-5"
        style={{ width: "3rem", height: "3rem " }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
