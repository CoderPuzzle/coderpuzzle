# Solutions

## Corner walk on a monotone grid

Because f increases in both arguments, treat the 1000 x 1000 grid as a sorted matrix and walk it from the top-right corner (x = 1, y = 1000) with two pointers: when f(x, y) is below z every smaller x on this row is also below, so advance x; when it is above z every larger y in this column is also above, so decrease y. An exact match records the pair — strict monotonicity makes it unique in its row and column — and both pointers move.

Each step eliminates a full row or column of the grid, so at most 2000 evaluations of f are made in total, far under the query budget (the plain 1000 x 1000 scan the hint suggests also fits).

**Complexity:** O(x + y) time — at most 2000 calls to f — and O(k) space for the k returned pairs.
