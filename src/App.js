import React from "react";
import "./App.css";
import Car from "./images/car.svg";

//Components
import PlayersCar from "./components/players-car/PlayersCar";
import GameMenu from "./components/game-menu/GameMenu";
import RoadLanes from "./components/road-lanes/RoadLanes";
import AudioComponent from "./components/audio-component/audio-component";
class App extends React.Component {
  numberOfLanes = [1, 2, 3, 4, 5, 6];
  carSpeed = 3;
  animationID = null;
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
      gameMenu: true,
      gameStarted: false,
      gamePaused: false,
      brakeLight: false,
      boost: false,
      skidAudio : false,
      accelerateAudio : false,
      idleAudio : false,
      keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
      },
      animationStopper: 'animation-stopper'
    };

    this.moveMents = {
      ArrowUp: this.accelerate,
      ArrowDown: this.brake,
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight
    };
  }

  startGame = () => {
    this.setState({gameStarted: true, gameMenu : false, animationStopper:""});
    this.carIdleSound();
  }

  pauseGame = () => {
    this.muteGame();
    this.setState({gameMenu : true, animationStopper:"animation-stopper", gamePaused: true});
  }

  resumeGame = () => {
    this.setState({gameMenu : false, animationStopper:"", gamePaused: false});
    this.carIdleSound();
  }

  exitGame = () => {
      window.location.reload();
  }

  muteGame = () => {
    this.skidAudio.pause();
    this.skidAudio.currentTime = 0;
    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    this.accelerateAudio.pause();
    this.idleAudio.currentTime = 0;
  }

  driveCar = () => {
    this.gameKeysArray.forEach(key => {
      if (this.state.keys[key]) this.moveMents[key]();
    });
  };

  accelerate = () => {
    console.log("Moving Forward");
    let bottom =
      this.state.playersCarBottom < 85
        ? this.state.playersCarBottom + this.carSpeed
        : 85;
    this.setState({ playersCarBottom: bottom, boost: true });

    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    if(!this.state.accelerateAudio) this.carAccelerationSound();
  };

  brake = () => {
    console.log("Moving Backward");
    let bottom =
      this.state.playersCarBottom > 1
        ? this.state.playersCarBottom - this.carSpeed
        : 1;
    this.setState({ playersCarBottom: bottom, brakeLight: true });

    this.idleAudio.pause();
    this.idleAudio.currentTime = 0;
    if(!this.state.skidAudio)  this.tireSkidSound();
  };


  moveLeft = () => {
    console.log("Moving Left");
    let left =
      this.state.playersCarLeft > 9
        ? this.state.playersCarLeft - this.carSpeed
        : 9;
    this.setState({ playersCarLeft: left });
  };

  moveRight = () => {
    console.log("Moving Right");
    let left =
      this.state.playersCarLeft < 91
        ? this.state.playersCarLeft + this.carSpeed
        : 91;
    this.setState({ playersCarLeft: left });
  };

  carAccelerationSound() {
    this.setState({skidAudio: false,accelerateAudio: true,idleAudio: false});
    this.accelerateAudio.volume = 0.2;
    this.accelerateAudio.currentTime = 1.3;
    this.accelerateAudio.playbackRate = 1.3;
    this.accelerateAudio.play();
  }

  tireSkidSound() {
    this.setState({skidAudio: true,accelerateAudio: false,idleAudio: false});
    this.skidAudio.volume = 0.5;
    this.skidAudio.currentTime = 1.3;
    this.skidAudio.play();
  }

  carIdleSound() {
    this.setState({skidAudio: false,accelerateAudio: false,idleAudio: true});
    this.idleAudio.volume = 0.8;
    this.idleAudio.loop = true;
    this.idleAudio.playbackRate = 0.7;
    this.idleAudio.currentTime = 0;
    this.idleAudio.play();
  }

  keyUp = event => {
    event.preventDefault();

    if (event.key === "ArrowDown") {
      this.setState({ brakeLight: false });
      this.skidAudio.pause();
      this.skidAudio.currentTime = 0;
      this.carIdleSound();
    }
    if (event.key === "ArrowUp") {
      this.setState({ boost: false });
      this.accelerateAudio.pause();
      this.accelerateAudio.currentTime = 0;
      this.carIdleSound();
    }
    if (this.state.gameStarted && event.key === "Escape") {
      if(!this.state.gamePaused)
        this.pauseGame();
      else
        this.resumeGame();
    }

    console.log(event.key);

    if (this.gameKeysArray.includes(event.key)) {
      let keys = { ...this.state.keys };
      keys[event.key] = false;
      this.setState({ keys });
    }
  };

  keyDown = event => {
    event.preventDefault();
    if (this.gameKeysArray.includes(event.key)) {
      let keys = { ...this.state.keys };
      keys[event.key] = true;
      this.setState({ keys });
    }
  };

  componentDidMount() {
    this.skidAudio = document.getElementsByClassName("audio-skid")[0];
    this.accelerateAudio = document.getElementsByClassName("audio-accelerate")[0];
    this.idleAudio = document.getElementsByClassName("audio-idle")[0];


    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    this.animationID = setInterval(this.driveCar, 100);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    clearInterval(this.animationID);
  }

  render() {
    return (
      <div className={`container ${this.state.animationStopper}`}>
        <AudioComponent />
        <div className="road">
          <RoadLanes numberOfLanes={this.numberOfLanes} />
        </div>
        <PlayersCar
          car={Car}
          left={this.state.playersCarLeft + "%"}
          brakeLight={this.state.brakeLight}
          boost={this.state.boost}
          bottom={this.state.playersCarBottom + "%"}
        />
        { this.state.gameMenu && <GameMenu startGame={this.startGame} resumeGame={this.resumeGame} exitGame={this.exitGame} gamePaused={this.state.gamePaused}/>}
      </div>
    );
  }
}

export default App;
