# Solutions — Earliest Finish Time for Land and Water Rides II

## Fix the First Finish

Take the land-first order. Once the land ride is chosen, the only thing the
visitor carries out of it is the moment it ends: the water ride then costs
`max(waterStartTime[j], finish) + waterDuration[j]`, and that expression only
grows as the hand-off gets later. So no water ride ever prefers a slower land
ride, and each direction collapses to two numbers: `L`, the smallest
`landStartTime[i] + landDuration[i]`, followed by one scan over the water
rides minimizing `max(waterStartTime[j], L) + waterDuration[j]`. The
water-first order mirrors this exactly — compute `W`, the smallest
`waterStartTime[j] + waterDuration[j]`, then scan the land rides for the
minimum of `max(landStartTime[i], W) + landDuration[i]`.

The answer is the smaller of the two direction minima, and both minima are
realized by actual plans: a direction minimum is achieved by the ride that
attains `L` (or `W`) paired with the ride that attains the scan minimum,
since boarding at exactly `max(open, L)` is legal — earlier means waiting for
the opening, later means walking straight on. Conversely every concrete plan
scores at least its direction's minimum, because its first ride finishes no
earlier than `L` (or `W`). That closes both ends of the argument.

What remains is four linear scans over the input arrays — no sorting, no
prefix tables, no auxiliary storage.

**Complexity:** `O(n + m)` time, `O(1)` space.
