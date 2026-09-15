# Solutions — Minimum Subarray Length With Distinct Sum At Least K

A window's distinct sum behaves perfectly under sliding-window updates:
adding a value to the right changes the window's set of values by at most
one element, and removing one from the left likewise. So a frequency
counter plus one running number — the sum of the values currently present
in the window — tracks the quantity exactly, with O(1) work per pointer
move.

## Frequency-Counter Sliding Window

Expand the right end one element at a time. When a value's count rises
from 0 to 1, it joins the running sum; counts of 2 and beyond change
nothing, because the value is already counted. After each expansion,
while the running sum is at least k, record the window length and drop
elements off the left — each removal applies the mirror-image update: a
count falling from 1 to 0 removes its value from the sum, while any other
fall leaves the sum untouched (at least one copy remains). Because
recording happens inside the shrink loop before every removal, no
qualifying window is ever skipped: any shortest window is presented to
the answer check while its right end is in place.

The greedy shrink is safe because a shorter window ending at the same
right end is always at least as good as a longer one, so once a window
qualifies, only its minimal suffix matters. The loop therefore advances
left as far as qualification survives; both pointers only ever move
forward, giving linear total work. If the running sum never reaches k,
the answer stays at -1 — note that a single element equal to k already
qualifies, so failure means every window's distinct-value set sums lower,
which the sweep has examined exhaustively.

The arithmetic fits 64 bits with room to spare: the running sum never
exceeds the sum of all distinct values, at most 10⁵ · 10⁵ = 10¹⁰, past
32-bit range — Java, C++, Go and Rust accumulate it in 64-bit integers,
while Python is unbounded and the JavaScript/TypeScript running sum stays
below `10¹⁰`, comfortably inside the exact `2⁵³` range of doubles. The
answer itself is bounded by n ≤ 10⁵ and returns as a plain 32-bit
integer.

**Complexity:** `O(n)` time, `O(n)` space.
