import React from "react";
import "./App.css";

//Components
import PlayersCar from "./components/players-car/PlayersCar";
import GameMenu from "./components/game-menu/GameMenu";
import SoundComponent from "./components/sound-component/SoundComponent";
import ObstacleVehicle from "./components/obstacle-vehicle/ObstacleVehicle";
class App extends React.Component {
  numberOfObstacles = 6;
  playersCarContext = null;
  carSpeed = 3;
  animationID = null;
  obstacleID = null;
  moveMents = {};
  gameKeysArray = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  //audio
  skidAudio = null;
  accelerateAudio = null;
  idleAudio = null;

  constructor(props) {
    super(props);
    this.state = {
      playersCarLeft: 50,
      playersCarBottom: 1,
      obstaclesArray: [],
      gameMenu: true,
      gameMusic: true,
      gameSound: false,
      gameScore: 0,
      gameStarted: false,
      gamePaused: false,
      gameOver: false,
      brakeLight: false,
      boost: false,
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: false,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      animationStopper: "animation-stopper"
    };

    this.moveMents = {
      ArrowUp: EmptyFunction,
      ArrowDown: EmptyFunction,
      ArrowLeft: EmptyFunction,
      ArrowRight: EmptyFunction
    };
  }

  setGameIntervals = () => {
    this.animationID = setInterval(this.driveCar, 200);
    this.obstacleID = setInterval(this.obstacleGenerator, 3000);
  };

  clearGameIntervals = () => {
    clearInterval(this.animationID);
    clearInterval(this.obstacleID);
  };

  connectingMovements = () => {
    this.moveMents = {
      ArrowUp: this.accelerate,
      ArrowDown: this.brake,
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight
    };
  };

  disconnectingMovements = () => {
    this.moveMents = {
      ArrowUp: EmptyFunction,
      ArrowDown: EmptyFunction,
      ArrowLeft: EmptyFunction,
      ArrowRight: EmptyFunction
    };
  };

  startGame = () => {
    this.connectingMovements();
    this.setState({
      playersCarLeft: 50,
      playersCarBottom: 1,
      obstaclesArray: [],
      gameStarted: true,
      gamePaused: false,
      gameMenu: false,
      gameScore: 0,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      animationStopper: ""
    });
    this.setGameIntervals();
    this.carIdleSound();
  };

  pauseGame = () => {
    this.disconnectingMovements();
    this.clearGameIntervals();
    this.muteSound();
    this.setState({
      gameMenu: true,
      animationStopper: "animation-stopper",
      gamePaused: true
    });
  };

  resumeGame = () => {
    this.connectingMovements();
    this.setState({ gameMenu: false, animationStopper: "", gamePaused: false });
    this.setGameIntervals();
    this.carIdleSound();
  };

  gameOver = () => {
    this.pauseGame();
    this.setState({
      gameOver: true
    });
  };

  exitGame = () => {
    window.location.reload();
  };

  muteSound = () => {
    this.skidAudio.pause();
    this.skidAudio.muted = true;
    this.skidAudio.currentTime = 0;
    this.idleAudio.pause();
    this.idleAudio.muted = true;
    this.idleAudio.currentTime = 0;
    this.accelerateAudio.pause();
    this.accelerateAudio.muted = true;
    this.idleAudio.currentTime = 0;
  };

  driveCar = () => {
    this.gameKeysArray.forEach(key => {
      if (this.state.keys[key]) this.moveMents[key]();
    });

    this.state.obstaclesArray.forEach(obstacle => {
      if (this.carCrash(obstacle.obstacleId)) this.gameOver();
      return true;
    });
  };

  accelerate = () => {
    let bottom =
      this.state.playersCarBottom < 85
        ? this.state.playersCarBottom + this.carSpeed
        : 85;
    this.setState({ playersCarBottom: bottom, boost: true });

    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    if (!this.state.accelerateAudio) this.carAccelerationSound();
  };

  brake = () => {
    let bottom =
      this.state.playersCarBottom > 1
        ? this.state.playersCarBottom - this.carSpeed
        : 1;
    this.setState({ playersCarBottom: bottom, brakeLight: true });

    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    if (!this.state.skidAudio) this.tireSkidSound();
  };

  moveLeft = () => {
    let left =
      this.state.playersCarLeft > 9
        ? this.state.playersCarLeft - this.carSpeed
        : 9;
    this.setState({ playersCarLeft: left });
  };

  moveRight = () => {
    let left =
      this.state.playersCarLeft < 91
        ? this.state.playersCarLeft + this.carSpeed
        : 91;
    this.setState({ playersCarLeft: left });
  };

