# Solutions — Count Collisions on a Road

## Trim the escape runs, count the trapped movers

Only two kinds of cars get through untouched: the leading run of `'L'`s, with
nothing ahead of them ever, and the trailing run of `'R'`s, with nothing
behind them ever. Everything between those runs is trapped — the span is
bookended left and right by something that eventually stands still, so every
mover inside it is funneled into a collision.

The count then falls out of an attribution argument rather than a
simulation. Charge each collision to the moving car that arrives at it: a
head-on pair costs `2` and involves exactly two movers, so each pays `1`;
a mover striking a stationary car, or a pile of previously stopped cars,
costs `1` and involves exactly one arriving mover. A mover's first collision
is always of one of those two shapes — two same-direction movers never
catch each other — so every trapped mover contributes exactly `1` and no
stationary car contributes anything. The answer is just the number of
non-`'S'` characters left after trimming the two escape runs.

For `"RLRSLL"` nothing trims, and the five movers `R, L, R, L, L` give `5`;
for `"LLRR"` everything trims and the answer is `0`. The whole computation
is two scans from the ends plus one count, well within 32-bit range since
the total never exceeds the string length.

**Complexity:** `O(n)` time, `O(1)` extra space.
