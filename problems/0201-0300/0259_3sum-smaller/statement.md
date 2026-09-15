# 3Sum Smaller

## Description

Given an array of `n` integers `nums` and an integer `target`, find the number
of index triplets `i`, `j`, `k` with `0 <= i < j < k < n` that satisfy the
condition `nums[i] + nums[j] + nums[k] < target`.

### Example 1

```text
Input: nums = [-2,0,1,3], target = 2
Output: 2
Explanation: Because there are two triplets which sums are less than 2:
[-2,0,1] and [-2,0,3].
```

### Example 2

```text
Input: nums = [], target = 0
Output: 0
```

### Example 3

```text
Input: nums = [0], target = 0
Output: 0
```

### Constraints

- `n == nums.length`
- `0 <= n <= 3500`
- `-100 <= nums[i] <= 100`
- `-100 <= target <= 100`
- The input is generated such that the answer is less than or equal to `10⁹`.
