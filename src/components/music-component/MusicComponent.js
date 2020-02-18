import React from "react";

import musicTrack1 from './../../audio/music/car-race-track-1.mp3';


export default function MusicComponent(props) {
  return (
    <div className="music-files">
      <audio className="music-track" preload="auto">
        <source src={musicTrack1}></source>
      </audio>
    </div>
    );
}