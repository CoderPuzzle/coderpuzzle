# Smallest Range I

## Description

You are given an integer array `nums` and an integer `k`.

In one operation, you can choose any index `i` of `nums` and change `nums[i]`
to `nums[i] + x`, where `x` is an integer from the range `[-k, k]`. You can
apply this operation at most once for each index of `nums`.

The score of `nums` is the difference between the maximum and minimum
elements in `nums`.

Return the minimum score of `nums` after applying the operation at most once
for each index in it.

### Example 1

```text
Input: nums = [1], k = 0
Output: 0
Explanation: The score is max(nums) - min(nums) = 1 - 1 = 0.
```

### Example 2

```text
Input: nums = [0,10], k = 2
Output: 6
Explanation: Change nums to be [2, 8]. The score is
max(nums) - min(nums) = 8 - 2 = 6.
```

### Example 3

```text
Input: nums = [1,3,6], k = 3
Output: 0
Explanation: Change nums to be [4, 4, 4]. The score is
max(nums) - min(nums) = 4 - 4 = 0.
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `0 <= nums[i] <= 10⁴`
- `0 <= k <= 10⁴`
