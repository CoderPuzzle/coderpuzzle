# Minimum Distance to the Target Element

## Description

Given an integer array `nums` (0-indexed) and two integers `target` and
`start`, find an index `i` such that `nums[i] == target` and
`abs(i - start)` is minimized. Note that `abs(x)` is the absolute value
of `x`.

Return `abs(i - start)`.

It is guaranteed that `target` exists in `nums`.

### Example 1

```text
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5 is the only value equal to target, so the answer
is abs(4 - 3) = 1.
```

### Example 2

```text
Input: nums = [1], target = 1, start = 0
Output: 0
Explanation: nums[0] = 1 is the only value equal to target, so the answer
is abs(0 - 0) = 0.
```

### Example 3

```text
Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
Output: 0
Explanation: Every value of nums is 1, but nums[0] minimizes abs(i -
start), which is abs(0 - 0) = 0.
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10⁴`
- `0 <= start < nums.length`
- `target` is in `nums`.

## Hints

### Hint 1

Loop in both directions until you find the target element.

### Hint 2

For each index i such that nums[i] == target calculate abs(i - start).
