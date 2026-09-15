# Solutions — Nested List Weight Sum II

## Breadth-first levels with a running re-weight

Walk the structure level by level: the current level holds every element
reached so far, integer holds add into the level's sum, and list holds
expand their children into the next level. Keep two accumulators — `flat`,
the sum of every integer seen so far, and `total`, to which `flat` is added
once per level. When the walk ends after `maxDepth` levels, each integer at
depth `d` has been counted exactly `maxDepth - d + 1` times, which is
precisely its weight — no second pass to find the maximum depth is needed.

The trick that removes the max-depth pre-pass: descending one more level
raises every already-seen integer's weight by one, and re-adding the running
`flat` sum implements exactly that raise.

**Complexity:** `O(N)` time for `N` total elements, `O(N)` space for the
level frontiers.
