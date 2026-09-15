# Solutions — Continuous Subarrays

## Sliding window with two monotonic deques

A window is continuous exactly when its largest and smallest elements differ
by at most 2. The statement quantifies over every pair of indices in the
window, but a single pair decides it: taking the positions of the maximum and
the minimum makes the condition read `max - min <= 2`, and no other pair can
differ by more than that spread. The all-pairs definition therefore collapses
into one running statistic per window.

Count the subarrays by their right endpoint. For each `right`, the valid
starts form a prefix `[left, right]`: if a start is invalid now it stays
invalid later, because extending a window to the right can only raise its
maximum and lower its minimum. Contrapositively any window legal at `right`
was legal at `right - 1`, so the smallest valid start never moves backward
and one `left` pointer sweeps forward forever; each `right` then contributes
`right - left + 1` windows, counting every size-1 window too (spread 0).

Two monotonic deques maintain the statistic in amortized constant time: a
min-deque of indices with increasing values and a max-deque of indices with
decreasing values, whose fronts report the window's extremes. When those
fronts report a spread strictly above 2 (equality is allowed), `left`
advances until the band is legal again, expiring whichever front reaches each
abandoned index. Every index enters each deque once and leaves at most once —
pushed out from the back by a stronger element or dropped from the front by
`left` — so the sweep is linear despite the two moving boundaries. The count
reaches `n(n+1)/2` (a constant array gives about `5·10^9` at `n = 10^5`), so
the fixed-width languages must accumulate in 64 bits.

**Complexity:** `O(n)` time, `O(n)` space.
