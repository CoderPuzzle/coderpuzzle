# Call Function with Custom Context

## Description

Enhance all functions to have the callPolyfill method. The method accepts
an object obj as its first parameter and any number of additional
arguments. The obj becomes the this context for the function. The
additional arguments are passed to the function (that the callPolyfill
method belongs on).

For example if you had the function:

```js
function tax(price, taxRate) {
    const totalCost = price * (1 + taxRate);
    console.log(`The cost of ${this.item} is ${totalCost}`);
}
```

Calling this function like tax(10, 0.1) will log "The cost of undefined is
11". This is because the this context was not defined.

However, calling the function like tax.callPolyfill({item: "salad"}, 10,
0.1) will log "The cost of salad is 11". The this context was
appropriately set, and the function logged an appropriate output.

Please solve this without using the built-in Function.call method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `callWithContext(callCase)`, where
`callCase` is a bundle-provided `CallCase` carrying `.fn`, the callable
built from the case's function source; `.obj`, the context target (the
first callPolyfill argument); and `.inputs`, the additional arguments for
that single call. Enhance `Function.prototype` with `callPolyfill`, then
return the result of invoking `fn.callPolyfill(obj, ...inputs)`. The
invoked function may return any JSON value — a number, string, boolean,
array, or object — or nothing at all, which is judged as null.

### Example 1

```text
Input:
fn = function add(b) {
  return this.a + b;
}
obj = {"a": 5}
inputs = [7]
Output: 12
Explanation:
fn.callPolyfill({"a": 5}, 7); // 12
callPolyfill sets the "this" context to {"a": 5}. 7 is passed as an argument.
```

### Example 2

```text
Input:
fn = function tax(price, taxRate) {
 return `The cost of the ${this.item} is ${price * taxRate}`;
}
obj = {"item": "burger"}
inputs = [10, 1.1]
Output: "The cost of the burger is 11"
Explanation: callPolyfill sets the "this" context to {"item": "burger"}.
10 and 1.1 are passed as additional arguments.
```

### Constraints

- `typeof args[0] == 'object'` and `args[0] != null`
- `1 <= args.length <= 100`
- `2 <= JSON.stringify(args[0]).length <= 10⁵`
