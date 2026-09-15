# Memoize

## Description

Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the
same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and
factorial.

- sum accepts two integers a and b and returns a + b. Assume that if a
  value has already been cached for the arguments (b, a) where a != b, it
  cannot be used for the arguments (a, b). For example, if the arguments
  are (3, 2) and (2, 3), two separate calls should be made.
- fib accepts a single integer n and returns 1 if n <= 1 or
  fib(n - 1) + fib(n - 2) otherwise.
- factorial accepts a single integer n and returns 1 if n <= 1 or
  factorial(n - 1) * n otherwise.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function memoize(fn)` with the behavior above; the generated `class
Solution` keeps its `run(memoizeCase)` method, whose body hands your
function to the bundle-provided driver: `memoizeCase.drive(memoize)`. The
driver builds the underlying function named by the case's `fnName`
(counting every real call it receives), then replays the case's
`actions`/`values` script against your memoized wrapper — `call` rows pass
the arguments through and record what comes back, while `getCallCount`
rows record how many times the UNDERLYING function has actually been
invoked so far. The recorded transcript is the judged output shown as
Output below.

### Example 1

```text
Input:
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
Output: [4,4,1,3,2]
Explanation:
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
// "getCallCount" - total call count: 1
memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
// "getCallCount" - total call count: 2
```

### Example 2

```text
Input:
fnName = "factorial"
actions = ["call","call","call","getCallCount","call","getCallCount"]
values = [[2],[3],[2],[],[3],[]]
Output: [2,6,2,2,6,2]
Explanation:
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // "call" - returns 2.
memoFactorial(3); // "call" - returns 6.
memoFactorial(2); // "call" - returns 2. However factorial was not called because 2 was seen before.
// "getCallCount" - total call count: 2
memoFactorial(3); // "call" - returns 6. However factorial was not called because 3 was seen before.
// "getCallCount" - total call count: 2
```

### Example 3

```text
Input:
fnName = "fib"
actions = ["call","getCallCount"]
values = [[5],[]]
Output: [8,1]
Explanation:
fib(5) = 8 // "call"
// "getCallCount" - total call count: 1
```

### Constraints

- `0 <= a, b <= 10⁵`
- `1 <= n <= 10`
- `1 <= actions.length <= 10⁵`
- `actions.length === values.length`
- `actions[i]` is one of "call" and "getCallCount"
- `fnName` is one of "sum", "factorial" and "fib"

## Hints

### Hint 1

You can create copy of a function by spreading function parameters.

```js
function outerFunction(passedFunction) {
  return newFunction(...params) {
    return passedFunction(...params);
  };
}
```

### Hint 2

params is an array. Since you know all values in the array are numbers, you can turn it into a string with JSON.stringify().

### Hint 3

In the outerFunction, you can declare a Map or Object. In the inner function you can avoid executing the passed function if the params have already been passed before.
