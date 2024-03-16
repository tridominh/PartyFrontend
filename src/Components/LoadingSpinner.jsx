import React from "react";
import "../assets/css/spinner.css"
import spinner from "../assets/img/spinner.gif"

export default function LoadingSpinner() {
  return (
    <div className="spinner">
        <img src={spinner} alt="loading"/>
    </div>
  );
}
