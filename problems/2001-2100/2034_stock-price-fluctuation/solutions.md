# Solutions — Stock Price Fluctuation

## Timestamp Map plus Twin Lazy Heaps

The stream asks two orthogonal questions. "What is the newest record?" needs
only a running maximum of timestamps; "what price does each timestamp
currently carry?" needs a hash map from timestamp to price — a correction is
just a map overwrite, and `current` composes the two answers.

The hard part is `maximum`/`minimum` under corrections: the multiset of live
prices changes whenever an old timestamp is rewritten, and a heap cannot
remove an arbitrary element. The `StockPrice` class sidesteps deletion
entirely. Every `update` pushes the pair `(price, timestamp)` onto a max-heap
_and_ a min-heap without ever removing anything. An entry becomes garbage
exactly when the map's price for its timestamp no longer matches — so when an
extremum is requested, the top is peeked, and while it disagrees with the map
it is popped and discarded.

This is safe because prices only need to be _equal_ for an entry to be valid,
not identical objects: a corrected-back price revives nothing incorrectly,
since duplicates of a valid pair simply return the same extremum. Each pushed
entry is popped at most once over the whole run, so the lazy cleanup is
amortized constant per push, and both heaps stay small enough to fit the
`10⁵`-call budget comfortably.

Both the Python and Java canonical solutions implement exactly this scheme
(the Java version stores each record as an `int[] {price, timestamp}` ordered
by price through the heap comparators).

**Complexity:** `O(1)` for `current`, `O(log n)` amortized per `update` or
`maximum`/`minimum` call, `O(n)` space for `n` updates.
