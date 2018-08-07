const assert=require("chai").assert;
const add=require("../src/basic.js").add;

describe("add test", function() {
  it("should add 2 positive numbers", function() {
    assert.equal(add(1,2), 3);
  });

  it("should add 2 negative numbers", function() {
    assert.equal(add(-1,-2), -3);
  });
});
