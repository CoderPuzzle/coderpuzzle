# Solutions — Burst Balloons

## Interval DP on the Last Balloon Burst

Thinking about the _first_ balloon to burst is hopeless: after it pops, the neighbors change and the subproblems overlap in messy ways. The canonical solution reverses the question and asks which balloon is the _last_ to burst in an interval. At that moment every balloon inside has already gone, so the last balloon's coin gain depends only on the two balloons immediately bounding the interval — values that never change while the interval is being solved. This is what makes the subproblems independent.

The array is padded with a virtual 1 on each end so boundary bursts need no special casing. `dp[left][right]` is defined over the _open_ interval `(left, right)`: the maximum coins from bursting every balloon strictly between indices `left` and `right`, assuming those two boundary balloons are still present. Trying every `k` in the interval as the last burst gives the recurrence: gain `padded[left] * padded[k] * padded[right]` for `k` itself, plus `dp[left][k]` and `dp[k+1, right]` for the two sides, which burst entirely before `k` and are unaffected by it.

The table is filled by increasing interval length, from length 1 up to the full interior, so both subintervals are always ready when a larger interval needs them. The answer is `dp[1][m-2]`, the open interval between the two padding balloons — bursting everything inside with the virtual 1s as permanent boundaries.

Stepping Example 1 (`nums = [3,1,5,8]`, padded to `[1, 3, 1, 5, 8, 1]`) through the table:

1. Length 1 bursts a lone balloon between its padded neighbors: `dp[1][1] = 1·3·1 = 3`, `dp[2][2] = 3·1·5 = 15`, `dp[3][3] = 1·5·8 = 40`, `dp[4][4] = 5·8·1 = 40`.
2. Length 2 pairs: for `[3,1]`, keeping 3 for last gives `1·3·5 + dp[2][2] = 15 + 15 = 30`; likewise `dp[2][3] = 3·5·8 + dp[2][2] = 120 + 15 = 135` (5 last) and `dp[3][4] = 1·8·1 + dp[3][3] = 8 + 40 = 48` (8 last).
3. Length 3: `dp[1][3] = 1·3·8 + dp[2][3] = 24 + 135 = 159` (3 last in `[3,1,5]`) and `dp[2][4] = 3·8·1 + dp[2][3] = 24 + 135 = 159` (8 last in `[1,5,8]`).
4. Length 4: `dp[1][4] = 1·8·1 + dp[1][3] + dp[5][4] = 8 + 159 + 0 = 167` — balloon 8 goes last, and inside `dp[1][3]` balloon 3 is last so 1 and 5 pop first: exactly the statement's coin sequence 15 + 120 + 24 + 8.

Edge cases: a single balloon `[x]` pads to `[1, x, 1]` and the single-length interval yields `x`; the `0` values allowed by the constraints contribute nothing when burst and are handled by the same arithmetic. With `n ≤ 300` the triple loop is at most about 2.7 · 10⁷ inner steps.

**Complexity:** `O(n³)` time, `O(n²)` space.
