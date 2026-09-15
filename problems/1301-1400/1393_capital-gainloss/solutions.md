# Solutions — Capital Gain/Loss

## Signed-price sum per stock

Each round trip contributes `sell price - buy price` to its stock's total, so summing with `Buy` rows negated and `Sell` rows kept positive collapses every round trip into one aggregate per stock — the order of operations never matters to a sum. A `CASE` expression supplies the sign and `GROUP BY stock_name` does the collapsing.

The guarantee that every buy is eventually sold means no unmatched rows skew the totals; stocks whose gains and losses cancel simply report 0. One grouped pass reads each row once.

**Complexity:** `O(R)` time over `R` stock rows, `O(S)` space for the `S` distinct stock groups.
