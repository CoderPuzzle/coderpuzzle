# Solutions — Group Shifted Strings

## Anchored-Shift Hash Key

Every shifting sequence contains exactly one string that begins with `'a'`: keep left-shifting and within 25 steps the first letter arrives at it. That member is the sequence's anchored form, and computing it is the same as measuring the gap from the first letter to every letter, taken mod 26 so the wrap past `'z'` cancels — `"bcd"`, `"yza"`, and `"abc"` all anchor to `"abc"`. Two strings belong to the same sequence exactly when their anchored forms are equal, which makes the anchored form a perfect hash key: shifted copies collide by construction, unshiftable strings never do.

The algorithm makes a single pass over the input. For each string it computes the anchored key and appends the original string to the bucket stored under that key, so group membership accumulates automatically — every string lands in exactly one bucket, alongside precisely its shifts. Because each append happens in input order, buckets come out ordered by their key's first appearance with members in input order, exactly the output the statement pins. Python hashes the gap tuple itself; the other six languages encode the same tuple as a string, mapping each gap onto `'a'`–`'z'` — the anchored member itself.

One scan of each string builds its key, so over `N` strings of maximum length `L` the pass does `O(N · L)` work, and the map holds every string once under a key of its own length, `O(N · L)` space — the size of the output, which no algorithm can avoid. No special cases are needed: single-letter strings all anchor to `"a"` and share one group, duplicates of a string land beside it, and strings of different lengths never collide because the key keeps the string's length.

**Complexity:** `O(N · L)` time, `O(N · L)` space.
