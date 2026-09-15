# Solutions — Maximum Total Value

The solution finds the cutoff gain by binary search and sums the selected
arithmetic-sequence terms directly.

## Binary search over the selected-gain threshold

For a positive threshold `g`, index `i` contributes
`floor((value[i] - g) / decay[i]) + 1` gains of at least `g` when
`value[i] >= g`. Summing these counts lets us binary-search the largest
threshold for which at least `m` positive gains remain.

Every gain strictly above the cutoff must be selected. Their sums are computed
with the arithmetic-progression formula, then the remaining slots are filled
with copies of the cutoff itself. If fewer than `m` positive gains exist, all
of them are taken instead. Modular arithmetic is applied throughout the sum.

**Complexity:** O(n log V) time and O(1) extra space.
