const { play } = require("./models/game");

let state = play("start", "rock");
console.log(state);
state = play(state, "rock");
console.log(state);
