# Solutions — Minimum Partition Score

Layered dynamic programming over prefix sums, with the per-layer split-point
search accelerated by divide and conquer.

## Prefix-sum partition DP with divide-and-conquer split search

Let P[i] be the sum of the first i elements, so a block nums[t..i-1] has sum
P[i] - P[t] and value f(P[i] - P[t]) where f(s) = s·(s+1)/2. Define dp[j][i]
as the minimum score for covering exactly the first i elements with exactly
j blocks; then dp[1][i] = f(P[i]) and dp[j][i] = min over split points t of
dp[j-1][t] + f(P[i] - P[t]), with t ranging over [j-1, i-1] so both sides
stay non-empty. The answer is dp[k][n]. Layer j only needs i in [j, n-k+j]:
at least j elements are required for j blocks, and at least one element must
remain for each of the k-j later blocks — with this truncation every layer
spans exactly n-k+1 positions. Evaluating every candidate t at every state,
the hint's O(K·N²) DP costs about 1.25×10⁸ evaluations at n = 1000, k = 500,
which is needlessly slow when the layer structure hides monotonicity.

The cost is convex in the block sum, and that convexity gives the quadrangle
inequality: for t1 ≤ t2 ≤ i1 ≤ i2, w(t1,i1) + w(t2,i2) ≤ w(t1,i2) + w(t2,i1),
because f's increments over equal-length intervals only grow as the interval
slides up (write both sides with a = P[i1]-P[t1], A = P[i1]-P[t2] ≤ a and
c = P[i2]-P[i1] to get f(a) + f(A+c) ≤ f(a+c) + f(A), exactly convexity's
increment inequality). Under this inequality the optimal split point of
dp[j][i] is non-decreasing in i, so each layer is computed by divide and
conquer: fix the middle i, scan only the inherited candidate range for its
best (earliest) split point, then recurse into the two halves with that
point splitting the candidate range. A layer of width w does O(w log w)
evaluations instead of O(w²), the whole table O(k·(n-k+1)·log n) — about
2.3×10⁶ evaluations at the worst n = 1000, k = 500 — and the recursion is
only O(log n) ≈ 10 frames deep, safe in every language. Two rolling rows
hold the previous and current layers.

Bounds force 64-bit arithmetic: n ≤ 1000 and nums[i] ≤ 10⁴ put every prefix
sum at most 10⁷, so f(s) = s·(s+1)/2 peaks at f(10⁷) < 5.1×10¹³, far beyond
32-bit. Merging two blocks of sums a and b raises the total by f(a+b) -
f(a) - f(b) = a·b > 0, so the k = 1 score is the maximum any partition can
reach and every dp value stays below 5.1×10¹³ — the fixed-width languages
carry all of P, the dp rows, and s·(s+1) in 64-bit integers (products at
most ~10¹⁴, four orders of magnitude inside the i64 ceiling of 9.2×10¹⁸).
The same ~10¹⁴ bound on every product and sum is what keeps JavaScript
exact: it sits ninety-fold inside 2⁵³ ≈ 9.0×10¹⁵, and s·(s+1) is always
even, so the halving is exact too.

**Complexity:** `O(k·(n−k+1)·log n)` time, `O(n)` space.
