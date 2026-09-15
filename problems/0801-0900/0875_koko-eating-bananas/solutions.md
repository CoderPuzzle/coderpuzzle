# Solutions — Koko Eating Bananas

## Binary Search on the Eating Speed

For a fixed speed `k`, pile `p` takes `ceil(p / k)` hours, and the total `hours(k)` is monotone non-increasing in `k`: speeding up never adds hours. Feasibility is therefore a threshold — every speed at or above some minimum finishes within `h`, every speed below does not — which is exactly the shape binary search exploits. The search range is `[1, max(piles)]`: speed 1 may be too slow, while `max(piles)` empties any pile in a single hour, and since `h >= len(piles)` that speed always fits.

The code is a textbook lower-bound search: while `lo < hi`, test the midpoint; if `hours(mid) <= h` the answer is `mid` or something smaller, so shrink `hi`; otherwise the answer must be larger, so raise `lo`. The loop exits with `lo == hi` equal to the smallest feasible speed, which is exactly what the problem asks for — the slowest speed that still finishes in time.

Each feasibility check is one pass over the piles using `math.ceil`, so the cost is `O(n)` evaluations times `O(log m)` probes for the largest pile `m`. In Python the big-integer sum needs no overflow care, but the same loop in a fixed-width language should use `(pile + k - 1) // k` and a 64-bit accumulator, since the hour total can reach `10^4 * 10^9`.

**Complexity:** `O(n log m)` time, `O(1)` space.
