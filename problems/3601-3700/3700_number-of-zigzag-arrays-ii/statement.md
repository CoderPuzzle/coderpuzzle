# Number of ZigZag Arrays II

## Description

You are given three integers `n`, `l`, and `r`.

An array of length `n` is a ZigZag array when every element is an integer in
the inclusive range `[l, r]`, no two adjacent elements are equal, and no
three consecutive elements form a strictly increasing or a strictly
decreasing sequence.

Equivalently, the steps must turn after every single move: whenever one
element is greater than its predecessor, the next element must be smaller
than it, and the other way around. A sequence is strictly increasing when
every element is greater than its previous one, and strictly decreasing when
every element is smaller than its previous one — either sustained across
three consecutive positions breaks the pattern.

Return the total number of valid ZigZag arrays of length `n` with elements
in `[l, r]`, modulo `10^9 + 7`.

### Example 1

```text
Input: n = 3, l = 4, r = 5
Output: 2
Explanation:
There are only two arrays of length 3 over [4, 5]:
[4, 5, 4]
[5, 4, 5]
```

### Example 2

```text
Input: n = 3, l = 1, r = 3
Output: 10
Explanation:
The ten arrays of length 3 over [1, 3] are:
[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]
```

### Constraints

- `3 <= n <= 10^9`
- `1 <= l < r <= 75`

## Hints

### Hint 1

Track the last value together with the direction the next step must take;
the transition between those states is linear, so `n` up to `10^9` calls for
matrix exponentiation.

### Hint 2

Reflecting the value range (`x` becomes `l + r - x`) swaps the two direction
states while fixing the starting vector, so the falling block always mirrors
the rising one and a single block of `m = r - l + 1` counts suffices.

### Hint 3

The surviving transition matrix has entry `(w, u)` equal to 1 exactly when
`u + w <= m - 2`; it and all of its powers are symmetric, so each squaring
is just the Gram matrix of its rows.

### Hint 4

A dot product of up to 75 residue pairs reaches magnitude `2^67`: widen the
accumulator past 64 bits or reduce early — and split multipliers to stay
inside JavaScript's exact-integer range.
