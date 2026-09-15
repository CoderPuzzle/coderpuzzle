# Solutions — H-Index

## Counting Buckets Clamped at n

The h-index can never exceed the number of papers `n`, so any citation count above `n` is as good as `n` for the purpose of the definition. That observation enables a counting-sort style bucket pass instead of an `O(n log n)` sort: tally each paper into `count[min(c, n)]`, an array of `n + 1` buckets indexed by citation count with everything oversized clamped into the last bucket.

The h-index is the largest `h` with "at least `h` papers cited at least `h` times," and the buckets answer that in one sweep from the top. Walking `h` from `n` down to 0 and accumulating `total += count[h]`, the running `total` after adding bucket `h` is exactly the number of papers with _at least_ `h` citations (papers with more citations were clamped into higher-or-equal buckets and already counted). The first `h` where `total >= h` is the answer, and it is maximal because every larger `h` was tested first and failed the same test.

The sweep always terminates with an answer — at `h = 0` the accumulated total equals `n >= 0` — so the trailing return is unreachable in practice. Both passes are linear: one bucket-filling pass over the citations and one pass over the `n + 1` buckets, with the bucket array as the only extra storage.

**Complexity:** `O(n)` time, `O(n)` space.
