# Solutions — Maximum Gap

## Pigeonhole buckets

The sorted array's `n - 1` gaps sum to `hi - lo`, its full value span, so the average gap is `(hi - lo) / (n - 1)` and the maximum gap — an integer — is at least `ceil` of that. Cut the span into `n - 1` buckets exactly that wide and no gap worth reporting can live inside a single bucket: two values sharing a bucket differ by at most `width - 1`, which is strictly below the bound the maximum is already known to clear. The answer must therefore jump a bucket boundary, which is exactly where the pigeonhole principle helps — `n` values in `n - 1` buckets force at least one empty one, so boundaries with a true gap between them are easy to find without ever sorting.

The code takes three linear passes. The first finds `lo` and `hi`; the second drops every value into its bucket by a single division, keeping only that bucket's min and max — the interior of a bucket never matters. The third sweeps the buckets in order, carrying the last non-empty bucket's max and measuring each non-empty bucket's min against it; skipped empty buckets only widen the measured jump, since anything between the two neighbours would have landed in them. Arrays shorter than two return 0 outright, and an all-equal array has span 0, so it returns 0 before any bucket exists.

Every port keeps all arithmetic in 32-bit range: the bucket index is a plain division `(value - lo) / width` — no multiplication by `n` — and `width = (hi - lo + count - 1) / count` sums two quantities that each stay under 10⁹ plus 10⁵ even at the constraint ceiling. This is what the statement's linear-time, linear-space demand points at: sorting first would answer correctly but pay `O(n log n)` for what three bucket passes do in `O(n)`.

**Complexity:** `O(n)` time, `O(n)` space.
