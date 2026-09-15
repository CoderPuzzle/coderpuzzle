# Counter II

## Description

Write a function createCounter. It should accept an initial integer init. It
should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript only —
LeetCode offers no other languages for it. Your submission declares `class
Solution` with the method `run(counterCase)`, where `counterCase` is a
bundle-provided `CounterIICase` carrying `.init`, the integer above, and
`.calls`, one `"increment"` / `"decrement"` / `"reset"` entry per invocation
to replay. Define `createCounter(init)` at top level exactly as the signature
above suggests, then hand it over by calling `counterCase.drive(createCounter)`
— the driver constructs your counter with `init`, invokes the requested
method once per entry, and records every return value; that recorded list is
the judged answer.

### Example 1

```text
Input:
init = 5
calls = ["increment","reset","decrement"]
Output: [6,5,4]
Explanation:
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
```

### Example 2

```text
Input:
init = 0
calls = ["increment","increment","decrement","reset","reset"]
Output: [1,2,1,0,0]
Explanation:
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
```

### Constraints

- `-1000 <= init <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i]` is one of `"increment"`, `"decrement"` and `"reset"`

## Hints

### Hint 1

You can return an object with methods.

### Hint 2

Initialize a variable for currentCount. Inside these methods, add the
appropriate logic which mutates currentCount.
