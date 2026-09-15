# Solutions — Maximum Product of Subsequences With an Alternating Sum Equal to K

## Set-based DP over sums

The alternating sum depends only on the parity of the subsequence length:
every appended element is added when the current length is even and
subtracted when it is odd. So one DP over elements keeps, per `(parity,
sum)`, every product `<= limit` reachable by a subsequence with that length
parity and that alternating sum. Keeping the full set rather than just the
maximum matters: the largest product can multiply past `limit` on a later
step while a smaller one survives, so a maximum-only state would prune the
path that yields the answer.

Zero products are tracked separately from the product sets. A product of 0
can only arise by choosing an element equal to 0, and the prefix leading to
it may pass through products above `limit` that the value sets prune, so a
boolean "product-0 reachable" flag per state is needed. Processing element
`x` either skips it (states carried over) or appends it, flipping the parity
and adding or subtracting `x` while multiplying every stored product by `x`
and capping at `limit`; a fresh single-element subsequence seeds the new
state. At the end the answer is the largest stored product at sum `k` across
both parities, `0` if a product-0 state at sum `k` exists, or `-1`.

The reachable sum range is bounded by `sum(nums)`, at most 1800, and the
per-state product sets are products of values at most 12, keeping them small.

**Complexity:** `O(n · sum(nums) · P)` time, `O(sum(nums) · P)` space,
where `P` is the number of distinct products `<= limit` reachable per state.
