# Solutions — Minimum Speed to Arrive on Time

## Binary search on speed with exact fractions

For a fixed integer speed `s`, the journey time is fully determined: every leg except the last must end on an integer hour because the next train departs only on integer hours, so those legs cost `ceil(dist[i] / s)` each, while the final leg has no successor to wait for and costs exactly `dist[-1] / s`. Raising `s` never increases any term, so "on time" is an upward-closed property of `s` — if a speed works, every faster speed works. That monotonicity invites a binary search for the smallest feasible speed on `[1, S]` with `S = 10^7` (the guaranteed answer ceiling), returning `-1` when even `S` fails.

The check is where precision matters. The code parses `hour` through `Fraction(str(hour))`, so a value like 2.7 is read from its decimal representation rather than inheriting the binary floating-point error of the literal, and every comparison is an exact rational comparison: `ceil(Fraction(d, speed))` for the waiting legs, `Fraction(dist[-1], speed)` for the last, against the rational budget. Without this, a boundary case such as arriving exactly at the deadline could round the wrong way and shift the binary-search answer by one.

The search itself is the standard shrinking interval: `on_time(mid)` moves the upper bound down, otherwise the lower bound moves up, converging on the minimal feasible speed. Each check scans the array once.

**Complexity:** `O(n log S)` time, `O(1)` space.
