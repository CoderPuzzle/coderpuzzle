# Counter

## Description

Given an integer n, return a counter function. This counter function
initially returns n and then returns 1 more than the previous value every
subsequent time it is called (n, n + 1, n + 2, etc).

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `run(counterCase)`, where `counterCase`
is a bundle-provided `CounterCase` carrying `.n`, the integer above, and
`.calls`, one `"call"` entry per invocation to replay. Define
`createCounter(n)` at top level exactly as the signature above suggests,
then hand it over by calling `counterCase.drive(createCounter)` — the
driver constructs your counter with `n`, invokes it once per `"call"`
entry, and records every return value; that recorded list is the judged
answer.

### Example 1

```text
Input:
n = 10
["call","call","call"]
Output: [10,11,12]
Explanation:
counter() = 10 // The first time counter() is called, it returns n.
counter() = 11 // Returns 1 more than the previous time.
counter() = 12 // Returns 1 more than the previous time.
```

### Example 2

```text
Input:
n = -2
["call","call","call","call","call"]
Output: [-2,-1,0,1,2]
Explanation: counter() initially returns -2. Then increases after each sebsequent call.
```

### Constraints

- -1000 <= n <= 1000
- 0 <= calls.length <= 1000
- calls[i] === "call"

## Hints

### Hint 1

In JavaScript, a function can return a closure. A closure is defined as a function and the variables declared around it (it's lexical environment).

### Hint 2

A count variable can be initialized in the outer function and mutated in the inner function.
