import React from "react";
import "./Flames.css";

export default function Flames (props){
    return (
      <div className={`flames ${props.className}`}>
        <div className="red flame"></div>
        <div className="orange flame"></div>
        <div className="yellow flame"></div>
        <div className="white flame"></div>
        <div className="blue circle"></div>
        <div className="black circle"></div>
      </div>
    );
  };