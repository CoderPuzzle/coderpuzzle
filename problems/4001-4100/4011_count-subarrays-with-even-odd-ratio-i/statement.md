# Count Subarrays With Even Odd Ratio I

## Description

You are given an integer array `nums` and two integers `a` and `b`.

For a subarray, let:

- `x` be the number of even elements.
- `y` be the number of odd elements.

The ratio of even to odd elements in a subarray is defined as `x / y`, where
ratios are compared by their exact rational values.

A subarray is considered valid if:

- `y > 0`, and
- `x / y <= a / b`.

Return the number of valid subarrays in `nums`.

### Example 1

```text
Input: nums = [1,2,1,2], a = 3, b = 2
Output: 7
Explanation: The following are the valid subarrays:
Thus, the number of valid subarrays is 7.
```

### Example 2

```text
Input: nums = [2,2,1], a = 2, b = 1
Output: 3
Explanation: The following are the valid subarrays:
Thus, the number of valid subarrays is 3.
```

### Example 3

```text
Input: nums = [2,2,2], a = 1, b = 1
Output: 0
Explanation: Every subarray contains 0 odd numbers, so no subarray is valid.
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `1 <= a, b <= 1000`

## Hints

### Hint 1

Fix the left endpoint and extend the right endpoint while maintaining the numbers of even and odd elements.

### Hint 2

A subarray with y > 0 is valid exactly when b * x <= a * y. Use this comparison instead of floating-point division.
