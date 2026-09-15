# Chunk Array

## Description

Given an array arr and a chunk size size, return a chunked array.

A chunked array contains the original elements in arr, but consists of
subarrays each of length size. The length of the last subarray may be less
than size if arr.length is not evenly divisible by size.

Please solve it without using lodash's _.chunk function.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission declares
`function chunk(arr, size)` with the behavior above; the generated `class
Solution` keeps its `run(chunkCase)` method, whose body hands your function
to the bundle-provided driver: `chunkCase.drive(chunk)`. The driver calls
your function once with the case's `.arr` and `.size`; whatever array of
subarrays comes back is recorded by the driver as the judged output shown
as Output below.

### Example 1

```text
Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
```

### Example 2

```text
Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]
Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.
```

### Example 3

```text
Input: arr = [8,5,3,2,6], size = 6
Output: [[8,5,3,2,6]]
Explanation: Size is greater than arr.length thus all elements are in the first subarray.
```

### Example 4

```text
Input: arr = [], size = 1
Output: []
Explanation: There are no elements to be chunked so an empty array is returned.
```

### Constraints

- `arr` is a string representing the array.
- `2 <= arr.length <= 10⁵`
- `1 <= size <= arr.length + 1`
