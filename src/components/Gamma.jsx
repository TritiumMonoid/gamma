import React, { Component } from "react";
import ReactDOM from "react-dom";
import RockButton from "./RockButton.jsx";
import PaperButton from "./PaperButton.jsx";
import ScissorsButton from "./ScissorsButton.jsx";

export default class Gamma extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  playRock() {
    alert("You played rock!");
  }

  playPaper() {
    alert("You played paper!");
  }

  playScissors() {
    alert("You played scissors!");
  }

  render() {
    return (
      <div>
        <h1>Hello, let's play!</h1>
        <br />
        <RockButton onClick={this.playRock.bind(this)} />
        <PaperButton onClick={this.playPaper.bind(this)} />
        <ScissorsButton onClick={this.playScissors.bind(this)} />
      </div>
    );
  }
}
