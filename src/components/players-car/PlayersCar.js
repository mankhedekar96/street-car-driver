import React from "react";
import "./PlayersCar.css";
import Flames from '../flames/Flames';
import CarImages from './../../car-images';

const carsArray = CarImages();

const randomCar = carsArray[Math.floor(Math.random() * carsArray.length)];

export default function PlayersCar (props) {
    const position = {
      left: props.left,
      bottom: props.bottom
    };
    const brakeLight = props.brakeLight
      ? { boxShadow: "0 0 12px 6px red" }
      : { boxShadow: "0 0 0px 0px red" };
  
    return (
      <div style={position} className="players-car">
        <img src={randomCar} className="players-car--img" alt="Player's Car" />
        <div style={brakeLight} className="brakelight brakelight--left"></div>
        <div style={brakeLight} className="brakelight brakelight--right"></div>
        { !props.brakeLight && props.boost && <Flames className="flames--left"/>}
        { !props.brakeLight && props.boost && <Flames className="flames--right"/>}
      </div>
    );
  };