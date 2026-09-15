# Solutions — Sum of Weighted Modes in Subarrays

## Sliding window with frequency buckets

Consecutive length-`k` windows share `k - 1` elements, so the frequency
table is maintained incrementally: a `cnt` map holds each in-window value's
frequency, and a companion map counts, for every frequency `f`, how many
distinct values currently sit at `f`. An arriving value climbs one bucket;
the leaving value drops one bucket (out entirely when it hits zero). The
top frequency rises only on an entry and can fall by at most one step per
exit — the exit emptied its old bucket, and nothing else moved — so both
directions are O(1) bookkeeping.

What still needs a structure is reading off the smallest value at the top
frequency without rescanning the window. Every count change pushes a
`(-frequency, value)` entry into a min-heap; an entry whose recorded
frequency no longer matches the value's current count is stale. Staleness
cannot be tested eagerly, but it also cannot be missed: whenever the window
re-enters a state `(f, v)`, a fresh entry for it is pushed, so a stale copy
can be discarded permanently the moment it surfaces. After skimming such
tops away, the heap top is provably live at the top frequency, and the pair
ordering makes it the smallest value there — exactly the statement's mode.

Each slide then scores the window as mode times top frequency into the
running total. Up to `10⁵` windows contribute up to `10¹⁰` each (mode `10⁵`
times frequency `10⁵`), so fixed-width languages accumulate in 64-bit
integers; the bound near `2.5 × 10¹⁴` stays exact in JavaScript numbers.
Each heap entry is pushed once per count change and popped at most once,
keeping the pruning amortized.

**Complexity:** `O(n log n)` time, `O(n)` space.
