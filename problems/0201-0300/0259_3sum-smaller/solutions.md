# Solutions — 3Sum Smaller

## Sort and count with two pointers

The condition never asks which indices formed a triplet, only how far the sum
falls below `target`, so permuting the same three values is the same triplet.
Sorting makes that redundancy a boundary: with the array in order, the smallest
value of any candidate triplet can anchor it, and what remains is to count how
many pairs behind the anchor complete the sum. Counting pairs instead of
triplets is the whole speedup, and a sorted suffix is exactly the shape a
two-pointer sweep counts in linear time.

For each anchor index `i`, `lo` starts just after it and `hi` at the end. When
`nums[lo] + nums[hi]` still reaches the remainder `target - nums[i]`, no
pairing of this `lo` can help — sorted order only offers larger partners — so
`hi` retreats. When the pair sum does fall short, this `lo` pairs with `hi` and
with every index between them, `hi - lo` triplets counted in a single step, and
`lo` advances. Each move retires one index for good, so the sweep counts every
qualifying pair exactly once without ever enumerating a triplet. The walk over
anchors also stops early the moment their three smallest remaining values
already reach `target`: every later anchor is no smaller, so nothing beyond it
can contribute.

Arrays shorter than three elements hold no triplet at all — the loops simply
never run and the answer is zero — and sums sitting exactly at the target never
count either, because the comparison is strict. The count itself stays within
the statement's `10⁹` ceiling, safely inside the 32-bit return.

**Complexity:** `O(n²)` time, `O(n)` space.
