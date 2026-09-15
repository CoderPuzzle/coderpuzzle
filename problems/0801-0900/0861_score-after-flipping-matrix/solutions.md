# Solutions — Score After Flipping Matrix

The score is a sum over bit positions with wildly unequal weights, so the
moves are best decided one weight at a time, heaviest bit first — and once
the leading column is settled, every remaining column can be decided on its
own.

## Greedy, heaviest bit first

A leading `1` is worth `2^(n-1)`, which exceeds every other bit of the same
row combined (`2^(n-1) - 1`). So in an optimal answer no row may keep a
leading `0`: toggling such a row gains at least `2^(n-1)` and can lose at
most `2^(n-1) - 1`, a strict improvement no matter what the rest of the row
holds. Begin by toggling every row whose first cell is `0`; each of the `m`
rows now contributes `2^(n-1)` outright, which is `m << (n - 1)`.

With the heads fixed, the only remaining freedom is column toggles, and
column `j` contributes `k · 2^(n-1-j)` where `k` is its count of `1`'s.
Toggling swaps the count `k` for `m - k`, the columns do not interact, and
row toggles are already spent — so each column independently contributes
`max(k, m - k) · 2^(n-1-j)`. When `k` is exactly `m/2` the toggle changes
nothing, and the maximum is still taken. No flip is ever applied; the best
count is simply added.

The head pass never needs to touch the matrix either. Row `i` was toggled
exactly when its head was `0`, so afterwards cell `(i, j)` holds `1` exactly
when `grid[i][j]` originally agreed with `grid[i][0]` — agreeing with a `1`
head survived, agreeing with a `0` head was flipped along with it. The count
for column `j` is therefore just the number of rows whose entry `j` equals
their own first entry.

**Complexity:** `O(m·n)` time, `O(1)` space.
