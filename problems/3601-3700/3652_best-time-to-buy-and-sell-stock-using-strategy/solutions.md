# Solutions — Best Time to Buy and Sell Stock using Strategy

## Prefix sums over every window

Only one window can ever change, so the untouched profit `base`, the sum of
`strategy[i] * prices[i]` over all days, is always available, and a
modification of the window starting at day `l` moves the total by a clean
delta: the first `k / 2` rewritten days drop from whatever they contributed
to zero, while the last `k / 2` switch to selling and collect `prices[i]`
outright. So `delta(l) = (sum of prices over the second half) - (weighted
window sum)`. Two prefix arrays turn every piece of that expression into an
O(1) lookup — running sums of `prices[i]` and of `strategy[i] * prices[i]` —
and a single sweep over all `n - k + 1` window positions evaluates every
candidate modification in linear time.

The answer is `base + max(0, best delta)`: flooring at zero encodes "at most
one modification", so plans that no rewrite can improve keep their original
profit. Each term stays within roughly `n * max_price = 10¹⁰`, well past
32-bit range in both directions — an all-buy plan sinks to `-10¹⁰` — so the
compiled languages accumulate in 64-bit integers (`long long`, `long`,
`int64`, `i64`) from the very first product; JavaScript numbers are doubles,
exact through `2⁵³`, and hold these sums without help. The arithmetic stays
exact integer math throughout, so no comparison can drift.

**Complexity:** `O(n)` time, `O(n)` space.
