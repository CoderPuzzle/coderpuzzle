# Distinct Points Reachable After Substring Removal

## Description

You are given a string `s` whose characters are unit moves on an infinite
two-dimensional grid, performed from left to right:

```text
'U': (x, y) -> (x, y + 1)
'D': (x, y) -> (x, y - 1)
'L': (x, y) -> (x - 1, y)
'R': (x, y) -> (x + 1, y)
```

You are also given a positive integer `k`. Choose exactly one contiguous
substring of `s` of length `k` and delete it, then perform the remaining
moves in order, starting from coordinate (0, 0). Different choices of the
deleted substring can leave the walk at different final coordinates. Return
how many distinct final coordinates are reachable over all choices of the
deleted substring.

### Example 1

```text
Input: s = "LUL", k = 1
Output: 2
Explanation: Deleting one character leaves "UL", "LL" or "LU", and those
walks end at (-1, 1), (-2, 0) and (-1, 1) respectively. The two distinct
coordinates (-1, 1) and (-2, 0) are reachable.
```

### Example 2

```text
Input: s = "UDLR", k = 4
Output: 1
Explanation: The only possible deletion removes the entire string, leaving
no moves at all, so the walk ends where it started, at (0, 0).
```

### Example 3

```text
Input: s = "UU", k = 1
Output: 1
Explanation: Whichever 'U' is deleted, the remaining string is still "U",
so every choice ends at (0, 1).
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of only `'U'`, `'D'`, `'L'`, and `'R'`.
- `1 <= k <= s.length`

## Hints

### Hint 1

Build prefix sums of the x-coordinate and of the y-coordinate along `s`.

### Hint 2

Those prefix sums give any length-`k` window's displacement in constant
time; the endpoint left after deleting a window is the total displacement
minus the window's.
