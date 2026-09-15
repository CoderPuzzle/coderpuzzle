# Solutions — Ant on the Boundary

## Running sum from the boundary

Because a positive element moves the ant right and a negative one moves it
left, the ant's signed distance from the boundary after reading any prefix of
`nums` is simply the running sum of that prefix.

So walk `nums` once, adding each element to the running sum and counting how
often the sum lands exactly on zero. The check happens only after a move
completes, exactly as the statement requires: a jump whose size exceeds the
current distance crosses the boundary mid-move but lands away from zero, so it
never increments the count.

**Complexity:** `O(n)` time, `O(1)` space.
