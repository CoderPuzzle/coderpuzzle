# Solutions — Find the Kth Smallest Sum of a Matrix With Sorted Rows

## Best-first search over index tuples

Every candidate array is an index tuple picking one column per row, and
the tuples form an implicit grid whose edges are "advance one row's
index by one". Because each row is non-decreasing, advancing an index
never decreases the sum, so the grid is a DAG ordered by sum: the kth
smallest sum can be found by best-first search that pops the current
minimum and pushes its immediate successors.

The heap starts with the all-zeros tuple (every row's first element — the
global minimum). Popping a tuple yields the next smallest sum; its
successors are the tuples with one row's index advanced, each carrying
the sum plus that row's increment. A visited set on the tuples keeps the
same candidate from being pushed through two different parents, which is
what bounds the heap at `O(k · m)` entries rather than the full `n ^ m`
space. After `k` pops the last popped sum is the answer.

![On mat = [[1, 3, 11], [2, 4, 6]] with k = 5, the heap pops index-tuple sums 3, 5, 5, 7, each pop pushing the tuples that advance one row's index, and the 5th pop is 7, the kth smallest sum.](figures/solution-bestfirst-tuple-pops.svg)

Since `k <= 200` and `m <= 40`, the search expands at most a few thousand
tuples; each tuple is a short vector, and sums stay below `40 · 5000 =
200000`, far inside 32-bit range.

**Complexity:** `O(k · m · log(k · m))` time for the pops and pushes,
`O(k · m)` space for the heap and visited set.
