# Bind Function to Context

## Description

Enhance all functions to have the bindPolyfill method. When bindPolyfill is
called with a passed object obj, that object becomes the this context for
the function.

For example, if you had the code:

```js
function f() {
    console.log("My context is " + this.ctx);
}
f();
```

The output would be "My context is undefined". However, if you bound the
function:

```js
function f() {
    console.log("My context is " + this.ctx);
}
const boundFunc = f.boundPolyfill({ ctx: "My Object" });
boundFunc();
```

The output should be "My context is My Object".

You may assume that a single non-null object will be passed to the
bindPolyfill method.

Please solve it without the built-in Function.bind method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `bindWithContext(fnCase)`, where `fnCase`
is a bundle-provided `FnCase` carrying `.fn`, the callable built from the
case's function source; `.obj`, the binding target; and `.inputs`, the
argument list of the single observed invocation. Enhance
`Function.prototype` with `bindPolyfill`, then return the result of
invoking `fn.bindPolyfill(obj)` with the entries of `inputs`. The invoked
function may return any JSON value — a number, string, boolean, array, or
object — or nothing at all, which is judged as null.

### Example 1

```text
Input:
fn = function f(multiplier) {
  return this.x * multiplier;
}
obj = {"x": 10}
inputs = [5]
Output: 50
Explanation:
const boundFunc = f.bindPolyfill({"x": 10});
boundFunc(5); // 50
A multiplier of 5 is passed as a parameter.
The context is set to {"x": 10}.
Multiplying those two numbers yields 50.
```

### Example 2

```text
Input:
fn = function speak() {
  return "My name is " + this.name;
}
obj = {"name": "Kathy"}
inputs = []
Output: "My name is Kathy"
Explanation:
const boundFunc = f.bindPolyfill({"name": "Kathy"});
boundFunc(); // "My name is Kathy"
```

### Constraints

- obj is a non-null object
- 0 <= inputs.length <= 100

Can you solve it without using any built-in methods?

## Hints

### Hint 1

The easiest way to solve this is to use the built-in fn.apply() method.

### Hint 2

Without built-in methods, you need to figure out a way to call the function
(this) from context object. That will associate "this" appropriately.

### Hint 3

You can create a new Symbol(). Attach the symbol to the context object and
set the method to be "this". Then call the method on the symbol.
