# Solutions — Maximum Number of Achievable Transfer Requests

## Subset enumeration with degree balancing

`requests.length` is at most 16, so every subset of requests fits in a
32-bit mask and there are only `2^16` of them to examine — small enough to
try them all. For a fixed mask, decide which requests are "on," and track,
per building, the net change in employees: each selected `[from, to]`
request subtracts one from `from`'s count and adds one to `to`'s count. The
subset is achievable exactly when every building's net change is zero,
because that is precisely the "arrivals equal departures" condition the
problem describes.

The search walks every mask from `0` to `2^m - 1`. For each one it rebuilds
the per-building net-change array from scratch (an `O(n)`-sized array
cleared each iteration), applies every selected request's `+1`/`-1` pair,
and — only if this mask's popcount already beats the best found so far —
checks whether every entry is zero. Skipping the all-zero check whenever
the popcount cannot possibly improve on the current best avoids wasted work
on masks that could never win. The empty mask is always achievable (zero
requests, trivially balanced), so the answer is never negative.

**Complexity:** `O(2^m * (m + n))` time, `O(n)` space, where `m` is
`requests.length`.
