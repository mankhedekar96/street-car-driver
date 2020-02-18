import React from "react";
import "./GameMenu.css";

export default class GameMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stage1: true, stage2: false };
  }

  goToSettings = () => {
    this.setState({ stage1: false, stage2: true });
  };

  goToMenu = () => {
    this.setState({ stage1: true, stage2: false });
  };

  render() {
    return (
      <div className="menu">
        <h1>Street Car Driver</h1>
        {!this.props.gameOver && this.state.stage1 && (
          <div>
            {this.props.gamePaused && (
              <button className="button" onClick={this.props.resumeGame}>
                RESUME GAME
              </button>
            )}
            <button className="button" onClick={this.props.startGame}>
              {this.props.gamePaused ? "START NEW GAME" : "START GAME"}
            </button>
            <button className="button" onClick={this.goToSettings}>
              SETTINGS
            </button>
            <button className="button" onClick={this.props.exitGame}>
              Exit
            </button>
          </div>
        )}
        {!this.props.gameOver && this.state.stage2 && (
          <div>
            <button className="button" onClick={this.goToMenu}>
              Back
            </button>

            <div className="switch-row">
              <span className="switch-label">Music</span>
              <label className="switch">
                <input type="checkbox" onChange={ (e) => this.props.toggleMusic(e.target.checked)} checked={this.props.gameMusic}/>
                <span className="slider"></span>
              </label>
            </div>

            <div className="switch-row">
              <span className="switch-label">Sound</span>
              <label className="switch">
                <input type="checkbox" onChange={ (e) => this.props.toggleSound(e.target.checked) } checked={this.props.gameSound}/>
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}
        {this.props.gameOver && (
          <div>
            <h2>Game Over</h2>
            <h4>Your Score : {this.props.gameScore}</h4>
            <button className="button" onClick={this.props.initiateGame}>
              New Game
            </button>
          </div>
        )}
      </div>
    );
  }
}
