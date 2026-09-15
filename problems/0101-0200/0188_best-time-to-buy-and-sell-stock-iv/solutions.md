# Solutions — Best Time to Buy and Sell Stock IV

## Transaction DP with an Unlimited-Transaction Shortcut

The solution first recognizes when the transaction cap cannot bind. A profitable transaction needs two distinct days (a buy and a later sell), so at most `n/2` transactions can ever contribute profit on an `n`-day array. When `k >= n // 2`, the limit is effectively unlimited and the answer is simply the sum of all positive day-to-day price increases — summing each upward move greedily collects every possible disjoint profit in a single linear scan. Degenerate inputs (`n < 2` or `k == 0`) return 0 immediately.

Otherwise it runs a DP that tracks, for each transaction count `j` from 1 to `k`, two values after processing the current day: `buy[j]`, the best cash balance while holding the stock of the `j`-th buy, and `sell[j]`, the best profit after completing `j` sells. For each new price `p`, `buy[j]` either keeps the previous holding or buys now out of the profit of `j-1` finished transactions (`sell[j-1] - p`), and `sell[j]` either stays as is or sells the held position at `p` (`buy[j] + price`). Updating `buy[j]` before `sell[j]` in the same iteration allows a same-day buy-then-sell, which is a zero-profit transaction and therefore never harms optimality.

`buy` starts at negative infinity (holding is impossible before any price is seen) and `sell` starts at 0, so the max operations never invent impossible states. Each day updates all `k` transaction levels in place, and after the final day `sell[k]` is the best profit using at most `k` transactions — unused transactions simply remain valued at the lower `sell[j]` levels they subsume.

**Complexity:** `O(nk)` time, `O(k)` space.
