# Solutions — K Closest Points to Origin

## Sort by Squared Distance

Comparing Euclidean distances is unnecessary: the square root is monotone on non-negative numbers, so ranking points by `x*x + y*y` produces exactly the same order as ranking by `sqrt(x^2 + y^2)`. Working with the squared form avoids both the cost of the root and any floating-point rounding, keeping the comparison exact over integers.

The solution sorts all points by that integer key and returns the first `k`, copying each into a fresh list. With `n` up to 10^4 the sort is instant, and the guarantee that `k <= points.length` means the slice never comes up short; points equidistant from the origin may appear in any relative order, which the problem permits.

For much larger inputs, the same ordering key feeds two classic refinements: a max-heap capped at `k` elements gives `O(n log k)`, and quickselect on the key gives `O(n)` on average. Neither is needed at these constraints, where the simple sort is the clearest correct choice.

**Complexity:** `O(n log n)` time, `O(n)` space.
