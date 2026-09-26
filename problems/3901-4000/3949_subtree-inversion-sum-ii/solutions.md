# Solutions — Subtree Inversion Sum II

For each subtree and capped distance d, store the maximum and minimum sum with closest selected inversion at distance d. Child states merge in O(k) using suffix extrema and the cross-child distance constraint. Selecting the current node negates compatible child minima/maxima.

## Closest-inversion tree DP

For each subtree and capped distance d, store the maximum and minimum sum with closest selected inversion at distance d. Child states merge in O(k) using suffix extrema and the cross-child distance constraint. Selecting the current node negates compatible child minima/maxima.

![On the 6-node example with k=2, inverting node 2 flips its subtree to +10
and freezes node 0 at distance 1; the per-subtree max/min rows tagged by
closest-inversion distance merge bottom-up to a root max row [15, 23, 3], so
the answer is 23.](figures/solution-closest-inversion-dp.svg)

**Complexity:** `O(nk) time, O(nk) space`.
