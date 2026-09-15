# Solutions — Number of Pairs of Interchangeable Rectangles

## Reduced ratio counts

Two rectangles are interchangeable exactly when their width and height reduce
to the same pair. For each rectangle, divide both dimensions by their greatest
common divisor and use the resulting integer pair as a hash-map key. This keeps
the comparison exact and avoids any dependence on floating-point rounding.

While scanning the rectangles, the count already stored for a ratio is the
number of earlier rectangles that can pair with the current one. Add that count
to the answer, then increment the ratio's frequency. The answer uses 64-bit
storage because up to `n * (n - 1) / 2` pairs may exist.

**Complexity:** `O(n log M)` time, where `M` is the largest dimension, and `O(n)` space.
