function transitions(automaton) {
  if (automaton == null) {
    throw new Error("Null automaton");
  }
  if ("transitions" in automaton) {
    return automaton.transitions;
  } else {
    throw new Error("Invalid automaton");
  }
}

function transition(automaton, state) {
  let ts = transitions(automaton);
  if (state in ts) {
    return ts[state];
  } else {
    throw new Error("Invalid state exception");
  }
}

function advance(automaton, state, input) {
  let t = transition(automaton, state);
  if (input in t) {
    return t[input];
  } else {
    throw new Error("Invalid input exception");
  }
}

function inputsFrom(automaton, state) {
  return Object.keys(transition(automaton, state));
}

function statesFrom(automaton, state) {
  return Object.values(transition(automaton, state));
}

function isStart(automaton, state) {
  if (automaton == null) {
    throw new Error("Null automaton");
  }
  if ("start" in automaton) {
    return state == automaton.start;
  } else {
    throw new Error("Invalid automaton");
  }
}

function isAccepting(automaton, state) {
  if (automaton == null) {
    throw new Error("Null automaton");
  }
  if ("accepting" in automaton) {
    return automaton.accepting.includes(state);
  } else {
    throw new Error("Invalid automaton");
  }
}

module.exports = {
  transitions,
  transition,
  advance,
  inputsFrom,
  statesFrom,
  isStart,
  isAccepting
};
