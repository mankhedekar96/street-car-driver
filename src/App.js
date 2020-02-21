import React from "react";
import "./App.css";

//Components
import PlayersCar from "./components/players-car/PlayersCar";
import GameMenu from "./components/game-menu/GameMenu";
import GameControls from "./components/game-controls/GameControls";
import SoundComponent from "./components/sound-component/SoundComponent";
import ObstacleVehicle from "./components/obstacle-vehicle/ObstacleVehicle";
import MusicComponent from "./components/music-component/MusicComponent";

class App extends React.Component {
  numberOfObstacles = 6;
  playersCarContext = null;
  road = null;
  carSpeed = 0.2;
  animationID = null;
  obstacleID = null;
  countdownTimerId = null;
  moveMents = {};
  gameKeysArray = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  //audio
  skidAudio = null;
  accelerateAudio = null;
  idleAudio = null;
  crashAudio = null;
  musicTrack = null;

  constructor(props) {
    super(props);
    this.state = {
      playersCarLeft: 50,
      playersCarBottom: 1,
      obstaclesArray: [],
      gameMenu: true,
      gameMusic: true,
      gameSound: true,
      gameScore: 0,
      gameStarted: false,
      gamePaused: false,
      gameOver: false,
      brakeLight: false,
      boost: false,
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: false,
      crashAudio: false,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      countDownDigit: null,
      animationStopper: "animation-stopper",
      boxShadowInset: "inset 0 0 3px 3px black"
    };

    this.connectingMovements();
  }

  initiateGame = () => {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);

    this.setState({
      playersCarLeft: 50,
      playersCarBottom: 1,
      obstaclesArray: [],
      gameMenu: true,
      gameScore: 0,
      gameStarted: false,
      gamePaused: false,
      gameOver: false,
      brakeLight: false,
      boost: false,
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: false,
      crashAudio: false,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      countDownDigit: null,
      animationStopper: "animation-stopper",
      boxShadowInset: "inset 0 0 3px 3px black"
    });

