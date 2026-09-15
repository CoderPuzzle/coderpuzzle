# Solutions — Largest Perimeter Triangle

## Sort and test consecutive triples

Sorting turns a search over all triples into a scan over neighbors. Once the
lengths sit in ascending order, a triangle's fate hangs on one comparison:
the two smaller sides must sum strictly above the largest, and the other two
inequalities then hold automatically. Better still, the best triangle — the
one with the largest perimeter, if any triangle exists — always occupies
three consecutive positions of the sorted array. If some valid triangle uses
sides at sorted positions `i < j < k`, the entries at `i`, `i + 1`, `i + 2`
are each at least as large as the corresponding chosen side, so they sum
strictly above `nums[i]` too, and their perimeter dominates. So scanning
consecutive triples from the top and taking the first that passes is not a
heuristic — it returns the maximum.

Scan therefore from the largest end downward: for each `i`, the triple
`nums[i]`, `nums[i + 1]`, `nums[i + 2]` (with `nums[i + 2]` the largest side)
is valid exactly when `nums[i] + nums[i + 1] > nums[i + 2]`. The first hit is
returned on the spot; strictness is what Example 2's `1, 1, 2` trap turns
on, since `1 + 1 = 2` is a line segment, not a triangle. If every window
fails — a huge outlier such as the `10` above, or an exact degeneracy like
`[1,2,3]` — no triangle exists and the answer is `0`, which is also what an
array shorter than three lengths naturally yields, the loop body never
running.

Example 1 sorts `[2,1,2]` to `[1,2,2]`: the single window has `1 + 2 > 2`, so
the perimeter is `5`. Sorting is done in place, and with values at most `10⁶`
a perimeter never exceeds `3 · 10⁶`, far inside 32-bit range.

**Complexity:** `O(n log n)` time, `O(1)` space.
