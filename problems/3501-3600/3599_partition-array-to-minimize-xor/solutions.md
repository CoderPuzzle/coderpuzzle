# Solutions — Partition Array to Minimize XOR

## Partition Dynamic Programming over Prefix XOR

The only structure that matters is prefix XOR: with
`pre[i] = nums[0] ⊕ … ⊕ nums[i-1]`, the XOR of any subarray
`nums[l..r-1]` is `pre[r] ⊕ pre[l]`, so every candidate partition is just
a set of cut positions. A partition into `k` parts is optimal only if its
last part is optimal to append: if the first `t` elements are already
split into `j-1` parts, taking `nums[t..i-1]` as part `j` costs exactly
`max(best-so-far, pre[i] ⊕ pre[t])`, and the minimum over `t` is the best
completion. That optimal-substructure is all dynamic programming needs.

`dp[j][i]` — the smallest achievable maximum XOR splitting the first `i`
elements into `j` parts — is filled for increasing `j`. `dp[1][i]` is the
whole prefix as a single part (`pre[i]`), and
`dp[j][i] = min over j-1 ≤ t < i of max(dp[j-1][t], pre[i] ⊕ pre[t])`.
The `t` range starts at `j-1` so every part stays non-empty, and only the
previous row is ever read, so two rows roll. The answer is `dp[k][n]`.

With `n ≤ 250` the table is at most `k·n²/2 ≈ 2.6·10⁶` inner evaluations
(at `k = n`, the ranges shrink as `j` grows). All part XORs are below
`2³⁰` because `nums[i] ≤ 10⁹`, so 32-bit XOR is exact in every language.

**Complexity:** `O(k·n²)` time, `O(n)` space (rolling rows).
