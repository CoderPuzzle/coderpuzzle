# Solutions — Maximum Total Value of Covered Indices

A maximal run starting after a zero can cover every index from that zero through the run except one, so add the range sum minus its minimum. A run beginning at zero covers its own indices exactly. These ranges are disjoint.

## Token-block greedy

A maximal run starting after a zero can cover every index from that zero through the run except one, so add the range sum minus its minimum. A run beginning at zero covers its own indices exactly. These ranges are disjoint.

![With nums=[9,2,6,1] and s=0101, the tokens at indices 1 and 3 slide one
step left onto indices 0 and 2, covering 9 + 6 = 15, while each block drops
its minimum (2 and 1).](figures/solution-token-slide-greedy.svg)

**Complexity:** `O(n) time, O(1) space`.
