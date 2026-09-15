# Solutions — Maximum Total Area Occupied by Pistons

## Critical times and the up-minus-down balance

From one second to the next, the total area changes by exactly the
up-minus-down balance: every piston heading up adds a unit, every piston
heading down takes one away. That balance itself only moves when some
piston lands on an end and turns around — call each such moment a
critical time. Between consecutive critical times the balance is frozen,
so the total traces a straight line, and a straight line peaks at an
endpoint; checking the total at the start and at every critical time
therefore catches the overall maximum.

Each piston's critical times are easy to list. Heading up from
`positions[i]` it first reaches the top after `height - positions[i]`
seconds; heading down, it reaches the floor after `positions[i]` seconds;
and a piston parked at an end is turned around immediately, so its
heading effectively points inward. From that first arrival on, it lands
on an end again every `height` seconds, alternating ends. The whole
configuration repeats with period `2 * height`, since by then every
piston is back where it started with its original heading, so only
critical times inside `(0, 2 * height]` can matter — at most two per
piston.

Sort those at most `2n` times and sweep them in order, carrying the
running total and the balance. Crossing a gap adds balance times gap
length; arriving at a critical time flips every landing piston, moving
the balance by two per flip (a piston turning up at the floor raises it,
one coming off the top lowers it). Totals reach `n * height = 10¹¹`,
well past 32-bit range, so the running total and the answer need 64-bit
integers throughout.

**Complexity:** `O(n log n)` time, `O(n)` space.
