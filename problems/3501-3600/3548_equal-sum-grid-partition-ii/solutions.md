# Solutions — Equal Sum Grid Partition II

## Prefix Sums and Boundary Exception Checks

There are only `m - 1` horizontal and `n - 1` vertical cuts, and both
sections of any cut are rectangular slabs aligned to the grid edges. Equal
sums make the cut valid outright; otherwise the difference can be closed
only by discounting one cell of value `|top - bottom|` from the larger
side (values are positive, so discounting the smaller side only widens
the gap). The connectivity clause is the whole difficulty, and it
collapses: a slab spanning at least two rows and two columns stays
connected after removing any single cell, so only slabs that are a single
row or a single column constrain the discount to their two end cells (and
a 1x1 slab would empty out, which can never match the other side's
positive sum).

Each axis is swept twice with rolling prefix sums and a set of values
seen so far in the growing slab. The forward pass adds one row (or
column) at a time and, whenever the leading slab is currently larger,
tests whether the deficit exists in it — a set lookup for general slabs,
a direct comparison against the two end cells when the slab is a strip.
The backward pass repeats symmetrically for the trailing slab, so every
cut is examined in both discount directions. Row sums and column sums are
accumulated incrementally, keeping the whole scan linear in the number of
cells.

Cell values reach `10⁵` and the grid holds up to `10⁵` cells, so section
sums reach `10^10` — past 32-bit range — and are carried in 64-bit
integers; a JS `Number` stays exact because `10^10` is far below `2⁵³`.
The value sets hold at most all cell values (`10⁵` entries of at most
`10⁵`), so the deficit lookup can never produce a false positive even
when the deficit itself exceeds any single cell value.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
