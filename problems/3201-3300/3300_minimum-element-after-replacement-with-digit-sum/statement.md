# Minimum Element After Replacement With Digit Sum

## Description

You are given an integer array `nums`.

You replace each element in `nums` with the sum of its digits.

Return the minimum element in `nums` after all replacements.

### Example 1

```text
Input: nums = [10,12,13,14]
Output: 1
Explanation: nums becomes [1, 3, 4, 5] after all replacements, with minimum element 1.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: 1
Explanation: nums becomes [1, 2, 3, 4] after all replacements, with minimum element 1.
```

### Example 3

```text
Input: nums = [999,19,199]
Output: 10
Explanation: nums becomes [27, 10, 19] after all replacements, with minimum element 10.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 10⁴`

## Hints

### Hint 1

Convert to string and calculate the sum for each element.
