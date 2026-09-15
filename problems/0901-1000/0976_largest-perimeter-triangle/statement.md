# Largest Perimeter Triangle

## Description

Given an integer array `nums`, return the largest perimeter of a triangle with
a non-zero area that can be formed from three of these lengths. If no three
lengths can form a triangle of non-zero area, return `0`.

Three lengths form a triangle of non-zero area exactly when the sum of any two
of them is strictly greater than the third — when the two smaller lengths sum
to the largest, the triangle collapses onto a line and has zero area.

### Example 1

```text
Input: nums = [2,1,2]
Output: 5
Explanation: You can form a triangle with three side lengths: 1, 2, and 2.
```

### Example 2

```text
Input: nums = [1,2,1,10]
Output: 0
Explanation:
You cannot use the side lengths 1, 1, and 2 to form a triangle.
You cannot use the side lengths 1, 1, and 10 to form a triangle.
You cannot use the side lengths 1, 2, and 10 to form a triangle.
As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.
```

### Constraints

- `3 <= nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁶`
