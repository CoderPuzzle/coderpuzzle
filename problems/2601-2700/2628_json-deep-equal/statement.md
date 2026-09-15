# JSON Deep Equal

## Description

Given two values o1 and o2, return a boolean value indicating whether two
values, o1 and o2, are deeply equal.

For two values to be deeply equal, the following conditions must be met:

- If both values are primitive types, they are deeply equal if they pass
  the === equality check.
- If both values are arrays, they are deeply equal if they have the same
  elements in the same order, and each element is also deeply equal
  according to these conditions.
- If both values are objects, they are deeply equal if they have the same
  keys, and the associated values for each key are also deeply equal
  according to these conditions.

You may assume both values are the output of JSON.parse. In other words,
they are valid JSON.

Please solve it without using lodash's _.isEqual() function

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Each case stores its two
values as raw JSON text; the bundle-provided case carrier runs that text
through JSON.parse exactly as quoted above, so your code receives genuine
JavaScript values. Declare `function deepEqual(o1, o2)` plus a class
Solution whose `deepEqual` method hands your function to the carrier:
`deepEqualCase.o1` and `.o2`, returning
`deepEqual(deepEqualCase.o1, deepEqualCase.o2)`. That returned boolean is
the judged answer, compared exactly.

### Example 1

```text
Input: o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
Output: true
Explanation: The keys and values match exactly.
```

### Example 2

```text
Input: o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
Output: true
Explanation: Although the keys are in a different order, they still match
exactly.
```

### Example 3

```text
Input: o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
Output: false
Explanation: The array of numbers is different from the array of strings.
```

### Example 4

```text
Input: o1 = true, o2 = false
Output: false
Explanation: true !== false
```

### Constraints

- `1 <= JSON.stringify(o1).length <= 10⁵`
- `1 <= JSON.stringify(o2).length <= 10⁵`
- maxNestingDepth <= 1000

## Hints

### Hint 1

You can check if a value is an array with the Array.isArray() method. You can check if a value is an object by saying typeof obj === 'object' && obj !== null. You can list the keys of an object with the Object.keys() function.

### Hint 2

If two objects have different keys or two arrays have a different length, they cannot be equal.

### Hint 3

You can use recursion to investigate if the values of an object or array are also deeply equal. The base case is when the values are primitives (string, number, etc), at which case the check is a trivial === check.
