import React from "react";
import "./GameControls.css";

import playImage from "./../../images/play.svg";
import pauseImage from "./../../images/pause.svg";
import boosterImage from "./../../images/booster.svg";
import brakeImage from "./../../images/brake.svg";
import leftImage from "./../../images/left-arrow.svg";
import rightImage from "./../../images/right-arrow.svg";

export default class GameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.arrowUp = null;
    this.arrowDown = null;
    this.arrowLeft = null;
    this.arrowRight = null;
  }

  handleTouchStart = event => {
    this.props.touchEndKeyDown(event.target.id);
  };

  handleTouchEnd = event => {
    this.props.touchStartKeyUp(event.target.id);
  };

  componentDidMount() {
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchend", this.handleTouchEnd);
  }

  render() {
    return (
      <div className="game-controller">
        {!this.props.gameOver && this.props.gameStarted && (
          <div className="p-abs p-top-left">
            <button
              className="button"
              onClick={
                this.props.gamePaused
                  ? this.props.resumeGame
                  : this.props.pauseGame
              }
            >
              {this.props.gamePaused ? (
                <img className="button--img" alt="gameKeys" src={playImage} />
              ) : (
                <img className="button--img" alt="gameKeys" src={pauseImage} />
              )}
            </button>
          </div>
        )}
        {!this.props.gameOver &&
          this.props.gameStarted &&
          !this.props.gamePaused && (
            <>
              <div className="p-abs p-bottom-left">
                <img
                  className="button--img"
                  alt="gameKeys"
                  src={boosterImage}
                  id="ArrowUp"
                />
                <img
                  className="button--img"
                  alt="gameKeys"
                  src={brakeImage}
                  id="ArrowDown"
                />
              </div>
              <div className="p-abs p-bottom-right">
                <img
                  className="button--img"
                  alt="gameKeys"
                  src={leftImage}
                  id="ArrowLeft"
                />
                <img
                  className="button--img"
                  alt="gameKeys"
                  src={rightImage}
                  id="ArrowRight"
                />
              </div>
            </>
          )}
      </div>
    );
  }
}
