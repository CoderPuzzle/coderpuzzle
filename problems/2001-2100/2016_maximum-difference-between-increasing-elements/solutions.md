# Solutions — Maximum Difference Between Increasing Elements

## Minimum prior value

Scan from left to right while storing the smallest value seen at an earlier
index. Before incorporating the current value into that minimum, compare it
with the stored value; if it is larger, their difference is a valid candidate
whose indices automatically satisfy `i < j`.

Updating the answer only for a strict increase excludes equal pairs. Updating
the minimum after the candidate check preserves the earlier-index invariant,
and an answer initialized to `-1` remains unchanged exactly when no valid pair
exists.

**Complexity:** `O(n)` time and `O(1)` space.
