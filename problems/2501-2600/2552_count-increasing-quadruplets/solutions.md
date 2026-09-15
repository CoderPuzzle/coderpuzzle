# Solutions — Count Increasing Quadruplets

## Increasing middle pairs split into left-less and right-great windows

Every quadruplet pivots on its two middle indices. Fixing `j` before `k`
with `nums[k] < nums[j]`, the outer pair contributes exactly
`less(j,k) * great(k,j)`, where `less(j,k)` counts indices `i < j` holding
values below `nums[k]` and `great(k,j)` counts indices `l > k` holding
values above `nums[j]`; the answer is the sum of these products over all
such `(j, k)`. Both factors depend on one moving boundary each, so a single
outer loop over `j` suffices: as `j` advances by one, exactly one element
joins the candidate set on the left, which updates every entry of the
"fewer than x" row by a unit step, while a right-to-left sweep over the tail
carries the suffix count of values above `nums[j]` as a running scalar.

Concretely, the scan keeps a difference array over the value domain that
turns into the current less-than row via one prefix-sum pass, then walks
the tail backwards accumulating `great`, adding `less[nums[k]] * great`
whenever `nums[k] < nums[j]`. Nothing beyond the row (`n + 2` counters),
the running scalar, and the answer survives across iterations, so the
memory stays linear even though time touches every `(j, k)` once.

Bounds decide the arithmetic widths. The answer cannot exceed the total
number of index quadruplets, `C(4000, 4) = 10650673999000 ≈ 1.07 × 10¹³`,
well past 32-bit range — which is why Java, C++, Go and Rust hold their
accumulators in 64-bit types — yet comfortably inside JavaScript's exact
`Number` window below `2⁵³ ≈ 9 × 10¹⁵`, so plain Number arithmetic stays
integer-exact there (each per-step product fits far below the same limit).
The permutation guarantee makes the rows trivial to maintain: values are
distinct, so no duplicate bookkeeping is ever needed.

**Complexity:** `O(n²)` time, `O(n)` space.
