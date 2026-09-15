# Memoize II

## Description

Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the
same inputs. Instead it will return a cached value.

fn can be any function and there are no constraints on what type of values it
accepts. Inputs are considered identical if they are === to each other.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only —
LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `runMemoized(memoizeCase)`, where
`memoizeCase` is a bundle-provided `MemoizeCase` carrying `.source`, the source
text of the tested function `fn`, and `.getInputs`, the source text of a
zero-argument function that returns the array of argument lists the memoized
version must replay. Inside `runMemoized` you provide the real deliverable —
a local `memoize(fn)` — then materialize both callables, replay every argument
list through your memoized wrapper, and return one row per replayed list:
`{"val": <result>, "calls": <cumulative number of fn() invocations so far>}`.
A row records the result of that replay and how many times your `fn` had been
invoked up to and including it; a correct memoizer triggers at most one new
invocation per distinct argument list. Every returned value on the wire is a
valid JSON value.

### Example 1

```text
Input:
getInputs = () => [[2,2],[2,2],[1,2]]
fn = function (a, b) { return a + b; }
Output: [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
Explanation:
const inputs = getInputs();
const memoized = memoize(fn);
for (const arr of inputs) {
  memoized(...arr);
}

For the inputs of (2, 2): 2 + 2 = 4, and it required a call to fn().
For the inputs of (2, 2): 2 + 2 = 4, but those inputs were seen before so no
call to fn() was required.
For the inputs of (1, 2): 1 + 2 = 3, and it required another call to fn() for
a total of 2.
```

### Example 2

```text
Input:
getInputs = () => [[{},{}],[{},{}],[{},{}]]
fn = function (a, b) { return ({...a, ...b}); }
Output: [{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
Explanation:
Merging two empty objects will always result in an empty object. It may seem
like there should only be 1 call to fn() because of cache-hits, however none
of those objects are === to each other.
```

### Example 3

```text
Input:
getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
fn = function (a, b) { return ({...a, ...b}); }
Output: [{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
Explanation:
Merging two empty objects will always result in an empty object. The 2nd and
3rd third function calls result in a cache-hit. This is because every object
passed in is identical.
```

### Constraints

- `1 <= inputs.length <= 10⁵`
- `0 <= inputs.flat().length <= 10⁵`
- `inputs[i][j] != NaN`

## Hints

### Hint 1

Just because JSON.stringify(obj1) === JSON.stringify(obj2), doesn't
necessarily mean obj1 === obj2.

### Hint 2

You could iterate over all previously passed inputs to check if there has
been a match. However, that will be very slow.

### Hint 3

Javascript Maps are a could way to associate arbitrary data.

### Hint 4

Make a tree structure of Maps. The depth of the tree should match the number
of input parameters.
