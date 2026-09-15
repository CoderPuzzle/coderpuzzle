# Solutions — Count Special Triplets

## Left and Right Frequency Counts

Anchor the triplet on its middle index `j`: the conditions
`nums[i] == nums[j] * 2` and `nums[k] == nums[j] * 2` only mention `j`'s
value, so with `v = nums[j]` the index `j` contributes exactly
`(count of 2v to the left of j) × (count of 2v to the right of j)`. One
sweep maintains both counts: `right` starts as the frequency array of the
whole input, and before processing each element the sweep removes it from
`right` and afterwards adds it to `left`, so at every `j` the two arrays
count strictly-left and strictly-right occurrences. Values are at most
`10⁵`, so `2v` fits the fixed `200001`-slot count arrays and each step is
O(1) — the whole pass is linear.

The arithmetic is where the 32-bit world ends. Each factor is at most
`5 × 10⁴`, but their product reaches `2.5 × 10⁹`, and the un-truncated
total over all middles is bounded by `C(10⁵, 3) ≈ 1.7 × 10¹⁴` — far past
32 bits (and the JS accumulation relies on staying under `2⁵³`, which that
same bound proves). So the accumulator is 64-bit wide in every language,
the per-element products are widened before multiplying, and the modulo
`10⁹ + 7` is applied once at the very end — the sum cannot overflow
64 bits before then.

**Complexity:** `O(n + V)` time for `n ≤ 10⁵` elements and `V = 2 × 10⁵ + 1`
count-array slots, `O(V)` space.