    this.unmuteSound();
  };

  setGameIntervals = () => {
    this.animationID = setInterval(this.driveCar, 1000 / 60);
    this.obstacleID = setInterval(this.obstacleGenerator, 5500);
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

  countDownTimer = () => {
    let counter = 3;

    this.setState({
      countDownDigit: (
        <div className="countdown-digit-container">
          {counter > 0 ? counter : "GO"}
        </div>
      )
    });

    this.countdownTimerId = setInterval(() => {
      counter--;

      if (counter < 0) {
        clearInterval(this.countdownTimerId);
        this.setState({ countDownDigit: null });
        return 0;
      } else {
        this.setState({
          countDownDigit: (
            <div className="countdown-digit-container">
              {counter > 0 ? counter : "GO"}
            </div>
          )
        });
      }
    }, 1000);
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
    this.countDownTimer();
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
    this.unmuteSound();
    this.carIdleSound();
  };

  gameOver = () => {
    if (this.state.gameSound) this.carCrashSound();

    this.muteSound();

    this.setState({
      animationStopper: "animation-stopper",
      boxShadowInset: "inset 0 0 45px 25px black"
    });
    this.disconnectingMovements();
    this.clearGameIntervals();

    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);

    setTimeout(() => {
      this.setState({
        gameMenu: true,
        gameOver: true
      });
    }, 1000);
  };

  exitGame = () => {
    window.location.reload();
  };

  musicTrackPlay = () => {
    if (this.state.gameMusic) {
      this.musicTrack.volume = 0.8;
      this.musicTrack.loop = true;
      this.musicTrack.currentTime = 0;
      this.musicTrack.play();
    }
  };

  muteSound = () => {
    if (this.state.gameSound) {
      this.accelerateAudio.muted = this.idleAudio.muted = this.skidAudio.muted = true;
      this.skidAudio.currentTime = this.idleAudio.currentTime = this.accelerateAudio.currentTime = 0;
      this.idleAudio.pause();
      this.skidAudio.pause();
      this.accelerateAudio.pause();
    }
  };

  unmuteSound = () => {
    if (this.state.gameSound) {
      this.skidAudio.muted = this.idleAudio.muted = this.accelerateAudio.muted = false;
    }
  };

  toggleSound = val => {
    this.setState({ gameSound: val });
    if (!val)
      this.skidAudio.muted = this.idleAudio.muted = this.accelerateAudio.muted = !val;
  };

  toggleMusic = val => {
    this.setState({ gameMusic: val });
    this.musicTrack.muted = !val;
  };

  driveCar = () => {
    this.state.obstaclesArray.forEach(obstacle => {
      if (!this.carCrash(obstacle.obstacleId)) {
        this.gameKeysArray.forEach(key => {
          if (this.state.keys[key]) this.moveMents[key]();
        });
      } else {
        this.gameOver();
      }
    });
  };

  accelerate = () => {
    let bottom =
      this.state.playersCarBottom < 85
        ? this.state.playersCarBottom + this.carSpeed
        : 85;
    this.setState({
      playersCarBottom: bottom,
      boost: true
    });

    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    if (!this.state.accelerateAudio) this.carAccelerationSound();
  };

  brake = () => {
    let bottom =
      this.state.playersCarBottom > 1
        ? this.state.playersCarBottom - this.carSpeed
        : 1;
    this.setState({
      playersCarBottom: bottom,
      brakeLight: true
    });

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

  carAccelerationSound = () => {
    this.setState({
      skidAudio: false,
      accelerateAudio: true,
      idleAudio: false,
      crashAudio: false
    });
    this.accelerateAudio.volume = 0.8;
    this.accelerateAudio.currentTime = 1.3;
    this.accelerateAudio.playbackRate = 1.3;
    this.accelerateAudio.play();
  };

  tireSkidSound = () => {
    this.setState({
      skidAudio: true,
      accelerateAudio: false,
      idleAudio: false,
      crashAudio: false
    });
    this.skidAudio.volume = 0.8;
    this.skidAudio.currentTime = 1.3;
    this.skidAudio.play();
  };

  carIdleSound = () => {
    this.setState({
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: true,
      crashAudio: false
    });
    this.idleAudio.volume = 1;
    this.idleAudio.loop = true;
    this.idleAudio.playbackRate = 0.7;
    this.idleAudio.currentTime = 0;
    this.idleAudio.play();
  };

  carCrashSound = () => {
    this.setState({
      skidAudio: false,
      accelerateAudio: false,
      idleAudio: false,
      crashAudio: true
    });
    this.crashAudio.volume = 1;
    this.crashAudio.muted = false;
    this.crashAudio.playbackRate = 1.2;
    this.crashAudio.play();
  };

  keyUp = event => {
    event.preventDefault();
    this.touchStartKeyUp(event.key);
  };

  touchStartKeyUp = key => {
    if (this.state.gameStarted) {
      if (!this.state.gamePaused) {
        switch (key) {
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

        if (this.gameKeysArray.includes(key)) {
          let keys = { ...this.state.keys };
          keys[key] = false;
          this.setState({ keys });
        }
      } else if (key === "Escape") this.resumeGame();
    }
  };

  keyDown = event => {
    event.preventDefault();
    this.touchEndKeyDown(event.key);
  };

  touchEndKeyDown = key => {
    if (
      this.state.gameStarted &&
      !this.state.gamePaused &&
      this.gameKeysArray.includes(key)
    ) {
      let keys = { ...this.state.keys };
      keys[key] = true;
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
      obstacle.left < player.left + player.width &&
      obstacle.left + obstacle.width > player.left &&
      obstacle.top < player.top + player.height &&
      obstacle.top + obstacle.height > player.top
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

    let animationTime = `${this.getRandomInt(10, 12)}.${this.getRandomInt(
      0,
      9
    )}s`;

    let obstacle = (
      <ObstacleVehicle
        id={obstacleId}
        key={obstacleId}
        animationDuration={animationTime}
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
    this.skidAudio = document.getElementsByClassName("sound-skid")[0];
    this.accelerateAudio = document.getElementsByClassName(
      "sound-accelerate"
    )[0];
    this.idleAudio = document.getElementsByClassName("sound-idle")[0];
    this.crashAudio = document.getElementsByClassName("sound-crash")[0];
    this.musicTrack = document.getElementsByClassName("music-track")[0];
    this.playersCarContext = document.getElementById("playersCar");
    this.road = document.getElementById("road");

    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    window.addEventListener("load", this.musicTrackPlay);
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
        <MusicComponent />
        <SoundComponent />
        <div
          id="road"
          className="road"
          style={{
            boxShadow: this.state.boxShadowInset
          }}
        >
          {this.state.countDownDigit}
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
            initiateGame={this.initiateGame}
            startGame={this.startGame}
            resumeGame={this.resumeGame}
            exitGame={this.exitGame}
            gamePaused={this.state.gamePaused}
            gameScore={this.state.gameScore}
            gameOver={this.state.gameOver}
            gameSound={this.state.gameSound}
            gameMusic={this.state.gameMusic}
            toggleMusic={this.toggleMusic}
            toggleSound={this.toggleSound}
          />
        )}
        <GameControls
          gameStarted={this.state.gameStarted}
          gamePaused={this.state.gamePaused}
          gameOver={this.state.gameOver}
          pauseGame={this.pauseGame}
          resumeGame={this.resumeGame}
          touchStartKeyUp={this.touchStartKeyUp}
          touchEndKeyDown={this.touchEndKeyDown}
          gameKeysArray={this.gameKeysArray}
        />
      </div>
    );
  }
}

export function EmptyFunction() {}

export default App;
