# Snail Traversal

## Description

Write code that enhances all arrays such that you can call the
snail(rowsCount, colsCount) method that transforms the 1D array into a 2D
array organised in the pattern known as snail traversal order. Invalid
input values should output an empty array. If rowsCount * colsCount !==
nums.length, the input is considered invalid.

Snail traversal order starts at the top left cell with the first value of
the current array. It then moves through the entire first column from top
to bottom, followed by moving to the next column on the right and
traversing it from bottom to top. This pattern continues, alternating the
direction of traversal with each column, until the entire current array
is covered. For example, when given the input array [19, 10, 3, 7, 9, 8,
5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15] with rowsCount = 5 and
colsCount = 4, the desired output matrix is shown below. Note that
iterating the matrix following the arrows corresponds to the order of
numbers in the original array.

![diagram](figures/2624-1.svg)

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only — LeetCode offers no other languages for it. Your submission still
enhances `Array` as described — add `snail(rowsCount, colsCount)` to
`Array.prototype` (TypeScript merges the method into the global `Array`
interface) implementing exactly the traversal above with invalid input
returning `[]`. The judged surface is a plain function call: your source
also declares `snail(nums, rowsCount, colsCount)` whose body invokes the
newly enhanced array (`nums.snail(rowsCount, colsCount)`), so the judge's
typed arguments pass through the same enhancement.

### Example 1

```text
Input:
nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
rowsCount = 5
colsCount = 4
Output:
[
 [19,17,16,15],
 [10,1,14,4],
 [3,2,12,20],
 [7,5,18,11],
 [9,8,6,13]
]
```

### Example 2

```text
Input:
nums = [1,2,3,4]
rowsCount = 1
colsCount = 4
Output: [[1, 2, 3, 4]]
```

### Example 3

```text
Input:
nums = [1,3]
rowsCount = 2
colsCount = 2
Output: []
Explanation: 2 multiplied by 2 is 4, and the original array [1,3] has a length of 2; therefore, the input is invalid.
```

### Constraints

- `0 <= nums.length <= 250`
- `1 <= nums[i] <= 1000`
- `1 <= rowsCount <= 250`
- `1 <= colsCount <= 250`

## Hints

### Hint 1

Different ways to approach this problem. Perhaps store a boolean if you are moving up or down and a current column. Reverse the direction and increment the column every time you hits a wall.

### Hint 2

Is there a way way to do this without storing state - by just using math?
