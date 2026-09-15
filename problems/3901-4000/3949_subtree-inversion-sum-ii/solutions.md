# Solutions — Subtree Inversion Sum II

For each subtree and capped distance d, store the maximum and minimum sum with closest selected inversion at distance d. Child states merge in O(k) using suffix extrema and the cross-child distance constraint. Selecting the current node negates compatible child minima/maxima.

## Closest-inversion tree DP

For each subtree and capped distance d, store the maximum and minimum sum with closest selected inversion at distance d. Child states merge in O(k) using suffix extrema and the cross-child distance constraint. Selecting the current node negates compatible child minima/maxima.

**Complexity:** `O(nk) time, O(nk) space`.
