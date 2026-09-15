# Solutions — Minimum Number of Coins for Fruits II

## Sliding-Window DP with a Monotonic Deque

Let `dp[i]` be the minimum cost to acquire the first `i` fruits. If the last fruit actually purchased is `l`, then everything from `l + 1` through `2l` comes free with it, so `l` covers the prefix `i` exactly when `l <= i <= 2l`, i.e. `ceil(i / 2) <= l <= i`. The recurrence is `dp[i] = min over valid l of dp[l - 1] + prices[l]`: pay for fruit `l` on top of the cheapest solution before it, and it carries the rest of the prefix for free. Purchasing a fruit you could have taken free is allowed and is sometimes optimal, which is exactly why `l = i` (buying the last fruit) stays a candidate.

Evaluating the min over the window naively is quadratic, but the window `[ceil(i/2), i]` slides forward monotonically as `i` grows, which invites a monotonic deque. Walking `i` from 1 to `n`: first push `i` itself as a fresh candidate with value `dp[i - 1] + prices[i]`, popping from the back every candidate whose value is at least as large (it is dominated — older and no cheaper — so it can never be the future minimum); then drop candidates from the front whose index has fallen below `ceil(i / 2)`; the front of the deque is then the minimum over the current window and directly gives `dp[i]`.

Each index enters and leaves the deque at most once, so the whole sweep is linear despite the nested-looking loops. The deque is seeded per iteration, the base `dp[0] = 0` covers the single-fruit case, and `dp[n]` is the answer for acquiring everything.

**Complexity:** `O(n)` time, `O(n)` space.
