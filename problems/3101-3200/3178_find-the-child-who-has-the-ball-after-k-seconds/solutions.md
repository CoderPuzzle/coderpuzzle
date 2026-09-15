# Solutions — Find the Child Who Has the Ball After K Seconds

## Cycle arithmetic

The holder's position is a triangle wave: the ball marches from child 0 up
to child n - 1, then retraces its steps to child 0. That round trip takes
exactly 2 * (n - 1) seconds and returns both the position and the passing
direction to their initial state, so everything after that repeats —
precisely what the statement's hints point out. Reducing k modulo
2 * (n - 1) leaves an offset r whose first n - 1 values are forward steps,
and each remaining value mirrors around the far end as 2 * (n - 1) - r.

One modulo and one comparison answer any k in constant time and constant
space; no loop ever runs over the seconds.

**Complexity:** `O(1)` time, `O(1)` space.
