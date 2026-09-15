# Solutions — Average Waiting Time

Every customer's wait is settled the moment the previous order is
scheduled: the chef starts either at the arrival or when the last order
finishes, whichever is later, and nothing after that can change the
outcome. So one forward sweep carrying the chef's next-free time replays
the whole day — no clock to simulate between events, no queue to hold.

## One sweep of the chef's free time

Carry `free_at`, the time the chef finishes everything already taken,
starting at 0. For each `[arrival, time]` the start is
`max(free_at, arrival)` — the arrival itself whenever the chef has been
idle, the backlog edge otherwise — the finish is `start + time`, and the
wait contributed is `finish - arrival`; `free_at` becomes that finish and
the sweep moves on. The answer is the wait total divided by the customer
count.

Width goes to the total, not the schedule: even the deepest legal queue —
everyone arriving at time 1 with the maximal `10⁴` preparation — keeps
each individual wait near `10⁹` (inside 32 bits) but pushes the total to
`10⁴ · n(n+1)/2 ≈ 5 · 10¹³` at `n = 10⁵`, far past 32 bits. The
fixed-width languages therefore accumulate the total in a 64-bit integer;
Python's integers are unbounded and JavaScript's numbers stay integer and
exact below `2⁵³ ≈ 9 · 10¹⁵`, which this total never approaches.

Floating point enters exactly once, which is why the judge can compare the
return value exactly. The total is an integer below `2⁵³`, so widening it
to a double loses nothing, and a single division of two exactly
represented values is correctly rounded by IEEE 754 — every language here
performs that same division on the same operands and produces the
identical bits. No average is accumulated along the way, so the statement's
`10⁻⁵` acceptance band is honored with the full rounding error of one
division to spare.

**Complexity:** `O(n)` time, `O(1)` extra space.
