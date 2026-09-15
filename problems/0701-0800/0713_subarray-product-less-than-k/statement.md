# Subarray Product Less Than K

## Description

Given an array of integers `nums` and an integer `k`, return the number of
contiguous subarrays where the product of all the elements in the subarray is
**strictly less than** `k`.

### Example 1

```text
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
```

### Example 2

```text
Input: nums = [1,2,3], k = 0
Output: 0
```

### Constraints

- `1 <= nums.length <= 3 * 10⁴`
- `1 <= nums[i] <= 1000`
- `0 <= k <= 10⁶`

## Hints

### Hint 1

For each right end j, let opt(j) be the smallest i so that nums[i] * ... * nums[j] is less than k; opt is an increasing function of j.

### Hint 2

Maintain a sliding window whose product stays below k, shrinking from the left while the product is too large.

### Hint 3

Each time the window [left, right] is valid, it contributes right - left + 1 subarrays ending at right.