  carAccelerationSound() {
    this.setState({
      skidAudio: false,
      accelerateAudio: true,
      idleAudio: false
    });
    this.accelerateAudio.volume = 0.2;
    this.accelerateAudio.currentTime = 1.3;
    this.accelerateAudio.playbackRate = 1.3;
    this.accelerateAudio.play();
  }

  tireSkidSound() {
    this.setState({
      skidAudio: true,
      accelerateAudio: false,
      idleAudio: false
    });
    this.skidAudio.volume = 0.5;
    this.skidAudio.currentTime = 1.3;
    this.skidAudio.play();
  }

  carIdleSound() {
    this.setState({
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: true
    });
    this.idleAudio.volume = 0.8;
    this.idleAudio.loop = true;
    this.idleAudio.playbackRate = 0.7;
    this.idleAudio.currentTime = 0;
    this.idleAudio.play();
  }

  keyUp = event => {
    event.preventDefault();

    if (this.state.gameStarted) {
      if (!this.state.gamePaused) {
        switch (event.key) {
          case "Escape":
            this.pauseGame();
            break;
          case "ArrowUp":
            this.setState({ boost: false });
            this.accelerateAudio.pause();
            this.accelerateAudio.currentTime = 0;
            this.carIdleSound();
            break;
          case "ArrowDown":
            this.setState({ brakeLight: false });
            this.skidAudio.pause();
            this.skidAudio.currentTime = 0;
            this.carIdleSound();
            break;
          default:
            break;
        }

        if (this.gameKeysArray.includes(event.key)) {
          let keys = { ...this.state.keys };
          keys[event.key] = false;
          this.setState({ keys });
        }
      } else if (event.key === "Escape") this.resumeGame();
    }
  };

  keyDown = event => {
    event.preventDefault();
    if (
      this.state.gameStarted &&
      !this.state.gamePaused &&
      this.gameKeysArray.includes(event.key)
    ) {
      let keys = { ...this.state.keys };
      keys[event.key] = true;
      this.setState({ keys });
    }
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  carCrash = id => {
    let crash = false;
    let obstacle = document.getElementById(id).getBoundingClientRect();
    let player = this.playersCarContext.getBoundingClientRect();

    if (
      obstacle.x < player.x + player.width &&
      obstacle.x + obstacle.width > player.x &&
      obstacle.y < player.y + player.height &&
      obstacle.y + obstacle.height > player.y
    ) {
      crash = true;
    }
    return crash;
  };

  removeObstacle = obstacleId => {
    this.setState(prevState => ({
      gameScore: prevState.gameScore + 1,
      obstaclesArray: prevState.obstaclesArray.filter(
        el => el.obstacleId !== obstacleId
      )
    }));
  };

  obstacleGenerator = () => {
    let obstacleId = "Obstacle" + Date.now();

    let obstacle = (
      <ObstacleVehicle
        id={obstacleId}
        key={obstacleId}
        left={this.getRandomInt(9, 91) + "%"}
        onAnimationEnd={this.removeObstacle}
      />
    );

    let obstacleObj = { obstacleId, obstacle };

    this.setState(prevState => ({
      obstaclesArray: prevState.obstaclesArray.concat(obstacleObj)
    }));
  };

  componentDidMount() {
    this.skidAudio = document.getElementsByClassName("audio-skid")[0];
    this.accelerateAudio = document.getElementsByClassName(
      "audio-accelerate"
    )[0];
    this.idleAudio = document.getElementsByClassName("audio-idle")[0];

    this.playersCarContext = document.getElementById("playersCar");

    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    this.clearGameIntervals();
  }

  render() {
    return (
      <div
        id="container"
        className={`container ${this.state.animationStopper}`}
      >
        <SoundComponent />
        <div className="road">
          {this.state.obstaclesArray.map(el => el.obstacle)}
        </div>
        <PlayersCar
          left={this.state.playersCarLeft + "%"}
          bottom={this.state.playersCarBottom + "%"}
          brakeLight={this.state.brakeLight}
          boost={this.state.boost}
        />

        {this.state.gameMenu && (
          <GameMenu
            startGame={this.startGame}
            resumeGame={this.resumeGame}
            exitGame={this.exitGame}
            gamePaused={this.state.gamePaused}
            gameScore={this.state.gameScore}
            gameOver={this.state.gameOver}
          />
        )}
      </div>
    );
  }
}

export function EmptyFunction() {}

export default App;
