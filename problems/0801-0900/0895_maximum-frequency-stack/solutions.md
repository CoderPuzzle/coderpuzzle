# Solutions — Maximum Frequency Stack

## Frequency Buckets of Stacks

`pop` must find the value with the highest count and, among ties, the one
whose latest occurrence is most recent. Neither a plain stack (no frequency
view) nor a count map (no recency view) suffices alone. The `FreqStack` class
combines them: a **hash map `freq`** records each value's current count, and
**buckets indexed by frequency** — `groups[f-1]` — each hold a stack of
values, receiving a value exactly when it is pushed for the `f`-th time.

The bucket structure is what makes both rules fall out at once. When a value
is pushed and its frequency rises to `f`, it goes on top of bucket `f` — so
within a bucket, entries are ordered by recency of reaching that frequency.
The most frequent values are precisely those in the highest non-empty bucket,
and its top is the most recent of them: `pop` reads exactly that. After the
pop the value's occurrence at level `f` is spent, but its occurrence at level
`f-1` remains in the bucket below — decrementing `freq` and leaving that
bucket untouched implements the demotion.

A running `maxfreq` avoids scanning for the highest bucket. It rises by one
exactly when a value enters a bucket above the current maximum. When a pop
empties the top bucket, no value can still hold that frequency — its only
occurrence at that level was just removed — so the maximum falls by exactly
one. Both operations are constant-time dictionary and list-end touches.

Both the Python and Java canonical solutions implement exactly this structure
(bucket lists grow on demand in both). With at most `2 * 10⁴` calls the
buckets hold at most `2 * 10⁴` entries in total across all levels.

**Complexity:** `O(1)` time per `push`/`pop`, `O(n)` space for `n` pushed
values.
