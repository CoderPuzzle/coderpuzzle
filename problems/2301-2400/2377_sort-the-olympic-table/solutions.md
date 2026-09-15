# Solutions — Sort the Olympic Table

## One ORDER BY with four keys

The ranking rules translate key-for-key into an `ORDER BY` clause: gold
medals descending, then silver descending, then bronze descending, then
country ascending for the lexicographic tiebreak. SQL evaluates the sort
keys in order and each later key only matters when every earlier one ties,
which is precisely the cascade the statement describes.

Nothing else is needed — no window functions, no computed rank column.
Selecting all four columns keeps the output rows intact while `ORDER BY`
fixes their sequence, matching the exact-order comparison this problem is
checked with.

Sorting dominates the cost; the scan itself is linear in the number of
countries.

**Complexity:** `O(n log n)` time, `O(n)` space.
