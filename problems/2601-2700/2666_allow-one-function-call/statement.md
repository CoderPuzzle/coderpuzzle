# Allow One Function Call

## Description

Given a function fn, return a new function that is identical to the
original function except that it ensures fn is called at most once.

The first time the returned function is called, it should return the same
result as fn. Every subsequent time it is called, it should return
undefined.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function once(fn)` with the behavior above; the generated `class
Solution` keeps its `run(onceCase)` method, whose body hands your function
to the bundle-provided driver: `onceCase.drive(once)`. The driver builds
the case's underlying function from its source string, wraps it in a call
counting shim, then replays the case's `calls` rows through your wrapper —
each row's arguments pass through in order, and any row after the first
must come back as `undefined` or the driver rejects the run outright. The
judged verdict is `[{"calls": K, "value": V}]` shown as Output below: how
many times the underlying function actually ran, and what its single real
invocation returned.

### Example 1

```text
Input:
fn = (a,b,c) => (a + b + c)
calls = [[1,2,3],[2,3,6]]
Output: [{"calls":1,"value":6}]
Explanation:
const onceFn = once(fn);
onceFn(1, 2, 3); // 6
onceFn(2, 3, 6); // undefined, fn was not called
```

### Example 2

```text
Input:
fn = (a,b,c) => (a * b * c)
calls = [[5,7,4],[2,3,6],[4,6,8]]
Output: [{"calls":1,"value":140}]
Explanation:
const onceFn = once(fn);
onceFn(5, 7, 4); // 140
onceFn(2, 3, 6); // undefined, fn was not called
onceFn(4, 6, 8); // undefined, fn was not called
```

### Constraints

- `calls` is a valid JSON array
- `1 <= calls.length <= 10`
- `1 <= calls[i].length <= 100`
- `2 <= JSON.stringify(calls).length <= 1000`
