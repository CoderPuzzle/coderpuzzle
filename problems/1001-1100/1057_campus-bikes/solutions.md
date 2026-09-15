# Solutions — Campus Bikes

## Sort every (worker, bike) pair, then greedily assign

Build one triple `(distance, workerIndex, bikeIndex)` for every worker/
bike combination and sort the triples ascending by distance, then by
worker index, then by bike index — exactly the tie-break the statement
specifies. Walking the sorted triples in order and assigning a bike to a
worker the first time both are still free reproduces the statement's
own greedy process: at every step the globally next-closest still-valid
pair is the one committed, so ties resolve to the smallest worker index
and, failing that, the smallest bike index, in the same order the
statement describes. The walk stops once every worker has a bike.

**Complexity:** `O(n * m * log(n * m))` time, `O(n * m)` space, where n
is the worker count and m is the bike count.
