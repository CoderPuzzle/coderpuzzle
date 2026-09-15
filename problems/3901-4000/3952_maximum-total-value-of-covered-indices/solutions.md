# Solutions — Maximum Total Value of Covered Indices

A maximal run starting after a zero can cover every index from that zero through the run except one, so add the range sum minus its minimum. A run beginning at zero covers its own indices exactly. These ranges are disjoint.

## Token-block greedy

A maximal run starting after a zero can cover every index from that zero through the run except one, so add the range sum minus its minimum. A run beginning at zero covers its own indices exactly. These ranges are disjoint.

**Complexity:** `O(n) time, O(1) space`.
