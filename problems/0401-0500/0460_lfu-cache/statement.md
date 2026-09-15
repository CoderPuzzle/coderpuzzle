# LFU Cache

## Description

Design and implement a data structure for a **Least Frequently Used (LFU)**
cache.

Implement the `LFUCache` class:

- `LFUCache(int capacity)` Initializes the object with the capacity of the
  data structure.
- `int get(int key)` Gets the value of the `key` if the key exists in the
  cache. Otherwise, returns `-1`.
- `void put(int key, int value)` Updates the value of the `key` if present,
  or inserts the `key` if not already present. When the cache reaches its
  capacity, it should invalidate and remove the **least frequently used** key
  before inserting a new item. For this problem, when there is a tie (i.e.,
  two or more keys with the same use count), the **least recently used** key
  would be invalidated.

A use counter is maintained for each key in the cache to determine the least
frequently used key — the key with the smallest use counter is the least
frequently used. When a key is first inserted, its use counter is set to `1`
(due to the `put` operation). The use counter for a key is incremented each
time a `get` or `put` operation is called on it; updating the value of an
existing key therefore counts as a use and never evicts anything by itself.

`get` and `put` must each run in `O(1)` average time complexity.

### Example 1

```text
Input:
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
Explanation:
// cnt(x) = the use counter for key x; cache=[] shows the last-used order
// for tiebreaks (leftmost element is the most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1; cache=[1,2], cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key (cnt 1), invalidate 2; cache=[3,1]
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3; cnt(3)=2
lfu.put(4, 4);   // 1 and 3 both have cnt 2, but 1 is LRU; invalidate 1
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3; cnt(3)=3
lfu.get(4);      // return 4
```

### Example 2

```text
Input:
["LFUCache", "put", "put", "put", "get", "put", "get", "get", "get", "get", "put", "get", "get", "get", "get"]
[[3], [1, 1], [2, 2], [3, 3], [1], [4, 4], [2], [3], [1], [4], [5, 5], [3], [4], [5], [1]]
Output: [null, null, null, null, 1, null, -1, 3, 1, 4, null, -1, 4, 5, 1]
Explanation:
LFUCache lfu = new LFUCache(3);
lfu.put(1, 1);   // cnt(1)=1
lfu.put(2, 2);   // cnt(2)=1
lfu.put(3, 3);   // cnt(3)=1 — the cache is full
lfu.get(1);      // return 1; cnt(1)=2
lfu.put(4, 4);   // tie on cnt 1 between 2 and 3; 2 is LRU, invalidate 2
lfu.get(2);      // return -1
lfu.get(3);      // return 3; cnt(3)=2
lfu.get(1);      // return 1; cnt(1)=3
lfu.get(4);      // return 4; cnt(4)=2
lfu.put(5, 5);   // min count is 2 with keys 3 and 4; 3 is LRU, evict 3
lfu.get(3);      // return -1
lfu.get(4);      // return 4
lfu.get(5);      // return 5
lfu.get(1);      // return 1
```

### Constraints

- `1 <= capacity <= 10⁴`
- `0 <= key <= 10⁵`
- `0 <= value <= 10⁹`
- At most `2 * 10⁵` calls will be made to `get` and `put`.

### Follow-up

Could you order the frequencies themselves along a doubly linked list of
buckets, each bucket holding an LRU list of its keys, so that both the
minimum-frequency bucket and the bucket one step up are found without ever
scanning?

## Hints

### Hint 1

Two orderings are live at once: frequency (which key to evict) and recency
(the tiebreak within equal frequency). Give each ordering its own linked
structure — a doubly linked list of frequency buckets, and inside every
bucket a doubly linked list of keys in use order.

### Hint 2

A hash map from key to its node answers `get` in constant time; the node
carries value and current frequency, so a use moves it from bucket `f` to
bucket `f + 1` — unlink, relink at the end of the target bucket's list
(making it the most recent there), and create the target bucket next to the
old one if it does not exist. Buckets that empty out are removed on the spot,
which is what keeps the first bucket the minimum frequency.

### Hint 3

New keys always enter the frequency-1 bucket (creating it at the front if the
current first bucket is a higher frequency). Eviction reads the first bucket's
least-recent node — `head.next` of its inner list — and deletes it from the
map. Sending every use through the same move-to-next-bucket routine keeps
`get`, fresh `put`, and updating `put` identical code paths.
