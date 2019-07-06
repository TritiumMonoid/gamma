const assert = require("chai").assert;
const automata = require("../src/models/automata");

describe("automata", function() {
  describe("isStart()", function() {
    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.isStart(null, "q0");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.isStart({}, "q0");
      }, "Invalid automaton");
    });

    it("should identify the starting state", function() {
      assert.isTrue(automata.isStart({ start: "q0" }, "q0"));
    });

    it("should not identify non-starting states", function() {
      assert.isFalse(automata.isStart({ start: "q0" }, "q1"));
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

  describe("inputsFrom()", function() {
    const automaton = {
      transitions: {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      }
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.inputsFrom(null, "q3");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.inputsFrom({}, "q3");
      }, "Invalid automaton");
    });

    it("should fail on invalid state", function() {
      assert.throws(function() {
        automata.inputsFrom(automaton, "q5");
      }, "Invalid state");
    });

    it("should list inputs from state", function() {
      assert.deepEqual(automata.inputsFrom(automaton, "q0"), ["a", "b"]);
    });

    it("should list no inputs from state", function() {
      assert.deepEqual(automata.inputsFrom(automaton, "q3"), []);
      assert.deepEqual(automata.inputsFrom(automaton, "q4"), []);
    });
  });

  describe("statesFrom()", function() {
    const automaton = {
      transitions: {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      }
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.statesFrom(null, "q3");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.statesFrom({}, "q3");
      }, "Invalid automaton");
    });

    it("should fail on invalid state", function() {
      assert.throws(function() {
        automata.statesFrom(automaton, "q5");
      }, "Invalid state");
    });

    it("should list states from state", function() {
      assert.deepEqual(automata.statesFrom(automaton, "q0"), ["q1", "q2"]);
    });

    it("should list no states from state", function() {
      assert.deepEqual(automata.statesFrom(automaton, "q3"), []);
      assert.deepEqual(automata.statesFrom(automaton, "q4"), []);
    });
  });

  describe("advance()", function() {
    const automaton = {
      transitions: {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      }
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.advance(null, "q3", "a");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.advance({}, "q3", "a");
      }, "Invalid automaton");
    });

    it("should fail on invalid state", function() {
      assert.throws(function() {
        automata.advance(automaton, "q5", "a");
      }, "Invalid state");
    });

    it("should fail on invalid input", function() {
      assert.throws(function() {
        automata.advance(automaton, "q3", "a");
      }, "Invalid input");
    });

    it("should be the next state", function() {
      assert.equal(automata.advance(automaton, "q0", "a"), "q1");
      assert.equal(automata.advance(automaton, "q0", "b"), "q2");
    });
  });

  describe("transition()", function() {
    const automaton = {
      transitions: {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      }
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.transition(null, "q3");
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.advance({}, "q3");
      }, "Invalid automaton");
    });

    it("should fail on invalid state", function() {
      assert.throws(function() {
        automata.advance(automaton, "q5");
      }, "Invalid state");
    });

    it("should list transitions from state", function() {
      assert.deepEqual(automata.transition(automaton, "q0"), {
        a: "q1",
        b: "q2"
      });
    });
  });

  describe("transitions()", function() {
    const automaton = {
      transitions: {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      }
    };

    it("should fail on null automaton", function() {
      assert.throws(function() {
        automata.transitions(null);
      }, "Null automaton");
    });

    it("should fail on invalid automaton", function() {
      assert.throws(function() {
        automata.transitions({});
      }, "Invalid automaton");
    });

    it("should list all transitions", function() {
      assert.deepEqual(automata.transitions(automaton), {
        q0: {
          a: "q1",
          b: "q2"
        },
        q1: {
          a: "q3"
        },
        q2: {
          b: "q4"
        },
        q3: {},
        q4: {}
      });
    });
  });
});
