# Partition Equal Subset Sum

## Description

Given an integer array `nums`, return `true` if you can partition the array
into two subsets such that the sum of the elements in both subsets is equal,
or `false` otherwise.

### Example 1

```text
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

### Example 2

```text
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

### Constraints

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## Hints

### Hint 1

If the total sum is odd, an equal split is impossible; otherwise the task reduces to deciding whether some subset sums to total / 2.

### Hint 2

Treat it as a 0/1 knapsack: track which sums up to total / 2 are reachable after considering each number.

### Hint 3

When updating a boolean DP table in place, iterate the sum downward so each number is used at most once.
