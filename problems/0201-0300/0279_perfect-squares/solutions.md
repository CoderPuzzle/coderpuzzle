# Solutions — Perfect Squares

Three routes to the same number; a tabulated recurrence, a shortest-path
search that stops at the first zero, and a pair of classical theorems
that read the answer off the number's shape.

## dp

Let `dp[i]` be the least number of perfect squares summing to `i`. Any decomposition of `i` uses some final square `s <= i`, and what remains is the subproblem `i - s` solved optimally, giving the recurrence `dp[i] = 1 + min(dp[i - s])` over all squares `s` not exceeding `i`. The base case `dp[0] = 0` (zero squares sum to zero) anchors the induction, and every state is reachable because 1 is a square, so no infeasible states exist.

The squares themselves are precomputed once — `i*i` for `i` up to `⌊√n⌋`, about a hundred candidates for n = 10⁴ — and the table is filled for `i = 1..n` in increasing order, so every `dp[i - s]` consulted is already final. The inner loop breaks as soon as `s > i`, and `float("inf")` sentinels simply lose every comparison until a real value overwrites them. `dp[n]` is the answer.

This is the tabulated form of the shortest-path view — n to 0 with edges subtracting any square — where BFS level-by-level would also work but the dp reuses overlapping subproblems explicitly. The cost is one pass over `n` states, each scanning up to `√n` squares, with the dp array as the dominant storage. Lagrange's four-square theorem guarantees the answer is at most 4, but the dp needs no such fact.

**Complexity:** `O(n·√n)` time, `O(n)` space.

## bfs

Read the problem as shortest path: vertices are remainders `0..n`, and each remainder `r` has an edge to `r - s` for every square `s <= r`. The least number of squares summing to `n` is the length of the shortest path from `n` to `0`, so a level-by-level BFS finds it: level `k` holds every value reachable from `n` by subtracting exactly `k` squares, and the first level to produce `0` settles the answer.

A `seen` set keeps each remainder in exactly one level — its shallowest — so a value is never re-expanded, which is what bounds the work at `O(n·√n)` edge inspections (each of up to `n` remainders fans out over at most `√n` squares, breaking early once `s > r`). Unlike the dp, BFS stops the moment 0 appears instead of filling every state: since the answer never exceeds four (Lagrange), at most four levels are ever built, and levels two and three — the wide ones — hold only the remainders actually reachable. The `dp` still reuses overlapping subproblems explicitly, which is why both share the same asymptotic shape while the search usually touches far fewer states in practice.

**Complexity:** `O(n·√n)` time, `O(n)` space.

## math_lagrange

Two classical theorems collapse the problem to a handful of arithmetic checks. Lagrange's four-square theorem guarantees every natural number is a sum of four squares, so the answer is 1, 2, 3, or 4. Legendre's three-square theorem says exactly which numbers need the fourth: `n` is a sum of three squares unless it has the form `4^a(8b + 7)`. So: strip factors of 4 (they do not change the answer — dividing out a 4 scales each square in a decomposition by 2), and if what remains is `7 (mod 8)`, the answer is 4.

Otherwise the answer is at most 3, and the small cases are decided directly: `n` itself a perfect square means 1; a scan of `a` up to `√(n/2)` finding `n - a²` a perfect square means 2 (the cap `a² + a² <= n` covers unordered pairs); anything else must be 3, since 4 was already excluded. Each perfect-square test is one rounded square root — exact at these magnitudes — making the whole decision `O(√n)` and the storage a few scalars. The trade-off versus the algorithmic variants is transparency: nothing here explains _which_ squares sum to `n`, only how many there must be.

**Complexity:** `O(√n)` time, `O(1)` space.
