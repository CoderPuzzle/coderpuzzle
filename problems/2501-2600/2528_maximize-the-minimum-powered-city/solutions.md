# Solutions — Maximize the Minimum Powered City

## Binary Search on Minimum Power with Greedy Sweep

"Maximize the minimum city power" is a classic binary-search-on-answer shape: if every city can be lifted to at least `target`, then any smaller target is also achievable, so the answer can be searched over `[0, min(power) + k]`. The upper bound is safe because one new station raises any single city's power by at most 1, so `k` stations can lift the weakest city by at most `k`.

Before searching, the initial power of each city is computed with a difference array: a station at `i` serves the window `max(0, i-r)..min(n-1, i+r)`, so add `stations[i]` at the window's left edge and subtract at `right + 1`, then prefix-sum. This turns `n` range-additions into an O(n) pass instead of O(n·r).

The feasibility check for a candidate target sweeps left to right, repairing cities as they are encountered. Whenever city `i` is short, the check builds `need` stations at position `min(n-1, i + r)` — the rightmost location that still covers city `i` — because that placement helps city `i` _and_ the largest possible set of future cities; any placement covering `i` is dominated by it. A second difference array `extra` tracks how many of these built stations are currently in effect (`extra[right+1] -= need` retires them once the sweep passes their window), and `used` accumulates the total built, aborting early if it exceeds `k`. If the sweep finishes with `used <= k`, the target is feasible.

Because each new station is counted once globally but its window effect is applied incrementally, the check is a single O(n) pass, and the binary search runs it O(log(min(power) + k)) times. `k` can be as large as 10^9, which is exactly why the answer must be searched rather than simulated, and why `used` is compared against `k` rather than assumed small.

**Complexity:** `O(n log(min(power) + k))` time, `O(n)` space.
