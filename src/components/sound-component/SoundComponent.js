import React from "react";

//Audio 
// import mp3Skid from './../../audio/sound/tire-skid.wav';
// import mp3Idle from './../../audio/sound/car-idle.mp3';
// import mp3Accelerate from './../../audio/sound/car-accelerate.mp3';
import mp3Skid from './../../audio/sound/tire-skid.wav';
import mp3Idle from './../../audio/sound/car-idle.mp3';
import mp3Accelerate from './../../audio/sound/car-accelerate.mp3';
import mp3Crash from './../../audio/sound/car-crash.mp3';


export default function SoundComponent(props) {
  return (
    <div className="sound-files">
      <audio className="sound-skid" preload="auto">
        <source src={mp3Skid}></source>
      </audio>
      <audio className="sound-idle" preload="auto">
        <source src={mp3Idle}></source>
      </audio>
      <audio className="sound-accelerate" preload="auto">
        <source src={mp3Accelerate}></source>
      </audio>
      <audio className="sound-crash" preload="auto">
        <source src={mp3Crash}></source>
      </audio>
    </div>
    );
}