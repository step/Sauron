const assert = require('./wrappedAssert.js');
const lib = require('../src/lib.js');
const skipIfNotPresent = require('./skipIfNotPresent.js');
const {
  makeConstant,
  makeCounterFromZero,
  makeCounterFromN,
  makeDeltaTracker,
} = lib;

describe('makeConstant', () => {
  before(skipIfNotPresent(makeConstant));

  it('should return the constant provided when fn takes no arguments', () => {
    let constantlyReturnTwo = makeConstant(2);
    let constantlyReturnString = makeConstant('hello');
    let constantlyReturnArray = makeConstant([1, 2, 3]);
    let constantlyReturnObject = makeConstant({a: 1, b: 2});
    assert._equal(2, constantlyReturnTwo);
    assert._equal('hello', constantlyReturnString);
    assert._deepEqual([1, 2, 3], constantlyReturnArray);
    assert._deepEqual({a: 1, b: 2}, constantlyReturnObject);
  });

  it('should return the constant provided when function takes a single argument', () => {
    let constantlyReturnTwo = makeConstant(2);
    let constantlyReturnString = makeConstant('hello');
    let constantlyReturnArray = makeConstant([1, 2, 3]);
    let constantlyReturnObject = makeConstant({a: 1, b: 2});
    assert._equal(2, constantlyReturnTwo, 1);
    assert._equal('hello', constantlyReturnString, 1);
    assert._deepEqual([1, 2, 3], constantlyReturnArray, 1);
    assert._deepEqual({a: 1, b: 2}, constantlyReturnObject, 1);
  });

  it('should not modify array or object references', () => {
    let a = [1, 2, 3];
    let constantlyReturnArray = makeConstant(a);
    assert._deepEqual([1, 2, 3], constantlyReturnArray);
    assert.deepEqual([1, 2, 3], a);

    let b = {a: 1, b: 2};
    let constantlyReturnObject = makeConstant(b);
    assert._deepEqual({a: 1, b: 2}, constantlyReturnObject);
    assert.deepEqual({a: 1, b: 2}, b);
  });
});

describe('makeCounterFromZero', () => {
  before(skipIfNotPresent(makeCounterFromZero));

  it('should create a counter that starts counting at 0', () => {
    let count = makeCounterFromZero();
    assert._equal(0, count);
  });

  it('should create a counter that starts at 0 and increments count for every call', () => {
    let count = makeCounterFromZero();
    assert._equal(0, count);
    assert._equal(1, count);
  });

  it('should allow creation of multiple counters that can be updated independently', () => {
    let count_1 = makeCounterFromZero();
    let count_2 = makeCounterFromZero();
    assert._equal(0, count_1);
    assert._equal(1, count_1);
    assert._equal(0, count_2);
    assert._equal(1, count_2);
    assert._equal(2, count_1);
  });
});

describe('makeCounterFromN', () => {
  before(skipIfNotPresent(makeCounterFromN));

  it('should make a counter that begins counting from the number given', () => {
    let count = makeCounterFromN(2);
    assert._equal(2, count);
  });

  it('should create a counter that starts at the given number and increments count for every call', () => {
    let count = makeCounterFromN(2);
    assert._equal(2, count);
    assert._equal(3, count);
  });

  it('should allow creation of multiple counters from N that can be updated independently', () => {
    let count_1 = makeCounterFromN(2);
    let count_2 = makeCounterFromN(3);
    assert._equal(2, count_1);
    assert._equal(3, count_1);
    assert._equal(3, count_2);
    assert._equal(4, count_2);
    assert._equal(4, count_1);
  });

  it('should allow creation of counters that start from a negative number', () => {
    let count = makeCounterFromN(-1);
    assert._equal(-1, count);
    assert._equal(0, count);
    assert._equal(1, count);
  });
});

describe('makeDeltaTracker', () => {
  before(skipIfNotPresent(makeDeltaTracker));

  it('should make a tracker that begins tracking from the number given with a default delta of 0', () => {
    let trackDelta = makeDeltaTracker(2);
    assert._deepEqual({old: 2, delta: 0, new: 2}, trackDelta);
  });

  it('should make a tracker that begins tracking from the number given and a positive delta', () => {
    let trackDelta = makeDeltaTracker(2);
    assert._deepEqual({old: 2, delta: 1, new: 3}, trackDelta, 1);
    assert._deepEqual({old: 3, delta: 2, new: 5}, trackDelta, 2);
  });
});
