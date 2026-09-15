# Solutions — K Empty Slots

## Day inversion with a sliding-window minimum

A pair is decided by when its two endpoints light relative to the bulbs
trapped between them, not by when a scan reaches them, so the first move
inverts the input: `days[p]` records the turn on which position `p` lights,
and the day-by-day simulation collapses into one static array. A window
`(i, i+k+1)` qualifies exactly when both endpoints light before every
interior position — the interior is then still dark at
`max(days[i], days[i+k+1])` — so each window contributes one candidate day,
and the answer is the minimum candidate over all windows, `-1` if none.

The interior `[i+1, i+k]` is a fixed-width window that slides one position
at a time as `i` advances, so its minimum is exactly what a monotonic deque
tracks in amortized constant time: the deque holds interior indices whose
day values strictly increase, every entering index pops the dominated backs,
and the front is always the current interior minimum. A window is valid
precisely when that front minimum exceeds `max(days[i], days[i+k+1])`, which
tests all `k` interior bulbs at once instead of rescanning them.

Two edges fall out of the same formulation. With `k = 0` the interior is
empty, the minimum is vacuously infinite, and every adjacent lit pair
qualifies. A row shorter than `k + 2` positions cannot span the gap at all,
so it answers `-1` before any work; each index enters and leaves the deque
at most once, keeping the whole pass linear.

**Complexity:** `O(n)` time, `O(n)` space.
