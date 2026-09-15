# Solutions — Minimum Cost for Cutting Cake I

## Greedy merge of descending cut costs

A horizontal line must be re-cut once for every vertical strip the cake has already split into, and symmetrically for vertical lines: performing a horizontal cut costs its base price times (number of vertical cuts already made + 1). Since every cut becomes more expensive each time the opposite direction is cut first, expensive cuts should happen early, while their multiplier is still small. An exchange argument makes this precise — swapping two adjacent cuts of opposite directions never lowers the total when the more expensive one goes first — which yields the optimal schedule directly.

The code sorts both cut lists in descending order and merges them like in a two-pointer merge: at each step it takes the head with the larger base cost, charging cut_cost * (opposite_cuts_made + 1) and incrementing that direction's counter. Ties (>=) go to the horizontal head, which is safe because equal base costs are interchangeable in the exchange argument. When one list drains, the remaining cuts of the other direction all pay the now-fixed multiplier of the opposite count.

![The 3x2 cake of example 1: cutting V0 first (x1) splits it into two strips, so each horizontal line is paid twice — 5 + 3*2 + 1*2 = 13.](figures/solution-cut-order.svg)

This replaces the hint's rectangle DP with a sort: the greedy schedule is a global optimum, not an approximation, and it makes the cost independent of m and n beyond the sort itself. The 1×1 target simply means every line is eventually cut, which the two drain loops guarantee.

**Complexity:** `O(m log m + n log n)` time, `O(m + n)` space.
