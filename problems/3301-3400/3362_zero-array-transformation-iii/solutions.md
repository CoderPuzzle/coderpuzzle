# Solutions — Zero Array Transformation III

## Greedy Coverage with a Max-Heap

Because each kept query decrements every index of its range by at most 1
and the amounts are chosen per index independently, a set of remaining
queries succeeds exactly when every index `i` is covered at least
`nums[i]` times — no other coupling exists. Maximizing removals is
therefore minimizing the number of kept queries subject to per-index
coverage lower bounds, and the natural greedy applies: scan indices left
to right, and whenever the coverage already committed falls short of
`nums[i]`, commit more queries at this index; among those available the
one whose range extends farthest to the right is always a safe choice,
by the standard exchange argument (any solution using a shorter-ending
query here can swap it for the longer one without losing coverage
anywhere later).

The sweep materializes this in one pass. Sort the queries by left
endpoint and hold the ones started but not yet decided in a max-heap
keyed by right endpoint; a difference array tracks the committed
coverage so the running count at index `i` updates in constant time. On
a deficit, pop heap maxima — first discarding entries that end before
`i`, which can never help again — and select them until the demand is
met; an empty heap at that moment proves `nums` cannot reach zero even
with every query, so the answer is `-1`. Each query is pushed and popped
once per role, and the answer is the total query count minus the
selected minimum.

**Complexity:** `O((n + q) log q)` time, `O(n + q)` space.
