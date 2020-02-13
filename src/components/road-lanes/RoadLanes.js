import React from "react";
import "./RoadLanes.css";

export default function RoadLanes(props) {
  return props.numberOfLanes.map(element => (
    <div className="lane" key={`Lane${element}`}></div>
  ));
}
