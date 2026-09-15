# Compute Alternating Sum

## Description

You are given an integer array nums.

Its alternating sum adds every element at an even index and subtracts every
element at an odd index — that is, nums[0] - nums[1] + nums[2] - nums[3] + ...
— and returns the result as one integer.

### Example 1

```text
Input: nums = [1,3,5,7]
Output: -4
Explanation: The elements at even indices are nums[0] = 1 and nums[2] = 5,
and the elements at odd indices are nums[1] = 3 and nums[3] = 7. The
alternating sum is 1 - 3 + 5 - 7 = -4.
```

### Example 2

```text
Input: nums = [100]
Output: 100
Explanation: The only index is 0, which is even, so there are no odd-index
terms and the alternating sum is just nums[0] = 100.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Hints

### Hint 1

Simulate the process as described.
