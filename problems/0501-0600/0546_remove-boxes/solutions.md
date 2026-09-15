# Solutions — Remove Boxes

## Interval DP with a carried-run third dimension

Every removal welds whatever sits on its two sides together, so a greedy pass
that keeps taking the largest run loses immediately: in the first example the
best play spends its first two moves on single boxes, sacrificing sure points
to weld the scattered 3s — and later the two 1s — into far larger groups. Any
decision about a box depends on which same-colored boxes it may yet meet, and
those can be separated by boxes not yet removed, so the order of removals
matters in a way no interval-local rule captures.

The search state is an interval plus a carry: `dfs(l, r, k)` is the best score
from `boxes[l..r]` when `k` boxes of `boxes[l]`'s color, already removed from
outside the interval, sit glued to its left and will join its group. That
third dimension is what lets the recursion plan across a gap — the carried
boxes are exactly the ones it has already promised to a future merge. Adjacent
same-colored boxes never need separate treatment: holding `boxes[l]` until its
identical neighbor leaves only grows the eventual group, so the whole run is
absorbed into the carry on entry.

Each state makes two kinds of move. Either it takes `boxes[l]` and its carry
now, scoring `(k+1)^2` and solving the remainder from scratch, or it holds
`boxes[l]`: clear everything up to some later `m` with the same color first,
which leaves the pair to meet as `dfs(m, r, k+1)`, one richer in the carry.
The answer is the max over both, and the carry is why the square can be
earned on boxes the interval itself does not contain.

**Complexity:** `O(n^3)` states — interval endpoints times carry — each trying
`O(n)` merge partners, `O(n^4)` time in the worst case and `O(n^3)` space for
the memo; absorbing adjacent runs keeps the states a handful of `O(n^2)`
slices in practice.
