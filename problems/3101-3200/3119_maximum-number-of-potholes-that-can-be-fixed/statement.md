# Maximum Number of Potholes That Can Be Fixed

## Description

You are given a string `road`, consisting only of characters `"x"` and
`"."`, where each `"x"` denotes a pothole and each `"."` denotes a smooth
road, and an integer `budget`.

In one repair operation, you can repair `n` consecutive potholes for a price
of `n + 1`.

Return the maximum number of potholes that can be fixed such that the sum of
the prices of all of the fixes doesn't go over the given `budget`.

### Example 1

```text
Input: road = "..", budget = 5
Output: 0
Explanation: There are no potholes to be fixed.
```

### Example 2

```text
Input: road = "..xxxxx", budget = 4
Output: 3
Explanation: We fix the first three potholes (they are consecutive). The
budget needed for this task is 3 + 1 = 4.
```

### Example 3

```text
Input: road = "x.x.xxx...x", budget = 14
Output: 6
Explanation: We can fix all the potholes. The total cost would be
(1 + 1) + (1 + 1) + (3 + 1) + (1 + 1) = 10 which is within our budget of 14.
```

### Constraints

- `1 <= road.length <= 10⁵`
- `1 <= budget <= 10⁵ + 1`
- `road` consists only of characters '.' and 'x'.

## Hints

### Hint 1

Find all consecutive blocks of ’x’.

### Hint 2

Sort them by their length.

### Hint 3

Try to fix the block from the largest one until you have enough budget.
