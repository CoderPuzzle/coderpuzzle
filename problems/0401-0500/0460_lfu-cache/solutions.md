# Solutions — LFU Cache

## Frequency-Bucket Doubly Linked List with Per-Bucket LRU Lists

An LFU cache juggles two live orderings at once: frequency decides _which_ count to evict, recency breaks ties _within_ a count. The `LFUCache` gives each ordering its own linked structure. The outer doubly linked list holds **frequency buckets in increasing count order**, so the first real bucket is always the minimum frequency. Each bucket wraps an inner doubly linked list of its keys in use order, least recent next to the head sentinel. A hash map from key to node completes the structure, making `get` an `O(1)` jump.

Every use — a `get` hit, a value-updating `put`, or a fresh insert — funnels into one `bump` routine: unlink the node from its bucket, look at the neighbouring bucket, and either reuse it (its frequency is exactly one more) or create it right there; then relink the node at the tail (most-recent) end. A bucket that empties is unlinked on the spot — this is what keeps "first bucket = minimum" true without ever scanning for the minimum. New keys always enter a frequency-1 bucket, created at the front when the current first bucket holds a higher count.

Eviction therefore reads two pointers: the first bucket, and the node after its head sentinel — the least frequently used key, least recently used among ties. Its own `key` field tells the map which entry to delete.

**Complexity:** `O(1)` average time per `get`/`put`, `O(capacity)` space.
