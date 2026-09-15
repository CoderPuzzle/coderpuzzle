# Solutions — Minimum Sideway Jumps

The frog's journey decomposes point by point, and at every point only three
things can be true: it stands on lane 1, 2, or 3. That tiny state space,
swept left to right, already encodes every route.

## Three-lane dynamic program

Let `dp[lane]` be the fewest side jumps needed to be standing on that lane
at the point currently being processed; initially lane 2 costs 0 and the
other two lanes cost one jump each, since the frog starts on lane 2 at
point 0. Advancing to the next point is free along the same lane, while a
lane change is exactly one side jump, so the new `dp[lane]` is the smaller
of its old value and the previous point's overall minimum plus one — the
cheapest lane from which a single jump reaches it.

The obstacle at the new point removes one lane from play before the
relaxation: its `dp` slot is pushed to infinity, and the relaxation only
visits open lanes. Note the blocked lane's previous value still feeds the
`best + 1` term, because a frog that stood there one point earlier can
jump sideways and continue. After the last point the answer is the minimum
of the three slots — any lane is an acceptable destination. Each of the
`n` points does constant work over three lanes.

**Complexity:** `O(n)` time, `O(1)` extra space.
