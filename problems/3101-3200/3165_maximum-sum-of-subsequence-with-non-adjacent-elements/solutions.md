# Solutions — Maximum Sum of Subsequence With Non-adjacent Elements

## Segment tree of 2×2 boundary matrices

The classic house-robber recurrence recomputes the whole array per query, which is too slow for 5·10⁴ point updates. The fix is to notice that the non-adjacency constraint is local: a segment's best subsequence is fully described by four numbers — the best sum given whether the segment's first element is taken (row index) and whether its last element is taken (column index). Two neighboring segments combine by gluing their boundary states, forbidding the combination where both touch the junction.

The merge tries all choices of left exit state k and right entry state l, skipping k = l = 1 (that would select the two elements adjacent across the seam) and keeps the maximum of left[i][k] + right[l][j] for each outer pair (i, j). This operation is associative, so the four numbers behave like a monoid and can live in a segment tree: a leaf is ((0, NEG), (NEG, x)) — a single element either is skipped (sum 0, no boundary taken) or is taken alone — and the root after any set of updates holds the four boundary states of the whole array.

Each query is a point update (rewrite the leaf, re-merge the O(log n) nodes on the path) followed by taking the maximum of the root's four entries, which is exactly the best non-adjacent sum for the current array. NEG is a very negative sentinel so impossible boundary combinations never win, and it also makes all-negative arrays correctly return 0, the empty subsequence. The per-query answers are accumulated modulo 10⁹ + 7.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
