# Solutions — Minimum Score Triangulation of Polygon

## Interval DP over polygon edges

Fix any chord and ask which triangle uses it: in every triangulation, the edge joining vertices `i` and `j` of a sub-polygon belongs to exactly one triangle `(i, k, j)` with `i < k < j`, and that triangle's third vertex splits the remaining work into the two independent sub-polygons `i..k` and `k..j`. So `dp[i][j]`, the minimum score to triangulate the sub-polygon on vertices `i..j`, satisfies `dp[i][j] = min over k of dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]`, where the product is the weight of the splitting triangle.

Sub-polygons with at most two vertices need no triangles and cost 0, which is the array's default and needs no explicit base case. The loops fill by increasing `gap = j - i` starting at 2 — the smallest interval that is a triangle — so both sub-polygons on the right-hand side are final before they are read. The answer is `dp[0][n - 1]`, the interval spanning the polygon's closing edge.

The decomposition is exhaustive because every triangulation induces exactly one such split at each chord, so the minimum over `k` covers all `C(n - 2)` triangulations without enumerating them. The `n = 3` case is a single product, handled by the first iteration of the gap loop.

**Complexity:** `O(n^3)` time, `O(n^2)` space.
