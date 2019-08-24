const { play } = require("./game");
const { match, repeat } = require("./regex");

function sameLength(length) {
  return function(match) {
    return match[0].length == length;
  };
}

function matchEndIndex(match) {
  return match.index + match[0].length - 1;
}

function inputsToOutcomes(inputs) {
  const outcomes = [];
  for (let i = 0; i < inputs.length; i += 2) {
    outcomes.push(play(play("start", inputs[i]), inputs[i + 1]));
  }
  return outcomes;
}

function outcomeIndexToInputIndex(index) {
  return index / 2;
}

function nextInputIndex(index) {
  return index + 3;
}

function getInput(inputs) {
  return function(index) {
    if (index < inputs.length) {
      return inputs[index];
    } else {
      return null;
    }
  };
}

function winCount(wins, games, inputs) {
  const outcomes = inputsToOutcomes(inputs);
  return match(repeat("(L|T)?W(L|T)?", wins), outcomes)
    .filter(sameLength(games))
    .map(matchEndIndex)
    .map(outcomeIndexToInputIndex)
    .map(nextInputIndex)
    .map(getInput(inputs));
}

function notLoseCount(notLoses, games, inputs) {
  const outcomes = inputsToOutcomes(inputs);
  return match(repeat("(L|T)?(W|T)(L|T)?", notLoses), outcomes)
    .filter(sameLength(games))
    .map(matchEndIndex)
    .map(outcomeIndexToInputIndex)
    .map(nextInputIndex)
    .map(getInput(inputs));
}

function sameOutcomes(expected, inputs) {
  const outcomes = inputsToOutcomes(inputs);
  return match(expected, outcomes)
    .map(matchEndIndex)
    .map(outcomeIndexToInputIndex)
    .map(nextInputIndex)
    .map(getInput(inputs));
}

function sameUserInputs(expected, inputs) {
  let expectedPattern = "";
  for (let i = 0; i < expected.length; i += 2) {
    expectedPattern += `${expected[i]}(R|P|S)`;
  }
  return match(expected, inputs)
    .map(matchEndIndex)
    .map(nextInputIndex)
    .map(getInput(inputs));
}

function sameInputs(expected, inputs) {
  return match(expected, inputs)
    .map(matchEndIndex)
    .map(nextInputIndex)
    .map(getInput(inputs));
}
