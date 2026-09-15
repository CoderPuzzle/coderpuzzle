# Solutions — Fruits Into Baskets II

The rules fix every decision, so there is nothing to optimize away: walk the
fruits in order, give each the leftmost free basket that fits, and count the
ones left over.

## Direct simulation

Keep a boolean `used` array over the baskets. For each fruit quantity, scan
the baskets from index 0 upward and take the first basket that is still free
with `capacity >= quantity`, marking it used; if the scan runs off the end,
the fruit stays unplaced and the counter grows. Scanning from the left every
time is exactly what "leftmost available basket" demands — an occupied or too
small basket is simply skipped, as in the second example where a fruit hops
over an insufficient basket to a later one.

With `n <= 100` the double loop performs at most `10⁴` comparisons, so the
quadratic simulation is already instantaneous and no smarter structure is
warranted at this scale (the follow-up problem raises `n` by three orders of
magnitude and is where a segment tree earns its keep). Values fit comfortably
in 32-bit integers, and the algorithm is a flat pair of loops, so every
language transcribes it line for line.

**Complexity:** `O(n²)` time, `O(n)` space.
