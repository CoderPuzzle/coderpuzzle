# Trapping Rain Water

## Description

Given `n` non-negative integers representing an elevation map where the
width of each bar is `1`, compute how much water it can trap after raining.

### Example 1

```text
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map traps 6 units of rain water.
```

![The elevation map of example 1, with the 6 units of trapped water shaded blue.](figures/example-1.svg)

### Example 2

```text
Input: height = [4,2,0,3,2,5]
Output: 9
```

![The elevation map of example 2, with the 9 units of trapped water shaded blue.](figures/example-2.svg)

### Constraints

- `n == height.length`
- `1 <= n <= 2 * 10⁴`
- `0 <= height[i] <= 10⁵`

## Hints

### Hint 1

The water level above any bar is bounded by the shorter of the tallest bars to its left and to its right.

### Hint 2

Precompute running maxima from both directions: water at index i is max(0, min(left_max[i], right_max[i]) - height[i]).

### Hint 3

Two pointers give one pass with O(1) extra space — always move the side whose current bar is the smaller one.
