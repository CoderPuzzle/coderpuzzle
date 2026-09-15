# Solutions — Chunk Array

## Fixed-stride slicing pass

Chunk boundaries are fully determined by arithmetic: chunk k owns exactly
the half-open window `[k·size, (k+1)·size)`, so a single loop that advances
its start index by `size` visits every boundary and `slice()` copies each
window straight into the result. The final window automatically comes up
short whenever `arr.length` is not a multiple of `size`, and an empty input
falls through the loop condition immediately, yielding zero chunks — both
edge behaviors fall out of the stride rule instead of needing special
cases.

Because each slice is a fresh copy, the returned chunks share no storage
with `arr`; callers can mutate either side freely. A running write-index
would work equally well with manual `push` loops, but slicing keeps the
copy semantics explicit and the loop to two lines of state.

**Complexity:** `O(n)` time and space for `n` elements — every element is
copied exactly once.
