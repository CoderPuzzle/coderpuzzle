# Maximize Expression of Three Elements

## Description

You are given an integer array nums.

Choose three elements a, b, and c from nums at distinct indices so that the
value of the expression a + b - c is maximized. The three indices may appear
in any relative order — a, b, and c are roles, not positions.

Return an integer denoting the maximum possible value of the expression.

### Example 1

```text
Input: nums = [1,4,2,5]
Output: 8
Explanation: Choose a = 4, b = 5, and c = 1. The value is 4 + 5 - 1 = 8,
which is the maximum possible.
```

### Example 2

```text
Input: nums = [-2,0,5,-2,4]
Output: 11
Explanation: Choose a = 5, b = 4, and c = -2. The value is
5 + 4 - (-2) = 11, which is the maximum possible.
```

### Constraints

- `3 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

## Hints

### Hint 1

a and b should be the two largest values in nums.

### Hint 2

c should be the smallest value in nums.
