# Solutions — Longest Subarray With Maximum Bitwise AND

## Longest run of the maximum value

The key observation is monotonicity under AND: combining a number with
anything else can only clear bits, never set them, so the AND of any
subarray is at most its smallest element — in particular at most
`max(nums)`. That bound is tight: the single-element subarray holding the
maximum attains it. So `k = max(nums)`, and a subarray has AND equal to
`k` exactly when every one of its elements equals `k` — folding in even
one strictly smaller value would pull the AND below the maximum (this is
hint 1: `x & y < max(x, y)` whenever `x != y`).

The problem therefore collapses into finding the longest run of
consecutive occurrences of `max(nums)`, which one linear scan computes:
keep `run`, the length of the current streak of maximum values; extend it
on each match, reset it to zero on anything else, and record the best
streak seen. Two passes total — one for the maximum, one for the run —
and no auxiliary structures.

Values stay below 2²⁰, so all arithmetic fits in 32-bit integers in every
language; lengths are bounded by `n <= 10⁵`.

**Complexity:** `O(n)` time, `O(1)` space.
