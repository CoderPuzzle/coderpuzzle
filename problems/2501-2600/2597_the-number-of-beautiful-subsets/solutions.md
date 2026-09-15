# Solutions — The Number of Beautiful Subsets

Subsets are distinguished only by which indices survive, so counting
them means walking the binary choice tree once per index: at each index,
either drop the element or keep it. `n <= 18` bounds the tree at `2^18`
leaves, and the answer itself therefore cannot exceed `2^18 - 1 =
262143`, comfortably inside 32-bit range in every offered language.

## Sorted take-or-skip backtracking

Sorting first concentrates all conflict potential: for element `nums[i]`,
the only earlier value that clashes with keeping it is exactly
`nums[i] - k` (a difference of `k` downward), because everything smaller
has already been decided and anything differing upward belongs to later
indices. A small counter map records how many copies of each kept value
are currently chosen — counters rather than flags matter because equal
values never clash with each other (`k >= 1`) yet several copies can sit
in play simultaneously.

The recursion either skips index `i` unconditionally, or — provided the
counter at `nums[i] - k` reads zero — bumps the counter at `nums[i]`,
recurses, and rolls the bump back. Each leaf of this tree contributes
exactly one valid selection; subtracting the single empty selection from
the leaf total gives the count of non-empty beautiful subsets. The
backtrack-depth equals `n <= 18`.

**Complexity:** `O(2^n)` time in the worst conflict-free case, `O(n)`
space.
