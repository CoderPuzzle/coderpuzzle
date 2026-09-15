# Solutions — Lexicographically Smallest String After Operations With Constraint

## Greedy one-pass fill

Feasibility never fights lexicographic priority here: changing later
positions can always cost zero (leave them as they are), so making an
earlier position smaller is worth any price the remaining budget allows,
and a smaller letter at one position dominates any number of differences
further right. The answer therefore falls out position by position — at
each index take the smallest letter whose distance to `s[i]` still fits
what is left of `k`.

The cyclic distance from `s[i]` down to `'a'` is
`min(s[i] - 'a', 26 - (s[i] - 'a'))`. If that fits the budget, the
position becomes `'a'` and the budget shrinks by the amount spent.
Otherwise `'a'` is out of reach, and scanning upward from it every
letter below `s[i]` costs more than the remaining budget too — so the
first affordable letter sits exactly `budget` steps below `s[i]`, the
budget drops to zero, and every following position keeps its original
letter.

**Complexity:** `O(n)` time, `O(n)` space.
