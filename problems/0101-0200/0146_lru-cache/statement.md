# LRU Cache

## Description

Design a data structure that follows the constraints of a **Least Recently
Used (LRU)** cache.

Implement the `LRUCache` class:

- `LRUCache(int capacity)` Initialize the LRU cache with **positive** size
  `capacity`.
- `int get(int key)` Return the value of the `key` if the key exists,
  otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the key
  exists. Otherwise, add the key-value pair to the cache. If the number of
  keys exceeds the `capacity` from this operation, **evict the least recently
  used key**.

A use of a key happens on both `get` and `put` calls on it; updating an
existing key's value counts as a use. `get` and `put` must each run in
`O(1)` average time complexity.

### Example 1

```text
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, null, -1, 3, 4]
Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1 — key 1 becomes most recently used
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

### Example 2

```text
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get"]
[[1], [10, 100], [10, 200], [10], [20, 300], [10], [10, 400], [10], [20]]
Output: [null, null, null, 200, null, -1, null, 400, -1]
Explanation:
LRUCache lRUCache = new LRUCache(1);
lRUCache.put(10, 100); // cache is {10=100}
lRUCache.put(10, 200); // existing key: value updated, no eviction
lRUCache.get(10);      // return 200
lRUCache.put(20, 300); // capacity exceeded: evicts 10, cache is {20=300}
lRUCache.get(10);      // return -1
lRUCache.put(10, 400); // evicts 20, cache is {10=400}
lRUCache.get(10);      // return 400
lRUCache.get(20);      // return -1
```

### Constraints

- `1 <= capacity <= 3000`
- `0 <= key <= 10⁴`
- `0 <= value <= 10⁵`
- At most `2 * 10⁵` calls will be made to `get` and `put`.

### Follow-up

Could you keep recency in a doubly linked list threaded through the cached
entries, with a hash map locating each entry in `O(1)`?

## Hints

### Hint 1

Recency is an ordering that changes on every touch — so store it as a
structure where moving an element to the front is cheap. A doubly linked list
is that structure: unlinking and relinking any node touches only its two
neighbors. Keep the most recently used entry at one end and the least
recently used at the other.

### Hint 2

The list alone cannot find a given key's node without a scan, so pair it with
a hash map from key to list node. The map makes `get` an `O(1)` jump straight
to the entry; the list then moves it to the front or, when capacity is
exceeded, hands over the tail node for eviction (its key is what the map
deletes).

### Hint 3

Sentinel head and tail nodes remove every boundary case: an empty cache, a
single entry, and evicting the last node all become the same unlink/relink
code. Remember that `put` on an existing key must **update the value and move
the node** — it must not evict anything.
