# Solutions — Maximum Candies You Can Get from Boxes

## Worklist BFS over openable held boxes

Two things gate a box: owning it (it was initial, or it fell out of another
box) and being able to unlock it (`status[i] == 1`, either from the start or
because some opened box held its key). Neither event by itself opens
anything — the candy only flows when both hold at once — so the algorithm
keeps two waiting sets and fires whenever an arrival makes a box qualify.

A worklist queue holds owned-and-openable boxes. Opening one collects its
candies, then merges in what it releases: each contained box joins the
ownership set (queueing immediately if already unlocked, otherwise parking
in the locked-held set), and each key flips that box's `status` to 1,
releasing it from the locked-held set if we were already holding it. The
total accumulates every opened box exactly once; when the queue drains, no
remaining box can ever satisfy both conditions at once.

The loop is a fixpoint search: every box is enqueued at most once per
ownership event and opened once, so the sweep is linear in the total size of
`keys` and `containedBoxes`. A key for a box you never own is harmless, and
an owned box whose key never arrives simply stays parked forever — both are
correctly excluded from the sum.

**Complexity:** `O(n + k)` time where `k` is the total number of key and
contained-box entries across all boxes, `O(n)` space.
