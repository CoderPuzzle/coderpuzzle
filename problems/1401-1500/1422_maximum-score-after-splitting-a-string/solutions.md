# Solutions — Maximum Score After Splitting a String

## One running maximum over the cut positions

There are only `n - 1` places to cut, so the direct plan is to evaluate
them all — but re-counting both halves each time would make it quadratic.
Instead, sweep the cut left to right holding the two totals as running
values: `zerosLeft` increments whenever the character entering the left
half is a `'0'`, and `onesRight` starts at the string's total number of
ones and decrements whenever a `'1'` leaves the right half.

Both updates happen at each cut before comparing `zerosLeft + onesRight`
against the best so far, so each of the `n - 1` cuts costs `O(1)` and
the answer is a single maximum. The string length is at most 500, but
the linear sweep would hold for far larger inputs; no auxiliary arrays
are needed since the two counters are scalars.

On `"011101"` the sweep sees scores 5, 4, 3, 2, 3 and returns 5, the
first cut — the one the example calls out.

**Complexity:** `O(n)` time, `O(1)` space.
