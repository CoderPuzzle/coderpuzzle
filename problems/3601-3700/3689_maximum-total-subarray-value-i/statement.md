# Maximum Total Subarray Value I

## Description

You are given an integer array `nums` of length `n` and an integer `k`.

Choose **exactly** `k` non-empty subarrays `nums[l..r]` of `nums`.
Subarrays may overlap freely, and the exact same subarray (same `l` and
same `r`) may be picked more than once.

The **value** of a subarray `nums[l..r]` is `max(nums[l..r]) -
min(nums[l..r])`, the difference between its largest and smallest
element. The **total value** is the sum of the values of all `k` chosen
subarrays.

Return the maximum possible total value you can achieve.

### Example 1

```text
Input: nums = [1,3,2], k = 2
Output: 4
Explanation: Pick nums[0..1] = [1,3]; its maximum is 3 and its minimum is
1, so its value is 3 - 1 = 2. Pick nums[0..2] = [1,3,2]; the maximum is
still 3 and the minimum is still 1, so this pick is worth 2 as well. The
total value is 2 + 2 = 4.
```

### Example 2

```text
Input: nums = [4,2,5,1], k = 3
Output: 12
Explanation: Pick nums[0..3] = [4,2,5,1] three times. Each copy has
maximum 5 and minimum 1, so each pick is worth 5 - 1 = 4, and the total
value is 4 + 4 + 4 = 12.
```

### Example 3

```text
Input: nums = [7], k = 5
Output: 0
Explanation: Every subarray of a single-element array is [7] itself,
whose maximum and minimum coincide, so each of the five picks
contributes 0.
```

### Constraints

- `1 <= n == nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁵`
- The answer fits in a signed 64-bit integer.

## Hints

### Hint 1

Choose the whole subarray k times.
