import React from "react";
import "./GameControls.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class GameMenu extends React.Component {

  touches = {};

  constructor(props) {
    super(props);
  }

  handleTouchStart = (event, key) => {
      this.touches[key] = setInterval(()=>{
        event.key = key;
        this.props.keyUp(event);
      },100);
      console.log("Touch Start", this.touches);

      return false;
  }

  handleTouchEnd = (event, key) => {
    clearInterval(this.touches[key]);
    event.key = key;
    this.props.keyDown(event);
    console.log("Touch END", this.touches);

    return false;
  }

  render() {
    return (
      <div className="game-controller">
        {!this.props.gameOver && this.props.gameStarted && (
        <div className="p-abs p-top-left">
          <button className="button" onClick={ this.props.gamePaused ? this.props.resumeGame : this.props.pauseGame}>
            {this.props.gamePaused ? (
              <FontAwesomeIcon icon="play-circle" />
            ) : (
              <FontAwesomeIcon icon="pause-circle" />
            )}
          </button>
        </div>
        )}
        {!this.props.gameOver && this.props.gameStarted && !this.props.gamePaused && (
          <>
            <div className="p-abs p-bottom-left">
              <button className="button" onTouchStart={ (e) => { return this.handleTouchStart(e, "ArrowUp");} } onTouchEnd={ (e) => { return this.handleTouchEnd(e, "ArrowUp");} }>
                <FontAwesomeIcon icon="space-shuttle" />
              </button>
              <button className="button" onTouchStart={ (e) => { return this.handleTouchStart(e, "ArrowDown");} } onTouchEnd={ (e) => { return this.handleTouchEnd(e, "ArrowDown");} }>
                <FontAwesomeIcon icon="wind" />
              </button>
            </div>
            <div className="p-abs p-bottom-right">
              <button className="button" onTouchStart={ (e) => { return this.handleTouchStart(e, "ArrowLeft");} } onTouchEnd={ (e) => { return this.handleTouchEnd(e, "ArrowLeft");} }>
                <FontAwesomeIcon icon="arrow-alt-circle-left" />
              </button>
              <button className="button" onTouchStart={ (e) => { return this.handleTouchStart(e, "ArrowRight");} } onTouchEnd={ (e) => { return this.handleTouchEnd(e, "ArrowRight");} }>
                <FontAwesomeIcon icon="arrow-alt-circle-right" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
