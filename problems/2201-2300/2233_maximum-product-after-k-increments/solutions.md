# Solutions — Maximum Product After K Increments

## Feed every increment to the current minimum

For a fixed sum, a product of non-negative numbers is maximized when the
factors are as equal as possible — moving one unit from a larger factor to a
smaller one never decreases the product. So each of the k operations goes to
the currently smallest element: a min-heap holds the array, and each
operation pops the minimum and pushes it back incremented by one. After k
steps the heap contains the balanced final multiset; multiply everything,
reducing modulo `10⁹ + 7` at each step. Reducing per multiplication is safe:
each factor is below the modulus and below `2⁵³`, so even JavaScript's plain
numbers keep every intermediate product exact while still honoring "maximize
before taking the modulo" (the heap phase never sees the modulus).

The heap does `k` increments of `O(log n)` plus one build of `O(n)`; with n
and k up to `10⁵` this is comfortably fast in every language.

**Complexity:** `O(n + k log n)` time, `O(n)` space.
