# Solutions — Subarrays Distinct Element Sum of Squares II

## Fenwick pair over the per-start distinct counts

Group the subarrays by their right end. When the end moves from `i - 1` to
`i`, every window `nums[j..i - 1]` whose start `j` lies after the previous
occurrence of `nums[i]` gains exactly one distinct value — that value was not
present in the window before — while the fresh singleton window `nums[i..i]`
opens with a distinct count of 1. So the squares of the gaining windows grow
by `2·d + 1` each, and if `T` is the sum of their pre-increment counts the
running quantity `Q = Σ_j d(j)²` advances by exactly `2·T + (i - last)`,
where `last` is the previous index of `nums[i]`. The answer is the sum of
`Q` over all right ends.

That recurrence needs one primitive: add `1` on a suffix range of the
per-start counts and read the exact sum over an arbitrary range. A Fenwick
tree over the difference of the counts delivers both in `O(log n)` — two
point updates per range add on a first array, matching `v·(l − 1)` point
updates on a second, with `prefix(x)·x − prefix₂(x)` reconstructing any
range sum. A value-indexed array stores each value's last occurrence, so
every step is a constant number of Fenwick operations.

Width discipline: range sums reach `n(n + 1)/2 ≈ 5 × 10^9`, past 32 bits, so
the trees and accumulators stay in 64-bit integers (`long long`, `long`,
`int64`); JavaScript and TypeScript never leave exact-number territory
because the largest intermediate, `Q + 2T + count`, stays near `1.1 × 10^10`,
far under `2^53`. Squares are taken modulo `10^9 + 7` after each reduction,
so no multiplication ever exceeds the 64-bit or `2^53` envelopes.

**Complexity:** `O(n log n)` time, `O(n)` space.
