# Number of ZigZag Arrays I

## Description

You are given three integers `n`, `l`, and `r`.

An array is a ZigZag array when every element lies in the inclusive range
`[l, r]`, no two adjacent elements are equal, and no three consecutive
elements form a strictly increasing or strictly decreasing sequence — where
a sequence is strictly increasing when each element is greater than the one
before it (if one exists), and strictly decreasing when each element is
smaller than the one before it. Equivalently, read left to right: every
adjacent pair differs, and the comparison direction flips at every step.

Return the number of ZigZag arrays of length `n`. Since the answer can be
very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: n = 3, l = 4, r = 5
Output: 2
Explanation: Only two arrays qualify: [4,5,4] and [5,4,5]. With just two
distinct values available, any valid array must alternate between them.
```

### Example 2

```text
Input: n = 3, l = 1, r = 3
Output: 10
Explanation: The ten valid arrays are [1,2,1], [1,3,1], [1,3,2], [2,1,2],
[2,1,3], [2,3,1], [2,3,2], [3,1,2], [3,1,3] and [3,2,3]. Every remaining
length-3 array over these values repeats an adjacent value or runs in one
direction for all three elements.
```

### Constraints

- `3 <= n <= 2000`
- `1 <= l < r <= 2000`

## Hints

### Hint 1

Use dynamic programming: let `dp[i][dir][x]` be the number of length-`i`
arrays ending at value `x`, where `dir` records the direction the next step
must take — down or up.

### Hint 2

An array that must next step down extends only onto smaller values, and one
that must next step up extends only onto larger values, so each new layer
is a range sum of the previous layer — over `x > y` in one direction and
over `x < y` in the other.

### Hint 3

Carry those range sums as running prefix/suffix totals so each layer costs
`O(r - l + 1)` work instead of its square, reducing every count modulo
`10⁹ + 7`.
