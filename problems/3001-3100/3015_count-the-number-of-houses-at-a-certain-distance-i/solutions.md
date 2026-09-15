# Solutions — Count the Number of Houses at a Certain Distance I

## Breadth-first search from every house

The street network is a chain of `n` houses plus at most one extra street, so
it has `O(n)` streets and every house reaches every other. Build an adjacency
list once: join `i` with `i + 1` for each `1 <= i <= n - 1`, then join `x`
with `y` unless they are already the same house.

Run one breadth-first search per house. Each search fills a distance array
over all houses in nondecreasing order, and every target whose distance is
`k` contributes one ordered pair to the count for `k` — sweeping all targets
per source counts `(a, b)` and `(b, a)` separately, exactly as the statement's
pair lists do. A house is never its own target, so the distance-zero bucket
stays empty and no self-pairs are counted.

**Complexity:** `O(n^2)` time, `O(n)` space.
