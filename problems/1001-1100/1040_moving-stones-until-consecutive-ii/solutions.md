# Solutions — Moving Stones Until Consecutive II

## Sort, then a two-sided formula for the maximum and a sliding window for the minimum

Sort the stones. If the sorted positions are already `n` consecutive
integers, no move is legal and the answer is `[0, 0]`.

**Maximum.** To stall as long as possible, keep nudging the endpoint
stone on one side just one slot inward per move, filling every empty
slot on that side one at a time. The catch is the _other_ side: it is
never reachable this way, so whichever side we leave untouched, its own
already-occupied span is wasted. Losing the low side wastes
`stones[1] - stones[0]` positions of the low gap that can never be
visited this way, so playing it out from the high side yields
`stones[n-1] - stones[1] - (n - 2)` moves; symmetrically, playing it out
from the low side yields `stones[n-2] - stones[0] - (n - 2)` moves. The
maximum is the larger of the two — whichever side wastes fewer stones.

**Minimum.** Slide a window of `n` consecutive integer _values_ across
the sorted positions. For the window ending at `stones[r]`, advance the
left pointer `l` while `stones[r] - stones[l] + 1 > n`; the stones with
index in `[l, r]` already sit inside a `n`-wide span, so only
`n - (r - l + 1)` of them need to move. Taking the minimum of this
quantity over every window gives the answer — with one classic
exception. If a window already holds `n - 1` stones packed with zero
gaps (`stones[r] - stones[l] == n - 2`) and only one move looks needed,
that move is actually illegal: the lone outside stone cannot jump
straight into the missing slot, because doing so would still leave it
sitting at an endpoint of the resulting configuration (the move rule
requires a stone to stop being an endpoint). It first has to make a
throwaway hop into the interior, then a second move closes the gap — so
that window really costs 2, not 1.

**Complexity:** `O(n log n)` time (dominated by the sort), `O(1)`
auxiliary space (or `O(log n)` for the sort's own bookkeeping).
