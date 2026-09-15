# Solutions — Design Hit Counter

## Timestamp-Count Pairs With Front Eviction

The counter keeps one `(timestamp, count)` pair per distinct second that
received a hit, in arrival order — which chronological calls make sorted
order. `hit` either bumps the count on the newest pair, when several hits
land on the same second, or appends a fresh pair with count 1. `getHits`
computes the cutoff `timestamp - 300` and drops every pair at or before it
off the front, then sums the surviving counts: the window is exactly
`(timestamp - 300, timestamp]`, so a hit at precisely the cutoff second is
already outside it while a hit one second later is still inside.

That exclusive lower edge is what the example's last call shows. At
`getHits(301)` the cutoff is 1, so the hit recorded at second 1 falls out
while the hits at 2, 3, and 300 stay — three hits, not four. Eviction at
query time is also what keeps the store small: everything dropped is gone
for good, since later queries only move the cutoff forward.

The follow-up asks whether the design survives a huge number of hits per
second. It does, because `hit` folds repeats into a count: the store never
holds more than one pair per distinct in-window second — at most 300 of
them — no matter how many hits each second brings. Pre-sizing the idea as
a fixed ring of 300 per-second buckets, indexed by `timestamp % 300` and
reset when its second rotates, is the same design with the bound made
explicit.

**Complexity:** `O(1)` amortized per `hit`; `O(k)` per `getHits`, summing
the `k` distinct in-window seconds; `O(D)` space for the `D` stored
timestamps.
