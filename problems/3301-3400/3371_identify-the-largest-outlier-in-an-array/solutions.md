# Solutions — Identify the Largest Outlier in an Array

## Total-sum equation with a counted lookup

The membership roles of the array are rigid: `n - 2` specials summing to
`S`, one element that equals `S`, and one outlier `o`. The array total is
therefore exactly `2S + o`, which is hint 1's observation — removing the
outlier halves what remains. Reading the equation per candidate gives the
test: a value `c` (at some index) is a _potential_ outlier exactly when
`total - c` is even and `s = (total - c) / 2` occurs at another index; when
`s == c` the two roles must land on two distinct indices, so the value needs
at least two copies. Parity rejects half the candidates in one comparison,
and the sum-element lookup is a constant-time hash-map count (hint 2).

One pass builds the count map, a second pass scans every element as a
candidate outlier and keeps the largest value that passes the test. The
statement guarantees at least one potential outlier exists, so the scan
always finds one; seeding the running maximum at `-2000` — strictly below
the smallest legal value `-1000` — makes that guarantee explicit and avoids
sentinel-infinity idioms. Magnitudes stay tame: with `n <= 10⁵` and values
in `[-1000, 1000]`, the total's absolute value is at most `10⁸`, far inside
32-bit range, and every map key is an ordinary element value.

**Complexity:** `O(n)` time, `O(n)` space for the count map.
