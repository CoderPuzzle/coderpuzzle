# Solutions — Minimum Cost to Make Arrays Identical

Operation 2 prices each element's final adjustment at exactly its
displacement, so the only real decision is whether to pay k once and
rearrange `arr`, or to leave it in place. Everything else is matching
arithmetic.

## Compare in place against sort-then-match

Splitting `arr` into n singleton blocks is a legal Operation 1 and
realizes any permutation, so a single paid rearrangement already spans
every ordering Operation 1 could ever reach — repeated rearrangements
only stack more k. Under any fixed permutation, the total adjustment
cost is sum |arr[pi(i)] - brr[i]|, which is minimized by matching the
sorted arrays elementwise (the standard rearrangement bound for absolute
differences). The answer is therefore just the smaller of two numbers:
sum |arr[i] - brr[i]| when staying put, or k plus the same sum after
sorting both arrays.

The pass computes the in-place sum, sorts copies of both arrays, and
takes the minimum. Costs reach 10^5 * 2 * 10^5 = 2 * 10^10 and k itself
can be 2 * 10^10, so the totals are kept in 64-bit registers everywhere
(and stay exact as JS numbers, far below 2^53).

**Complexity:** `O(n log n)` time for the two sorts, `O(n)` extra space.
