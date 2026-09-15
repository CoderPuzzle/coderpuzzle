# Closest Subsequence Sum

## Description

You are given an integer array `nums` and an integer `goal`.

You want to choose a subsequence of `nums` such that the sum of its elements is
the closest possible to `goal`. That is, if the sum of the subsequence's
elements is `sum`, then you want to minimize the absolute difference
`abs(sum - goal)`.

Return the minimum possible value of `abs(sum - goal)`.

Note that a subsequence of an array is an array formed by removing some
elements (possibly all or none) of the original array.

### Example 1

```text
Input: nums = [5,-7,3,5], goal = 6
Output: 0
Explanation: Choose the whole array as a subsequence, with a sum of 6.
This is equal to the goal, so the absolute difference is 0.
```

### Example 2

```text
Input: nums = [7,-9,15,-2], goal = -5
Output: 1
Explanation: Choose the subsequence [7,-9,-2], with a sum of -4.
The absolute difference is abs(-4 - (-5)) = abs(1) = 1, which is the minimum.
```

### Example 3

```text
Input: nums = [1,2,3], goal = -7
Output: 7
```

### Constraints

- `1 <= nums.length <= 40`
- `-10⁷ <= nums[i] <= 10⁷`
- `-10⁹ <= goal <= 10⁹`

## Hints

### Hint 1

The naive solution checks all possible subsequences, which works in O(2^n) — too slow for n = 40.

### Hint 2

Divide the array into two parts of nearly equal size.

### Hint 3

Enumerate all subsets of one part, list every possible subset sum, and sort that list.

### Hint 4

For each subset of the other part with sum x, binary-search the sorted list for the value nearest to goal - x.
