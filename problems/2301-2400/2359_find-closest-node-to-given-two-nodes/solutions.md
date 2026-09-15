# Solutions — Find Closest Node to Given Two Nodes

## Walk from each start recording first-visit times, then scan by index

Because every node has at most one outgoing edge, the walk out of a start
node is forced: from `current` the only next step is `edges[current]`. So
the set of distances from one start is produced by simply following that
single chain, writing down the step count on each first visit, and stopping
at `-1` (no outgoing edge) or at a node already visited — which is exactly
where the walk re-enters a cycle and would otherwise loop forever. Each
start yields one distance array over all `n` nodes in a single pass.

With both arrays in hand (`d1[v]` and `d2[v]`, `-1` where a node is not
reachable from that start), scan nodes in ascending index order and keep
the best candidate: among nodes reachable from both starts — `d1[v] != -1`
and `d2[v] != -1` — minimize `max(d1[v], d2[v])`, and because the scan
starts from node 0 upward, a strict improvement test makes ties resolve to
the smallest index automatically. The whole algorithm is two linear walks
plus one linear scan.

**Complexity:** `O(n)` time, `O(n)` space.
