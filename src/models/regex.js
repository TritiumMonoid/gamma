function match(pattern, string) {
  let regex = new RegExp(pattern, "g");
  let matches = [];
  for (let match = regex.exec(string); match; match = regex.exec(string)) {
    matches.push(match);
  }
  return matches;
}

function repeat(pattern, times) {
  return `(${pattern}){${times}}`;
}

module.exports = { match, repeat };
