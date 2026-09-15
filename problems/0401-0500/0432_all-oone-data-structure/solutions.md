# Solutions — All O`one Data Structure

## Count-Bucket Doubly Linked List

The structure groups keys by their count: one **bucket** per distinct count, holding every key currently at that count, with the buckets threaded on a doubly linked list in increasing count order. A hash map from key to its list node makes each `inc` and `dec` a constant-time jump. With that layout the two getters are pointer reads — the bucket after the head sentinel is the minimum count, the bucket before the tail sentinel is the maximum, and any key in the requested bucket answers the query (the head of its inner list is the natural pick); an empty structure shows only sentinels, which is exactly when `""` is returned.

Because counts change by exactly one, a key never jumps over an intermediate bucket: `inc` moves it to the neighbouring bucket one count up (creating that bucket in place if absent), and `dec` moves it one count down — or, when the count reaches zero, deletes the node and its map entry. Each move is one unlink and one relink, plus the bucket bookkeeping that keeps the outer list honest: a bucket that empties is unlinked immediately, so the first and last buckets are always live extremes and no scanning is ever needed.

**Complexity:** `O(1)` average time per operation, `O(number of stored keys)` space.
