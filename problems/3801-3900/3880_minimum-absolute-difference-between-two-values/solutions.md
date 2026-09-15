# Solutions — Minimum Absolute Difference Between Two Values

The brute-force reading checks every pair of indices with a 1 at one end and
a 2 at the other, comparing `abs(i - j)` across all of them. For an array
capped at 100 elements that is cheap, but most of the comparisons are
redundant: the closest pair can be found in a single left-to-right sweep.

## One-pass scan tracking the last opposite value

A 1 at `i` and a 2 at `j` are a nearest pair exactly when no other 1 or 2
lies strictly between the two indices — if a third value of either kind sat
in the gap, whichever endpoint it belongs to would sit closer to the other
endpoint. Consequently the globally closest pair is always detected the
moment the scan reaches its right-hand element: at that instant the
left-hand element is precisely the most recent value of the opposite kind.

The scan keeps `lastOne` and `lastTwo`, the most recent index seen for each
value. When the current element is a 1, the only 2 that can form a closest
pair with it is the most recent 2 (every earlier 2 is farther away), so the
code measures `index - lastTwo` against the running minimum; a 2 is handled
symmetrically, and 0s are ignored entirely. If no valid pair exists the
minimum stays at -1 and is returned as-is.

Each element does constant work against two scalar bookmarks, so the whole
array is processed in a single pass with no extra storage beyond those two
indices and the running answer.

**Complexity:** `O(n)` time, `O(1)` space.
