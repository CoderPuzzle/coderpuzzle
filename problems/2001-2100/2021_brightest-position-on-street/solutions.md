# Solutions — Brightest Position on Street

## Inclusive interval events

Represent each illuminated interval `[left, right]` by adding `+1` at `left`
and `-1` at `right + 1`. After equal-coordinate deltas are combined, scan the
coordinates numerically and apply each delta; the running sum is the brightness
beginning at that coordinate.

Record a coordinate only when its brightness strictly exceeds the best seen so
far. Because coordinates are processed from smallest to largest, equal maxima
leave the earlier answer untouched, which implements the required smallest-
position tie break.

![With lights [[-3,2],[1,2],[3,3]], each lamp becomes a +1 event at its interval start and a -1 event one past its end; sweeping -5, -1, 0, 4, 7 the running brightness reaches 2 first at -1, the +1 and -1 at 0 cancel without strictly exceeding it, so the answer is -1.](figures/solution-sweep-events.svg)

**Complexity:** `O(n log n)` time and `O(n)` space.
