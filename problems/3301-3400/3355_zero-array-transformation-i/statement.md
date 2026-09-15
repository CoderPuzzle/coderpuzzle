# Zero Array Transformation I

## Description

You are given an integer array `nums` of length `n` and a 2D array `queries`,
where `queries[i] = [li, ri]`.

For each `queries[i]`:

- Select a subset of indices within the range `[li, ri]` in `nums`.
- Decrement the values at the selected indices by `1`.

A Zero Array is an array where all elements are equal to `0`.

Return `true` if it is possible to transform `nums` into a Zero Array after
processing all the queries sequentially, otherwise return `false`.

### Example 1

```text
Input: nums = [1,0,1], queries = [[0,2]]
Output: true
Explanation: For i = 0 we select the subset of indices as [0, 2] and decrement the values at these indices by 1.
The array will become [0, 0, 0], which is a Zero Array.
```

### Example 2

```text
Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]
Output: false
Explanation: For i = 0 we select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
The array will become [4, 2, 1, 0].
For i = 1 we select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
The array will become [3, 1, 0, 0], which is not a Zero Array.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i].length == 2`
- `0 <= li <= ri < nums.length`

## Hints

### Hint 1

Use a difference array and prefix sums to count, for every index, how many queries cover it.

### Hint 2

Each index i can be decremented at most once per covering query, so nums can become a Zero Array exactly when every index is covered by at least nums[i] queries.
