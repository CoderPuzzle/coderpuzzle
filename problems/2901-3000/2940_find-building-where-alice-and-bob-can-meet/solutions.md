# Solutions — Find Building Where Alice and Bob Can Meet

## Segment Tree First-Above-Threshold Search

Movements only go rightward and strictly upward in height, so two cases resolve instantly once a query's endpoints are ordered `a <= b`: if `a == b` the two are already together (answer `b`), and if `heights[a] < heights[b]` Alice can walk straight to Bob's building (answer `b`). Otherwise both must climb somewhere strictly right of `b`, above `max(heights[a], heights[b])` — whoever stands on the taller building dictates the bar — and the leftmost such building is the answer, or `-1` if none exists to the right.

Finding "the first index in `(b, n)` whose height exceeds a threshold" is where the data structure earns its place. A max segment tree over `heights` supports a descend query: from the root, prune any node whose interval misses the query range or whose maximum is at or below the threshold (no answer can live there); otherwise recurse into the left child first and only fall through to the right child when the left fails. Because the left child is always tried first, the first leaf reached is automatically the leftmost qualifying index — the search order encodes the answer's position.

The cost per query stays logarithmic: the traversal follows the query range's two boundary paths, each failed detour is pruned in constant time by the node maximum, and the single successful descent into a fully covered subtree walks straight down one root-to-leaf path. The tree is built once over a power-of-two padded array, so construction is linear, and up to `5 * 10^4` queries each cost a handful of levels.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
