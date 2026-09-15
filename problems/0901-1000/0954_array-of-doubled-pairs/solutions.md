# Solutions — Array of Doubled Pairs

## Greedy on absolute values

A pair is always `(x, 2 * x)`, and that pins the value with the smallest
absolute value: its only possible partner is its double, because its half
would have a strictly smaller magnitude and cannot be waiting for it. So
there is nothing to choose — every copy of that value must claim a copy of
its double, and the same argument then applies to what remains. Following
the values in ascending order of absolute value therefore decides the whole
pairing without any backtracking.

The code counts occurrences in a hash map, then walks the distinct values
sorted by absolute value. A second map, `need`, carries how many copies of
the current value `v` are already claimed as doubles of `v / 2`. If the
demand exceeds the supply the pairing is impossible; otherwise the
unclaimed copies — `count[v] - need[v]` of them — each require a `2 * v`,
so that number is pushed onto `need[2 * v]`. When unclaimed copies exist
but `2 * v` never occurs in the array, the pairing fails on the spot.

Zero and the negative side need one care each. Zero is its own double, so
the walk meets it first and it can only pair with itself — its count must
be even. Doubling a negative moves it farther from zero, so within the
negatives the same ascending walk runs independently and the two signs
never mix: in `[4,-2,2,-4]` the pairs fall out as `(-2,-4)` and `(2,4)`.

**Complexity:** `O(n log n)` time, `O(n)` space.
