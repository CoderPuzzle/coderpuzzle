# Solutions — New 21 Game

## Sliding-window probability DP

Let `dp[i]` be the probability that Alice ever holds exactly `i` points. She can only stand on `i` by arriving from one of the previous `maxPts` scores, each reached with the same conditional probability `1 / maxPts`, so `dp[i]` is the average of `dp[i - maxPts .. i - 1]` over the values that are still "live" (scores below `k`, since drawing stops at `k`). Computing that average naively costs `O(maxPts)` per score, but the `maxPts` most recent values form a window that slides by one each step, so a running sum updated with one addition and one subtraction makes the whole pass linear.

The window bookkeeping is where the rules sneak in: `dp[i]` is added to the window only when `i < k`, because a score of `k` or more is terminal and cannot be drawn from; and `dp[i - maxPts]` leaves the window as soon as it falls out of reach. `dp[0] = 1` seeds the process, and the answer is the sum of `dp[k..n]`, since those are the terminal scores that satisfy "at most `n`". Two shortcuts avoid work entirely: `k == 0` means no draws happen, and if `n >= k - 1 + maxPts` then even the largest possible final score (`k - 1` points plus one maximal draw) stays within `n`, so the probability is exactly 1.

The final summation uses compensated (Neumaier) addition, accumulating the tiny rounding errors of float addition in a separate correction term and adding it back at the end. With up to `10^4` terms of similar magnitude this keeps the result comfortably inside the `1e-5` tolerance.

**Complexity:** `O(n)` time, `O(n)` space.
