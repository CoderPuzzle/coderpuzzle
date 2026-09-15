# Solutions — Minimum Index Sum of Two Lists

## Index map, one scan of list2

The strings of each list are unique, so a hash map from every string of `list1`
to its index answers "where does this candidate count from" in constant time.
Build that map in one pass, then scan `list2` with index `j`: a string absent
from the map is not common and is skipped on the spot, while a present one
carries the index sum `i + j` that decides everything.

The scan keeps the least index sum seen so far and its winners. A strictly
smaller sum demotes everything collected and restarts the winners at the
current string; an equal sum extends the tie. Because equal sums are appended
in scan order, the winners come out in the order they appear in `list2` —
exactly the order the answer pins, with no post-sorting. The statement
guarantees at least one common string, so the first common found always seeds
the winners and the answer is never empty.

**Complexity:** `O(n + m)` time, `O(n)` space.
