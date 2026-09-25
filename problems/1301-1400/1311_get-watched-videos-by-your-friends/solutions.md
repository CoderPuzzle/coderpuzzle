# Get Watched Videos by Your Friends

## Approach: BFS to level k, then count and sort

The people at level `k` are exactly those whose shortest-path distance
from `id` equals `k`, and a breadth-first search discovers nodes in
increasing distance order. Running one BFS from `id` and stopping after
`k` queue layers therefore enumerates precisely the level-`k` people —
each node's first discovery fixes its minimum distance, so no shorter
route can be missed.

![From id = 0 at level 1 the BFS rings in friends 1 and 2 (person 3 waits at level 2 and is never expanded), their videos tally B→1 and C→2, and the (frequency, name) sort returns ["B","C"].](figures/solution-bfs-level-tally.svg)

Those people's watched lists are folded into one frequency map; a video
watched by the same person twice or by several level-`k` friends counts
once per occurrence. The final list sorts names by
`(frequency ascending, name ascending)`, exactly the statement's tie
rule, and each distinct name appears once.

**Complexity:** O(V + E + W log W) time where W is the total number of
watched-video entries at level k; O(V + W) space.
