# Minimum Number of Taps to Open to Water a Garden

## Description

There is a one-dimensional garden on the x-axis. The garden starts at the
point `0` and ends at the point `n`. (i.e. the length of the garden is `n`).

There are `n + 1` taps located at points `[0, 1, ..., n]` in the garden.

Given an integer `n` and an integer array `ranges` of length `n + 1` where
`ranges[i]` (0-indexed) means the `i`-th tap can water the area
`[i - ranges[i], i + ranges[i]]` if it was open.

Return the minimum number of taps that should be open to water the whole
garden. If the garden cannot be watered, return `-1`.

### Example 1

```text
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
Explanation: The tap at point 0 can cover the interval [-3,3].
The tap at point 1 can cover the interval [-3,5].
The tap at point 2 can cover the interval [1,3].
The tap at point 3 can cover the interval [2,4].
The tap at point 4 can cover the interval [4,4].
The tap at point 5 can cover the interval [5,5].
Opening only the second tap will water the whole garden [0,5].
```

![The taps on a number line from -3 to 5 with their spray ranges drawn as bars; tap 1's range [-3, 5] alone covers the whole garden.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Even if you activate all four taps you cannot water the whole garden.
```

### Constraints

- `1 <= n <= 10^4`
- `ranges.length == n + 1`
- `0 <= ranges[i] <= 100`

## Hints

### Hint 1

Create intervals of the area covered by each tap, clamped to [0, n], and sort them by the left end.

### Hint 2

To cover [0, n], start with the first interval and out of all intervals that intersect the covered prefix choose the one that reaches farthest to the right.

### Hint 3

If there is a gap no interval covers, stop and return -1.
