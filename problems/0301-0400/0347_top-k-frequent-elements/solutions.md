# Solutions — Top K Frequent Elements

Both variants open with the same counting pass — a hash map from value to
occurrences in one sweep over the array — and then select the `k` most
frequent values from the resulting unique `(value, count)` items in two
different ways. Both break frequency ties by taking the smaller value,
which makes the chosen set deterministic and matches the judge's expected
answers exactly.

## Frequency Buckets

Since a count can only range from 1 to `n`, the ranking can be produced
without any comparison sort over frequencies: drop each unique value into
`buckets[count]` — a list of lists indexed by frequency — then walk the
index from `n` down to `1`, collecting values from the highest-frequency
buckets first until `k` are gathered. The walk is a scan over indices, and
a frequency's bucket directly answers "which values occur exactly this
often".

The one comparison-sort left is inside a bucket: values sharing the same
frequency are sorted ascending before collection, so a tie at the `k`
boundary resolves to the smaller value rather than to hash-map iteration
order. That is the whole difference from a naive bucket walk, which would
pick arbitrarily among equal counts and fail the deterministic expected
set. The result is near-linear work — no sort touches all unique items
unless they genuinely share one frequency.

**Complexity:** `O(n)` time for the counting pass plus bucket building and
the index walk; the in-bucket sorts sum to at most `O(u log u)` over `u`
unique values (typically far less, since few values share a frequency).
`O(n)` space for the map and buckets.

## Size-k Min-Heap by Count

Instead of ranking every unique value, keep a min-heap of only `k` items
keyed so the root is the weakest keeper — the smallest count, and among
equal counts the largest value. Each unique `(value, count)` item is
streamed through: while the heap holds fewer than `k` items it is pushed
outright; afterwards the newcomer evicts the root only when it outranks it
— a higher count, or an equal count with a smaller value. Because the
eviction order is exactly the final ranking turned around, the `k`
survivors are the top `k` by (higher count, then smaller value), the same
selection the bucket walk makes, and a final sort of the survivors by that
key produces the same list.

Each of the `u` unique values costs at most one heap replacement at
`O(log k)`, so the selection is independent of how many values share
frequencies — unlike the bucket variant's in-bucket sorts, this never pays
for the values it never keeps. The price is the log factor and keeping
`k` items on the heap rather than spreading values across buckets.

**Complexity:** `O(n + u log k)` time — `O(n)` to count plus `O(u)` heap
operations at `O(log k)` each, with `u` the number of unique values.
`O(u + k)` space for the map and the heap.
