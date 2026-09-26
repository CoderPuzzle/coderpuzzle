# Solutions — Average Height of Buildings in Each Segment

## Sweep coordinate events

Only a building start or end can change the set of active heights. At each
start coordinate, record positive changes to the active height sum and active
count; at each end, record the corresponding negative changes. Sorting the
event coordinates then partitions the street into intervals with constant
coverage.

Apply the event at a coordinate before describing the interval to the next
coordinate. When the active count is positive, integer-divide the 64-bit active
height sum by that count. Extend the preceding output only when it ends at the
current coordinate and has the same average; requiring contiguity prevents an
uncovered gap from being merged away. Event coordinates are scanned in numeric
order, so the result is already left-to-right.

![Sweeping buildings [[1, 4, 2], [3, 9, 4]] as events +2 at 1, +4 at 3, −2 at 4 and −4 at 9 keeps the running sum and count constant on stretches 1-3, 3-4 and 4-9 with averages 2/1 = 2, 6/2 = 3 and 4/1 = 4; adjacent averages all differ, so nothing merges: [[1, 3, 2], [3, 4, 3], [4, 9, 4]].](figures/solution-sweep-event-intervals.svg)

**Complexity:** `O(n log n)` time, `O(n)` space.
