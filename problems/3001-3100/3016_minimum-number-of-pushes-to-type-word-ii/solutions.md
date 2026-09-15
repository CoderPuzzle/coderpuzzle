# Solutions — Minimum Number of Pushes to Type Word II

## Count frequencies, then fill tiers greedily

The eight number keys are interchangeable slots: the total cost depends only
on how many letters sit at each push depth, never on which key holds which
letter. So count how often each letter occurs and sort those counts in
non-increasing order. Walking the sorted counts, the first eight letters take
the eight slots at depth 1, the next eight take depth 2, and so on; the
letter at sorted position `index` therefore costs `index // 8 + 1` pushes
per occurrence.

This greedy ordering is optimal because the counts only shrink while tier
costs only grow: whenever a more frequent letter sat deeper than a less
frequent one, swapping their two assignments would remove
`(more - less) * (depth difference)` pushes, so any optimal mapping can be
reshaped into the sorted one without raising its cost. Letters beyond the
slots already filled simply stay unmapped — a key may end up with fewer than
eight letters or none at all, since only the letters of `word` need homes.

**Complexity:** `O(n + |Σ| log |Σ|)` time, `O(|Σ|)` space,
for `n = word.length` and at most 26 distinct lowercase letters.
