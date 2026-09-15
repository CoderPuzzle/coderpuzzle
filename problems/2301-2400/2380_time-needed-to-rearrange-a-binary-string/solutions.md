# Solutions — Time Needed to Rearrange a Binary String

## Linear pass over zero runs

The simulation view explains the timing: every second, each `1` that still
has a `0` directly in front of it swaps forward one position. So a `1`
crossing a run of `zeros` zeros needs exactly `zeros` seconds to get past
them — but it cannot start moving until the previous `1` has finished
moving, because until then some other `"01"` pair keeps the traffic jam in
front of it. Processing the string left to right while counting the zeros
seen so far captures both effects in one recurrence: when we meet a `1`
after `zeros` zeros, the seconds needed so far become `max(ans + 1,
zeros)` — at least one more second than the previous `1` required, but at
least long enough to cross its own zero run. Zeros themselves never change
the clock.

The final value of `ans` is the number of seconds, matching the simulated
process exactly.

**Complexity:** `O(n)` time, `O(1)` space.
