# Get Watched Videos by Your Friends

## Approach: BFS to level k, then count and sort

The people at level `k` are exactly those whose shortest-path distance
from `id` equals `k`, and a breadth-first search discovers nodes in
increasing distance order. Running one BFS from `id` and stopping after
`k` queue layers therefore enumerates precisely the level-`k` people —
each node's first discovery fixes its minimum distance, so no shorter
route can be missed.

Those people's watched lists are folded into one frequency map; a video
watched by the same person twice or by several level-`k` friends counts
once per occurrence. The final list sorts names by
`(frequency ascending, name ascending)`, exactly the statement's tie
rule, and each distinct name appears once.

**Complexity:** O(V + E + W log W) time where W is the total number of
watched-video entries at level k; O(V + W) space.
