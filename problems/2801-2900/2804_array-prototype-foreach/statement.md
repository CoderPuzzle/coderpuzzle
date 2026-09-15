# Array Prototype ForEach

## Description

Write your version of method forEach that enhances all arrays such that you
can call the array.forEach(callback, context) method on any array and it
will execute callback on each element of the array. Method forEach should
not return anything.

callback accepts the following arguments:

- currentValue - represents the current element being processed in the
  array. It is the value of the element in the current iteration.
- index - represents the index of the current element being processed in
  the array.
- array - represents the array itself, allowing access to the entire array
  within the callback function.

The context is the object that should be passed as the function context
parameter to the callback function, ensuring that the this keyword within
the callback function refers to this context object.

Try to implement it without using the built-in array methods.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(forEachCase)`, where `forEachCase`
is a bundle-provided `ForEachCase` carrying `.arr`, the JSON array under
test; `.fn`, the callable built from the case's callback source; and
`.context`, the context object from the Input. Enhance `Array.prototype`
with `forEach(callback, context)` exactly as described — arrow callbacks in
the examples are rewritten once by the carrier so that `context` truly lands
on their `this` — then call `forEachCase.collect()` once: it probes fresh
arrays of its own and throws unless your enhancement passes the full triple,
ordering, context-binding, empty-array, and no-return contract. Finish with
`forEachCase.run()`, which refuses the native `Array.prototype.forEach` as a
stand-in, drives this case's array through yours, and records its final
contents. The judged answer is exactly those final contents.

### Example 1

```text
Input:
arr = [1,2,3],
callback = (val, i, arr) => arr[i] = val * 2,
context = {"context":true}
Output: [2,4,6]
Explanation:
arr.forEach(callback, context)
console.log(arr) // [2,4,6]

The callback is executed on each element of the array.
```

### Example 2

```text
Input:
arr = [true, true, false, false],
callback = (val, i, arr) => arr[i] = this,
context = {"context": false}
Output: [{"context":false},{"context":false},{"context":false},{"context":false}]
Explanation:
arr.forEach(callback, context)
console.log(arr) // [{"context":false},{"context":false},{"context":false},{"context":false}]

The callback is executed on each element of the array with the right
context.
```

### Example 3

```text
Input:
arr = [true, true, false, false],
callback = (val, i, arr) => arr[i] = !val,
context = {"context": 5}
Output: [false,false,true,true]
```

### Constraints

- arr is a valid JSON array
- context is a valid JSON object
- fn is a function
- 0 <= arr.length <= 10⁵
