# Flatten Deeply Nested Array

## Description

Given a multi-dimensional array arr and a depth n, return a flattened
version of that array.

A multi-dimensional array is a recursive data structure that contains
integers or other multi-dimensional arrays.

A flattened array is a version of that array with some or all of the
sub-arrays removed and replaced with the actual elements in that
sub-array. This flattening operation should only be done if the current
depth of nesting is less than n. The depth of the elements in the first
array are considered to be 0.

Please solve it without the built-in Array.flat method.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function flat(arr, depth)` with the behavior above; the generated `class
Solution` keeps its `run(flattenCase)` method, whose body hands your
function to the bundle-provided driver: `flattenCase.drive(flat)`. The
driver calls your function once with the case's nested array `.arr` and
depth `.n`; whatever array comes back is recorded by the driver as the
judged output shown as Output below. Depth counting follows the statement:
elements of the outermost array sit at depth 0, a sub-array at depth d is
flattened only when d < n, and sub-arrays that survive keep their entire
subtree exactly as-is.

### Example 1

```text
Input
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
Output
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
Explanation
Passing a depth of n=0 will always result in the original array. This is because the smallest possible depth of a subarray (0) is not less than n=0. Thus, no subarray should be flattened.
```

### Example 2

```text
Input
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
Output
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
Explanation
The subarrays starting with 4, 7, and 13 are all flattened. This is because their depth of 0 is less than 1. However [9, 10, 11] remains unflattened because its depth is 1.
```

### Example 3

```text
Input
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
Output
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
Explanation
The maximum depth of any subarray is 1. Thus, all of them are flattened.
```

### Constraints

- `0 <= count of numbers in arr <= 10⁵`
- `0 <= count of subarrays in arr <= 10⁵`
- `maxDepth <= 1000`
- `-1000 <= each number <= 1000`
- `0 <= n <= 1000`

## Hints

### Hint 1

Write a recursive function that keeps track of the current depth.

### Hint 2

if the current depth >= the maximum depth, always just push the value to the returned array. Otherwise recursively call flat on the array.
