# Minimum Operations to Equalize Binary String

## Description

You are given a binary string `s` and an integer `k`.

In one operation you choose exactly `k` different indices of `s` and flip
every chosen character: each '0' becomes '1' and each '1' becomes '0'.

Return the minimum number of operations needed to make every character of
`s` equal to '1'. If this can never be achieved, return `-1`.

### Example 1

```text
Input: s = "110", k = 1
Output: 1
Explanation:
There is one '0' in s. Because k = 1, that index can be flipped on its
own, so one operation turns s into "111".
```

### Example 2

```text
Input: s = "0101", k = 3
Output: 2
Explanation:
One optimal pair of operations, each flipping exactly k = 3 indices, is:
Flip indices [0, 1, 3]: s changes from "0101" to "1000".
Flip indices [1, 2, 3]: s changes from "1000" to "1111".
```

### Example 3

```text
Input: s = "101", k = 2
Output: -1
Explanation:
Every operation flips exactly 2 characters, so the number of zeros in s
changes by an even amount and stays odd forever, while an all-ones string
has zero zeros. The goal can never be reached.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= k <= s.length`

## Hints

### Hint 1

Model state as z = number of zeros; flipping k picks i zeros (i between
max(0, k - (n - z)) and min(k, z)) and transforms z to z' = z + k - 2 * i,
so z' lies in a contiguous range and has parity (z + k) % 2.

### Hint 2

Build a graph on states 0..n and run BFS from initial z to reach 0; each
edge from z goes to all z' in that computed interval.

### Hint 3

For speed, keep two ordered sets of unvisited states by parity and erase
ranges with lower_bound while BFSing to achieve near O(n log n) time.
