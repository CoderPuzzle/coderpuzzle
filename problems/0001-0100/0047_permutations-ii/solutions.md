# Solutions — Permutations II

## Sort, then backtrack with same-value skips

Sorting `nums` first settles both the deduplication rule and the output order at once. The search fills a permutation one position at a time, choosing among the elements not yet placed, and because the sorted candidates are scanned in ascending order at every position, the finished permutations emerge in ascending lexicographic order — exactly the order the statement pins. A permutation is recorded the moment its buffer holds all of `nums`.

Duplicate permutations are suppressed by the sorted order rather than by a set. Within one loop over candidate slots, a value equal to the sibling just tried at the same depth would rebuild the same permutation through another copy, so at each depth runs of equal values are skipped: a duplicate may only be placed once the identical element to its left is already part of the current permutation. Equal values still coexist inside a single permutation — only the redundant branch at each level is cut.

Each element is consumed at most once per permutation by a `used` flag on its slot, cleared again on the way back up. One shared buffer is appended to before descending and popped after returning, so the bookkeeping stays linear in `n` rather than proportional to the number of partial permutations.

**Complexity:** `O(n · n!)` time, `O(n)` space.
