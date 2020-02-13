import React from "react";

//Audio 
// import mp3Skid from './../../audio/sound/tire-skid.wav';
// import mp3Idle from './../../audio/sound/car-idle.mp3';
// import mp3Accelerate from './../../audio/sound/car-accelerate.mp3';
import mp3Skid from './../../audio/sound/tire-skid.wav';
import mp3Idle from './../../audio/sound/car-idle.mp3';
import mp3Accelerate from './../../audio/sound/cars-accelerate.mp3';


export default function AudioComponent(props) {
  return (
    <div className="audio-files">
      <audio className="audio-skid" preload="auto">
        <source src={mp3Skid}></source>
      </audio>
      <audio className="audio-idle" preload="auto">
        <source src={mp3Idle}></source>
      </audio>
      <audio className="audio-accelerate" preload="auto">
        <source src={mp3Accelerate}></source>
      </audio>
    </div>
    );
}