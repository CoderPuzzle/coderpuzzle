# Solutions — Minimum Number of Coins for Fruits

## Purchase-position DP with a monotonic window

Fruit 0 is never free — no reward exists before the first purchase — so
every plan is a chain of purchases where each one funds the free window
that carries the plan to the next. Let `dp[i]` be the cheapest way to
acquire everything from fruit `i` onward given that fruit `i` is
purchased. Buying fruit `i` makes fruits `i+1 .. 2i+1` free; when that
window reaches the last fruit the plan is done at `prices[i]`, otherwise
the chain must continue at some fruit `j` between `i+1` and `2i+2` (free
fruits may be purchased to collect their rewards, which is exactly what
makes the cheap-fruit-with-good-reward plans win), giving
`dp[i] = prices[i] + min(dp[j])`. The answer is `dp[0]`.

Swept from right to left, both window edges move only leftward, so the
minimum slides in a monotonic window: candidates enter with the older,
shorter-lived entries discarded whenever a newer one is no more
expensive, and the front is dropped once it slips past the window's
right edge. Each index enters and leaves the window once, making the
whole pass linear. The total never exceeds `1000 · 10⁵ = 10⁸`, well
inside 32-bit range in every language.

**Complexity:** `O(n)` time, `O(n)` space.
