# Solutions — All O`one Data Structure

## One bucket per count, threaded on a doubly-linked list

A hash map takes each key to its bucket, and the buckets themselves form a
doubly-linked list kept in ascending count order — a bucket holds one count
value and the set of keys currently at it, with sentinel nodes below the
smallest and above the largest real count so the ends need no emptiness
checks. An `inc` (or `dec`) moves its key exactly one bucket over: the needed
count is precisely one past the key's current bucket, so only that bucket's
immediate neighbor can already hold it — the neighbor is reused when it does,
and otherwise a fresh bucket is spliced in right next to the old one, which
keeps the list sorted with no searching. Buckets that empty out are unlinked,
and a key stepping down to count 0 is deleted from the map entirely.

The extremes then never move far: `getMinKey` reads the first real bucket
after the head sentinel and `getMaxKey` the last one before the tail. Because
several keys can share that extreme count, each bucket's key set is scanned
once for its lexicographically smallest member — the pinned answer this judge
compares exactly, where the original problem accepted any tied key.

Concretely, for the example: after two `inc("hello")` calls the list holds the
single bucket `2 = {hello}`, so both queries answer `"hello"`. `inc("leet")`
splices the missing bucket `1 = {leet}` in before it, so `getMaxKey` reads
bucket 2 and answers `"hello"` while `getMinKey` reads bucket 1 and answers
`"leet"` — no scan of the counts was needed anywhere.

**Complexity:** `inc`/`dec` run in `O(1)` average time (a hash lookup plus a
constant number of list splices); `getMaxKey`/`getMinKey` scan their bucket
for the pinned key in `O(k)`, where `k` is the number of keys tied at the
extreme count (`Θ(n)` in the worst case, `O(1)` whenever the extreme is
unique); `O(n)` space.
