# Solutions — Self Crossing

## Case analysis on the last six moves

The direction rotates counter-clockwise by a fixed quarter turn, so the path
is a chain of axis-aligned lines that can only ever fold back onto its recent
past. A new line runs perpendicular to the one drawn three moves back, and
the two lines in between can bring it no closer to anything older than that —
which means a crossing, if there is one, appears the moment it happens, inside
a window of at most six consecutive distances. The whole question collapses to
one forward scan that checks three exact configurations at every position
`i >= 3`.

The first case is the plain four-line crossing: the current line reaches at
least as far as the line two back while the previous line fails to get past
the line three back (`d[i] >= d[i-2]` and `d[i-1] <= d[i-3]`) — the shape of
`[2,1,1,2]`, which crosses at `(0, 1)`. The second case is the five-line
touch: the fourth line is exactly as long as the second (`d[i-1] == d[i-3]`),
which puts the parallel fifth line back on the first line's track, and the
fifth then reaches far enough along it to meet or overlap the first
(`d[i] + d[i-4] >= d[i-2]`) — the shape of `[1,1,2,1,1]`, which returns to
`(0, 0)`. The third case is the six-line spiral closing: the path
grew outward (`d[i-2] >= d[i-4]`, `d[i-3] >= d[i-1]`), stayed inside the
reach of the earlier turns (`d[i-1] + d[i-5] >= d[i-3]`), and the sixth line
cuts inward at least to the first line's track (`d[i] >= d[i-2] - d[i-4]`) —
the shape of `[1,1,2,2,1,1]`, which closes onto `(0, 0)`. Touching counts as
crossing throughout, so every comparison is inclusive: Example 3's
`[1,1,1,2,1]` trips the first case through the equality
`d[i-1] == d[i-3]` and crosses at `(0, 0)`.

Paths that stay in one regime never trip anything. An outward spiral
(`1,1,2,2,3,3,...`) fails the first case because `d[i-1] > d[i-3]` keeps
growing, and an inward spiral (`4,3,2,1`) fails it because `d[i] < d[i-2]`
always — the walk curls safely inside itself. A crossing needs a regime
change, a growing or steady pattern that abruptly turns back, and each
inequality above pins down exactly one of the three ways that turn can end.
No state survives an iteration, so the scan reads each distance once and
answers from six values alone.

**Complexity:** `O(n)` time, `O(1)` space.
