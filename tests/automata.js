const assert = require("chai").assert;
const automata = require("../src/models/automata");

describe("automata", function() {
  describe("isStart()", function() {
    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.isStart(null, "start");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.isStart({}, "start");
      }, "Invalid automaton");
    });

    it("should identify the starting state", function() {
      assert.isTrue(automata.isStart({ start: "start" }, "start"));
    });

    it("should not identify non-starting states", function() {
      assert.isFalse(automata.isStart({ start: "start" }, "foo"));
    });
  });

  describe("isAccepted()", function() {
    const automaton = {
      accepting: ["q3", "q4"]
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.isAccepted(null, "q3");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.isAccepted({}, "q3");
      }, "Invalid automaton");
    });

    it("should identify accepted states", function() {
      assert.isTrue(automata.isAccepted(automaton, "q3"));
      assert.isTrue(automata.isAccepted(automaton, "q4"));
    });

    it("should not identify not accepted states", function() {
      assert.isFalse(automata.isAccepted(automaton, "q5"));
    });
  });
});
