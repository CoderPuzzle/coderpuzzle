# Nested Array Generator

## Description

Given a multi-dimensional array of integers, return a generator object
which yields integers in the same order as inorder traversal.

A multi-dimensional array is a recursive data structure that contains both
integers and other multi-dimensional arrays.

inorder traversal iterates over each array from left to right, yielding any
integers it encounters or applying inorder traversal to any arrays it
encounters.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function* inorderTraversal(arr)` at top level; the generated `class
Solution` keeps its `run(generatorCase)` method, whose body hands your
generator function to the bundle-provided driver:
`generatorCase.drive(inorderTraversal)`. The driver calls your function
once with the case's nested array `.arr`, then repeatedly calls `.next()`
on the returned generator object until it reports `done`, recording every
yielded integer in arrival order as the judged output shown as Output
below.

### Example 1

```text
Input: arr = [[[6]],[1,3],[]]
Output: [6,1,3]
Explanation:
const generator = inorderTraversal(arr);
generator.next().value; // 6
generator.next().value; // 1
generator.next().value; // 3
generator.next().done; // true
```

### Example 2

```text
Input: arr = []
Output: []
Explanation: There are no integers so the generator doesn't yield anything.
```

### Constraints

- `0 <= arr.flat().length <= 10⁵`
- `0 <= arr.flat()[i] <= 10⁵`
- `maxNestingDepth <= 10⁵`

### Follow up

Can you solve this without creating a new flattened version of the array?

## Hints

### Hint 1

Generator functions can pass control to another generator function with "yield*" syntax.

### Hint 2

Generator functions can recursively yield control to themselves.

### Hint 3

You don't need to worry about recursion depth for this problem.
