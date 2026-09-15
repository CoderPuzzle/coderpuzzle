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

**Complexity:** `O(n log n)` time and `O(n)` space.
