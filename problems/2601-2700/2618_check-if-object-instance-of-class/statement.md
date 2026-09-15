# Check if Object Instance of Class

## Description

Write a function that checks if a given value is an instance of a given
class or superclass. For this problem, an object is considered an instance
of a given class if that object has access to that class's methods.

There are no constraints on the data types that can be passed to the
function. For example, the value or the class could be undefined.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`class Solution` with the method `solve(instanceOfCase)`, where
`instanceOfCase` is a bundle-provided `InstanceOfCase` carrying `.obj`, the
value handed to `checkIfInstanceOf` as its first argument, and `.cls`, the
class handed over as its second. Both arrive as live JavaScript values,
materialized by the judge from declarative descriptors: `{"kind":
"undefined"}` becomes `undefined`, `{"kind": "null"}` becomes `null`,
`{"kind": "value", "value": v}` becomes the raw JSON scalar, array, or
object `v`, `{"kind": "date"}` becomes a fresh `Date`,
`{"kind": "builtin", "name": X}` becomes the built-in constructor named
`X`, and `{"kind": "arrow"}` becomes an arrow function. Classes declared in
the case's table (`name`, plus which existing class it extends) are
reachable as `{"kind": "named", "name": N}` for the constructor itself or
`{"kind": "instance", "of": N}` for a fresh instance of it. Define
`checkIfInstanceOf(obj, classFunction)` at top level exactly as the
signature above suggests, then have `solve` return its result for the
case's pair — the judged answer is precisely that boolean.

### Example 1

```text
Input: func = () => checkIfInstanceOf(new Date(), Date)
Output: true
Explanation: The object returned by the Date constructor is, by definition, an instance of Date.
```

### Example 2

```text
Input: func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
Output: true
Explanation:
class Animal {};
class Dog extends Animal {};
checkIfInstanceOf(new Dog(), Animal); // true

Dog is a subclass of Animal. Therefore, a Dog object is an instance of both Dog and Animal.
```

### Example 3

```text
Input: func = () => checkIfInstanceOf(Date, Date)
Output: false
Explanation: A date constructor cannot logically be an instance of itself.
```

### Example 4

```text
Input: func = () => checkIfInstanceOf(5, Number)
Output: true
Explanation: 5 is a Number. Note that the "instanceof" keyword would return false. However, it is still considered an instance of Number because it accesses the Number methods. For example "toFixed()".
```

### Constraints

- Each case materializes one `(obj, cls)` pair from the descriptor kinds
  above; any kind may appear on either side, so either argument can be
  undefined or any other JavaScript value.
- Declared class tables hold between zero and thirty entries, and chains
  never extend past thirty links deep.
- `solve` returns its single boolean verdict synchronously.

## Hints

### Hint 1

In Javascript, inheritance is achieved with the prototype chain.

### Hint 2

You can get the prototype of an object with the Object.getPrototypeOf(obj) function. Alternatively, you can code obj['**proto**'].

### Hint 3

You can compare an object's **proto** with classFunction.prototype.

### Hint 4

Traverse the entire prototype chain until you find a match.
