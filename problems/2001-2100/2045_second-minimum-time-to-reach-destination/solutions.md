# Solutions — Second Minimum Time to Reach Destination

Every road costs the same and every signal flips on one shared schedule, so a
trip's clock reading at each step depends only on how many roads it has
crossed. Both searches exploit that pin to drop clock time out of the
exploration and chase the two smallest distinct edge counts that reach
intersection `n`, then run one direct simulation of the winning count through
the signals. The modified Dijkstra orders its arrivals with a min-heap keyed
by the count and pays a logarithmic factor per edge for it; the breadth-first
sweep takes the same arrival order for free from the unweighted roads, one
count layer at a time, and closes as the tighter tool.

## Dijkstra over two arrivals per vertex

The modified Dijkstra keeps the same bookkeeping — per vertex, the two
smallest distinct edge counts that reach it — but hands the ordering to a
min-heap keyed by the count instead of a first-in, first-out queue. An entry
carries one recorded count for its vertex, and a pop returns the smallest
count still in play, so neighbors relax in nondecreasing arrival order with
`count + 1`. A relaxed count either beats the smallest slot, demoting the
previous winner to second, or falls strictly between the two slots; anything
else is already on record and is dropped, so equal-length routes never
masquerade as a second value. An entry whose count now exceeds its vertex's
second slot is stale — both slots improved after the push — and is skipped.
The second slot of vertex `n` is the count the closing simulation needs.

That simulation is unchanged: cross exactly that many roads, sitting out
each red phase — an odd value of `elapsed / change` means advance to the next
multiple of `change` — and adding `time` per crossing. Wide internal
arithmetic keeps the running total safe before the 32-bit return.

**Complexity:** `O((n + m) log n)` time and `O(n + m)` space, where `m` is the
number of edges.

## Two edge-count arrivals per vertex

Because every edge takes the same time and every signal changes on the same
schedule, every walk with the same number of edges reaches each step at the
same time. A breadth-first search can therefore ignore clock time initially:
for every vertex it records the smallest and second distinct smallest edge
counts that reach it. A queue propagates a count only when it improves one of
those two slots, so equal-length routes do not masquerade as a second value and
each vertex contributes at most two states.

Once the second edge count for vertex `n` is known, simulate exactly that many
traversals. Before each edge, an odd value of `elapsed / change` means the
signal is red, so advance to the next multiple of `change`; otherwise leave
immediately. Then add `time`. Using wide arithmetic internally keeps the wait
and traversal additions safe before returning the guaranteed 32-bit result.

**Complexity:** `O(n + m)` time and `O(n + m)` space, where `m` is the number of edges.
