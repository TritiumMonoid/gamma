const { isAccepting, advance } = require("./automata.js");

const automaton = {
  start: "start",
  accepting: ["win", "tie", "lose"],
  transitions: {
    start: {
      rock: "rockPlay",
      paper: "paperPlay",
      scissors: "scissorsPlay"
    },
    rockPlay: {
      rock: "tie",
      paper: "lose",
      scissors: "win"
    },
    paperPlay: {
      rock: "win",
      paper: "tie",
      scissors: "lose"
    },
    scissorsPlay: {
      rock: "lose",
      paper: "win",
      scissors: "tie"
    },
    win: {},
    tie: {},
    lose: {}
  }
};

function play(state, input) {
  return advance(automaton, state, input);
}

function isResult(state) {
  return isAccepting(automaton, state);
}

module.exports = { play, isResult };
