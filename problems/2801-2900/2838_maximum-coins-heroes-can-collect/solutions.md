# Solutions — Maximum Coins Heroes Can Collect

## Sort monsters, prefix-sum the coins, binary-search each hero

Defeating is downward-closed in monster power: a hero strong enough to beat
one monster beats every monster of smaller-or-equal power too. So pairing
each monster with its coin and sorting the pairs by power turns "everything
the hero can defeat" into a prefix of that sorted order, and the collected
total is just a partial sum over it. Build the coin prefix sums once over the
sorted pairs; then each hero only needs `k`, the number of monsters with
power at most `heroes[i]` — one binary search per hero — and its answer is
read off as `prefix[k]`. Heroes whose power sits below every monster land at
`k = 0` and correctly collect nothing through the same code path.

The sort dominates: `O(m log m)` to order the pairs plus `O(log m)` per
hero for the searches, `O((n + m) log m)` overall, with linear extra space
for the sorted pairs and prefix array. A two-pointer walk over heroes sorted
alongside monsters reaches `O(n log n + m log m)` instead but reorders the
output and buys little here.

The totals outgrow 32 bits by design: one hero can sweep all `m <= 10⁵`
monsters carrying up to `10⁹` coins each, so answers reach `10¹¹` — far
past `int32`. Typed languages accumulate counts and prefix sums in 64-bit
integers. JavaScript has no such type, but its doubles are exact up to
`2⁵³ ≈ 9.0×10¹⁵`, four-plus orders of magnitude above that ceiling, so
plain numbers carry every legal total exactly.

**Complexity:** `O((n + m) log m)` time, `O(n + m)` space beyond the input.
