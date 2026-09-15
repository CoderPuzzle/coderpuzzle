# Minimum Numbers of Function Calls to Make Target Array

## Description

You are given an integer array `nums`. You also have an integer array
`arr` of the same length, with every value initially set to `0`.

You may repeatedly apply either of these two operations, in any order:

- **Increment**: choose a single index `i` and add `1` to `arr[i]`.
- **Double**: simultaneously multiply every element of `arr` by `2`.

![diagram](figures/1558-1.svg)

Return the minimum total number of operations needed to turn `arr` into
`nums`.

The test cases are generated so that the answer fits in a 32-bit signed
integer.

### Example 1

```text
Input: nums = [1,5]
Output: 5
Explanation: Increment index 1: [0, 0] -> [0, 1] (1 operation).
Double all elements: [0, 1] -> [0, 2] -> [0, 4] (2 operations).
Increment both indices: [0, 4] -> [1, 4] -> [1, 5] (2 operations).
Total: 1 + 2 + 2 = 5.
```

### Example 2

```text
Input: nums = [2,2]
Output: 3
Explanation: Increment both indices: [0, 0] -> [0, 1] -> [1, 1] (2 operations).
Double all elements: [1, 1] -> [2, 2] (1 operation).
Total: 2 + 1 = 3.
```

### Example 3

```text
Input: nums = [4,2,5]
Output: 6
Explanation: [0,0,0] -> [1,0,0] -> [1,0,1] -> [2,0,2] -> [2,1,2] -> [4,2,4] -> [4,2,5].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Work backwards: try to go from `nums` to `arr`.

### Hint 2

You should try to divide by 2 as much as possible, but you can only
divide by 2 if everything is even.
