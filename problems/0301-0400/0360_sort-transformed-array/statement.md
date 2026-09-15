# Sort Transformed Array

## Description

Given a sorted integer array `nums` and three integers `a`, `b` and `c`, apply
a quadratic function of the form f(x) = ax² + bx + c to each element `nums[i]`
in the array, and return the array in a sorted order.

### Example 1

```text
Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [3,9,15,33]
```

### Example 2

```text
Input: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
Output: [-23,-5,1,7]
```

### Constraints

- `1 <= nums.length <= 200`
- `-100 <= nums[i], a, b, c <= 100`
- `nums` is sorted in ascending order.

### Follow-up

Could you solve it in `O(n)` time?

## Hints

### Hint 1

x^2 + x will form a parabola.

### Hint 2

Parameter A in: A * x^2 + B * x + C dictates the shape of the parabola.
Positive A means the parabola remains concave (high-low-high), but negative A
inverts the parabola to be convex (low-high-low).
