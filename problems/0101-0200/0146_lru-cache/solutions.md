# Solutions — LRU Cache

## Hash Map plus Doubly Linked Recency List

An LRU cache needs two things at once: fast lookup by key, and a recency order that can move any entry to the front and drop the oldest in constant time. No single classic container does both, so the `LRUCache` combines them: a **doubly linked list** threads through the cached entries (most recently used next to the head sentinel, least recently used next to the tail sentinel), and a **hash map** goes from key to list node.

`get` jumps to the node through the map, unlinks it from its neighbors, and relinks it at the front — four pointer writes, independent of the cache size. `put` on an existing key does the same move while overwriting the value; a miss inserts a fresh node at the front, first evicting when the map has reached `capacity`: the node before the tail sentinel is the least recently used, and its own `key` field tells the map which entry to delete (this is why nodes carry their key even though the map could otherwise recover it).

Sentinel head and tail nodes are what keep the code branch-free at the edges: an empty cache, a single entry, and the eviction of the last node all run through the same unlink/relink pair, with no null checks on neighbors.

Both the Python and Java canonical solutions implement exactly this structure. With at most `2 * 10⁵` operations, each a constant number of map and pointer touches, the whole workload stays far inside the limits.

**Complexity:** `O(1)` average time per `get`/`put`, `O(capacity)` space.
