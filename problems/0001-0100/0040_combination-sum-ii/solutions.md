# Solutions — Combination Sum II

## Sort, then backtrack with same-value skips

Sorting the candidates first turns the search into a walk over suffixes: a call at depth `start` may only pick from `start` onward, and each pick restarts the next call at `i + 1`, so every candidate number is used at most once, exactly as the statement demands. A path is recorded the moment the remaining budget reaches zero. Working on a sorted array also settles the output order for free — every emitted combination is already ascending, and growing combinations strictly left to right emits the combinations themselves in ascending lexicographic order.

Duplicate combinations are suppressed by the sorted order rather than by a set. Within one loop over sibling choices, a value equal to the sibling just tried at the same depth would re-explore the identical combinations through a different copy, so runs of equal values are skipped at each depth, measured against `start` — equal values may still coexist inside a single combination. Sortedness also prunes: the first value larger than the remaining budget ends the loop, since every later value is at least as large.

Values are at least 1, so the recursion depth is bounded by the target and the path stack stays tiny; the cost is dominated by how many combinations the input admits, which is exponential in the worst case.

**Complexity:** `O(2^n)` time, `O(n)` space.
