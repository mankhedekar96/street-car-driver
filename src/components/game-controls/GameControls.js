import React from "react";
import "./GameControls.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class GameMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTouchStart = (key) => {
      console.log(key);
  }

  handleTouchEnd = (key) => {
      console.log(key);
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
              <button className="button" onTouchStart={ () => this.handleTouchStart("ArrowUp") } onTouchEnd={ () => this.handleTouchEnd("ArrowUp") }>
                <FontAwesomeIcon icon="space-shuttle" />
              </button>
              <button className="button" onTouchStart={ () => this.handleTouchStart("ArrowDown") } onTouchEnd={ () => this.handleTouchEnd("ArrowDown") }>
                <FontAwesomeIcon icon="wind" />
              </button>
            </div>
            <div className="p-abs p-bottom-right">
              <button className="button" onTouchStart={ () => this.handleTouchStart("ArrowLeft") } onTouchEnd={ () => this.handleTouchEnd("ArrowLeft") }>
                <FontAwesomeIcon icon="arrow-alt-circle-left" />
              </button>
              <button className="button" onTouchStart={ () => this.handleTouchStart("ArrowRight") } onTouchEnd={ () => this.handleTouchEnd("ArrowRight") }>
                <FontAwesomeIcon icon="arrow-alt-circle-right" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
