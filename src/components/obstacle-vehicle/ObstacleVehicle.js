import React from "react";
import "./ObstacleVehicle.css";
import { Vehicles } from "./../../vehicles";

const VehicleType = ["truck", "miniTruck", "dumper", "van"];

export default function ObstacleVehicle(props) {
  const position = {
    left: props.left
  };

  const randomVehicleType = VehicleType[Math.floor(Math.random() * VehicleType.length)];
  const randomVehicle = Vehicles[randomVehicleType][Math.floor(Math.random() * Vehicles[randomVehicleType].length)]

  return (
    <div
      id={props.id}
      onAnimationEnd={() => {
        props.onAnimationEnd(props.id);
      }}
      style={position}
      className={"obstacle-vehicle " + randomVehicleType}
    >
      <img src={randomVehicle} alt="I am obstacle" />
    </div>
  );
  //   }
}
