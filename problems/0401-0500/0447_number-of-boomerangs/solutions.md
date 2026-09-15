# Solutions — Number of Boomerangs

## Distance count per apex

The apex pins the boomerang. Once the first point `i` of the tuple is fixed,
`(i, j, k)` asks nothing of `j` and `k` except that they sit at the same
distance from `i`, so the pass groups the other points by their distance from
`i`. A bucket that holds `c` points fills the two ordered slots in
`c * (c - 1)` ways — either member may come first, and the statement counts
the order — and summing over every bucket of every apex counts each
boomerang exactly once.

The buckets are keyed by squared distance. Equal squares are equal lengths,
so the code never takes a square root and floating point never gets the
chance to round two equal distances apart or two different ones together;
the deltas themselves are exact integers, and with coordinates bounded by
`10⁴` their squares stay far below any overflow. Each apex rebuilds its map
and drops it, so only one row of distances is ever alive at a time.

The total stays modest at the ceiling: no apex pairs with more than `n - 1`
others, so the answer is bounded by `n * (n - 1)² ≈ 1.25 * 10⁸` —
comfortably inside 32 bits.

**Complexity:** `O(n²)` time, `O(n)` space.
