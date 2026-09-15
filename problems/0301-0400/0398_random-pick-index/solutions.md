# Solutions — Random Pick Index

## Value-to-Index Buckets

`pick` must return a uniform index among the positions holding `target`, and those positions are fixed the moment the constructor finishes. So the canonical structure does the matching work exactly once: one pass appends each index to a bucket list keyed by its value (`Map<Integer, List<Integer>>` in Java, `dict[int, list[int]]` in Python). A `pick(target)` is then a single uniform draw over that value's bucket — `random.randrange(m)` / `ThreadLocalRandom.current().nextInt(m)` indexing the stored list — making each of the `m` qualifying indices exactly equally likely, which is precisely what the statistical judge samples for (each judged `pick` runs thousands of draws and every qualifying index's frequency must match `1/m` within a tolerance band; every other draw fails the validity check outright).

The judge needs a target's bucket large enough to accumulate mass per index, so the statistical cases stick to targets occupying up to ~120 positions; a target spanning an entire `10⁴`-element array is covered by the validity requirement (each draw must land on one of its indices) with its per-index frequencies merged into the distribution's tail.

**Complexity:** `O(n)` construction, expected `O(1)` per `pick`, `O(n)` space.

## Reservoir Sampling (Follow-up)

When the array cannot be indexed repeatedly — streamed once, or too large to keep — the buckets are the part to drop. Scan on each call counting occurrences of `target` and holding a single candidate: at the `k`-th occurrence, replace the candidate with probability `1/k`. The same induction as classic reservoir sampling shows the survivor is uniform over the `m` occurrences, using two counters and no index storage — at the cost of one full pass per call.

**Complexity:** `O(1)` extra space, `O(n)` time per `pick`.
