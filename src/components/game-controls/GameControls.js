import React from "react";
import "./GameControls.css";

import playImage from "./../../images/play.svg";
import pauseImage from "./../../images/pause.svg";

export default class GameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.props.gameKeysArray.forEach( key => {
      this[key] = React.createRef();
    });
  }

  handleTouchStart = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.props.touchEndKeyDown(event.target.id);
  };

  handleTouchEnd = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.props.touchStartKeyUp(event.target.id);
  };
  

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
                <button
                  className="button--img brake-bg"
                  alt="gameKeys"
                  id="ArrowDown"
                  ref={this.ArrowDown}
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                />
                <button
                  className="button--img left-bg"
                  alt="gameKeys"
                  id="ArrowLeft"
                  ref={this.ArrowLeft}
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                />
              </div>
              <div className="p-abs p-bottom-right">
                <button
                  className="button--img booster-bg"
                  alt="gameKeys"
                  id="ArrowUp"
                  ref={this.ArrowUp}
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                />
                <button
                  className="button--img right-bg"
                  alt="gameKeys"
                  id="ArrowRight"
                  ref={this.ArrowRight}
                  onTouchStart={this.handleTouchStart}
                  onTouchEnd={this.handleTouchEnd}
                />
              </div>
            </>
          )}
      </div>
    );
  }
}
