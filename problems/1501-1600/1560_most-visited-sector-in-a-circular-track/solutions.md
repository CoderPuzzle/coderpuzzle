# Solutions — Most Visited Sector in a Circular Track

## Endpoints only

Walking every sector of every lap can look expensive, but the shape of the
walk makes it unnecessary. Concatenating all `m` laps end to end produces one
continuous forward walk around the track, from `rounds[0]` to
`rounds[rounds.length - 1]`. That walk is some whole number of full laps of
the track plus one shorter, final partial lap. A full lap visits every
sector exactly once, so it never changes which sectors are the most visited
— only the partial lap does, by giving each sector it touches one extra
visit. That partial lap is precisely the arc that starts at `rounds[0]` and
ends at the marathon's last sector, so the most-visited sectors are exactly
that arc, and everything in between `rounds[0]` and `rounds[m]` — how many
laps happened, and in what order — is irrelevant.

The code reads only `start = rounds[0]` and `end = rounds[rounds.length -
1]`. If `start <= end`, the arc does not cross the `n`-to-`1` boundary and is
simply the ascending range `[start, end]`. Otherwise the arc wraps: it runs
from `start` up to sector `n`, then continues from sector `1` up to `end`,
so the answer is `[1, end]` followed by `[start, n]`, which is already in
ascending order. The case `start == end` (the marathon ends on the sector it
began on) falls out of the first branch as the singleton `[start]`: an exact
whole number of full laps still leaves the starting sector one visit ahead
of every other sector, since it alone is counted at both the very beginning
and the very end of the walk.

**Complexity:** `O(n)` time, `O(1)` extra space (excluding output).
