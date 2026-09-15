# Solutions — Power Update After K-th Largest Insertion I

## Fenwick order statistics

Coordinate-compress every value that can appear, then store counts in a
Fenwick tree. Each query inserts its new value, computes the current size,
and asks for the element whose increasing-order rank is
`size - k + 1`, which is exactly the `k`th largest.

Fast exponentiation updates `p` modulo `10⁹ + 7`. The Fenwick tree keeps each
query logarithmic in the number of distinct values.

**Complexity:** `O((n + q) log m)` time, `O(m)` space, where `m` is the
number of distinct values.
