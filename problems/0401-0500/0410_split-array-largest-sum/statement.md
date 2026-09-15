# Split Array Largest Sum

## Description

Given an integer array `nums` and an integer `k`, split `nums` into `k`
non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

### Example 1

```text
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays. The best
way is to split it into [7,2,5] and [10,8], where the largest sum among the
two subarrays is only 18.
```

### Example 2

```text
Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays. The best
way is to split it into [1,2,3] and [4,5], where the largest sum among the
two subarrays is only 9.
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= min(50, nums.length)`

## Hints

### Hint 1

Binary search on the answer: the minimized largest sum lies between max(nums) and sum(nums).

### Hint 2

For a candidate limit, greedily count how many subarrays are needed if no subarray sum may exceed that limit.

### Hint 3

If the greedy needs more than k subarrays the limit is too small; otherwise the limit is achievable.
