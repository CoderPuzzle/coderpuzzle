# Solutions — Substrings of Size Three with Distinct Characters

Building each length-three substring and testing it with a set is
perfectly workable at this size, but the window is so short that the
distinctness test collapses to three pairwise comparisons — no set or
extra memory needed at all.

## Fixed-window pairwise check

Slide a window of exactly three characters across `s`. A window is good
exactly when all three of its characters differ, i.e. `s[i] != s[i-1]`,
`s[i] != s[i+1]`, and `s[i-1] != s[i+1]`; count such windows. Windows
overlap independently, so repeated substrings are counted once per
occurrence automatically.

Strings shorter than three simply produce an empty loop and return 0,
and no per-window allocation happens because only comparisons are used.

**Complexity:** `O(n)` time, `O(1)` space.
