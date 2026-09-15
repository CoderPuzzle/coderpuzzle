# Largest Divisible Subset

## Description

Given a set of distinct positive integers `nums`, return the largest
subset `answer` such that every pair `(answer[i], answer[j])` of elements in
this subset satisfies:

- `answer[i] % answer[j] == 0`, or
- `answer[j] % answer[i] == 0`

If there are multiple solutions, return any of them.

### Example 1

```text
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.
```

### Example 2

```text
Input: nums = [1,2,4,8]
Output: [1,2,4,8]
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 2 * 10^9`
- All the integers in `nums` are unique.

## Hints

### Hint 1

Sort the numbers first: in a divisible subset ordered by value, each element must be divisible by the previous one.

### Hint 2

DP over the sorted order: dp[i] = 1 + max(dp[j]) over j < i with nums[i] % nums[j] == 0.

### Hint 3

Store a parent pointer for each index so you can walk backwards from the best endpoint to reconstruct the subset.

### Hint 4

The answer can be any largest subset; returning it in ascending order is natural after the reconstruction.
